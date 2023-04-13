<template>
    <div class="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
        <MnCard title="Overview">
            <div class="space-y-4 text-sm">
                <div>
                    <div>MUN Balance</div>
                    <div>{{ nativeTokenBalance.toFixed(2) }} MUN</div>
                </div>

                <div>
                    <div>MUN Staked</div>
                    <div>0.00 MUN</div>
                </div>

                <div>
                    <div>MUN Value</div>
                    <div>$ {{ mun_value }}</div>
                </div>
            </div>
        </MnCard>

        <MnCard title="Assets">
            <div>
                <table class="w-full">
                    <tbody>
                        <tr v-for="asset in balances.assets">
                            <td>{{ asset.amount.denom }}</td>
                            <td class="text-right">{{ asset.amount.amount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MnCard>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import MnCard from '../../components/common/MnCard.vue';
import { useAddress, useAssets } from '../../composables';

let $s = useStore()
let { address } = useAddress({ $s })
let { balances } = useAssets({ $s })
let nativeDenom = $s.getters['common/env/coinDenom']
let nativeMinimalDenom = $s.getters['common/env/coinDenomMin']


let nativeTokenBalance = computed<number>(() => {
    if (balances.value.isLoading) return 0
    let m = balances.value.assets.find(v => v.amount.denom == nativeDenom)
    return m ? Number(m.amount.amount) : 0
})

const mun_token_price = 0.12

const mun_value = computed(() => (nativeTokenBalance.value * mun_token_price).toFixed(2))

</script>