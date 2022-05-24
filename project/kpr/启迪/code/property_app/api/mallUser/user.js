// 引入工具类
import request from './request.js'
import uniPopup from './popup.js'
import api from './api.js'

export default {
	/**
	 * 用户账号加id登录
	 * @module 	用户账号加id登录
	 */
	usernameAndId(data) {
		uniPopup.showLoading('加载中')
		return new Promise((resolve, reject) => {
			request.axios('POST', '/user/login/usernameAndId', data)
				.then((res) => {
					if (res.code == 'success') {
						api.setStorage('0', res.data).then((ress) => {
							uniPopup.hideLoading()
							resolve(res.data)
						})
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	
	/**
	 * 查询用户收货地址列表
	 */
	sysUserReceivingAddress_list(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/sysUserReceivingAddress/list', data)
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
	 * 保存用户收货地址
	 * @param {Object} data
	 */
	sysUserReceivingAddress(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/sysUserReceivingAddress', data)
				.then((res) => {
					if (res.code == 'success') {
						uniPopup.hideLoading(2000, '添加成功')
						resolve(res.data)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	
	/**
	 * 查询用户收货地址
	 * @param {Object} data
	 */
	sysUserReceivingAddress_id(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/sysUserReceivingAddress/'+data.id, data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res.data)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	
	/**
	 * 修改用户收货地址
	 * @param {Object} data
	 */
	sysUserReceivingAddress_put(data) {
		return new Promise((resolve, reject) => {
			request.axios('PUT', '/sysUserReceivingAddress',data)
				.then((res) => {
					if (res.code == 'success') {
						uniPopup.hideLoading(2000, '修改成功')
						resolve(res.data)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
}
