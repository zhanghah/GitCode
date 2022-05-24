import http from './http';

export default {
  /**
   * 获取广告列表
   *
   * @param {*} data
   * @returns
   */
  getList(params) {
    return http.get('/propertyAppApi/ad/getList', { params });
  },
};
