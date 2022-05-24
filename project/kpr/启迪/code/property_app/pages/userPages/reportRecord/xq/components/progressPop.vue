<template>
	<view :class="isShow ? 'comment_box_on comment_box' : 'comment_box'">
		<view class="box">
			<view class="title">工单进度</view>
			<view class="nr_box">
				<!-- 提交 -->
				<view class="nr" v-if="progress">
					<view class="left_time">{{progress.createTime |date('YYYY-MM-DD HH:mm')}}</view>
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="text1">工单已提交</view>
						<view class="text2">您的工单等待审核</view>
					</view>
				</view>
				
				<!-- 已受理，待派单 -->
				
				<!-- 审核 -->
				<view class="nr" v-if="progress.auditRecordList !==undefined && progress.auditRecordList.length>0">
					<view class="left_time">{{progress.auditRecordList[0].createTime}}</view>
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="text1" v-if="progress.auditRecordList[0].auditStatus==0">工单审核未通过</view>
						<view class="text1" v-if="progress.auditRecordList[0].auditStatus==1">工单审核通过</view>
						<view class="text2">您的工单等待处理</view>
					</view>
				</view>
				<!-- 处理状态 -->
				<template v-if="progress.personnelEvaluateList !==undefined && progress.personnelEvaluateList.length>0">
					<view class="nr" v-for="(item,index) in progress.personnelEvaluateList" :key="index">
							<view class="left_time">{{item.createTime}}</view>
							<view class="line_box">
								<view class="quan"></view>
								<view class="line"></view>
							</view>
							<view class="text_box">
								<view class="text1" v-if="item.evaluate==1">工单部分完成</view>
								<view class="text1" v-if="item.evaluate==2">工单正在处理中</view>
								<view class="text1" v-if="item.evaluate==3">工单未完成</view>
								<view class="text2" v-if="item.remark">处理回复备注：{{item.remark}}</view>
							</view>
					</view>
				</template>

			</view>
			<view class="close" @click="close">
				<image src="../../../static/reportRecord/close.png" mode="" />
			</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api'
	import {
		mapState
	} from 'vuex';
	export default {
		props: {
			progress: {
				type: Object,
				default() {
				  return Object.create(null);
				},
			},
		},
		data() {
			return {
				isShow: false,
			}
		},
		computed: {
			...mapState({
				progressShow: state => state.user.progressShow
			})
		},
		watch: {
			progressShow(val) {
				this.isShow = val
				if (this.isShow) {
				}
			}
		},
		methods: {
			close() {
				this.isShow = false
				this.$store.commit('user/PROGRESS_SHOW', false)
			}
		},
		onLoad(option) {
		},
	}
</script>
<style lang="less" scoped>
	.comment_box {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: fixed;
		top: 0;
		z-index: -1;
		transition: all 0.5s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.comment_box_on {
		transition: all 0.5s;
		z-index: 999999;
		background: rgba(0, 0, 0, 0.5);
	}

	.comment_box_on .box {
		display: block;
	}

	.box {
		width: 90%;
		background: #fff;
		border-radius: 20rpx;
		margin: 0 auto;
		display: none;
		position: relative;
		padding-bottom: 50rpx;

		.title {
			height: 88rpx;
			border-bottom: 1px solid #E6E6E6;
			margin-left: 20rpx;
			color: #000;
			font-size: 30rpx;
			line-height: 88rpx;
			padding-left: 11rpx;
		}

		.nr_box {
			width: 88%;
			margin: 0 auto;
			margin-top: 36rpx;

			.nr {
				display: flex;

				.left_time {
					color: #808080;
					font-size: 28rpx;
					width: 160rpx;
					text-align: center;
					margin-right: 25rpx;
					white-space: pre-line;
				}

				.line_box {
					width: 20rpx;

					.quan {
						width: 100%;
						height: 20rpx;
						background: #F05050;
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
						left: 8rpx;
						z-index: 1;
					}
				}

				.text_box {
					margin-left: 30rpx;
					padding-bottom: 48rpx;

					.text1 {
						color: #333333;
						font-size: 32rpx;
						margin-bottom: 14rpx;
						white-space: pre-line;
					}

					.text2 {
						color: #666666;
						font-size: 28rpx;
						white-space: pre-line;
					}
				}
			}
		}

		.close {
			position: absolute;
			bottom: -154rpx;
			left: 0;
			width: 100%;

			image {
				display: block;
				width: 48rpx;
				height: 48rpx;
				margin: 0 auto;
			}
		}
	}
</style>
