const systemInfo = uni.getSystemInfoSync();
const top = systemInfo.statusBarHeight + 'px';
const navigationBarHeight = systemInfo.navigationBarHeight + 'px';
const information = null;
export default {
	top,
	navigationBarHeight,
	information,
	/**
	 * 数据存储
	 * @module information
	 * 	0、information（tolrn）\
	 *  1、information（个人信息）
	 */
	storageKey(key) {
		var key_z = ''
		if (key == 0) {
			key_z = 'information'
		} else if(key == 1){
			key_z = 'personalInformation'
		}else if(key == 2){
			key_z = 'searchDate'
		}else if(key == 3){
			key_z = 'address'
		}else {
			
		}
		return key_z
	},
	setStorage(key, data) {
		return new Promise((resolve, reject) => {
			uni.setStorage({
				key: this.storageKey(key),
				data: data,
				success: function() {
					console.log('数据存储成功')
					if (key == 0) {
						this.information = data
						console.log(this.information )
					}
					resolve(key)
				}
			});
		})
	},
	// 获取
	getStorage(key) {
		return new Promise((resolve, reject) => {
			uni.getStorage({
				key: this.storageKey(key),
				success: function(res) {
					console.log('数据获取',res.data)
					resolve(res.data)
				},
				fail: (err) => {
					console.log('err', err)
					reject(err.data)
				}
			});
		})
	},
	// 清除
	clearStorage(key) {
		return new Promise((resolve, reject) => {
			uni.clearStorage();
			this.information = null;
		})
	},
	getStorageSync(key){
		return uni.getStorageSync(this.storageKey(key));
	}
};
