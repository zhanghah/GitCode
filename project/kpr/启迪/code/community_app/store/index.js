import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config';
import user from './modules/user';

Vue.use(Vuex)

const store = new Vuex.Store({
	plugins: [
	],
	state: {
		...config,
	},
	mutations: {
	},
	getters:{
	},
	actions: {
	},
	modules: {
		user,
	}
})

export default store
