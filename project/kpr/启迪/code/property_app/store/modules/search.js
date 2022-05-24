//备注:这里对应的是特约 租房服务-搜索的存放
export default {
  namespaced: true,
  state:{
	  //固定排序选择
	  className:0,
	  //固定区域选择
	  areaName:"区域",
	  //以下为筛选接口所需参数 可一一对应
	  cityId:"",
	  houseTypeId:"",
	  price:"",
	  area:"",
	  roomType:"",
	  sortType:"",
	  searchComId:"",
	  cityCode:"",
	  countyCode:"",
	  streetCode:"",
	  //特约服务商城首页历史记录搜索
	  mallhistori:[],
	  //新房二手房等等,历史搜索
	  historischList:[],
	  //搜索框内容
	  searchBoxData:""
	  
  },

  mutations: {
	  searchBoxDatas: (state,data)=>{
	  	state.searchBoxData=data
	  },
	  mallHistori: (state,data)=>{
	  	state.mallhistori=data
	  },
	 historischLists: (state,data)=>{
	 	state.historischList=data
	 },
	  CITY_CODE: (state,data)=>{
	  	state.cityCode=data
	  },
	  COUNTY_CODE: (state,data)=>{
	  	state.countyCode=data
	  },
	  STREET_CODE: (state,data)=>{
	  	state.streetCode=data
	  },
	  searchComIds: (state,data)=>{
	  	state.searchComId=data
	  },
	  SORT_TYPE: (state,data)=>{
	  	state.sortType=data
	  },
	  CLASS_NAME: (state,data)=>{
	  	state.className=data
	  },
	  upAreaName: (state,data)=>{
	  	state.areaName=data
	  },
	  ROOM_TYPE: (state,data)=>{
	  	state.roomType=data
	  },
	 AREA: (state,data)=>{
	 	state.area=data
	 },
	 PRICE: (state,data)=>{
	 	state.price=data
	 },
	getCityId: (state,data)=>{
		state.cityId=data
	},
	HOUSE_TYPE: (state,data)=>{
		state.houseTypeId=data
	},
  },

  actions: {
  },

  getters: {
  },
};
