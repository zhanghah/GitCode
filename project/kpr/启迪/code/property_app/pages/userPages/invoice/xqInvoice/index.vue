<template>
	<view class="xq_invoice_wrap">
		<view class="line"></view>
		<view class="box margin">
			<view class="title">发票状态</view>
			<view class="text" v-if="infoMsg.dealStatus === '0'">未开票</view>
			<view class="text1" v-else-if="infoMsg.dealStatus === '1'">已开票</view>
			<view class="text" v-else>开票中</view>
		</view>
		
		<view class="type">
			<view class="box">
				<view class="title">发票类型</view>
				<view class="text">{{infoMsg.type === '1'?'纸质':'电子'}}</view>
			</view>
			<view class="box qiyeStyle">
				<view class="title">发票抬头</view>
				<view class="qiye">
					<view class="name">{{infoMsg.receiptHead}}<view class="label">{{infoMsg.headType === '1'?'企业':'个人'}}</view></view>
					<view class="num">税号{{infoMsg.taxNumber}}</view>
				</view>
			</view>
			<view class="box">
				<view class="title">发票内容</view>
				<view class="text">{{infoMsg.feeType === '1'?'物业费':'车位费'}}</view>
			</view>
			<view class="box">
				<view class="title">发票金额</view>
				<view class="text">{{infoMsg.money}}元</view>
			</view>
		</view>
		
		<view class="box margin">
			<view class="title">收票邮箱</view>
			<view class="text">{{infoMsg.email}}</view>
		</view>
		
		<view class="mx_box">
			<view class="title">开票明细</view>
			<view class="nr">
				<view class="name_box">
					<view class="name">{{infoMsg.roomMsg.comName}}{{infoMsg.roomMsg.buildingNumber}}栋{{infoMsg.roomMsg.floorNumber}}-{{infoMsg.roomMsg.roomNumber}}</view>
					<view class="time">{{infoMsg.createTime|formatDate}}</view>
				</view>
				<view class="price">{{infoMsg.money}}元</view>
			</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	export default {
		name: 'AddInvoice',
		data() {
			return {
				id:'',
				infoMsg:{}
			}
		},
		filters: {
			formatDate(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + '  ' + h + ':' + m + ':' + s;
			}
		},
		methods: {
			getInfo(){
				api.my.getInvoiceInfo({id:this.id}).then(res=>{
					if(res.status !== '0'){return};
					this.infoMsg = res.data
				})
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
			uni.setNavigationBarTitle({
				title: '开票明细',
			});
		},
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.xq_invoice_wrap {
		min-height: 100vh;
		background-color: #f5f5f5;
		.line{
			width: 100%;
			height: 20rpx;
			background: #f5f5f5;
		}
	}
	.box{
		padding:0 30rpx;
		display: flex;
		justify-content:space-between;
		align-items: center;
		font-size:32rpx;
		color:#7A7A7C;
		background: #fff;
		height: 98rpx;
		border-bottom:1px solid #E0E0E0;
		.text{
			color:#FB9200;
		}
		.text1{
			color:#020204;
		}
	}
	.margin{
		margin-bottom:30rpx;
	}
	.qiyeStyle{
		display: block;
		height: 206rpx;
		.title{
			padding-top:10rpx;
		}
		.qiye{
			margin-top:35rpx;
			.name{
				display: flex;
				color:#020204;
				font-size:32rpx;
				.label{
					color:#FB9200;
					font-size:28rpx;
					width: 123rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					border:1px solid #FB9200;
					border-radius: 4rpx;
					margin-left:14rpx;
				}
			}
			.num{
				margin-top:16rpx;
			}
		}
	}
	.mx_box{
		.title{
			color:#7A7A7C;
			font-size:28rpx;
			margin:0 0 26rpx 27rpx;
		}
		.nr{
			padding:30rpx;
			background: #fff;
			display: flex;
			justify-content: space-between;
			.name{
				color:#020204;
				font-size:34rpx;
			}
			.time{
				color:#9E9E9E;
				font-size:24rpx;
				margin-top:20rpx;
			}
			.price{
				color:#FB9200;
				font-size:34rpx;
			}
		}
	}
</style>
