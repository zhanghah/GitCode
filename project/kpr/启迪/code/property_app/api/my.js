import http from './http';

export default {
	
	/**
	 * 报事报修-分页
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyEventList(data) {
		return http.post('/em-public-api/public/woEvent/myEventList', data);
	},

	/**
	 * 报事报修-详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMaintainInfo(params) {
		return http.get(`/em-public-api/public/woEvent/getWoEvent/${params.id}`);
	},

	/**
	 * 报事报修-进度
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMaintainRecord(params) {
		return http.get('/propertyAppApi/maintain/getRecord', {
			params
		});
	},

	/**
	 * 报事报修-栏目
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getCount(data) {
		return http.post('/em-public-api/public/woEventStats/getEventByTypeId', data);
	},
	
	/**
	 * 报事报修-评价
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	woEventResultOwnerEvaluate(data) {
		return http.post('/em-public-api/public/woEvent/woEventResultOwnerEvaluate', data);
	},

	/**
	 * 投诉建议-栏目
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getComplaintCount(params) {
		return http.get('/ownerServicePlatformAppApi/complaint/getCount', {
			params
		});
	},
	/**
	 * 投诉建议-分页列表
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getComplaintPage(params) {
		return http.get('/ownerServicePlatformAppApi/complaint/getPage', {
			params
		});
	},

	/**
	 * 投诉建议-详情
	 * lrs
	 * @param {*} data  
	 * @returns
	 */
	getComplaintInfo(params) {
		return http.get('/ownerServicePlatformAppApi/complaint/getInfo', {
			params
		});
	},

	/**
	 * 我的住房分页列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyHousingPages(params) {
		return http.get('/ownerServicePlatformAppApi/proprietor/getPage', {
			params
		});
	},
	
	/**
	 * 成员列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMemberList(params) {
		return http.get('/ownerServicePlatformAppApi/proprietor/getMemberList', {
			params
		});
	},
	
	/**
	 * 房屋信息
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getHomeInfo(params) {
		return http.get('/ownerServicePlatformAppApi/room/getInfo', {
			params
		});
	},

	/**
	 * 楼栋列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyBuildingPages(params) {
		return http.get('/ownerServicePlatformAppApi/building/getPage', {
			params
		});
	},

	/**
	 * 单元列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyUnitPages(params) {
		return http.get('/ownerServicePlatformAppApi/unit/getPage', {
			params
		});
	},

	/**
	 * 楼层列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyFloorPages(params) {
		return http.get('/ownerServicePlatformAppApi/floor/getPage', {
			params
		});
	},

	/**
	 * 住房列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyRoomPages(params) {
		return http.get('/ownerServicePlatformAppApi/room/getPage', {
			params
		});
	},

	/**
	 * 用户绑定房屋
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	bindRoom(data) {
		return http.post('/em-public-api/saveOwnerBindingHouse', data);
	},

	/**
	 * 根据用户ID获取物业缴费账单
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getPageCharge(params) {
		return http.get('/propertyAppApi/propertyCharge/getPageCharge', {
			params
		});
	},

	/**
	 * 我的活动
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyActivity(params) {
		return http.get('/lifeServiceAppApi/myActivityController/getPage', {
			params
		});
	},

	/**
	 * 活动详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyActivityXq(params) {
		return http.post('/lifeServiceAppApi/myActivityController/getInfo', {
			params
		});
	},

	/**
	 * 修改、审核成员
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	updateProprietor(data) {
		return http.post('/propertyAppApi/user/updateProprietor', data);
	},

	/**
	 * 删除成员
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	delProprietor(params) {
		return http.post('/propertyAppApi/user/delProprietor', {
			params
		});
	},

	/**
	 * 信息
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getInfo(params) {
		return http.get('/ownerServicePlatformAppApi/room/getInfo', {
			params
		});
	},

	/**
	 * 修改个人信息
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	userInfoUpdate(data) {
		return http.post('/ownerServicePlatformAppApi/proprietor/updateUserInfo', data);
	},
	
	/**
	 * 修改个人信息
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	updatePwd(data) {
		return http.post('/platform-public-api/owner/user/updatePwd', data);
	},

	/**
	 * 发送短信验证码
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	sendPhoneCode(params) {
		return http.get('/propertyAppApi/public/sendPhoneCode', {
			params
		});
	},

	/**
	 * 修改手机号
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	updatePhone(data) {
		return http.post('/propertyAppApi/user/updatePhone', data);
	},

	/**
	 * 设置下意见反馈
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	feedback(data) {
		return http.post('/ownerServicePlatformAppApi/opinion/add', data);
	},

	/**
	 * 关于我们接口
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getOne(params) {
		return http.get('/ownerServicePlatformAppApi/aboutUs/getOne', {
			params
		});
	},

	/**
	 * 人脸列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getFaceList(params) {
		return http.post('/propertyAppApi/face/getList', {
			params
		});
	},

	/**
	 * 创建人脸
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getFaceAdd(data) {
		return http.post('/propertyAppApi/face/add', data);
	},

	/**
	 * 消息未读数量接口
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	unreadCount(params) {
		return http.get('/ownerServicePlatformAppApi/message/unreadCount', {
			params
		});
	},

	/**
	 * 消息分页列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMessage(params) {
		return http.get('/ownerServicePlatformAppApi/message/getPage', {
			params
		});
	},

	/**
	 * 发票申请分页列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getInvoicePage(params) {
		return http.get('/propertyAppApi/receipt/getPage', {
			params
		});
	},

	/**
	 * 创建发票申请
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	addApply(data) {
		return http.post('/propertyAppApi/receipt/addApply', data);
	},

	/**
	 * 发票申请详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getInvoiceInfo(params) {
		return http.get('/propertyAppApi/receipt/getInfo', {
			params
		});
	},

	/**
	 * 根据用户ID获取缴费账单所有列表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getListCharge(params) {
		return http.get('/propertyAppApi/propertyCharge/getListCharge', {
			params
		});
	},

	/**
	 * 停车缴费记录
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	GetCarInfo(params) {
		return http.get('/propertyAppApi/paymentRecords/GetCarInfo', {
			params
		});
	},

	/**
	 * 委托出租/出售
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getEntrustCz(data) {
		return http.post('/diversificationAppApi/rentSaleInfoUser/getPage', data);
	},

	/**
	 * 取消委托出租/出售
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getCzCancel(data) {
		return http.post('/diversificationAppApi/rentSaleInfoUser/cancel', data);
	},

	/**
	 * 委托买房/租房
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getEntrustMf(data) {
		return http.post('/diversificationAppApi/rentSaleInfoUserNeed/getPage', data);
	},

	/**
	 * 取消委托买房/租房
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMfCancel(data) {
		return http.post('/diversificationAppApi/rentSaleInfoUserNeed/cancel', data);
	},
	
	/**
	 * 收藏买房/租房
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getCollectionSale(data) {
		return http.post('/diversificationAppApi/rentSaleInfo/getPage', data);
	},
	
	/**
	 * 我的活动
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMyActivity(params) {
		return http.get('/ownerServicePlatformAppApi/myActivityController/getPage', {params});
	},
	
	/**
	 * 装修申请记录
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	decorationRecord(data) {
		return http.post('/ownerServicePlatformAppApi/personalCenter/decorationRecord', data);
	},
	
	/**
	 * 装修申请记录详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	decorationDetail(params) {
		return http.get('/ownerServicePlatformAppApi/personalCenter/decorationDetail', {params});
	},
	
	/**
	 * 通水通电记录
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	waterAndElectricityRecord(data) {
		return http.post(`/ownerServicePlatformAppApi/personalCenter/waterAndElectricityRecord?applicationType=${data.applicationType}`, data);
	},
	
	/**
	 * 通水通电记录详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	waterAndElectricityDetail(params) {
		return http.get('/ownerServicePlatformAppApi/personalCenter/waterAndElectricityDetail', {params});
	},
	
	/**
	 * 场馆申请记录
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	venueRecord(data) {
		return http.post('/ownerServicePlatformAppApi/personalCenter/venueRecord', data);
	},
	
	/**
	 * 场馆申请记录详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	venueDetail(params) {
		return http.get('/ownerServicePlatformAppApi/personalCenter/venueDetail', {params});
	},
	
	/**
	 * 房屋管家信息
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getHousekeeperInfo(params) {
		return http.get('/ownerServicePlatformAppApi/housekeeper/getInfo', {params});
	},
	
	/**
	 * 管家留言详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMessageInfo(data) {
		return http.post(`/ownerServicePlatformAppApi/houseKeeperMessageBoard/page?roomId=${data.roomId}&size=${data.size}&current=${data.current}`, data);
	},
	
	/**
	 * 管家留言添加
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getMessageAdd(data) {
		return http.post('/ownerServicePlatformAppApi/houseKeeperMessageBoard/add', data);
	},
	/**
	 * 保存用户积分明细
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	savePoints(data) {
		return http.post('/platform-public-api/userPointsDetailed/save', data);
	},
	/**
	 * 查询用户积分
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getUserPoints(params) {
		return http.get(`/platform-public-api/userPoints/myPoints/${params.phoneNumber}`);
	},
	/**
	 * 查询用户积分明细表
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getPointsList(data) {
		return http.post('/platform-public-api/userPointsDetailed/list', data);
	},
	/**
	 * 查询用户积分明细表详情
	 * lrs
	 * @param {*} data
	 * @returns
	 */
	getPointsInfo(params) {
		return http.get(`/platform-public-api/userPointsDetailed/findById/${params.id}`);
	},
};
