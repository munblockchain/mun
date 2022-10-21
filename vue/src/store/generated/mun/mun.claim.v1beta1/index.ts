import { txClient, queryClient, MissingWalletError , registry} from './module'

import { ClaimRecord } from "./module/types/claim/v1beta1/claim_record"
import { ClaimAuthorization } from "./module/types/claim/v1beta1/params"
import { Params } from "./module/types/claim/v1beta1/params"


export { ClaimRecord, ClaimAuthorization, Params };

async function initTxClient(vuexGetters) {
	return await txClient(vuexGetters['common/wallet/signer'], {
		addr: vuexGetters['common/env/apiTendermint']
	})
}

async function initQueryClient(vuexGetters) {
	return await queryClient({
		addr: vuexGetters['common/env/apiCosmos']
	})
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

function getStructure(template) {
	let structure = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field: any = {}
		field.name = key
		field.type = typeof value
		structure.fields.push(field)
	}
	return structure
}

const getDefaultState = () => {
	return {
				ModuleAccountBalance: {},
				Params: {},
				ClaimRecord: {},
				ClaimableForAction: {},
				TotalClaimable: {},
				
				_Structure: {
						ClaimRecord: getStructure(ClaimRecord.fromPartial({})),
						ClaimAuthorization: getStructure(ClaimAuthorization.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getModuleAccountBalance: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ModuleAccountBalance[JSON.stringify(params)] ?? {}
		},
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getClaimRecord: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ClaimRecord[JSON.stringify(params)] ?? {}
		},
				getClaimableForAction: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ClaimableForAction[JSON.stringify(params)] ?? {}
		},
				getTotalClaimable: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TotalClaimable[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: mun.claim.v1beta1 initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryModuleAccountBalance({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryModuleAccountBalance()).data
				
					
				commit('QUERY', { query: 'ModuleAccountBalance', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryModuleAccountBalance', payload: { options: { all }, params: {...key},query }})
				return getters['getModuleAccountBalance']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryModuleAccountBalance API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryClaimRecord({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryClaimRecord( key.address)).data
				
					
				commit('QUERY', { query: 'ClaimRecord', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryClaimRecord', payload: { options: { all }, params: {...key},query }})
				return getters['getClaimRecord']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryClaimRecord API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryClaimableForAction({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryClaimableForAction( key.address,  key.action)).data
				
					
				commit('QUERY', { query: 'ClaimableForAction', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryClaimableForAction', payload: { options: { all }, params: {...key},query }})
				return getters['getClaimableForAction']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryClaimableForAction API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTotalClaimable({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryTotalClaimable( key.address)).data
				
					
				commit('QUERY', { query: 'TotalClaimable', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTotalClaimable', payload: { options: { all }, params: {...key},query }})
				return getters['getTotalClaimable']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTotalClaimable API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgInitialClaim({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgInitialClaim(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgInitialClaim:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgInitialClaim:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgClaimFor({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgClaimFor(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgClaimFor:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgClaimFor:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgInitialClaim({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgInitialClaim(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgInitialClaim:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgInitialClaim:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgClaimFor({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgClaimFor(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgClaimFor:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgClaimFor:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
