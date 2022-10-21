<template>
  <div class="amount-select">
    <div
      v-for="(x, i) in selected"
      :key="`${x.amount.denom}-${x.path}-${i}`"
      class="selected-item"
    >
      <SpDenom :denom="x.amount.denom" modifier="avatar" />

      <div style="width: 12px; height: 100%" />

      <div class="token-info">
        <div class="token-denom">
          <SpDenom :denom="x.amount.denom" />
        </div>

        <div
          class="token-amount"
          :class="{
            error: !hasEnoughBalance(x, x.amount.amount)
          }"
        >
          {{ getBalanceAmount(x) }} available
        </div>
      </div>

      <div class="input-wrapper">
        <SpAmountInput
          class="input secondary"
          @update="(amount: string) => handleAmountInput(amount, x)"
        />

        <div class="focus-background"></div>
      </div>
    </div>

    <div
      v-if="ableToBeSelected.length > 0"
      class="add-token"
      @click="state.modalOpen = true"
    >
      <div class="add-icon">
        <AddIcon />
      </div>

      <div style="width: 12px; height: 100%" />

      <div class="action-text">Add asset</div>
    </div>

    <SpModal
      :visible="state.modalOpen"
      :close-icon="true"
      :title="'Select asset'"
      @close="state.modalOpen = false"
    >
      <template #body>
        <div class="modal-body">
          <div class="search">
            <input
              v-model="state.tokenSearch"
              class="input primary"
              placeholder="Search assets"
            />
          </div>

          <div style="width: 100%; height: 16px" />

          <div class="modal-list">
            <div
              v-for="(x, i) in ableToBeSelected"
              :key="'balance' + i"
              class="modal-list-item"
              :index="i"
              @click="() => handleTokenSelect(x)"
            >
              <SpDenom :denom="x.amount.denom" modifier="avatar" />

              <div style="width: 12px; height: 100%" />

              <div class="token-info">
                <div class="token-denom">
                  <SpDenom :denom="x.amount.denom" />
                </div>

                <div class="token-amount">
                  {{ parseAmount(x.amount.amount) }} available
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </SpModal>
  </div>
</template>

<script lang="ts">
import BigNumber from 'bignumber.js'
import { computed, defineComponent, PropType, reactive } from 'vue'

import { AssetForUI } from '../../composables/useAssets'

import SpAmountInput from '../SpAmountInput'
import SpDenom from '../SpDenom'
import SpModal from '../SpModal'
import AddIcon from '../../assets/icons/AddIcon.vue'

export interface State {
  tokenSearch: string
  modalOpen: boolean
}

export let initialState: State = {
  tokenSearch: '',
  modalOpen: false
}

export default defineComponent({
  name: 'SpAmountSelect',

  components: { SpModal, SpDenom, SpAmountInput, AddIcon },

  emits: ['update'],

  props: {
    selected: {
      type: Array as PropType<Array<AssetForUI>>
    },
    balances: {
      type: Array as PropType<Array<AssetForUI>>
    }
  },

  setup(props: any, { emit }) {
    // state
    let state: State = reactive(initialState)

    // computed
    let ableToBeSelected = computed<AssetForUI[]>(() => {
      let notSelected = (x: AssetForUI) =>
        (props.selected as Array<AssetForUI>).every((y: AssetForUI) => {
          let denomIsDifferent = x.amount.denom !== y.amount.denom

          let pathIsDifferent = x.path !== y.path

          return denomIsDifferent || pathIsDifferent
        })

      let searchFilter = (x: AssetForUI) =>
        x.amount.denom.includes(state.tokenSearch.toLowerCase())

      return props.balances.filter(notSelected).filter(searchFilter)
    })

    // methods
    let findAsset = (x: AssetForUI, y: AssetForUI): boolean =>
      y.path === x.path && x.amount.denom === y.amount.denom
    let parseAmount = (amount: string): number => {
      return amount == '' ? 0 : +amount
    }
    let handleAmountInput = (amount: string, x: AssetForUI) => {
      let amountAsBigNumber = new BigNumber(amount)

      let newSelected: Array<AssetForUI> = [...props.selected]

      let index = newSelected.findIndex((y: AssetForUI) => findAsset(x, y))

      newSelected[index].amount.amount = amountAsBigNumber.toString()

      emit('update', { selected: newSelected })
    }
    let handleTokenSelect = (x: AssetForUI) => {
      let newSelected: Array<AssetForUI> = [
        ...props.selected,
        {
          ...x,
          amount: {
            amount: '',
            denom: x.amount.denom
          }
        }
      ]

      emit('update', { selected: newSelected })

      state.modalOpen = false
    }
    let getBalanceAmount = (x: AssetForUI): string =>
      props.balances.find((y: AssetForUI) => findAsset(x, y))?.amount?.amount
    let hasEnoughBalance = (x: AssetForUI, amountDesired: string) =>
      parseAmount(getBalanceAmount(x)) >= parseAmount(amountDesired)

    return {
      // state
      state,
      // computed
      ableToBeSelected,
      // methods
      parseAmount,
      hasEnoughBalance,
      handleAmountInput,
      handleTokenSelect,
      getBalanceAmount
    }
  }
})
</script>

<style lang="scss" scoped>
.selected-item {
  display: flex;
  align-items: center;
  position: relative;
  height: 44px;

  &:not(:first-child) {
    margin-top: 12px;
  }
}
.input.primary {
  padding: 16px 13.5px;
  background: rgba(0, 0, 0, 0.03);
  border: 0;
  border-radius: 10px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: var(--text-color-primary);
  width: 100%;
}

.input.primary::placeholder {
  color: var(--text-color-inactive);
}

.add-token {
  display: inline-flex;
  align-items: center;
}
.add-token:hover {
  cursor: pointer;
}
.add-icon {
  svg *{
    // stroke: blue;
  }
}
.action-text {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 153.8%;
  /* identical to box height, or 20px */

  display: flex;
  align-items: center;
  text-align: right;

  /* light/muted */

  color: var(--text-color-secondary);
}

.modal-list {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.modal-list-item {
  display: flex;
  align-items: center;
  padding: 16px 24px;
}

.modal-list-item:hover {
  background: rgba(0, 0, 0, 0.03);
  cursor: pointer;
}

.amount-select {
}

.input.secondary {
  width: 100%;

  background: none;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 100%;
  /* identical to box height, or 21px */

  text-align: right;
  letter-spacing: -0.007em;
  margin-left: 40px;

  /* light/inactive */

  color: var(--text-color-inactive);
  padding: 0;
  height: 28px;
  border: 0;
  outline: 0;

  &:focus {
    color: var(--text-color-primary);

    ~ .focus-background {
      background: rgba(0, 0, 0, 0.03);
      position: absolute;
      width: calc(100% + 16px);
      height: 56px;
      left: -8px;
      border-radius: 8px;
      top: -6px;
    }
  }
}

.input.secondary::placeholder {
  color: var(--text-color-inactive);
}

.token-info {
  display: flex;
  flex-direction: column;
}

.token-denom {
  text-transform: uppercase;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  /* identical to box height, or 21px */

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.007em;

  /* light/text */
  color: var(--text-color-primary);
}

.token-amount {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 130.7%;
  margin-bottom: -2px;
  margin-top: 3px;
}

.token-amount.error {
  color: #d80228;
}

.input-wrapper {
  display: flex;
  flex: 1;
}
</style>
