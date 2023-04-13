<template>
    <MnModal :open="props.open" @close="emits('close')">
        <div class="text-center">
            <div class="inline-block bg-white p-3 mx-auto">
                <MnQrCode :value="props.address" class="mx-auto" :width="200" />
            </div>

            <div class="mt-4 text-center text-sm">{{ props.address }}</div>
        </div>
    </MnModal>
</template>

<script lang="ts" setup>
import MnModal from '../../components/common/MnModal.vue';
import MnQrCode from '../../components/common/MnQrCode.vue';

interface Props {
    open: boolean,
    address?: string
}

const props = withDefaults(defineProps<Props>(), {
    address: ''
})

const emits = defineEmits(['close'])
</script>