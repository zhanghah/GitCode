import http from './http';

export default {
  /**
   * 获取广告列表
   *
   * @param {*} data
   * @returns
   */
  getPage(params){
	  return http.get('/lifeServiceAppApi/convenience/getPage', { params });
  },
  
  // 发现活动推荐
  getMainPage(params){
	  return http.get('/ownerServicePlatformAppApi/index/getMainPage', { params });
  },
// 便民信息配套分类列表
  getPageMatching(params) {
    return http.get('/lifeServiceAppApi/convenience/getPageMatching', { params });
  },
  // 便民信息
  convenience(params) {
    return http.get('/lifeServiceAppApi/convenience/getPage', { params });
  },
  //便民信息详情
  DetailInfo(params) {
	  return http.post('/lifeServiceAppApi/convenience/getInfo', { params });
  },
  //生活服务-发现-首页
  // lifeHomePgae(params){
	 //  return http.get('/lifeServiceAppApi/homePage/getHomePage', { params });
  // },
  //投票活动
  votingActivity(params){
	  return http.get('/lifeServiceAppApi/activityZone/getPage', { params });
  },
  //投票提交
  
  voSubmit(datas){
  	  return http.post('/lifeServiceAppApi/activityZone/addVot', datas);
  },
  //美居报名
  addSign(data){
  	  return http.post('/lifeServiceAppApi/activityZone/addVoting',  data );
  },
  //活动详情
  ActivityDetail(params){
  	  return http.post('/lifeServiceAppApi/activityZone/getInfo', { params });
  },
  //社区新闻
  community(params){
  	  return http.post('/lifeServiceAppApi/news/getPage', { params });
  },
  // 社区分类
    getNewsByTitle(params){
  	  return http.get('/lifeServiceAppApi/news/getNewsByTitle', { params });
  },
  // 社区新闻详情
    getNewsGetInfo(params){
  	  return http.post('/lifeServiceAppApi/news/getInfo', { params });
  },
  
};
