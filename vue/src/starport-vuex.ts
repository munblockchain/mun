import blocks from './modules/common/blocks'
import env from './modules/common/env'
import wallet from './modules/common/wallet'
import ibc from './modules/common/ibc'

export { blocks, env, wallet, ibc }

import { Buffer } from 'buffer'

// @ts-ignore
globalThis['Buffer'] = Buffer
