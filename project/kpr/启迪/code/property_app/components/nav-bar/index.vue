<template>
	<view class="ui-nav">
		
		<!-- <uni-status-bar></uni-status-bar> -->
		<view :class="['custom-nav', { 'use-back': useBack }]">
			<view class="back" @tap="backHandler" v-if="useBack"></view>

			<view class="title">{{title}}</view>

			<view class="options">
				<slot name="option"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import UniStatusBar from "@/components/uni-status-bar/uni-status-bar.vue";

	export default {
		name: 'NavBar',
		components: {
			UniStatusBar
		},
		props: {
			title: String,
			useBack: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {}
		},
		onLoad() {},
		methods: {
			backHandler() {
				uni.navigateBack({
					delta: 1,
				});
			},
		}
	}
</script>

<style scoped lang="less">
	@barheight: 44px;

	.custom-nav {
		width: 100%;
		padding: 100rpx 24rpx 0 45rpx;
		height: @barheight;
		line-height: @barheight;
		color: #333333;
		font-size: 36rpx;
		font-weight: bold;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;

		&.use-back {
			padding-left: 0;
			padding-right: @barheight;
		}

		.back {
			width: @barheight;
			height: @barheight;
			background: url(@/static/components/icon_back.png) no-repeat center center;
			background-size: 30rpx 30rpx;
		}

		.options {
			height: 100%;
			display: flex;
			align-items: center;
		}

		/* #ifdef MP-WEIXIN */
		.options {
			position: relative;
			top: 100rpx;
		}

		/* #endif */
	}
</style>
