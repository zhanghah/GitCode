<template>
	<view class="page-shuidian-detail">
		<view class="top">
			<view class="type-info">
				<view class="type">
					类型：通电
				</view>
				<view class="status-shz" v-if="status==0">
					审核中
				</view>
				<view class="status-success" v-if="status==1">
					审核通过
				</view>
				<view class="status-fail" v-if="status==2">
					审核失败
				</view>
			</view>
			<view class="home-name">
				房屋：约克南郡一期24栋 12-5
			</view>
			<view class="create-time">
				2019.06.25 14:25
			</view>
			<view class="user-info">
				<text class="tit">联系人:</text>
				<text class="txt">张小山</text>
				<text class="txt">15845784578</text>
			</view>
			
			<view class="yuyue-time">
				<text>预约开通时间：</text>
				<text class="time">2021-10-10</text>
			</view>
		</view>

		<view class="progress">
			<view class="title">处理进度</view>
			<view class="nr_box">
				<view class="nr" v-for="(item,index) in renovationRecords" :key="index">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{item.createTime |date('YYYY-MM-DD HH:mm')}}</view>
						<view class="text" v-if="item.checkStatus==0">申请已提交，待物业审核</view>
						<view class="text" v-if="item.checkStatus==1">物业审核通过</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: '',
				type: '',
				renovationRecords: [{
						checkStatus: 0
					},
					{
						checkStatus: 1
					}
				]
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '通电详情'
			})
		},
		onLoad(opt) {
			this.status = opt.status;
			this.type = opt.type
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
