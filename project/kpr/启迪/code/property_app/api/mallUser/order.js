// 引入工具类
import request from './request.js'
import uniPopup from './popup.js'
import api from './api.js'

export default {
	/**
	 * 保存订单
	 * @module 	保存订单
	 */
	mallOrder(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallOrder', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询订单列表
	 * @module 	查询订单列表
	 */
	mallOrder_list(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallOrder/list', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 修改订单
	 * @module 	修改订单
	 */
	mallOrder_PUT(data) {
		return new Promise((resolve, reject) => {
			request.axios('PUT', '/mallOrder', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询订单
	 * @module 	查询订单
	 */
	mallOrder_GET(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/mallOrder/'+data.id, data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 删除订单
	 * @module 	删除订单
	 */
	mallOrder_DELETE(data) {
		return new Promise((resolve, reject) => {
			request.axios('DELETE', '/mallOrder/'+data.id, data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	
	/**
	 * 保存订单支付记录
	 * @module 	
	 */
	mallOrderPay_ingjj(data) {
		uniPopup.showLoading('支付中')
		return new Promise((resolve, reject) => {
			request.axios('GET', '/mallOrderPay/pingjj/'+data.mainOrderId, data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						uniPopup.hideLoading(2000,'支付成功')
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 订单确认收货
	 * @module 	订单确认收货
	 */
	orderConfirmReceipt(data) {
		uniPopup.showLoading('加载中')
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallOrder/orderConfirmReceipt/'+data.mainOrderId, data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						uniPopup.hideLoading()
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	
	
	
	/**
	 * 创建商品评价
	 * @module 	创建商品评价
	 */
	saveEvaluate(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/goods/batchSaveEvaluate', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	
	
	
	/**
	 * 用户取消订单
	 * @module 	用户取消订单
	 */
	userCancellationOfOrder(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallOrder/userCancellationOfOrder/'+data.mainOrderId, data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	
	
	/**
	 * 保存订单申请退款记录
	 * @module 	保存订单申请退款记录
	 */
	mallOrderApplyRefund(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallOrderApplyRefund/save', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询订单申请退款记录列表
	 * @module 	查询订单申请退款记录列表
	 */
	mallOrderApplyRefund_list(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallOrderApplyRefund/list', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询订单申请退款记录
	 * @module 	查询订单申请退款记录
	 */
	mallOrderApplyRefund_orderId(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/mallOrderApplyRefund/'+data.orderId, data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 取消退款申请
	 * @module 	取消退款申请
	 */
	mallOrderApplyRefund_cancel(data) {
		return new Promise((resolve, reject) => {
			request.axios('PUT', '/mallOrderApplyRefund/cancel', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},

}
