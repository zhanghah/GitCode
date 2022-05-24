/**
 * 用户相关状态
 */
import api from '@/api';
const cacheKey = 'app_cache_user';

const cacheData = uni.getStorageSync(cacheKey);

export default {
	namespaced: true,

	state: Object.assign({
		id: '',
		phone: '',
		nickName: '',
		headPortrait: '',
		propertyId: '',
		comId: '',
		sex: '',
		userName: '',
		token: '',
		employeeId:'',
		positionName:'',
		departName:'',
		communityList: [],
	}, cacheData || {}),

	mutations: {
		UPDATE_USER: (state, data) => {
			const stateKeys = Object.keys(state);
			Object.keys(data).forEach((key) => {
				if (stateKeys.includes(key)) {
					state[key] = data[key];
				}
			});

			uni.setStorage({
				key: cacheKey,
				data: state,
			});
		},
		CLEAR_USER: (state) => {
			const stateKeys = Object.keys(state);
			stateKeys.forEach((key) => {
				state[key] = '';
			});

			uni.removeStorage({
				key: cacheKey,
			});
		},
		SET_COMMUNITY:(state,data)=>{
			state.communityList=data
			state.comId=data[0].id,
			uni.setStorageSync('app_cache_user',state)
		},
		UPDATE_COMMUNITY:(state,data)=>{
			state.comId=data
		}
	},

	actions: {
		// 获取小区
		async setCommunity({
			commit,
			dispatch
		}) {
			try {
				const res = await api.inform.informVillage();
				// 更新列表
				commit('SET_COMMUNITY', res.data);
			} catch (error) {
				// 获取失败
				return null;
			}
		},
	},

	getters: {},
};
