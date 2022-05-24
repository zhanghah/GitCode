import http from './http';

export default {
	
  /**
   * 获取报事报修父级类型
   *
   * @param {*} data
   * @returns
   */
  getMaintainType(params) {
    return http.get('/em-public-api/public/woEventStats/findParentEventType', { params });
  },
  
  /**
   * 提交报事报修
   *
   * @param {*} data
   * @returns
   */
  getSaveRepair(data) {
    return http.post('/em-public-api/public/woEvent/save', data);
  },
  
  /**
   * 获取报事报修子级类型
   *
   * @param {*} data
   * @returns
   */
  getChildrenType(params) {
    return http.get('/em-public-api/public/woEventStats/getChildrenByParentId', { params });
  },
  
  /**
   * 提交投诉建议
   *
   * @param {*} data
   * @returns
   */
  addMaintain(data) {
    return http.post('/propertyAppApi/maintain/add', data);
  },

};
