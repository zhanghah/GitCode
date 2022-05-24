import http from './http';

export default {
	// 公示信息首页展示
	homePublicity(params) {
		return http.get('/industryCommitteeAppApi/publicInformation/homepageShow', {params});
	},
	// 公示信息列表
	getPublicity(data) {
		return http.post('/industryCommitteeAppApi/publicInformation/publicInfoShow', data);
	},
	// 公示信息详情
	publicityDetails(params) {
		return http.get('/industryCommitteeAppApi/publicInformation/publicInfoShowParticulars', {params});
	},
	// 公示类型
	publicTypeName(params) {
		return http.get('/industryCommitteeAppApi/publicInformation/publicTypeName', {params});
	},
	// 议事公示信息列表
	getPublicityDis(data) {
		return http.post('/industryCommitteeAppApi/publicInformation/discussOfficialBusiness', data);
	},
	// 议事公示信息详情
	publicityDetailsDis(params) {
		return http.get('/industryCommitteeAppApi/publicInformation/discussOfficialBusinessInfo', {params});
	},
	
	// 大会申请创建
	meetingAdd(data) {
		return http.post('/industryCommitteeAppApi/propMeeting/add', data);
	},
	// 大会申请分页列表
	getMeetingPage(data) {
		return http.post('/industryCommitteeAppApi/propMeeting/getPage', data);
	},
	// 大会申请详情
	meetingDetails(data) {
		return http.post(`/industryCommitteeAppApi/propMeeting/getDetails?id=${data.id}`);
	},
	// 大会申请主页展示
	meetingHome(params) {
		return http.get('/industryCommitteeAppApi/propMeeting/homepageDisplay', {params});
	},
	// 楼栋列表
	getBuildList(data) {
		return http.post('/industryCommitteeAppApi/propMeeting/getBuildList', data);
	},
	// 投票
	addVote(data) {
		return http.post('/industryCommitteeAppApi/propMeeting/vote', data);
	},
	
	// 线上业主大会列表
	getAssemblyVoteList(data) {
		return http.post('/industryCommitteeAppApi/assemblyVoteApp/getAssemblyVoteList', data);
	},
	// 线上业主大会投票
	lineVote(data) {
		return http.post('/industryCommitteeAppApi/assemblyVoteApp/getDetails', data);
	},
	// 线上业主大会详情
	getVoteDetail(data) {
		return http.post(`/industryCommitteeAppApi/assemblyVoteApp/getVoteDetail?id=${data.id}`);
	},
	
	// 大修基金分页列表
	getFund(data) {
		return http.post('/industryCommitteeAppApi/overhaulFundApp/getPage', data);
	},
	// 大修基金详情
	getFundDetails(data) {
		return http.post(`/industryCommitteeAppApi/overhaulFundApp/getDetails?id=${data.id}`);
	},
	
	// 物业建议分页列表
	getPropose(data) {
		return http.post('/industryCommitteeAppApi/proposal/getPage', data);
	},
	// 提交物业建议
	addPropose(data) {
		return http.post('/industryCommitteeAppApi/proposal/add', data);
	},
	// 提交物业详情
	proposeDetails(data) {
		return http.post(`/industryCommitteeAppApi/proposal/getProposalVO?id=${data.id}`);
	},
	
	// 通知公告分页列表
	getNotice(params) {
		return http.get('/industryCommitteeAppApi/noticeApp/getPage', {params});
	},
	// 通知公告首页轮播
	noticeList(data) {
		return http.post('/industryCommitteeAppApi/noticeApp/getList', data);
	},
	// 通知公告详情
	noticeDetails(params) {
		return http.get('/industryCommitteeAppApi/noticeApp/getInfo', {params});
	},
};
