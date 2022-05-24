<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			大修基金详情
		</nav-bar-new>
		<view class="conter">
			<view class="title">{{info.title}}</view>
			<view class="lable">
				<view class="lable_li">使用¥{{info.money}}</view>
			</view>
			<view class="table">
				<view class="table_li">
					<view class="table_name">申请方</view>
					<view class="table_text">{{info.applicant}}</view>
				</view>
				<view class="table_li">
					<view class="table_name">申请时间</view>
					<view class="table_text">{{info.time}}</view>
				</view>
				<view class="table_li">
					<view class="table_name">申请原因</view>
					<view class="table_text">{{info.reason}}</view>
				</view>
				<view class="table_li">
					<view class="table_cher">申请凭证</view>
				</view>
				<view class="table_li">
					<view class="table_img" v-if="info.vouchers.length > 0">
						<image :src="item" v-for="(item,index) in info.vouchers" :key="index" @tap="privewImg(item,info.vouchers)" mode="widthFix"></image>
					</view>
					<view class="table_img" v-if="info.vouchers.length == 0">
						暂无
					</view>
				</view>
				<view class="table_li">
					<view class="table_name">审核日期</view>
					<view class="table_text">{{info.examineTime}}</view>
				</view>
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
				const res = await api.trade.getFundDetails(param)
				if (res) {
					this.info = res.data;
				}
			},
			// 图片预览
			privewImg(url,urls) {
				uni.previewImage({
					current: url,
					urls: urls,
				});
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
				padding: 50rpx;
				box-sizing: border-box;
				line-height: 0;
				font-size: 28rpx;
				color: #999999;
				image {
					width: 100%;
					margin-bottom: 20rpx;
				}
			}
		}
		.table_li:last-child {
			border-bottom:none;
		}
	}
}
</style>
