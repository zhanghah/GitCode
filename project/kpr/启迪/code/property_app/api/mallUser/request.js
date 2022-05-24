import helper from './helper.js'
import uniPopup from './popup.js'
import api_s from './api.js'

const baseUrl = helper.websiteUrl
export default {
	// 数据
	axios(method, url, data, Type,sp) {
		return new Promise((resolve, reject) => {
			var token = api_s.getStorageSync(0)
			if (token != null) {
				token = token.token
			} else {
				token = ""
			}
			uni.request({
				header: {
					'Content-Type': Type ? Type : 'application/json;charset=UTF-8',
					'token': token,
				},
				url: baseUrl + url,
				method: method,
				data: data,
				success: (res) => {
					console.log(res)
					if (res.data && res.data.failMessages && res.data.failMessages.length > 0) {
						if (res.data.failMessages[0].code === '99986' || res.data.failMessages[0].code === '99993') {
							api_s.clearStorage();
							uni.hideLoading();
							uni.stopPullDownRefresh();
							uni.navigateTo({
								url: '/pages/entryPages/login/pwd'
							})
						} else if (res.data.failMessages[0].code === '99987') {
							var dic = {
								code: 'success',
								data: [],
								message: "成功"
							}
							resolve(dic)
						} else if (res.data.code !== 'success') {
							reject(res.data)
							uni.stopPullDownRefresh();
							uniPopup.showToast(res.data.failMessages[0].message)
						}
					}
					resolve(res.data)
				},
				fail: (err) => {
					console.log('err', err)
					uni.stopPullDownRefresh();
					uniPopup.showToast(res.data.message)
				}
			})
		})
	},

	uploadFile(url, filePath) {
		uniPopup.showLoading('上传中')
		return new Promise((resolve, reject) => {
			var token = ''
			var token = api_s.getStorageSync(0)
			console.log(token)
			if (token != null) {
				token = token.token
			} else {
				token = ""
			}
			uni.uploadFile({
				url: baseUrl + url,
				filePath: filePath,
				name: 'file',
				header: {
					'token': token,
				},
				success: (uploadFileRes) => {
					var res = JSON.parse(uploadFileRes.data)
					if (res.code != 'success') {
						console.log('图片上传失败1', res)
						uniPopup.showToast(res.failMessages[0].message)
						return
					} else {
						uniPopup.hideLoading('上传成功', 500)
						resolve(res)
					}
				},
				fail: (res) => {
					console.log('图片上传失败2', res)
					uniPopup.showToast('图片上传失败')
				}
			});
		})

	},
	uploadFile_s(url, filePath) {
		uniPopup.showLoading('上传中')
		return new Promise((resolve, reject) => {
			var token = ''
			var token = api_s.getStorageSync(0)
			console.log(token)
			if (token != null) {
				token = token.token
			} else {
				token = ""
			}
			console.log(filePath)
			uni.uploadFile({
				url: baseUrl + url,
				filePath: filePath[0],
				name: 'file',
				header: {
					'token': token,
				},
				success: (uploadFileRes) => {
					var res = JSON.parse(uploadFileRes.data)
					if (res.code != 200) {
						uniPopup.showToast(res.message)
						return
					} else {
						uniPopup.showLoading('上传成功')
						uniPopup.hideLoading(0)
						resolve(res.data)
					}
				},
				fail: (res) => {
					console.log('图片上传失败', res)
					uniPopup.showToast(res.data.message)
				}
			});
		})

	},
}
