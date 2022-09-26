<template>
  <div className="container">
    <h2 className="title_airdrop">Airdrop</h2>
    <h1 className="sub_title_airdrop">Your progress</h1>
    <div className="flex flex-wrap p-4">
      <SpProgressbar size="large" val="60" text="60%" bar-border-radius="20" text-align="right">
      </SpProgressbar>
    </div>
    <h2 className="title_airdrop">My Missions</h2>

    <div className="mission-group  d-flex align-items-right justify-content-between">
      <div className="col-md-6">
        <div>
          <p className="mission-title"> Mission #1 </p>
        </div>
        <div>
          <p className="mission-content">initial claim (25%)</p>
        </div>
      </div>
      <div>
        <Button class="Button" @click="() => sendTxInitialClaim()">
          Claim
        </Button>
      </div>
    </div>
    <div className="mission-group  d-flex align-items-right justify-content-between">
      <div className="col-md-6">
        <div>
          <p className="mission-title"> Mission #4 </p>
        </div>
        <div>
          <p className="mission-content">perform a swap (25%)</p>
        </div>
      </div>
      <div>
        <Button class="Button" @click="() => sendTx(2)">
          Swap
        </Button>
      </div>
    </div>
    <div className="mission-group  d-flex align-items-right justify-content-between">
      <div className="col-md-6">
        <div>
          <p className="mission-title"> Mission #2 </p>
        </div>
        <div>
          <p className="mission-content">stake the claimed in 1) to unlock 25% more (25%)</p>
        </div>
      </div>
      <div>
        <Button class="Button" @click="() => sendTx(3)">
          Stake
        </Button>
      </div>
    </div>
    <div className="mission-group  d-flex align-items-right justify-content-between">
      <div className="col-md-6">
        <div>
          <p className="mission-title"> Mission #3 </p>
        </div>
        <div>
          <p className="mission-content">vote with staked balance for a proposal (25%)</p>
        </div>
      </div>
      <div>
        <Button class="Button" @click="() => sendTx(4)">
          Vote
        </Button>
      </div>
    </div>


    <div style="width: 50%; height: 50px" />

    <!-- feedbacks -->
    <div v-if="isTxOngoing" class="feedback">
      <div class="loading-spinner">
        <SpSpinner :size="46" :margin-left="10"></SpSpinner>
      </div>
      <div style="width: 50%; height: 24px" />

      <div class="tx-ongoing-title">Opening Keplr</div>

      <div style="width: 50%; height: 8px" />

      <div class="tx-ongoing-subtitle">Sign transaction...</div>
    </div>

    <div v-else-if="isTxSuccess" class="feedback">
      <div class="check-icon">
        <svg width="64" height="63" viewBox="0 0 64 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="31.5" r="29.5" stroke="#00CF30" stroke-width="4" stroke-linecap="round" />
          <path d="M19 30.1362L28.6557 40L45 23" stroke="#00CF30" stroke-width="4" />
        </svg>
      </div>

      <div style="width: 50%; height: 24px" />

      <div class="tx-feedback-title">claim sucessed</div>

      <div style="width: 50%; height: 8px" />

    </div>

    <div v-else-if="isTxError" class="feedback">
      <div class="warning-icon">
        <svg width="58" height="54" viewBox="0 0 58 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M29 44.5625C29.7249 44.5625 30.3125 43.9749 30.3125 43.25C30.3125 42.5251 29.7249 41.9375 29 41.9375C28.2751 41.9375 27.6875 42.5251 27.6875 43.25C27.6875 43.9749 28.2751 44.5625 29 44.5625Z"
            fill="#FE475F" />
          <path d="M1.4375 52.4375L29 1.25L56.5625 52.4375H1.4375Z" stroke="#FE475F" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
          <path d="M29 19.625V34.0625" stroke="#FE475F" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M29 44.5625C29.7249 44.5625 30.3125 43.9749 30.3125 43.25C30.3125 42.5251 29.7249 41.9375 29 41.9375C28.2751 41.9375 27.6875 42.5251 27.6875 43.25C27.6875 43.9749 28.2751 44.5625 29 44.5625Z"
            stroke="#FE475F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <div style="width: 50%; height: 24px" />

      <div class="tx-feedback-title">Something went wrong</div>

      <div style="width: 50%; height: 16px" />

      <div class="tx-feedback-subtitle">
        Your tokens could not be transferred and will remain on your wallet.
      </div>

      <div style="width: 50%; height: 24px" />

      <div style="width: 50%">
        <SpButton style="width: 50%" @click="sendTx">Try again</SpButton>

        <div style="width: 50%; height: 8px" />

        <SpButton style="width: 50%" type="secondary" @click="resetTx">Cancel</SpButton>
      </div>
    </div>

    <!-- wallet locked-->
    <div v-else-if="showWalletLocked">
      <div class="wallet-locked-wrapper">unlock your wallet</div>
    </div>



  </div>


</template>

<script lang="ts">
import { Bech32 } from '@cosmjs/encoding'
// import long from 'long'
import { computed, defineComponent, PropType, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useAddress, useAssets } from '../../composables'
import SpAmountSelect from '../SpAmountSelect'
import SpButton from '../SpButton'
import SpCard from '../SpCard'
import SpProgressbar from '../SpProgressbar'
import SpClipboard from '../SpClipboard'
import SpQrCode from '../SpQrCode'
import SpSpinner from '../SpSpinner'

// types
export interface TxData {
  airdrop_id: number
  recipient: string
  condition_type: number
}

export enum UI_STATE {
  'FRESH' = 1,

  'BOOTSTRAPED' = 2,

  'WALLET_LOCKED' = 3,

  'SEND' = 100,
  'SEND_ADD_TOKEN' = 101,

  'TX_SIGNING' = 300,
  'TX_SUCCESS' = 301,
  'TX_ERROR' = 302,

  'RECEIVE' = 400
}

export interface State {
  tx: TxData
  currentUIState: UI_STATE
  advancedOpen: boolean
}

export let initialState: State = {
  tx: {
    airdrop_id: 1,
    recipient: '',
    condition_type: 0,
  },
  currentUIState: UI_STATE.SEND,
  advancedOpen: false
}

export default defineComponent({
  name: 'SpAirmission',

  components: {
    SpCard,
    SpAmountSelect,
    SpQrCode,
    SpButton,
    SpClipboard,
    SpSpinner,
    SpProgressbar,

  },

  setup() {
    // store
    let $s = useStore()

    // state
    let state: State = reactive(initialState)

    // composables
    let { address } = useAddress({ $s })
    let { balances } = useAssets({ $s })

    // actions
    let sendMsgSend = (opts: any) =>
      $s.dispatch('mun.claim.v1beta1/sendMsgInitialClaim', opts)


    let sendMsgInitialClaim = (opts: any) =>
      $s.dispatch('mun.claim.v1beta1/sendMsgInitialClaim', opts)

    // methods
    let switchToSend = (): void => {
      state.currentUIState = UI_STATE.SEND
    }
    let switchToReceive = (): void => {
      if (address.value) {
        state.currentUIState = UI_STATE.RECEIVE
      }
    }
    let resetTx = (): void => {
      state.tx.airdrop_id = 0
      state.tx.recipient = ''

      state.tx.condition_type = 0

      state.currentUIState = UI_STATE.SEND
    }

    let sendTx = async (x_cond: number): Promise<void> => {
      if (!address.value) {
        return
      }

      state.currentUIState = UI_STATE.TX_SIGNING

      let send

      let payload: any = {
        airdrop_id: state.tx.airdrop_id,
        recipient: address.value,
        conditionType: x_cond
      }

      try {

        send = () =>
          sendMsgSend({
            value: payload,
          })
        const txResult = await send()

        if (txResult.code) {
          throw new Error()
        }
        state.currentUIState = UI_STATE.TX_SUCCESS
      } catch (e) {
        console.error(e)
        state.currentUIState = UI_STATE.TX_ERROR
      }
    }

    let sendTxInitialClaim = async (): Promise<void> => {
      if (!address.value) {
        return
      }

      state.currentUIState = UI_STATE.TX_SIGNING

      try {
        let payload: any = {
          sender: address.value,
        }

        let send = () =>
          sendMsgInitialClaim({
            value: payload,
          })
        const txResult = await send()

        if (txResult.code) {
          throw new Error()
        }

        state.currentUIState = UI_STATE.TX_SUCCESS
      } catch (e) {
        console.error(e)
        state.currentUIState = UI_STATE.TX_ERROR
      }
    }

    // computed
    let showSend = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.SEND
    })
    let showReceive = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.RECEIVE
    })
    let showWalletLocked = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.WALLET_LOCKED
    })
    let isTxOngoing = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.TX_SIGNING
    })
    let isTxSuccess = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.TX_SUCCESS
    })
    let isTxError = computed<boolean>(() => {
      return state.currentUIState === UI_STATE.TX_ERROR
    })
    let parseAmount = (amount: string): number => {
      return amount == '' ? 0 : parseInt(amount)
    }

    let validReceiver = computed<boolean>(() => {
      let valid: boolean

      try {
        valid = !!Bech32.decode(state.tx.recipient)
      } catch {
        valid = false
      }

      return valid
    })
    let ableToTx = computed<boolean>(
      () =>
        !!address.value
    )

    //watch
    watch(
      () => address.value,
      async () => {
        resetTx()
      }
    )

    return {
      //state,
      state,
      // composable
      address,
      // computed
      showSend,
      showReceive,
      showWalletLocked,
      balances,

      isTxOngoing,
      isTxSuccess,
      isTxError,
      ableToTx,
      validReceiver,
      // methods
      switchToSend,
      switchToReceive,
      parseAmount,
      resetTx,
      sendTx,
      sendTxInitialClaim,
    }
  }
})
</script>
  

<!--*************** CSS section start *************************** -->
<style lang="scss" scoped>
$base-color: rgba(0, 0, 0, 0.03);
$animation-duration: 1.6s;
$shine-color: rgba(0, 0, 0, 0.06);
$avatar-offset: 32 + 16;

.assets-header {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

}

.title_airdrop {
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 127%;
  /* identical to box height, or 36px */

  letter-spacing: -0.02em;
  font-feature-settings: 'zero';

  color: #BE185D;
  margin-top: 2%;
}

.sub_title_airdrop {
  font-family: Inter, serif;
  font-style: normal;
  font-size: 18px;
  margin-top: 2%;
  line-height: 127%;
  /* identical to box height, or 36px */
  padding: 10px;
  font-feature-settings: 'zero';
  color: #BE185D;

}

.mission-title {
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  /* identical to box height, or 36px */
  margin-top: 15px;
  font-feature-settings: 'zero';
  color: #BE185D;
  margin-top: 0;
}

.mission-content {
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 127%;
  /* identical to box height, or 36px */

  font-feature-settings: 'zero';
  color: #BE185D;

}


.mission-group {
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
  border: rgba(151, 130, 130, 0.1);
  border-radius: 10px;
  border: 1px solid grey;
  padding-top: 25px;
  padding-left: 10px;
}

.claim-button-style {
  display: flex;
  justify-content: space-between;
  height: auto;
  width: auto;
  font-size: 14px;
  background: #BE185D;
  border-radius: 5px;
  padding: 5px;
}

.Button {
  background: #BE185D;
  width: 80px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  margin-right: 20px;
  padding: 12px 20px;
  border-radius: 15px;
  border-color: #BE185D;
  transition: background .2s ease-in-out;

  &:hover {
    background: darken(#d11e69, 20);
  }

  &:disabled {
    opacity: 0.5;
  }
}

.feedback {
  position: absolute;
  top: 400px;
  left: 48%;
  z-index: 9999999999;
  background: wheat;
  padding: 10px;
}
</style>
