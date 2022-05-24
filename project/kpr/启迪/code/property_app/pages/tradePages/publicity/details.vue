<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			公示详情
		</nav-bar-new>
		<view class="conter">
			<view class="title">{{info.title}}</view>
			<view class="time">
				<image src="/static/trade/online1.png" mode=""></image>
				发起时间 {{info.time}}
			</view>
			<view class="textcon">
				<rich-text :nodes="info.content"></rich-text>
				<!-- <u-parse class="content" :html="info.content" :lazy-load="true"></u-parse> -->
			</view>
			<!-- <view class="table">
				<view class="table_li">
					<view class="table_name">申请方</view>
					<view class="table_text">金辉物业公司</view>
				</view>
				<view class="table_li">
					<view class="table_name">申请时间</view>
					<view class="table_text">2021.02.16 11:23:12</view>
				</view>
				<view class="table_li">
					<view class="table_cher">申请凭证</view>
				</view>
				<view class="table_li">
					<view class="table_img">
						<image src="/static/trade/home8.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="table_li">
					<view class="table_name">审核日期</view>
					<view class="table_text">2021.09.12 11:12:34</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	
	export default {
		data() {
			return {
				id: '',
				type: '',
				info: {},
			}
		},
		onLoad(options) {
			if(options.id) {
				this.id = options.id;
				this.type = options.type;
				this.getDetails();
			}
		},
		methods: {
			// 获取详情
			async getDetails() {
				var param = {
					id:this.id,
				}
				var res;
				if(this.type == 1) {
					res = await api.trade.publicityDetailsDis(param)
				}else{
					res = await api.trade.publicityDetails(param)
				}
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
	.table {
		width: 100%;
		border: 1px solid #EEEEEE;
		.table_li {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			border-bottom:1px solid #EEEEEE;
			.table_name {
				width: 200rpx;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				border-right:1px solid #EEEEEE;
				color: #999999;
				font-size: 26rpx;
				padding: 20rpx 0;
			}
			.table_text {
				flex: 1;
				color: #656565;
				font-size: 26rpx;
				padding: 20rpx 24rpx;
				box-sizing: border-box;
			}
			.table_cher {
				color: #656565;
				width: 200rpx;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				border-right:1px solid #EEEEEE;
				font-size: 26rpx;
				padding: 20rpx 0;
			}
			.table_img {
				width: 100%;
				padding: 30rpx;
				box-sizing: border-box;
				line-height: 0;
				image {
					width: 100%;
				}
			}
		}
		.table_li:last-child {
			border-bottom:none;
		}
	}
}
</style>
