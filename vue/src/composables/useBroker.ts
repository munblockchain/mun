import EventEmitter from "events";
import { computed, Ref, ref } from "vue";
import { Store } from "vuex";
import { fromBase64 } from "@cosmjs/encoding";
import axios from "axios";

type Params = {
	$s: Store<any>;
};

type Response = {
	newTxs: Ref<TxResponse[]>;
	remittanceUpdateFlag: Ref<number>;
};


interface TxResponseEvent {
	type: string;
	attributes: {
		key: string;
		value: string | null;
	}[]
}

interface TxResponse {
	code: number;
	height: string;
	events: TxResponseEvent[];
	tx: {
		'@type': string;
		body: {
			messages: any[]
		}
	}
}

// pagination.next_key is always null
// it could be the Cosmos SDK issue
// need to fix to reduce number of api calls
async function getTxs(baseUrl: string, isSend: boolean, key: string) {
	const sendActionEvent = "ibank.action%3d%27send%27";
	const receiveActionEvent = "ibank.action%3d%27receive%27";

	const event = isSend ? sendActionEvent : receiveActionEvent

	const url = `${baseUrl}` +
		`/cosmos/tx/v1beta1/txs` +
		`?events=${event}` +
		// `&pagination.limit=5` +
		// (key == '' ? `&pagination.offset=0` : `&pagination.key=${key}`) +
		`&pagination.reverse=true`

	return axios.get(url);
}

export default async function ({ $s }: Params): Promise<Response> {

	let newTxs: Ref<TxResponse[]> = ref([]);
	let remittanceUpdateFlag: Ref<number> = ref(0);

	let lastBlockHeight = ref(0);
	let client = computed<EventEmitter>(() => $s.getters["common/env/client"]);
	let API_COSMOS = computed<string>(() => $s.getters["common/env/apiCosmos"]);
	let address = computed<string>(() => $s.getters["common/wallet/address"]);

	const realTime = true;
	if (realTime) {
		client.value.on("newblock", async ({ data, events, query }) => {
			const { value } = data;
			const txs = value.block.data.txs as string[];
			const currentHeight = Number(value.block.header.height);

			if (lastBlockHeight.value == 0) lastBlockHeight.value = currentHeight - 1;

			if (address.value == "") return;

			let hasNewRelated = false;
			txs.forEach((tx) => {
				const rawMsg = new TextDecoder().decode(fromBase64(tx));
				if (
					rawMsg.indexOf("mun.ibank.MsgSend") != -1 ||
					rawMsg.indexOf("mun.ibank.MsgReceive") != -1
				) {
					// if (rawMsg.indexOf(address.value) != -1) {
						hasNewRelated = true;
					// }
				}
			});

			if (hasNewRelated == false && currentHeight - lastBlockHeight.value == 1) {
				lastBlockHeight.value = currentHeight
				return;
			}

			let key = "";
			let allTxs: TxResponse[] = []
			for (let isSend of [true, false]) {
				key = ''

				while (key != null) {
					const { data: resp } = await getTxs(API_COSMOS.value, isSend, key) as any;
					key = resp.pagination.next_key

					const tx_responses: TxResponse[] = resp.tx_responses

					allTxs.push(...tx_responses.filter(tx => Number(tx.height) >= lastBlockHeight.value + 1 && Number(tx.height) <= currentHeight))

					// Every tx block height should be in range of [lastBlockHeight+1, currentHeight]
					if (tx_responses.every(tx => Number(tx.height) <= lastBlockHeight.value || Number(tx.height) > currentHeight)) break
					if (resp.pagination.next_key == null) break
				}
			}

			if (allTxs.length > 0) {
				remittanceUpdateFlag.value = currentHeight
				newTxs.value = allTxs
			}

			lastBlockHeight.value = currentHeight
		});
	}

	return {
		newTxs,
		remittanceUpdateFlag
	};
}
