import http from './http';

export default {
  // 信息发布首页展示
  getHomePage(params) {
    return http.get('/governmentAffairsAppApi/informationDelivery/getHomePage', {params});
  },
  // 信息发布列表
  getHomePageSeeMore(params) {
    return http.get('/governmentAffairsAppApi/informationDelivery/getHomePageSeeMore', { params });
  },
  // 信息发布详情
  informationDetails(params) {
    return http.get('/governmentAffairsAppApi/informationDelivery/informationDetails', { params });
  },
  // 信息发布 类型
  informType(params) {
    return http.get('/governmentAffairsAppApi/informationDelivery/informationTypeShowPull', { params });
  },
  // 信息发布 小区
  informVillage(params) {
    return http.get('/governmentAffairsAppApi/informationDelivery/getComIds', { params });
  },
  // 信息发布 小区
  addInform(data) {
    return http.post('/governmentAffairsAppApi/informationDelivery/informationDeliveryAdd', data);
  },
  // 读的情况
  getReadStatus(params) {
    return http.get('/governmentAffairsAppApi/informationDelivery/getReadStatus', { params });
  },
  // 实住人口
  getRealLive(params) {
    return http.get('/governmentAffairsAppApi/data/total', { params });
  },
  // 综治信息-实住人口
  getRealLiveList(params) {
    return http.get('/governmentAffairsAppApi/data/realLiveInfo', { params });
  },
  // 消防预警分页列表
  getAlarmTotalList(params) {
    return http.get('/governmentAffairsAppApi/data/alarmTotal', { params });
  },
  // 消防预警详情
  getAlarmDetail(params) {
    return http.get('/governmentAffairsAppApi/data/alarmInfo', { params });
  },
  // 数据统计-消防事件统计
  getFireDataTotal(params) {
    return http.get('/governmentAffairsAppApi/data/dataTotal', { params });
  },
  // 通过人名搜索
  realLiveInfoVo(params) {
    return http.get('/governmentAffairsAppApi/data/realLiveInfoVo', { params });
  },
  // 搜索历史
  realLiveInfoVoList(params) {
    return http.get('/governmentAffairsAppApi/data/realLiveInfoVoList', { params });
  },
};
