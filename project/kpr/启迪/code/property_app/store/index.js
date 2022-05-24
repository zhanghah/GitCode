import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config';
import user from './modules/user';
import circlePopState from './modules/circlePopState';
import myHome from './modules/myHome';
import search from './modules/search';
search

Vue.use(Vuex)

const communitCacheKey = 'app_cache_community';

const communityData = uni.getStorageSync(communitCacheKey);

const store = new Vuex.Store({
	plugins: [
	],
	state: {
		...config,
		// 当前选中小区信息
		community: Object.assign({
			address: '',
			id:'',
			location: '',
			name: '',
			phone: '',
			vid: '',
			vname: '',
		}, communityData || {}),
	},
	mutations: {
		UPDATE_CURRENT_COMMUNITY: (state, data) => {
			const stateKeys = Object.keys(state.community);

			Object.keys(data).forEach((key) => {
				if (stateKeys.includes(key)) {
					state.community[key] = data[key];
				}
			});
			uni.setStorage({
				key: communitCacheKey,
				data: state.community,
			});
		},
		CLEAR_COMMUNITY_CACHE: (state, data) => {
			const stateKeys = Object.keys(state.community);
			stateKeys.forEach((key) => {
				state.community[key] = '';
			});

			uni.removeStorage({
				key: communitCacheKey,
			});
		}
	},
	getters:{
	},
	actions: {
	},
	modules: {
		user,
		circlePopState,
		myHome,
		search
	}
})

export default store
