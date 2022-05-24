import http from './http';

export default {
  /**
   * 用户登录（密码）
   *
   * @param {*} data
   * @returns
   */
  login(params) {
    return http.get('/systemApi/public/loginStreetCommunityApp', {params});
  },
  /**
   * 修改个人信息及密码
   *
   * @param {*} data
   * @returns
   */
  updateUserInfo(data) {
    return http.post('/governmentAffairsAppApi/officeWorker/updateUserInfo', data);
  },
};
