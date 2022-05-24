
export default {
  namespaced: true,
  state:{
    popup:false,
	commentShow:false,
  },

  mutations: {
	POPUP: (state, data) => {
	  state.popup = data
	},
	COMMENT_SHOW: (state, data) => {
	  state.commentShow = data
	},
  },

  actions: {
  },

  getters: {
  },
};
