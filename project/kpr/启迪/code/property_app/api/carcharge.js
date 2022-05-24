import http from './http';

export default {
	
  /**
   * 临停车辆查询缴费
   *
   * @param {*} data
   * @returns
   */
  getCarPay(params) {
    return http.post('/propertyAppApi/carCharge/pay', { params });
  },
  
  /**
   * 停车缴费记录查询
   *
   * @param {*} data
   * @returns
   */
  getPage(params) {
    return http.get('/propertyAppApi/carCharge/getPage', { params });
  },
  

};
