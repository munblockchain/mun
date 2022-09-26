import { App as Application } from 'vue'

import { registerComponent } from './../../utils/plugins/index'
// @ts-ignore
import SpProgressbar from './SpProgressbar.vue'

export const Plugin = {
  install(vue: Application): void {
    registerComponent(vue, SpProgressbar)
  }
}

export default SpProgressbar
