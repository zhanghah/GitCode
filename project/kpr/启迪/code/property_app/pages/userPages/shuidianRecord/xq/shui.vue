<template>
	<view class="page-shuidian-detail">
		<view class="top">
			<view class="type-info">
				<view class="type">
					类型：{{type=='WATER'?'通水':'通电'}}
				</view>
				<view class="status-shz" v-if="data.applicationStatus==1">
					待审核
				</view>
				<view class="status-success" v-if="data.applicationStatus==2">
					审核通过
				</view>
				<view class="status-fail" v-if="data.applicationStatus==3">
					审核未通过
				</view>
			</view>
			<view class="home-name">
				房屋：{{data.roomName}}
			</view>
			<view class="create-time">
				{{data.createTime}}
			</view>
			<view class="user-info">
				<text class="tit">联系人:</text>
				<text class="txt">{{data.name}}</text>
				<text class="txt">{{data.phone}}</text>
			</view>
			
			<view class="yuyue-time">
				<text>预约开通时间：</text>
				<text class="time">{{data.startTime}}</text>
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
						<view class="time">{{data.createTime}}</view>
						<view class="text">申请已提交，待物业审核</view>
						<view class="text" v-if="data.checkStatus==1">物业审核通过</view>
					</view>
				</view>
				
				<view class="nr" v-if="data.applicationStatus==2">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{data.approvalTime}}</view>
						<view class="text">物业审核通过</view>
					</view>
				</view>
				
				<view class="nr" v-if="data.applicationStatus==3">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{data.approvalTime}}</view>
						<view class="text">物业审核未通过</view>
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
				type:'',
				data:{},
				renovationRecords: []
			}
		},
		methods:{
			async getInfo(){
				const res=await api.my.waterAndElectricityDetail({id:this.id})
				console.log(res)
				if(res){
					this.data=res.data
				}
			}
		},
		mounted() {
			this.getInfo()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '通水详情'
			})
		},
		onLoad(opt) {
			this.id=opt.id;
			this.type=opt.type;
		}
	}
</script>

<style lang="less" scoped>
	.page-shuidian-detail {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}

	.home-name {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #333333;
		font-size: 30rpx;
		margin-top: 20rpx;
	}

	.top {
		margin: 20rpx 28rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
		border-radius: 10rpx;

		.type-info {
			display: flex;
			justify-content: space-between;


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
