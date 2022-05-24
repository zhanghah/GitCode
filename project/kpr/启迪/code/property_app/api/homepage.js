import http from './http';

export default {
	
	/**
	 * 首页广告数据获取
	 *
	 * @param {*} data
	 * @returns
	 */
	getHomeAd(params) {
	  return http.get('/ownerServicePlatformAppApi/ad/getPage', { params });
	},
	
  /**
   * 首页公告数据获取
   *
   * @param {*} data
   * @returns
   */
  getCommunityNotice(params) {
    return http.get('/ownerServicePlatformAppApi/communityNotice/getPage', { params });
  },
  
  /**
   * 首页小区交流活动数据获取
   *
   * @param {*} data
   * @returns
   */
  getHomePage(params) {
    return http.get('/ownerServicePlatformAppApi/index/getHomePage', { params });
  },
  
  /**
   * 首页小区交流活动数据获取(分页列表)
   *
   * @param {*} data
   * @returns
   */
  getActivityZonePage(params) {
    return http.get('/ownerServicePlatformAppApi/activityZone/getPage', { params });
  },
  
  /**
   * 首页小区交流活动数据获取(活动详情)
   *
   * @param {*} data
   * @returns
   */
  getActivityZoneInfo(data) {
    return http.post(`/ownerServicePlatformAppApi/activityZone/getInfo?id=${data.id}&type=${data.type}`, data);
  },
  
  /**
   * 首页小区交流活动数据获取(活动报名)
   *
   * @param {*} data
   * @returns
   */
  postAddVoting(data) {
    return http.post('/ownerServicePlatformAppApi/activityZone/addVoting', data);
  },
  
  /**
   * 首页小区交流活动数据获取(互动投票)
   *
   * @param {*} data
   * @returns
   */
  postAddVot(data) {
    return http.post('/ownerServicePlatformAppApi/activityZone/addVot', data);
  },
  
  //社区公告详情
  getNoticeInfo(params){
	  return http.get('/ownerServicePlatformAppApi/communityNotice/getInfo', { params });
  },
  /**
   * 发现页数据获取
   *
   * @param {*} data
   * @returns
   */
  getDiscovery(params) {
    return http.get('/propertyAppApi/homePage/getDiscovery', { params });
  },
  /**
   * 特约服务数据获取
   *
   * @param {*} data
   * @returns
   */
  getSpecialService(params) {
    return http.get('/propertyAppApi/homePage/getSpecialService', { params });
  },
  /**
   * 获取更多功能模块数据
   *
   * @param {*} data
   * @returns
   */
  getMore(params) {
    return http.get('/propertyAppApi/homePage/getMore', { params });
  },
  
  //住房缴费_物业缴费
  getPayment(params){
  	  return http.get('/propertyAppApi/user/getPage', { params });
  },
  //房间号查询预付款
  getPreFee(params){
  	  return http.get('/propertyAppApi/propertyCharge/getPreFee', { params });
  },
  //根据住房ID获取未缴账单所有列表
  noPay(params){
  	  return http.get('/propertyAppApi/propertyCharge/getList', { params });
  },
  //预缴费
  payChongzhi(params){
  	  return http.post('/propertyAppApi/propertyCharge/paypre', { params });
  },
  //预缴账单
  readyPay(params){
  	  return http.get('/propertyAppApi/propertyCharge/getListPre', { params });
  },
  
  
  
  
  
};
