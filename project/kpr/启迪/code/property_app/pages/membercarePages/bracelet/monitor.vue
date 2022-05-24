<template>
	<view class="page-monitor">
		<video id="myVideo" class="video"
			src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4"
			@error="videoErrorCallback"></video>
		<view class="back" @tap="back">
			<image src="../static/back.png" mode=""></image>
		</view>

		<view class="title">
			视频标题视频标题视频标题
		</view>

		<view class="more">
			相关视频
		</view>
		<view class="more-video-box">
			<video v-for="(item,index) in list" :key="index" id="myVideo" class="more-video" :src="item.src"
				@error="videoErrorCallback"></video>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4'
					},
					{
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4'
					},
					{
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4'
					},
					{
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4'
					},
				]
			}
		},
		methods: {
			videoErrorCallback(e) {
				console.log(e)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '报警信息'
			})
		}
	}
</script>

<style lang="less" scoped>
	.page-monitor {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
		position: relative;
	}

	.back {
		position: absolute;
		top: 60rpx;
		left: 30rpx;
		width: 35rpx;
		height: 35rpx;
		z-index: 99;
	}
	
	.more{
		color: #2E2E2E;
		font-size: 38rpx;
		padding: 30rpx;
	}
	
	.title{
		padding: 30rpx;
		color: #2E2E2E;
		font-size: 40rpx;
		font-weight: bold;
	}

	.video {
		width: 100%;
	}


	.more-video-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 0 30rpx;

		.more-video {
			width: 325rpx;
			height: 188rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
