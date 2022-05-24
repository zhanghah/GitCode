<template>
	<view>
		<nav-bar ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			黑名单预警详情
		</nav-bar>
		<view class="conter">
			<view class="details">
				<view class="details_top">
					李二哈
					<view class="label">吸毒人员</view>
				</view>
				<view class="details_post">
					<image src="/static/index/icon13.png" mode=""></image>
					<text>位置</text>
					幸福五社小区南门入口
				</view>
				<view class="details_time">
					<image src="/static/index/icon12.png" mode=""></image>
					时间 2021.01.12 12:23:12
				</view>
				<view class="richtext">
					<rich-text :nodes="strings"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				strings: '<div style="text-align:center;"><img style="width:100%;height:100%" src="https://community.tuscq.com/data/pic/companyLogo/3bd7834cac454ec5bb1285a0ab23c50e.png"/></div>',
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
page {
	background: #F5F5F5;
}
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.details {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		.details_top {
			width: 100%;
			margin-bottom: 40rpx;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			color: #282828;
			font-size: 36rpx;
			font-weight: bold;
			.label {
				color: #FF894F;
				font-size: 22rpx;
				background: rgba(255, 137, 79, 0.1);
				border-radius: 80rpx;
				padding: 6rpx 20rpx;
				margin-left: 26rpx;
			}
		}
		.details_post {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			font-size: 26rpx;
			color: #656565;
			margin-bottom: 20rpx;
			image {
				width: 24rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
			text {
				color:999;
				margin-right: 10rpx;
			}
		}
		.details_time {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			font-size: 26rpx;
			color: #999999;
			margin-bottom: 17rpx;
			image {
				width: 25rpx;
				height: 25rpx;
				margin-right: 10rpx;
			}
		}
		.richtext {
			width: 100%;
		}
	}
}
</style>
