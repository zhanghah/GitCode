<template>
	<view class="content">
		<view class="cell" v-for="(item,index) in mallOrder_list_date" :key="index">
			<view class="header">
				<view class="bt">
					<view class="img_v" v-if="item.orderApplyRefundDetailsVOS && item.orderApplyRefundDetailsVOS[0].goodsInfoVOS">
						<u-image class="tx" width="88rpx" height="88rpx" border-radius='12'
							:src="item.orderApplyRefundDetailsVOS?item.orderApplyRefundDetailsVOS[0].goodsInfoVOS.goodsResourceDtos[0].fileVisitUrl:''">
						</u-image>
						<text>{{item.orderApplyRefundDetailsVOS[0].goodsInfoVOS.goodsName}}</text>
					</view>
					<view class="orderStatus">
						<text class="dfk" v-if="item.applyStatus==1">审核中</text>
						<text class="dfk" v-if="item.applyStatus==2">退款失败</text>
						<text class="dfk" v-if="item.applyStatus==3">退款成功</text>
						<text class="dfk" v-if="item.applyStatus==4">已取消</text>
					</view>
				</view>
			</view>

			<view class="neir">
				<view class="cl_v">
					<text class="name">申请原因</text>
					<text class="r">{{item.applyReason}}</text>
				</view>
				<view class="cl_v ">
					<text class="name">申请类型 </text>
					<text class="r">{{mallOrderApplyRefundDTO[item.applyType-1].text}}</text>
				</view>
				<view class="cl_v cl_vs cl_vs_img" v-if="item.orderApplyRefundResourceDtos">
					<text class="name">图片 </text>
					<view class="img">
						<u-image @click="previewImage(item.orderApplyRefundResourceDtos,indexs)"
							v-for="(cell,indexs) in item.orderApplyRefundResourceDtos" class="tx" width="150rpx"
							height="150rpx" border-radius='12' :src="cell.fileVisitUrl">
						</u-image>
					</view>
				</view>
				<view class="cl_v cl_vs" v-if="item.applyStatus==2">
					<text class="name">拒绝原因 </text>
					<text class="r">{{item.refuseReason}}</text>
				</view>
				<view class="ann" v-if="item.applyStatus==1" @click="quxsq(item.id)">
					<text>取消申请</text>
				</view>
			</view>
		</view>
		<u-loadmore :status="totalRow.status" v-if="mallOrder_list_date.length!=0" />
		<no-result message="" v-else style="margin-top: 200rpx;"></no-result>
	</view>
</template>

<script>
	import order from '../../../../api/mallUser/order.js'
	import store from '../../../../store/index.js';
	export default {
		data() {
			return {
				totalRow: {
					pageNumber: 1,
					rowNumber: 20,
					status: 'loadmore'
				},
				mallOrderApplyRefundDTO: [{
						id: 1,
						text: "多拍、错拍、不想要"
					},
					{
						id: 2,
						text: "协商一致"
					}, {
						id: 3,
						text: "缺货"
					}, {
						id: 4,
						text: "其他"
					}
				],
				mallOrder_list_date: []
			}
		},
		onLoad(optin) {
			var that = this
			that.czhi()
		},
		methods: {
			previewImage(dateARR, index) {
				var img_arr = []
				for (var i = 0; i < dateARR.length; i++) {
					img_arr.push(dateARR[i].fileVisitUrl)
				}
				uni.previewImage({
					urls: img_arr,
					current: img_arr[index]
				});
			},
			/**
			 * 重置
			 */
			czhi() {
				this.totalRow.pageNumber = 1;
				this.mallOrder_list_date=[]
				this.mallOrderApplyRefund_list()
			},
			/**
			 * 获取退款列表
			 */
			mallOrderApplyRefund_list() {
				var that = this
				that.totalRow.status = 'loading'
				var dateSoure = {
					pageNumber: that.totalRow.pageNumber,
					rowNumber: that.totalRow.rowNumber,
					applyUid: store.state.user.userId,
					queryType:1
				}
				order.mallOrderApplyRefund_list(dateSoure).then(res => {
					var list_sj = res.data && res.data.list ? res.data.list : [];
					console.log(list_sj)
					setTimeout(function() {
						that.mallOrder_list_date = that.mallOrder_list_date.concat(list_sj)
						if (list_sj.length < 20) {
							that.totalRow.status = 'nomore';
						} else {
							that.totalRow.pageNumber++
							that.totalRow.status = 'loadmore';
						}
					}, 200);
				})
			},
			quxsq(id) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否取消申请！',
					success: function(res) {
						if (res.confirm) {
							order.mallOrderApplyRefund_cancel({
								id: id
							}).then(res => {
								that.$u.toast(`取消成功！`);
								that.czhi()
							})
						}
					}
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		background: #F5F5F5;
		min-height: 100vh;

		.cell {
			width: 708rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 20rpx;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;
			margin-top: 20rpx;

			.header {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bt {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.img_v {
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}

					.tx {
						margin-right: 10rpx;
					}

					.orderStatus {
						display: flex;
						justify-content: flex-end;
						align-items: center;

						text {
							text-align: right;
							color: #802890;
						}
					}
				}
			}

			.neir {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-content: flex-start;
				flex-wrap: wrap;
				margin-top: 20rpx;

				.cl_v {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					align-content: flex-start;
					padding: 20rpx 0rpx;
					border-bottom: 1rpx solid #F5F5F5;
				}

				.cl_vs {
					border: none;
				}

				.cl_vs_img {
					flex-wrap: wrap;
				}

				.name {
					width: 120rpx;
					height: 30rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 30rpx;
					color: #282828;
					text-align: left;
				}

				.r {
					width: calc(100% - 130rpx);
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 30rpx;
					margin-left: 10rpx;
				}

				.img {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					align-content: flex-start;
					flex-wrap: wrap;
					margin-top: 10rpx;

					.tx {
						background: #F5F5F5;
						margin: 8rpx;
					}
				}

				.ann {
					width: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					height: 80rpx;

					text {
						height: 48rpx;
						border: 1rpx solid #802890;
						border-radius: 26rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #802890;
						text-align: center;
						padding: 0rpx 20rpx;
						line-height: 46rpx;
					}
				}
			}
		}
	}
</style>
