import http from './http';

export default {
  /**
   * 获取小区列表
   *
   * @param {*} data
   * @returns
   */
  getList(params) {
    return http.get('/ownerServicePlatformAppApi/community/getPage', { params });
  },
  
  /**
   * 默认小区
   *
   * @param {*} data
   * @returns
   */
  defaultResidentialQuarters(data) {
    return http.put('/platform-public-api/owner/user/defaultResidentialQuarters',data);
  },
  
  /**
   * 获取小区公告
   *
   * @param {*} data
   * @returns
   */
  getPage(params) {
    return http.get('/propertyAppApi/communityNotice/getPage', { params });
  },
  /**
   * 获取小区公告详情
   *
   * @param {*} data
   * @returns
   */
  getPageDetail(params) {
    return http.get('/propertyAppApi/communityNotice/getInfo', { params });
  },
  
  /**
   * 获取小区监控底图
   *
   * @param {*} data
   * @returns
   */
  getMonitorMap(params) {
    return http.get('/propertyAppApi/monitorMapCommunity/getInfo', { params });
  },
  
  
  /**
    * 上传人员轨迹信息
    *
    * @param {*} data
    * @returns
    */
  trajectoryAdd(data) {
     return http.post('/propertyAppApi/monitorFace/add', data);
   },
   
   /**
     * 获取上传人员轨迹信息
     *
     * @param {*} data
     * @returnsT
     */
  getTrajectory(params) {
      return http.get('/propertyAppApi/monitorFace/getPage', {params});
    },
	
	/**
	   * 删除上传人员轨迹信息
	   *
	   * @param {*} data
	   * @returnsT
	   */
	deleteTrajectory(data) {
	    return http.post('/propertyAppApi/monitorFace/delete', data);
	  },
	  
	  /**
	     * 修改上传人员轨迹信息
	     *
	     * @param {*} data
	     * @returnsT
	     */
	  updateTrajectory(data) {
	      return http.post('/propertyAppApi/monitorFace/update', data);
	    },
};
