<template>
	<view class="content_mall">
		<view class="nav">
			<text :class="isNav==index?'act':''" v-for="(item,index) in navDate"
				@click="isNavTap(index)">{{item}}</text>
		</view>
		<view class="pj_cell" v-for="(item,index) in findEvaluateList_date" :key='index'>
			<u-image class="tx" width="88rpx" height="88rpx" border-radius='44'
				:src="item.goodsInfoVO&&item.goodsInfoVO.goodsResourceDtos?item.goodsInfoVO.goodsResourceDtos[0].fileVisitUrl:''">
			</u-image>
			<view class="text">
				<view class="names"><text>{{item.goodsInfoVO.goodsName}}</text> <text class="time">{{$SOtime.time1(item.createTime)}}</text>
				</view>
				<u-rate :count="item.evaluateBranch" active-color='#FFB200' disabled v-model="item.evaluateBranch">
				</u-rate>
				<view class="content_text">
					<text>{{item.evaluateContent}}</text>
					<u-image v-for="(cell,indexs) in item.staticResourceVOS" :key='indexs' class="image" width="118rpx"
						height="118rpx" border-radius='10' :src="cell.fileVisitUrl"
						@click="previewImage(item.staticResourceVOS,indexs)">
					</u-image>
				</view>
			</view>
		</view>
		<u-loadmore :status="totalRow.status" v-if="findEvaluateList_date.length!=0" />
		<no-result message="" v-else style="margin-top: 200rpx;"></no-result>
	</view>
</template>

<script>
	import goods from '../../../../../api/mallUser/goods.js'
	import store from '../../../../../store/index.js';
	export default {
		data() {
			return {
				id: 0,
				isNav: 0,
				values: 2,
				navDate: ['全部', '有图', '好评', '差评'],
				findEvaluateList_date: [],
				findEvaluateList_totalRow:0,
				totalRow: {
					pageNumber: 1,
					rowNumber: 20,
					status: 'loadmore'
				},
			};
		},
		onLoad(optin) {
			this.id = optin.id
			var that = this
			var date = {
				goodsId:that.id,
				pageNumber: that.totalRow.pageNumber,
				rowNumber: that.totalRow.rowNumber,
			}
			this.findEvaluateList(date)
		},
		methods: {
			isNavTap(index) {
				var that = this
				that.isNav = index
				that.totalRow.pageNumber = 1
				var date = {}
				if (index == 0) {
					date = {
						goodsId:that.id,
						pageNumber: that.totalRow.pageNumber,
						rowNumber: that.totalRow.rowNumber,
					}
				} else if (index == 1) {
					date = {
						goodsId:that.id,
						pageNumber: that.totalRow.pageNumber,
						rowNumber: that.totalRow.rowNumber,
						haveImg: 1
					}
				} else if (index == 2) {
					date = {
						goodsId:that.id,
						pageNumber: that.totalRow.pageNumber,
						rowNumber: that.totalRow.rowNumber,
						praise: 1
					}
				} else if (index == 3) {
					date = {
						goodsId:that.id,
						pageNumber: that.totalRow.pageNumber,
						rowNumber: that.totalRow.rowNumber,
						praise: 2
					}
				}
				that.findEvaluateList_date = []
				that.$uniPopup.showLoading('加载中')
				that.findEvaluateList(date)
			},
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
			 * 获取商品评价列表
			 */
			findEvaluateList(date) {
				var that = this
				that.totalRow.status = 'loading'
				goods.findEvaluateList(date).then(res => {
					var list_sj = res.data && res.data.list ? res.data.list : [];
					setTimeout(function() {
						that.$uniPopup.hideLoading(100)
						that.findEvaluateList_date = that.findEvaluateList_date.concat(list_sj)
						that.findEvaluateList_totalRow = res.data && res.data.totalRow ? res.data.totalRow : 0;
						if (list_sj.length < 20) {
							that.totalRow.status = 'nomore';
						} else {
							that.totalRow.pageNumber++
							that.totalRow.status = 'loadmore';
						}
					}, 200);
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.content_mall {
		display: flex;
		flex-direction: column;
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
	}

	.nav {
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0rpx 26rpx;

		text {
			font-size: 30rpx;
			font-family: PingFang SC;
			color: #555555;
			height: 90rpx;
			line-height: 90rpx;
		}

		.act {
			font-weight: bold;
			color: #802890;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				width: 50rpx;
				height: 6rpx;
				background: linear-gradient(90deg, #802890 0%, #7928C5 100%);
				border-radius: 3rpx;
				bottom: 0rpx;
				left: calc(50% - 25rpx);
			}
		}
	}

	.u-tab-view {
		flex: 1;
		// display: flex;
	}

	.pj_cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-content: flex-start;
		padding: 40rpx 30rpx;
		background: #FFFFFF;
		border-bottom: 1rpx solid #DFDFDF;

		.tx {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
		}

		.text {
			width: calc(100% - 110rpx);
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;

			.names {
				width: 100%;
				height: 30rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #282828;
				margin-bottom: 7rpx;

				.time {
					font-size: 22rpx;
					color: #999999;
				}
			}

			.content_text {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-content: flex-start;
				flex-wrap: wrap;
				margin-top: 10rpx;

				text {
					width: 100%;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #282828;
					margin-bottom: 10rpx;
				}

				image {
					width: 118rpx;
					height: 118rpx;
					border-radius: 6rpx;
					margin-right: 10rpx;
					margin-top: 16rpx;
				}
			}
		}
	}
</style>
