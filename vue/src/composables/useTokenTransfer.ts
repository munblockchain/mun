import { computed, ref, Ref, watch } from "vue"
import { Store } from "vuex"
import { Buffer } from 'buffer';
import { EventEmitter } from 'events'
import { Amount } from "../utils/interfaces"
import { getTxsByEvent } from '../utils/helpers'
import { V1Beta1Tx, V1Beta1TxResponse } from "mun-client-ts/cosmos.tx.v1beta1/rest"

type TxDirection = 'in' | 'out' | 'self'

export type TxForUI = {
    dir: TxDirection
    sender: string
    receiver: string
    amount: Amount[]
    hash: string
    type: string
    timestamp: string
    height: number
}

type Params = {
    $s: Store<any>,
    realTime?: boolean
}

type TxAndResponse = V1Beta1Tx & V1Beta1TxResponse

type Response = {
    txs: Ref<TxForUI[]>,
    removeRealtimeListener: () => void
}

export default async function ({ $s, realTime }: Params): Promise<Response> {

    // refs
    const txs: Ref<TxForUI[]> = ref([])

    // computed
    let address = computed<string>(() => $s.getters['common/wallet/address'])
    let client = computed<EventEmitter>(() => $s.getters['common/env/client'])
    let API_COSMOS = computed<string>(() => $s.getters['common/env/apiCosmos'])

    let SENT_EVENT = computed<string>(() => `transfer.sender%3D%27${address.value}%27`)
    let RECEIVED_EVENT = computed<string>(() => `transfer.recipient%3D%27${address.value}%27`)

    // methods
    const normalize = (tx: any): TxForUI => {
        const findOutDir = (tx: TxForUI): TxDirection => {
            let dir: TxDirection = 'in'

            if (tx.receiver === tx.sender && tx.receiver === address.value) {
                dir = 'self'
            } else if (tx.receiver === address.value) {
                dir = 'in'
            } else if (tx.sender === address.value) {
                dir = 'out'
            }
            return dir
        }

        let isIBC = (tx.body.messages[0]['@type'] as string).includes('ibc.applications.transfer.v1.MsgTransfer')
        let isBankTransfer = (tx.body.messages[0]['@type'] as string).includes('cosmos.bank.v1beta1.MsgSend')

        let normalized: any = {}

        if (isIBC) {
            // let decodeIBC = (dataAs64: string): object =>
            //     JSON.parse(window.atob(dataAs64))

            // let decoded: any = decodeIBC(tx.body.messages[0]?.packet?.data)

            // normalized.sender = decoded.sender
            // normalized.receiver = decoded.receiver
            // normalized.amount = { amount: decoded.amount, denom: decoded.denom }
            // normalized.height = Number(tx.height)

            let msg = tx.body.messages[0]
            normalized.sender = msg.sender
            normalized.receiver = msg.receiver
            normalized.amount = [msg.token]
            normalized.height = Number(tx.height)
        } else if (isBankTransfer) {
            normalized.sender = tx.body.messages[0].from_address
            normalized.receiver = tx.body.messages[0].to_address
            normalized.amount = tx.body.messages[0].amount
            normalized.height = Number(tx.height)
        }

        normalized.type = tx.body.messages[0]['@type']
        normalized.timestamp = tx.timestamp
        normalized.hash = tx.txhash
        normalized.dir = findOutDir(normalized)

        return normalized as TxForUI
    }

    let filterSupportedTypes = (tx: TxAndResponse) => {
        let msgType = ''
        if (tx.body?.messages) {
            msgType = tx.body.messages[0]['@type']!
        }
        let isIBC = msgType.includes('ibc.applications.transfer.v1.MsgTransfer')
        let isBankTransfer = msgType.includes('cosmos.bank.v1beta1.MsgSend')

        return isBankTransfer || isIBC
    }

    const fetchTxs = async (evt: string) => {
        const pageLimit = 50
        let totalPage = -1
        for (let page = 0; totalPage == -1 || page < totalPage; page++) {

            const { data } = await getTxsByEvent(API_COSMOS.value, evt, page * pageLimit, pageLimit, 'desc')

            if (totalPage == -1) totalPage = Math.ceil(Number(data.pagination?.total) / pageLimit)

            if (!data.tx_responses || !data.txs) continue
            const result = data.txs.map((tx, i) => ({ ...tx, ...data.tx_responses![i] }))
                .filter(filterSupportedTypes)
                .map(normalize)

            txs.value.push(...result)
        }
    }

    watch(() => address.value, async () => {
        txs.value = []
        await fetchTxs(SENT_EVENT.value)
        await fetchTxs(RECEIVED_EVENT.value)
    })

    const onNewBlock = () => { }

    await fetchTxs(SENT_EVENT.value)
    await fetchTxs(RECEIVED_EVENT.value)

    txs.value.sort((a, b) => a.height < b.height ? 1 : -1)

    if (realTime) {
        client.value.on('newblock', onNewBlock)
    }
    const removeRealtimeListener = () => {
        client.value.removeListener('newblock', onNewBlock)
    }

    return {
        txs,
        removeRealtimeListener
    }
}