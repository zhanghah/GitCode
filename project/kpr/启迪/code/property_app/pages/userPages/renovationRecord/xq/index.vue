<template>
	<view class="page-renovation-detail">
		<view class="top">
			<view class="home-info">
				<view class="home-name">
					{{detail.roomName}}
				</view>
				<view class="status-shz" v-if="detail.applicationStatus==1">
					待审核
				</view>
				<view class="status-success" v-if="detail.applicationStatus==2">
					审批通过
				</view>
				<view class="status-fail" v-if="detail.applicationStatus==3">
					审批未通过
				</view>
			</view>
			<view class="create-time">
				{{detail.createTime | date('YYYY-MM-DD HH:mm')}}
			</view>
			<view class="describe">
				装修申请描述：
				<text>{{detail.des}}</text>
			</view>

			<view class="zl">
				装修申请资料：
			</view>
			<view class="imgList" v-if="decorationFile.length">
				<view class="img">
					<image :src="`${imageView}${decorationFile.certificateUrl}`" mode="" @click="clickImg(v)"></image>
					<image :src="`${imageView}${decorationFile.licenseUrl}`" mode="" @click="clickImg(v)"></image>
				</view>
			</view>
		</view>

		<view class="progress">
			<view class="title">处理进度</view>
			<view class="nr_box">
				<!-- 审核提交待处理 -->
				<view class="nr">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{detail.createTime |date('YYYY-MM-DD HH:mm')}}</view>
						<view class="text">装修申请已提交，待物业审核</view>
					</view>
				</view>
				<!-- 审核通过 -->
				<view class="nr" v-if="detail.applicationStatus=='2'">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{detail.createTime |date('YYYY-MM-DD HH:mm')}}</view>
						<view class="text">物业审核通过</view>
					</view>
				</view>
				<!-- 审核未通过 -->
				<view class="nr" v-if="detail.applicationStatus=='3'">
					<view class="line_box">
						<view class="quan"></view>
						<view class="line"></view>
					</view>
					<view class="text_box">
						<view class="time">{{detail.createTime |date('YYYY-MM-DD HH:mm')}}</view>
						<view class="text">物业审核失败</view>
						<view class="text">失败原因：</view>
						<view class="cause">
							<view class="img">
								<image v-for="(item,index) in imgList" :key="index"
									:src="`${imageView}${item.approvalPictureUrl}`" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				id: '',
				detail: {},
				imgList: [],
				decorationFile: [],//装修申请记录
			}
		},
		computed: {
			...mapState(['imageView'])
		},
		methods: {
			async getData() {
				const query = {
					id: this.id
				};
				const res = await api.my.decorationDetail(query);
				if (res.status != '0') {
					return
				}
				console.log(res.data)
				this.detail = res.data
				this.imgList = res.data.approvalPictureUrl
				if (res.data.decorationCompanyFile) {
					this.decorationFile = res.data.decorationCompanyFile
				}
			}
		},
		mounted() {
			this.getData();
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '装修申请记录详情'
			})
		},
		onLoad(opt) {
			this.id = opt.id
			console.log(this.id)
		}
	}
</script>

<style lang="less" scoped>
	.page-renovation-detail {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}

	.top {
		margin: 20rpx 28rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
		border-radius: 10rpx;

		.home-info {
			display: flex;
			justify-content: space-between;

			.home-name {
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
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

		.describe {
			color: #333333;
			font-size: 28rpx;

			text {
				color: #999999;
				line-height: 48rpx;
			}
		}

		.zl {
			color: #333333;
			font-size: 28rpx;
			margin: 30rpx 0;
		}

		.imgList {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			image {
				width: 136rpx;
				height: 136rpx;
				border-radius: 8rpx;
				background: #aaa;
				margin-left: 20rpx;
				margin-bottom: 21rpx;
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

					.cause {
						.img {
							width: 100%;
							display: flex;
							flex-direction: row;
							flex-wrap: wrap;

							image {
								width: 136rpx;
								height: 136rpx;
								border-radius: 8rpx;
								background: #aaa;
								margin-left: 20rpx;
								margin-bottom: 21rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
