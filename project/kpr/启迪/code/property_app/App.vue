<script>
	export default {
		globalData: {},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "@/public/css/richtext.css";
	.content_mall{
		background: #F5F5F5;
		min-height: 100vh;
	}
	/*每个页面公共css */
	/* #ifdef H5 */
	uni-page-head {
		// display: none;
		border-bottom: 1rpx #EEEEEE solid;
	}

	/* #endif */

	image {
		max-width: 100%;
		height: 100%;
	}
	/* 提交按钮 */
	.submit_btn {
		width: 100%;
		height: 98rpx;
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
		padding: 200rpx 0 0 0;
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
	
/*覆盖文本编辑器里面的图片的大小*/
	uni-rich-text img {
		max-width: 100% !important;
	}
</style>
