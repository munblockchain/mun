import { OfflineDirectSigner } from '@cosmjs/proto-signing'
import { Key } from '@keplr-wallet/types'
import { computed, ComputedRef } from 'vue'
import { Store } from 'vuex'

import { Amount, AmountWithMeta } from '../utils/interfaces'

type Response = {
  connectToKeplr: (onSuccessCb: () => void, onErrorCb: () => void) => void
  isKeplrAvailable: ComputedRef<boolean>
  getOfflineSigner: (chainId: string) => OfflineDirectSigner
  getKeplrAccParams: (chainId: string) => Promise<Key>
  listenToAccChange: (cb: EventListener) => void
}

type Params = {
  $s: Store<any>
  opts?: any
}

declare global {
  interface Window {
    keplr: any;
  }
}

export default function ({ $s }: Params): Response {
  let connectToKeplr = async (
    onSuccessCb: () => void,
    onErrorCb: () => void
  ) => {
    try {
      let features: string[] = []

      let staking = $s.getters['cosmos.staking.v1beta1/getParams']()
      let tokens = $s.getters['cosmos.bank.v1beta1/getTotalSupply']()
      let chainId = $s.getters['common/env/chainId']
      let chainName = $s.getters['common/env/chainName']
      let rpc = $s.getters['common/env/apiTendermint']
      let rest = $s.getters['common/env/apiCosmos']
      let addrPrefix = $s.getters['common/env/addrPrefix']

      let coinDenom = $s.getters['common/env/coinDenom']
      let coinMinimalDenom = $s.getters['common/env/coinDenomMin']
      let coinDecimals = Number($s.getters['common/env/coinDenomMinDecimal'])
      let coinGeckoId = ''

      let stakeCurrency = {
        coinDenom,
        coinMinimalDenom,
        coinDecimals,
        // coinGeckoId
      }

      let bip44 = {
        coinType: 118
      }

      let bech32Config = {
        bech32PrefixAccAddr: addrPrefix,
        bech32PrefixAccPub: addrPrefix + 'pub',
        bech32PrefixValAddr: addrPrefix + 'valoper',
        bech32PrefixValPub: addrPrefix + 'valoperpub',
        bech32PrefixConsAddr: addrPrefix + 'valcons',
        bech32PrefixConsPub: addrPrefix + 'valconspub'
      }

      let currencies = [{
        coinDenom,
        coinMinimalDenom,
        coinDecimals,
        // coinGeckoId,
      }]

      let feeCurrencies = [{
        coinDenom,
        coinMinimalDenom,
        coinDecimals,
        // coinGeckoId,
      }]
      let coinType = 118

      let gasPriceStep = {
        low: 0.0,
        average: 0.025,
        high: 0.04
      }

      if (chainId) {
        await window.keplr.experimentalSuggestChain({
          features,
          chainId,
          chainName,
          rpc,
          rest,
          stakeCurrency,
          bip44,
          bech32Config,
          currencies,
          feeCurrencies,
          coinType,
          gasPriceStep
        })

        window.keplr.defaultOptions = {
          sign: {
            preferNoSetFee: true,
            preferNoSetMemo: true
          }
        }

        await window.keplr.enable(chainId)
        onSuccessCb()
      } else {
        console.error('Cannot access chain data from vuex store')
        onErrorCb()
      }
    } catch (e) {
      console.error(e)
      onErrorCb()
    }
  }

  let isKeplrAvailable = computed<boolean>(() => {
    return !!window.keplr
  })

  let getOfflineSigner = (chainId: string) =>
    window.keplr.getOfflineSigner(chainId)

  let getKeplrAccParams = async (chainId: string) =>
    await window.keplr.getKey(chainId)

  let listenToAccChange = (cb: EventListener) => {
    window.addEventListener('keplr_keystorechange', cb)
  }

  return {
    connectToKeplr,
    isKeplrAvailable,
    getOfflineSigner,
    getKeplrAccParams,
    listenToAccChange
  }
}
