import http from './http';

export default {
	/**
	 * 服务电话
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getPropertyPhone(params) {
		return http.get('/ownerServicePlatformAppApi/propertyPhone/getList', {params});
	},
	
	/**
	 * 装修申请
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	postDecorationAdd(data) {
		return http.post('/ownerServicePlatformAppApi/decorationApplication/add', data);
	},
	
	
	/**
	 * 装修流程
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getDecorationProcess(params) {
		return http.get('/ownerServicePlatformAppApi/decorationApplication/getProcess', {params});
	},
	
	/**
	 * 场馆分页列表
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getVenuePage(data) {
		return http.post('/ownerServicePlatformAppApi/venue/page', data);
	},
	
	/**
	 * 场馆管理详情
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getAllById(params) {
		return http.get('/ownerServicePlatformAppApi/venue/getAllById', {params});
	},
	
	/**
	 * 场馆预定
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	postVenueReserve(data) {
		return http.post('/ownerServicePlatformAppApi/venue/reserve', data);
	},
	
	/**
	 * 场馆预定
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	postWaterAdd(data) {
		return http.post('/ownerServicePlatformAppApi/waterAndElectricityApplication/add', data);
	},
};
