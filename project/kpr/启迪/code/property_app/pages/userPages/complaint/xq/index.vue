<template>
	<view class="reportRecord_box">
		<view class="content_box" >
			<view class="box">
				<view class="home">
					投诉类型：{{infoList.complaintType}}
					<view class="state_sl" v-if="infoList.checkStatus==0">待受理</view>
					<view class="state_gj" v-if="infoList.checkStatus==1">正在跟进</view>
					<view class="state_hf" v-if="infoList.checkStatus==2">待回访</view>
					<view class="state_wc" v-if="infoList.checkStatus==3">已完成</view>
				</view>
				<view class="tiem" >{{infoList.createTime |date('YYYY-MM-DD HH:mm')}}</view>
				<view class="text">
					{{infoList.content}}
				</view>
				<view class="imgList">
					<view class="img" v-for="(v,i) of infoList.fileList" :key="i">
						<image :src="`${imageView}${v.filePath}`" mode="" @click="clickImg(v)"></image>
					</view>
				</view>
			</view>

			<view class="progress">
				<view class="title">处理进度</view>
				<view class="nr_box">
					<view class="nr" v-for="(item,index) in complaintRecords" :key="index">
						<view class="line_box">
							<view class="quan"></view>
							<view class="line"></view>
						</view>
						<view class="text_box">
							<view class="time">{{item.createTime |date('YYYY-MM-DD HH:mm')}}</view>
							<view class="text" v-if="item.checkStatus==0">提交投诉待处理</view>
							<view class="text" v-if="item.checkStatus==1">物业已受理,正在跟进提交投诉处理</view>
							<view class="text" v-if="item.checkStatus==2">
								<view>
									物业正在处理，待回访
								</view>
								<view v-if="item.content">物业回复：{{item.content}}</view>
							</view>
							<view class="text" v-if="item.checkStatus==3">
								<view>物业处理完成</view>
								<view v-if="item.content">物业回复：{{item.content}}</view>
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
	} from 'vuex'
	export default {
		data() {
			return {
				id: '', //详情id
				infoList: [], //详情列表
				complaintRecords:[],
			}
		},
		computed: {
			...mapState(['user', 'imageView'])
		},
		methods: {
			// 获取详情信息
			async getComplaintInfo() {
				try {
					const res = await api.my.getComplaintInfo({
						id: this.id,
					})
					if (res.status != '0') {
						return
					};
					this.infoList = res.data;
					this.complaintRecords= res.data.complaintRecords;
				} catch (err) {

				}
			},
			clickImg(v) {
				console.log(v)
				let viewImg = [];
				viewImg.push(this.imageView + v.filePath)
				wx.previewImage({
					urls: viewImg,
					current: 0, // 当前显示图片的http链接，默认是第一个
				})
			},
		},
		mounted() {
			this.getComplaintInfo()
		},
		onLoad(opt) {
			this.id = opt.id;
			uni.setNavigationBarTitle({
				title: '投诉详情',
			});
		},
	}
</script>
<style lang="less" scoped>
	.reportRecord_box {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;

		.content_box {
			width: 92%;
			margin: 0 auto;
			padding-top: 24rpx;

			.box {
				padding: 36rpx 25rpx 21rpx 23rpx;
				background: #fff;
				border-radius: 16rpx;

				.home {
					color: #020204;
					font-size: 32rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 15rpx;

					.state_sl {
						color: #F05050;
					}
					
					.state_gj {
						color: #F8C344;
					}
					.state_hf {
						color: #FF884D;
					}
					.state_wc {
						color: #666666;
					}

					.state {
						color: #666666;
					}
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

				.tiem {
					color: #AAAAAA;
					font-size: 24rpx;
					margin-bottom: 33rpx;
				}

				.text {
					font-size: 28rpx;
					color: #020204;
					margin-bottom: 30rpx;
					white-space: pre-line;
					line-height: 44rpx;

				}
			}

			.progress {
				margin-top: 24rpx;
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
		}
	}
</style>
