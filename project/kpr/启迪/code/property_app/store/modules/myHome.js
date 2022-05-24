
export default {
  namespaced: true,
  state:{
    comMsg:{},//小区信息
	buildingMsg:{},//楼栋信息
	unitMsg:{},//单元信息
	floorMsg:{},//楼层信息
	RoomMsg:{},//房号信息
	HouseMsg:{},//房屋信息
  },

  mutations: {
	COM_MSG: (state, data) => {
	  state.comMsg = data
	},
	BUILDING_MSG: (state, data) => {
	  state.buildingMsg = data
	},
	UNIT_MSG: (state, data) => {
	  state.unitMsg = data
	},
	FLOOR_MSG: (state, data) => {
	  state.floorMsg = data
	},
	ROOM_MSG: (state, data) => {
	  state.RoomMsg = data
	},
	HOUSE_MSG: (state, data) => {
	  state.HouseMsg = data
	},
  },

  actions: {
  },

  getters: {
  },
};
