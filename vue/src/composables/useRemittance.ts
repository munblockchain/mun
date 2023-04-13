import { computed, ref, Ref } from "vue";
import EventEmitter from "events";
import { Store } from "vuex";
import { V1Beta1GetTxsEventResponse as GetTxsEventResponse } from 'mun-client-ts/cosmos.tx.v1beta1/rest'
import { TypesBlock } from 'mun-client-ts/cosmos.base.tendermint.v1beta1/rest'
import axios from 'axios'
import { fromBase64 } from "@cosmjs/encoding"
import { RemittanceTx } from "../modules/broker/types";
import { Amount } from "../utils/interfaces";
import { getTxsByEvent } from "../utils/helpers";

type Params = {
  $s: Store<any>;
  opts?: {
    order?: "asc" | "desc";
    realTime: boolean;
  };
};

enum Order {
  ORDER_ASC = 1,
  ORDER_DESC = 2
}

type Response = {
  getHashValue: (incoming: boolean, offset: number, limit: number, txs: RemittanceTx[]) => Promise<RemittanceTx[]>,
  removeListener: () => void,
  remittanceUpdateFlag: Ref<number>
};

export default ({ $s, opts }: Params): Response => {
  let address = computed<string>(() => $s.getters['common/wallet/address'])
  let API_COSMOS = computed<string>(() => $s.getters['common/env/apiCosmos'])
  let SENT_EVENT = computed<string>(() => `ibank.sender%3D%27${address.value}%27`)
  let RECEIVE_EVENT = computed<string>(() => `ibank.recipient%3D%27${address.value}%27`)

  let remittanceUpdateFlag = ref(0);
  let lastBlockHeight = ref(0);
  let client = computed<EventEmitter>(() => $s.getters["common/env/client"]);

  let getHashValue = async (
    incoming: boolean,
    offset: number,
    limit: number,
    transactions: RemittanceTx[]
  ): Promise<RemittanceTx[]> => {
    const { data: txs } = await getTxsByEvent(API_COSMOS.value, incoming ? RECEIVE_EVENT.value : SENT_EVENT.value, offset, limit, 'desc')
    let ff = new Map<string, string>()

    txs.tx_responses?.forEach(response => {
      const abciEvent = response.events?.find(e => e.type == 'ibank')
      abciEvent?.attributes?.forEach(attr => {
        const key = new TextDecoder().decode(fromBase64(attr.key!));
        if (key == 'remittance_id') {
          const value = new TextDecoder().decode(fromBase64(attr.value!));
          ff.set(value, response.txhash!)
        }
      })
    })

    return transactions.map(tx => {
      tx.transaction.hash = ff.get(tx.transaction.id)
      return tx
    })
  }

  const onNewBlock = async ({ query, data, events }: any) => {
    const { header, data: blockData } = data.value.block as TypesBlock
    if (!blockData?.txs || blockData.txs.length == 0) {
      return
    }

    const hasNoRelatedTx = blockData.txs.every(tx => {
      const rawMsg = new TextDecoder().decode(fromBase64(tx));
      return !(rawMsg.indexOf("mun.ibank.MsgSend") != -1 && rawMsg.indexOf(address.value) != -1)
    })

    if (hasNoRelatedTx) return

    const blockHeight = Number(header?.height)
    if (lastBlockHeight.value == 0) lastBlockHeight.value = blockHeight - 1

    remittanceUpdateFlag.value = blockHeight
    lastBlockHeight.value = blockHeight
  }

  if (opts?.realTime) {
    // client.value.on("newblock", async ({ data, events, query }) => {
    // const { block } = data.value;
    // if (data.)
    // console.log(data)
    // const txs = value.block.data.txs as string[];
    // const currentHeight = Number(value.block.header.height);

    // if (lastBlockHeight.value == 0) lastBlockHeight.value = currentHeight - 1;
    // })
    client.value.on('newblock', onNewBlock)
  }

  const removeListener = () => {
    if (opts?.realTime) {
      client.value.removeListener('newblock', onNewBlock)
    }
  }

  return {
    getHashValue,
    removeListener,
    remittanceUpdateFlag
  }
};
