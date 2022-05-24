
var routing = function(...param) {
	var tag = "open",
		time = 0,
		path = ['/pages/index/index'],
		data = '';
		
	function fun() {
		return 'this is from fun1'
	}
	console.log(param)
	
	for (let o of param) {
		if (typeof o === typeof tag) {
			tag = o
		}
		if (typeof o === typeof time) {
			time = o
		}
		if (typeof o === typeof path) {
			path = o
		}
		if (typeof o === typeof fun) {
			data = o()
		}
	}
	setTimeout(function() {
		let url_json = ''
		let data_ = []
		for (let key of Object.keys(data)) {
			data_.push(key + '=' + data[key])
		}
		let _data_ = ''
		for (let i = 0; i < data_.length; i++) {
			if (i === 0) {
				_data_ += '?' + data_[0]
			} else {
				_data_ += '&' + data_[i]
			}
		}
		if (data) {
			url_json = path[0] + _data_
		} else {
			url_json = path[0]
		}
		switch (tag) {
			case 'open':
				uni.navigateTo({
					url: url_json,
				})
				break;
			case 'close':
				uni.redirectTo({
					url: url_json,
				})
				break;
			case 'closeall':
				uni.reLaunch({
					url: url_json,
				})
				break;
			case 'back':
				uni.navigateBack({
					delta: 1
				})
				break;
			case 'tab':
				uni.switchTab({
					url: url_json,
				})
				break;
		}
	}, time)
}
export default routing;