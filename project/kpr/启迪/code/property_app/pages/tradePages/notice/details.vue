<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			公告详情
		</nav-bar-new>
		<view class="conter">
			<view class="title">{{info.title}}</view>
			<view class="time">
				<image src="/static/trade/online1.png" mode=""></image>
				发起时间 {{info.createTime}}
			</view>
			<view class="textcon">
				<rich-text :nodes="info.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	
	export default {
		data() {
			return {
				id: '',
				info: {},
			}
		},
		onLoad(options) {
			if(options.id) {
				this.id = options.id;
				this.getDetails();
			}
		},
		methods: {
			// 获取详情
			async getDetails() {
				var param = {
					id:this.id,
				}
				const res = await api.trade.noticeDetails(param)
				if (res) {
					this.info = res.data;
				}
			},
		}
	}
</script>

<style lang="less">
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.title {
		width: 100%;
		color: #282828;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		line-height: 60rpx;
	}
	.lable {
		width: 100%;
		display: -webkit-flex;
		margin-bottom: 30rpx;
		.lable_li {
			color: #C6AA6B;
			font-size: 26rpx;
			background: rgba(198, 170, 107, 0.1);
			border-radius: 6rpx;
			padding: 12rpx 15rpx;
		}
	}
	.time {
		width: 100%;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
		color: #C6AA6B;
		font-size: 26rpx;
		margin-bottom: 44rpx;
		image {
			width: 25rpx;
			height: 25rpx;
			margin-right: 10rpx;
		}
	}
	.textcon {
		width: 100%;
		white-space:normal;
		word-break:break-all;
		color: #656565;
		font-size: 28rpx;
		line-height: 50rpx;
		padding-bottom: 38rpx;
	}
}
</style>
