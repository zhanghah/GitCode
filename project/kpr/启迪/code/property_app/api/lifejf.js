import http from './http';

export default {
	
	/**
	 * 根据住房ID获取未缴账单所有列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	postWyfList(data) {
		return http.post('/em-public-api/checkoutCounter/owner/findChargeBill', data);
	},
	
	/**
	 * 根据住房ID获取预缴费余额
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getPreFee(params) {
		return http.get('/propertyAppApi/propertyCharge/getPreFee', {
			params
		});
	},
	
	/**
	 * 根据住房ID获取计费科目所有列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getListFeeItem(params) {
		return http.get('/propertyAppApi/propertyCharge/getListFeeItem', {
			params
		});
	},
	
	/**
	 * 预缴费
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	paypre(data) {
		return http.post('/propertyAppApi/propertyCharge/paypre', data );
	},
	
	/**
	 * 根据住房ID获取预缴账单所有列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getListPre(params) {
		return http.get('/propertyAppApi/propertyCharge/getListPre', {
			params
		});
	},
	
	/**
	 * 获取缴费方式
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getPayType(params) {
		return http.get('/propertyAppApi/propertyCharge/getPayType', {
			params
		});
	},
	
	/**
	 * 获取支付信息
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getPayMsg(data) {
		return http.post('/propertyAppApi/pay/getPayMsg', data );
	},
	
	/**
	 * 未缴账单缴费
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getPay(data) {
		return http.post('/propertyAppApi/propertyCharge/pay', data );
	},
	
	/*************特约服务-招商中心******************/
	/**
	 * 招商分页
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getZsPage(params) {
		return http.post('/diversificationAppApi/adMerchantsType/getPage',{
			params
		});
	},
	
	/**
	 * 查询电话
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getPhone(data) {
		return http.post('/diversificationAppApi/adMerchantsPhone/getPhone', data );
	},
	
	/**
	 * 招商分页-详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getInfo(params) {
		return http.get('/diversificationAppApi/adMerchantsType/getInfo', {
			params
		});
	},
	
	/**
	 * 园区列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getParkList(data) {
		return http.post('/diversificationAppApi/adMerchantsPark/getList', data );
	},
	
	/**
	 * 地址列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getAddressList(params) {
		return http.get('/diversificationAppApi/adMerchantsAddress/getList', {
			params
		});
	},
	
	/**
	 * 添加智慧健康
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	addHealth(data) {
		return http.post('/lifeServiceAppApi/healthRecords/add', data );
	},
	
	/**
	 * 智慧健康详情
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getInfoByUserId(params) {
		return http.get('/lifeServiceAppApi/healthRecords/getInfoByUserId', {params} );
	},
	
	/**
	 * 创建出门条
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	addGoOutQrCode(data) {
		return http.post('/deviceApi/goOutQrCode/add', data );
	},
	
	/**
	 * 创建访客通行证
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	addGoInQrCode(data) {
		return http.post('/deviceApi/goInQrCode/add', data );
	},
};
