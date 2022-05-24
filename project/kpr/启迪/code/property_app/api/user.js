import http from './http';

export default {
  /**
   * 用户登录（密码）
   *
   * @param {*} data
   * @returns
   */
  login(params) {
    return http.get('/systemApi/public/loginAppBySecton', { params });
  },
  /**
   * 用户登录（验证码）
   *
   * @param {*} data
   * @returns
   */
  loginByCode(params) {
    return http.get('/propertyAppApi/public/loginByCode', { params });
  },
  /**
   * 发送短信验证码
   *
   * @param {*} data
   * @returns
   */
  sendCode(params) {
    return http.get('/systemApi/sms/sendMessage', { params });
  },
  /**
   * 注册时验证码
   *
   * @param {*} data
   * @returns
   */
  checkedCode(params) {
    return http.get('/systemApi/sms/charmCode', { params });
  },
  /**
   * 找回密码
   *
   * @param {*} data
   * @returns
   */
  retrievePwd(params) {
    return http.post('/propertyAppApi/public/retrievePwd', { params });
  },
  
  /**
   * 注册
   *
   * @param {*} data
   * @returns
   */
  registerVoucher(data) {
    return http.post('/platform-public-api/owner/user/registerVoucher', data);
  },
  
 
};
