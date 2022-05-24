<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	
	/* 提交按钮 */
	.submit_btn {
		width: 100%;
		height: 88rpx;
		background: #7F298E;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 6rpx;
	}
	/* 暂无信息 */
	.nothing {
		width: 100%;
		padding-top: 200rpx;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #999999;
		font-size: 28rpx;
		image {
			width: 215rpx;
			height: 185rpx;
			margin-bottom: 50rpx;
		}
	}
</style>
