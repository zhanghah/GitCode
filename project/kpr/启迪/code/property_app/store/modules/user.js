/**
 * 用户相关状态
 */
const cacheKey = 'app_cache_user';

const cacheData = uni.getStorageSync(cacheKey);

export default {
	namespaced: true,

	state: Object.assign({
		userId: '',
		comId: '',
		userType: '',
		phone: '',
		userName: '',
		nickName: '',
		sex: '',
		enable: '',
		token: '',
		headPortrait:'',
		birthday:'',
		progressShow:false,//个人中心报事记录进度弹窗
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
		PROGRESS_SHOW: (state, data) => {
			state.progressShow = data
		},
	},

	actions: {},

	getters: {},
};
