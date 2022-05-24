export default {
	showToast(data,icon) {
		uni.showToast({
			title: data,
			icon: icon?icon:'none',
			duration: 2000
		});
	},
	showLoading(data) {
		console.log(data)
		uni.showLoading({
			title: data?data:'加载中'
		});
	},
	hideLoading(timer,data) {
		uni.showLoading({
			title: data?data:'加载完成'
		});
		setTimeout(function() {
			uni.hideLoading();
		}, timer?timer:2000);
	},
	stopPullDownRefresh(timer){
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, timer?timer:2000);
	},
	showModal(title, content) {
		return new Promise((confirm, cancel) => {
			uni.showModal({
				title: title,
				content: content,
				success: function(res) {
					if (res.confirm) {
						resolve()
					} else if (res.cancel) {
						reject()
					}
				}
			});
		})
	},
	numFilter (value) {
		let realVal = parseFloat(value).toFixed(2)
		return realVal
	},
};
