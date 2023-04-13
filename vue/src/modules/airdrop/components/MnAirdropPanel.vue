<template>
    <div v-if="!address">
        <MnAlert type="warning">
            Please connect your wallet to claim airdrop reward!
        </MnAlert>
    </div>
    <div v-else>
        <div v-if="!state.hasAccount" class="mb-8">
            <MnAlert type="warning">
                Your account does not exist on the chain. Please send some tokens to your address or open <a
                    href="https://faucet.mun.money" target="_blank" class="underline font-bold">faucet</a> page.
            </MnAlert>
        </div>

        <MnCard>
            <div v-for="(mission, index) in missionSteps"
                :class="{ 'ring-2 ring-offset-2 ring-lilac dark:ring-stone-600': missionState[index] == MissionStateType.Completed }"
                class="flex items-center p-4 border-1 border-gray-300 dark:border-stone-600 mb-4 rounded gap-4">
                <div class="flex-1">
                    <p class="text-sm">Mission #{{ index + 1 }}</p>
                    <p class="text-base">
                        <a :href="mission.relevant_url" target="_blank">{{
                            mission.description
                        }}</a>
                    </p>
                </div>
                <div>
                    <h4 v-if="missionState[index] == MissionStateType.Completed" class="">
                        Complete
                    </h4>
                    <h4 v-else-if="missionState[index] == MissionStateType.NotComplete" class="uncompleted">
                        Not Complete
                    </h4>
                    <MnButton v-else-if="missionState[index] == MissionStateType.Claimable" class="Button"
                        @click="() => doClaim(index)">
                        Claim
                    </MnButton>
                    <SpSpinner v-else />
                </div>
            </div>

            <p class="text-xs tracking-wide text-gray-600 dark:text-stone-400">
                You can claim your tokens only when the previous steps have been completed
            </p>
        </MnCard>
    </div>
</template>

<script setup lang="ts">
import { watch, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MnButton from '../../../components/common/buttons/MnButton.vue';
import MnAlert from '../../../components/common/MnAlert.vue';
import MnCard from '../../../components/common/MnCard.vue';
import { useAddress } from '../../../composables';
import { QueryClaimRecordResponse, ClaimableForActionResponse } from '../types'

let $s = useStore()
let { address } = useAddress({ $s })

let queryAccount = (opts: any) => $s.dispatch("cosmos.auth.v1beta1/QueryAccount", opts)

let state = reactive({
    hasAccount: true,
    fetching: false,
    mission_progress: 0
})

watch(() => address.value, () => {
    accountExist()
})

async function accountExist() {
    if (address.value.length > 0) {
        try {
            await queryAccount({
                params: {
                    address: address.value
                }
            })
            state.hasAccount = true
        } catch (error) {
            state.hasAccount = false
        }
    }
}
accountExist()

enum MissionStateType {
    Completed,
    NotComplete,
    Claimable,
    None
}

const missionSteps = reactive([
    {
        description: "Initial claim",
        relevant_url: "#",
        claimable: false,
        completed: false,
    },
    {
        description: "Stake your TMUN (delegate to a validator)",
        relevant_url: "https://staking.mun.money",
        claimable: false,
        completed: false,
    },
    {
        description: "Vote for a governance proposal",
        relevant_url: "#",
        claimable: false,
        completed: false,
    },
]);
onMounted(() => {
    fetchMissionStatus();
});

watch(address, () => {
    fetchMissionStatus();
});

const missionState = computed<number[]>(() => {
    let res = [MissionStateType.None, MissionStateType.None, MissionStateType.None]
    for (let i = 0; i < missionSteps.length; i++) {
        if (missionSteps[i].completed == true) res[i] = MissionStateType.Completed;
        else {
            if (missionSteps[i].claimable == false) res[i] = MissionStateType.NotComplete;
            else res[i] = MissionStateType.Claimable;
        }
    }
    return res
})

const initMissionStatus = async () => {
    for (let i = 0; i < 3; i++) {
        missionSteps[i].claimable = missionSteps[i].completed = false;
    }
};

const fetchMissionStatus = async () => {
    initMissionStatus();
    if (address.value == "") return;
    state.fetching = true

    const cr: QueryClaimRecordResponse = await $s.dispatch(
        "mun.claim.v1beta1/QueryClaimRecord",
        {
            params: { address: address.value },
            options: { subscribe: true },
        }
    );

    const claimableForInitialAction: ClaimableForActionResponse =
        await $s.dispatch("mun.claim.v1beta1/QueryClaimableForAction", {
            params: {
                address: address.value,
                action: "ActionInitialClaim",
            },
        });

    console.log(cr, claimableForInitialAction)
    const { action_completed, action_ready } = cr.claim_record;
    for (let i = 0; i < 3; i++) {
        missionSteps[i].completed =
            action_completed && action_completed.length > i
                ? action_completed[i]
                : false;
        missionSteps[i].claimable =
            action_ready && action_ready.length > i ? action_ready[i] : false;
    }
    if (claimableForInitialAction.coins.length > 0) {
        missionSteps[0].claimable = true;
    }
    const prog = action_completed?.findIndex((completed) => completed == false)!;
    state.mission_progress = prog == -1 ? 0 : 100 * prog / 3;

    state.fetching = false
};

const doClaim = async (missionId: number) => {
    // const loader = $loading.show({
    //     color: "#BBB",
    //     backgroundColor: "black",
    // });

    try {
        let payload = {
            sender: address.value,
            address: address.value,
            action: missionId,
        };

        const txResult = await $s.dispatch("mun.claim.v1beta1/sendMsgClaimFor", {
            value: payload,
        });
        console.log(txResult);

        if (txResult.code != 0) {
            throw new Error();
        }

        // toast.success("Success");
        fetchMissionStatus();
    } catch (e) {
        // toast.error("Failed");
        console.error(e);
    }
};
</script>