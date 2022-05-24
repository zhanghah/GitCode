import http from './http';

export default {
	
  /**
   * 获取投诉建议投诉类型,投诉部门
   *
   * @param {*} data
   * @returns
   */
  getResources(params) {
    return http.get('/ownerServicePlatformAppApi/complaint/getResources', { params });
  },
  /**
   * 提交投诉建议
   *
   * @param {*} data
   * @returns
   */
  addSuggest(data) {
    return http.post('/ownerServicePlatformAppApi/complaint/add', data);
  },

};
