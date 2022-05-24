import http from './http';

export default {
	/**
	 * 根据父级code或区划等级获取行政区划
	 *
	 * @param {*} data
	 * @returns
	 */
	getBm(params) {
		return http.get('/resourceApi/resource/getBm', {
			params
		});
	},

	/**
	 * 图片上传
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	uploadImg(params) {
		return http.post('/resourceApi/fileUpload/upload',{
			params
		});
	},
	
	//获取户型所有数据--委托出租
	getHouseTypeList(params) {
		return http.get('/resourceApi/resource/getHouseTypeList',{
			params
		});
	},
};
