<template>
	<view class="content_mall">
		<view class="mengc" :style="{'height':top,'opacity':styleObject}">

		</view>
		<view class="home_view" :style="{'padding-top':top}">
			<mallSearch :isBack='true' :search="totalRow.mallShopsClassificationId?false:true"></mallSearch>
			<view class="nav">
				<text v-for="(item,index) in navList" :key='index' @click="navTap(index)"
					:class="isNav==index?'act':''">{{item}}</text>
			</view>
			<view class="cell_v" v-if="isXS">
				<view class="cell" v-for="(item,index) in mallShop_list_dateSourse" :key='index'
					@click="$goPage(['/pages/mallUser/home/home'],function fun() {return {'id': item.id}})">
					<u-image class="tx" width="120rpx" height="120rpx" border-radius='12' :src="item.shopHeadUrl">
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u-image>
					<view class="right_v">
						<text class="name">{{item.shopsName}}</text>
						<view class="pf">
							<image src="../../../../static/mall/home/pf.png" mode="aspectFill"></image>
							<text>4.6</text>
							<text class="xl">月售43</text>
							<!-- <view class="daz">
								<text class="one">50减5</text>
								<text>100减15</text>
							</view> -->
						</view>
						<view class="ps">
							<view class="bqv">
								<text class="bq">配送到家</text>
								<!-- <text>起送 ¥20</text> -->
							</view>
							<!-- <text>2小时内 1.2km</text> -->
						</view>
						<view class="cp_list">
							<view class="cells" v-for="(cell,index_s) in item.findList" :key="index_s"
								@click.stop="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': cell.id}})">
								<u-image class="tx" width="156rpx" height="156rpx" border-radius='12'
									:src="cell.goodsResourceDtos?cell.goodsResourceDtos[0].fileVisitUrl:''">
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
								</image>
								<text>{{cell.goodsName}}</text>
								<text class="price">¥ {{$uniPopup.numFilter(cell.goodsSalePrice)}}</text>
							</view>
						</view>
					</view>
				</view>
				<no-result message="" v-if="mallShop_list_dateSourse.length==0" style="margin-top: 200rpx;"></no-result>
				<view class="loadStatus" v-else>
					<u-loadmore :status="totalRow.loadStatus" @loadmore="shujchushi(false)" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../../../components/uni-icons/uni-icons.vue";
	import goods from '../../../../api/mallUser/goods.js';
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				top: uni.getSystemInfoSync().statusBarHeight + 'px',
				getLocation: null,
				isNav: 0,
				navList: ['配送到家', '点评高分', '距离'],
				isXS: false,
				styleObject:0,
				/**
				 * 店铺
				 */

				mallShop_list_date: [],
				mallShop_list_dateSourse: [],
				/**
				 * 分页
				 */
				totalRow: {
					shopsName: '',
					mallShopsClassificationId: null,
					pageNumber: 1,
					rowNumber: 6,
					loadStatus: 'loadmore',
				},
			}
		},
		onPageScroll(e) {
			this.handleScroll(e.scrollTop)
		},
		onLoad(optin) {
			if (optin.mallShopsClassificationId) {
				this.totalRow.mallShopsClassificationId = optin.mallShopsClassificationId
			}
			if (optin.shopsName) {
				this.totalRow.shopsName = optin.shopsName
			}
			this.totalRow.pageNumber = 1
			this.totalRow.loadStatus = 'loadmore';
			this.shujchushi(true)
		},
		onReachBottom() {
			this.shujchushi(false)
		},
		methods: {
			// 导航栏滚动显示/隐藏
			handleScroll(top) {
				if (top > 90) {
					let opacity = top / 300
					opacity = opacity > 1 ? 1 : opacity
					this.styleObject = opacity
				}
			},
			navTap(index) {
				var that = this
				that.isNav = index
				that.totalRow.pageNumber = 1
				that.totalRow.loadStatus = 'loadmore';
				this.shujchushi(true)
			},
			/**
			 * 数据初始
			 */
			shujchushi(isCs) {
				var that = this
				var pageDateSoures = null
				var index = that.isNav
				if (index == 0) {
					pageDateSoures = {
						pageNumber: that.totalRow.pageNumber,
						rowNumber: that.totalRow.rowNumber,
						doorToDoorDelivery: 1,
						shopsName: that.totalRow.shopsName,
						mallShopsClassificationId: that.totalRow.mallShopsClassificationId,
					}
				} else if (index == 1) {
					pageDateSoures = {
						pageNumber: that.totalRow.pageNumber,
						rowNumber: that.totalRow.rowNumber,
						praiseDegreeSort: 1,
						shopsName: that.totalRow.shopsName,
						mallShopsClassificationId: that.totalRow.mallShopsClassificationId,
					}
				} else {
					pageDateSoures = {
						pageNumber: that.totalRow.pageNumber,
						rowNumber: that.totalRow.rowNumber,
						distanceSort: 1,
						shopsName: that.totalRow.shopsName,
						mallShopsClassificationId: that.totalRow.mallShopsClassificationId,
					}
				}
				that.mallShop_date(isCs, pageDateSoures)
			},
			/**
			 * 获取店铺列表
			 * @param {Object} date
			 */
			mallShop_date(isCs, dateSoure) {
				var that = this
				if (that.totalRow.loadStatus == 'nomore' || that.totalRow.loadStatus == 'loading') {
					return
				}
				that.totalRow.loadStatus = 'loading'
				goods.mallShop(dateSoure).then(res => {
					var date_list = res.data && res.data.list ? res.data.list : [];
					if (isCs) {
						that.mallShop_list_date = date_list
					} else {
						that.mallShop_list_date = that.mallShop_list_date.concat(date_list)
					}

					setTimeout(function() {
						if (date_list.length < 6) {
							that.totalRow.loadStatus = 'nomore';
						} else {
							that.totalRow.loadStatus = 'loadmore';
						}
					}, 500);
					if (date_list.length == 0) {
						that.isXS = true
						return
					}
					console.log(that.mallShop_list_date)
					that.shujuZ(that.mallShop_list_date)
				}).catch(res => {
					that.isXS = true
				});
			},
			shujuZ(date_s) {
				var that = this
				that.mallShop_spuInfoList(date_s[0].id, 0)
			},
			/**
			 * 查詢產品
			 */
			mallShop_spuInfoList(mallShop_id, index) {
				var that = this
				console.log(mallShop_id, index, that.mallShop_list_date.length - 1)
				if (index > that.mallShop_list_date.length - 1) {
					return
				}
				if (that.mallShop_list_date[index].findList) {
					that.mallShop_spuInfoList(that.mallShop_list_date[index + 1].id, index + 1)
					return
				}
				goods.mallShop_spuInfoList({
					shopId: mallShop_id,
					pageNumber: 1,
					rowNumber: 3
				}).then(res => {
					var date_list = res.data && res.data.list ? res.data.list : [];
					that.mallShop_list_date[index]['findList'] = date_list
					if (index >= that.mallShop_list_date.length - 1) {
						that.isXS = true
						that.totalRow.pageNumber = that.totalRow.pageNumber + 1
						that.mallShop_list_dateSourse = that.mallShop_list_date
						return
					}
					that.mallShop_spuInfoList(that.mallShop_list_date[index + 1].id, index + 1)
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.mengc {
		width: 100%;
		background: url(../../../../static/mall/tabbar/tuoyan.png)top center no-repeat;
		background-size: 100% 360rpx;
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		position: fixed;
		top: 0rpx;
		z-index: 999;
	}

	.home_view {
		background: url(../../../../static/mall/tabbar/tuoyan.png)top center no-repeat;
		background-size: 100% 360rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;

		.nav {
			width: 100%;
			height: 80rpx;
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0rpx 40rpx;

			text {
				width: calc(100%/3);
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 0.6);
				text-align: center;
				height: 100%;
				line-height: 80rpx;
			}

			.act {
				position: relative;
				color: #FFFFFF;
				font-size: 26rpx;

				&::after {
					width: 50rpx;
					height: 6rpx;
					background: #FFFFFF;
					border-radius: 3rpx;
					content: '';
					position: absolute;
					bottom: 0rpx;
					left: calc(50% - 25rpx);
				}
			}
		}

		.cell_v {
			width: 100%;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;

			.cell {
				padding: 15rpx;
				width: 696rpx;
				display: flex;
				align-content: flex-start;
				justify-content: flex-start;
				background: #FFFFFF;
				border-radius: 20rpx;
				margin-top: 20rpx;

				.img_v {
					width: 120rpx;
					height: 120rpx;
					background: #EE1B24;
					border-radius: 16rpx;
				}

				.right_v {
					width: calc(100% - 150rpx);
					margin-left: 30rpx;
					display: flex;
					justify-content: flex-start;
					align-content: flex-start;
					flex-wrap: wrap;

					.name {
						width: 100%;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #282828;
					}

					.pf {
						width: 100%;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						height: 24rpx;
						margin-top: 19rpx;

						image {
							width: 24rpx;
							height: 24rpx;
						}

						text {
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFB200;
							margin-left: 5rpx;
						}

						.xl {
							color: #555555;
							margin-left: 30rpx;
						}
					}

					.ps {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 32rpx;
						margin-top: 19rpx;

						text {
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #555555;
						}

						.bqv {
							display: flex;
							justify-content: flex-start;
							align-items: center;

							.bq {
								color: #FFFFFF;
								height: 32rpx;
								background: #FFB200;
								border-radius: 10px;
								padding: 0px 10rpx;
								margin-right: 20rpx;
							}
						}
					}

					.daz {
						height: 32rpx;
						border: 1rpx solid #F8B551;
						border-radius: 10rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						text-align: center;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #555555;
						margin-left: 30rpx;

						text {
							margin: 0px 15rpx;
						}

						.one {
							position: relative;

							&::after {
								content: '';
								width: 1rpx;
								height: 13rpx;
								background: #F8B551;
								opacity: 0.5;
								position: absolute;
								top: 10rpx;
								right: -15rpx;
							}
						}
					}

					.cp_list {
						width: 100%;
						display: flex;
						justify-content: flex-start;
						align-content: flex-start;
						flex-wrap: wrap;
						margin-top: 30rpx;

						.cells {
							width: 156rpx;
							display: flex;
							justify-content: flex-start;
							align-content: flex-start;
							flex-wrap: wrap;
							margin-right: 10rpx;

							image {
								width: 156rpx;
								height: 156rpx;
							}

							text {
								width: 100%;
								margin: 0rpx;
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 500;
								line-height: 22rpx;
								color: #282828;
								margin-top: 20rpx;
							}

							.price {
								margin-top: 15rpx;
								font-size: 28rpx;
								color: #FF884D;
							}
						}
					}
				}
			}

			.loadStatus {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 20rpx;
			}
		}
	}
</style>
