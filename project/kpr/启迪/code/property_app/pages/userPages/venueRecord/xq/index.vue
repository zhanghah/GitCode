<template>
	<view class="page-venue-detail">
		<view class="top">
			<view class="type-info">
				<view class="num">
					工单编号：{{data.orderNumber}}
				</view>
				<view class="status-shz" v-if="data.orderStatus==1">
					待处理
				</view>
				<view class="status-success" v-if="data.orderStatus==2">
					预约成功
				</view>
				<view class="status-fail" v-if="data.orderStatus==3">
					预约失败
				</view>
			</view>
			<view class="create-time">
				{{data.createTime |date('YYYY-MM-DD HH:mm:ss')}}
			</view>
			
			<view class="venue-name">
				场馆名称：{{data.name}}
			</view>
			<view class="user-info">
				<text class="tit">联系人:</text>
				<text class="txt">{{data.contacts}}</text>
				<text class="txt">{{data.phone}}</text>
			</view>
			<view class="yuyue-time">
				<text>预约时间：</text>
				<text class="time">{{data.time}}</text>
			</view>
		</view>
		
		<view class="progress">
			<view class="title">处理进度</view>
			<view class="nr_box">
				<view class="nr">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{data.createTime |date('YYYY-MM-DD HH:mm')}}</view>
						<view class="text">场馆预约申请已提交，待处理</view>
					</view>
				</view>
				
				<view class="nr" v-if="data.orderStatus==2">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{data.createTime |date('YYYY-MM-DD HH:mm')}}</view>
						<view class="text">场馆审核通过，预约成功</view>
					</view>
				</view>
				
				<view class="nr" v-if="data.orderStatus==3">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{data.createTime |date('YYYY-MM-DD HH:mm')}}</view>
						<view class="text">场馆审核未通过，预约失败</view>
					</view>
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
				id:'',
				data:{},
			}
		},
		methods:{
			async getVenueDetail(){
				const res=await api.my.venueDetail({
					id:this.id
				});
				if(res){
					this.data=res.data
					this.renovationRecords=res.data.approvalPictureUrl
					console.log(res.data)
				}
			},
		},
		mounted() {
			this.getVenueDetail()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '场馆预约详情'
			})
		},
		onLoad(opt) {
			this.id=opt.id;
		}
	}
</script>

<style lang="less" scoped>
	.page-venue-detail{
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}
	.top {
		margin: 20rpx 28rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
		border-radius: 10rpx;
	
		.type-info {
			display: flex;
			justify-content: space-between;
	
			.num{
				color: #333333;
				font-size: 30rpx;
				font-weight: bold;
			}
			.status-shz {
				flex-shrink: 0;
				color: #FF884D;
				font-size: 28rpx;
			}
	
			.status-success {
				flex-shrink: 0;
				color: #333333;
				font-size: 28rpx;
			}
	
			.status-fail {
				flex-shrink: 0;
				color: #F05050;
				font-size: 28rpx;
			}
		}
	
	
		.create-time {
			color: #999999;
			font-size: 24rpx;
			margin: 20rpx 0;
		}
		
		.venue-name{
			color: #999999;
			margin-bottom: 20rpx;
		}
		
		.user-info{
			color: #999999;
			font-size: 28rpx;
			margin-bottom: 20rpx;
			
			.tit{
				margin-right: 10rpx;
			}
			.txt{
				margin-right: 20rpx;
				color: #333333;
			}
		}
		
		.yuyue-time{
			color: #999999;
			font-size: 28rpx;
			 text{
				 margin-right: 10rpx;
				 
			 }
			 
			 .time{
				 color: #333333;
			 }
		}
	
	}
	
	.progress {
		margin: 28rpx;
		background: #fff;
		border-radius: 16rpx;
		padding-bottom: 40rpx;
	
		.title {
			height: 88rpx;
			line-height: 88rpx;
			border-bottom: 1px solid #E6E6E6;
			color: #333333;
			font-size: 28rpx;
			margin-left: 25rpx;
			width: 95%;
		}
	
		.nr_box {
			width: 84%;
			margin: 0 auto;
			margin-top: 57rpx;
	
			.nr {
				display: flex;
	
				.line_box {
					width: 14rpx;
	
					.quan {
						width: 100%;
						height: 14rpx;
						background: #C762D9;
						border-radius: 50%;
						position: relative;
						z-index: 10;
						margin-top: 10rpx;
					}
	
					.line {
						width: 4rpx;
						height: 100%;
						background: #E6E6E6;
						position: relative;
						left: 4rpx;
						z-index: 1;
					}
				}
	
				.text_box {
					width: 90%;
					margin-left: 44rpx;
					padding-bottom: 48rpx;
	
					.time {
						color: #9E9E9E;
						font-size: 28rpx;
						margin-bottom: 14rpx;
					}
	
					.text {
						color: #020204;
						font-size: 30rpx;
						margin-bottom: 14rpx;
						white-space: pre-line;
	
						&:last-child {
							margin-bottom: 0;
						}
					}
				}
			}
		}
	}
</style>
