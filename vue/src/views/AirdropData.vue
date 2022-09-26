<template>
  <div class="container">
    <div class="row row-sm-revers">
      <div>
        <SpAirmission/>
      </div>
    </div>
  </div>
</template>
<script>
import { SpAirmission } from '../components_token'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Airdrop',

  components: {SpAirmission},

  setup() {
    // store
    let $s = useStore()

    // computed
    let address = computed(() => $s.getters['common/wallet/address'])

    return {
      address
    }
  }
}
</script>

<style scoped>

.col {
  flex-grow: 1;
  padding: 20px;
}
</style>
