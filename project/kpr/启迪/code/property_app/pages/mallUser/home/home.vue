<template>
	<view class="content_mall" :style="{'padding-top':top}">
		<view class="header">
			<view class="back-img" @click="$goPage('back')">
				<uni-icons type="back" size="24" color='#282828'></uni-icons>
			</view>
			<view class="rImg">
				<u-icon name="search" color="#282828" size="38"></u-icon>
				<u-icon name="star" color="#282828" size="38"></u-icon>
				<u-icon name="more-dot-fill" color="#282828" size="38"></u-icon>
			</view>
		</view>
		<view class="gudtb">
			<view class="mall_header" v-if="mallShop_id_date">
				<view class="left">
					<view class="name">
						<text class="in">{{mallShop_id_date.shopsName}}</text>
						<text class="psfs" v-if="mallShop_id_date.businessStatus==1">送货上门</text>
						<text class="businessStatus" v-else>停业中</text>
					</view>
					<view class="pf">
						<u-icon name="star-fill" color="#FFB200" size="38"></u-icon>
						<text>{{mallShop_id_date.praiseDegree?mallShop_id_date.praiseDegree:'0'}}</text>
						<text class="xl">月售{{mallShop_id_date.monthlySales}}</text>
						<view class="daz">
							<!-- <text class="one">50减5</text> -->
							<text>{{mallShop_id_date.shopsNature==1?'商业店铺':'自由工作者'}}</text>
						</view>
					</view>
				</view>
				<u-image class="logo" width="96rpx" height="96rpx" border-radius='10'
					:src="mallShop_id_date.frontImageUrl">
				</u-image>
				<view class="xiala">
					<u-collapse :arrow='false'>
						<u-collapse-item>
							<template slot='title-all' class="title">
								<view class="icon_xial">
									<u-icon name="arrow-down" color="#999999" size="24"></u-icon>
								</view>
							</template>
							<view class="zhankaiView">
								<view class="cell cells">
									<text class="name">商家照片</text>
									<view class="img_v">
										<u-image class="tx" width="202rpx" height="136rpx" border-radius='10'
											:src="mallShop_id_date.frontImageUrl"  @click="previewImage(0)">
											<view slot="error" style="font-size: 24rpx;">加载失败</view>
										</u-image>
										<u-image class="tx" width="202rpx" height="136rpx" border-radius='10'
											:src="mallShop_id_date.shopsInternalEnvironmentImageUrl" @click="previewImage(1)" >
											<view slot="error" style="font-size: 24rpx;">加载失败</view>
										</u-image>
									</view>
								</view>
								<view class="cell">
									<text class="name">商家地址：</text>
									<view class="wz">
										<text>{{mallShop_id_date.shopsAddreass}}</text>
									</view>
								</view>
								<view class="cell">
									<text class="name">商家电话：</text>
									<view class="wz" @click="lxsj(mallShop_id_date.contactPhoneNumber)">
										<text>联系商家</text>
										<image src="../../../static/mall/home/phone.png" mode="aspectFill"></image>
									</view>
								</view>
								<!-- <view class="cell">
									<text class="name">商家详情：</text>
									<view class="wz">
										<text>{{mallShop_id_date.shopsAddreass}}</text>
									</view>
								</view> -->
								<!-- <view class="yhupjia">
									<view class="pj_header">
										<text>用户评价(8)</text>
										<view class="pj_r">
											<text>更多</text>
											<u-icon name="arrow-right" color="#999999" size="24"></u-icon>
										</view>
									</view>
									<view class="pj_cell">
										<image class="tx" src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode="">
										</image>
										<view class="text">
											<view class="name"><text>可爱的辛巴</text> <text class="time">上午 08:27</text>
											</view>
											<u-rate :count="value" active-color='#FFB200' disabled v-model="value">
											</u-rate>
											<view class="content_text">
												<text>这家店我经常买这家店我经常买这家店我经常买这家店我经常买这家店我经常买这家店我经常买，新鲜实惠，非常好！</text>
												<image src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode=""></image>
												<image src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode=""></image>
												<image src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode=""></image>
												<image src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode=""></image>
											</view>
										</view>
									</view>
								</view> -->
								<!-- <view class="shangla" @click="guanb">
									<u-icon class="arrow_up" name="arrow-up" color="#999999" size="24"></u-icon>
								</view> -->
							</view>
						</u-collapse-item>
					</u-collapse>
				</view>
			</view>
		</view>

		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in mallShop_findRootList_date" :key="index" class="u-tab-item"
					:class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
					@tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.categoryName}}</text>
				</view>
			</scroll-view>
			<block>
				<scroll-view scroll-y class="right-box">
					<view class="page-view" v-if="mallShop_spuInfoList_date.length != 0">
						<view class="class-item" v-for="(item,index) in mallShop_spuInfoList_date" :key='index'>
							<u-image
								@click="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': item.id}})"
								class="tx" width="197rpx" height="204rpx" border-radius='15'
								:src="item.goodsResourceDtos[0].fileVisitUrl">
								<view slot="error" style="font-size: 24rpx;">加载失败</view>
							</u-image>
							<view class="item_text">
								<text class="name">{{item.goodsName}}</text>
								<text class="ms">{{item.goodsProfile}}</text>
								<view class="xl">
									<text>月售{{item.monthlySales}}</text>
									<view class="number">
										<u-icon v-if="item.number!=0" @click="addAndJian(index,false)"
											name="minus-circle-fill" color="#802890" size="37"></u-icon>
										<text v-if="item.number!=0">{{item.number}}</text>
										<u-icon name="plus-circle-fill" color="#802890" size="37"
											@click="addAndJian(index,true)">
										</u-icon>
									</view>
								</view>
								<view class="price">
									<text>秒杀价 ¥{{$uniPopup.numFilter(item.goodsSalePrice)}} </text>
									<text class="yj">¥{{$uniPopup.numFilter(item.goodsPrice)}}</text>
								</view>
							</view>
							<view class="moban" v-if="item.goodsStatus==3">
								<text>已下架</text>
							</view>
							<view class="moban" v-if="item.goodsStatus==4">
								<text>缺货</text>
							</view>
						</view>
						<u-loadmore :status="totalRow.status"></u-loadmore>
					</view>
					<no-result message="" v-else style="margin-top: 200rpx;"></no-result>
				</scroll-view>
			</block>
		</view>
		<mallShoppingCart :isModeShow.sync="modeDate.isModeShow"></mallShoppingCart>
		<mallShoppingMode :goodsId.sync="modeDate.id" :isModeShow.sync="modeDate.isModeShow"
			:goods_id_date.sync='modeDate.goods_id_date'></mallShoppingMode>

	</view>
</template>

<script>
	import uniIcons from "../../../components/uni-icons/uni-icons.vue";
	import mallShoppingCart from "../../../components/mallShoppingCart/mallShoppingCart";
	import goods from '../../../api/mallUser/goods.js';
	import mallShoppingMode from "../../../components/mallShoppingMode/mallShoppingMode";
	export default {
		components: {
			uniIcons,
			mallShoppingCart,
			mallShoppingMode
		},
		data() {
			return {
				top: uni.getSystemInfoSync().statusBarHeight + 'px',
				id: null,
				mallShop_id_date: null,

				current: 0,
				mallShop_findRootList_date: [],
				mallShop_spuInfoList_date: [],


				value: 2,
				isCollapse: false,

				scrollTop: 0, //tab标题的滚动条位置
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度

				totalRow: {
					pageNumber: 1,
					rowNumber: 30,
					status: 'loadmore'
				},
				modeDate: {
					id: null,
					isModeShow: false,
					goods_id_date: null
				}
			}
		},
		onLoad(optin) {
			this.id = optin.id
			if (optin.id) {
				this.mallShop_id()
			}
		},

		methods: {
			previewImage(index) {
				var dateImg = []
				dateImg.push(this.mallShop_id_date.frontImageUrl)
				dateImg.push(this.mallShop_id_date.shopsInternalEnvironmentImageUrl)
				uni.previewImage({
					urls:dateImg,
					current: dateImg[index] 
				});
			},
			/**
			 * 加入購物車數量變動
			 * @param {Object} index
			 * @param {Object} isAdd
			 */
			addAndJian(index, isAdd) {
				this.modeDate.id = this.mallShop_spuInfoList_date[index].id
				var a = [];
				a.push(this.mallShop_spuInfoList_date[index])
				this.modeDate.goods_id_date = a
				this.modeDate.isModeShow = true
			},
			/**
			 * 撥打電話
			 * @param {Object} number
			 */
			lxsj(number) {
				uni.makePhoneCall({
					phoneNumber: number
				});
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			guanb() {
				this.isCollapse = false
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			/**
			 * 查询店铺
			 */
			mallShop_id() {
				goods.mallShop_id({
					id: this.id,
				}).then(res => {
					this.mallShop_id_date = res.data ? res.data : [],
					this.mallShop_findRootList()
				})
			},
			/**
			 * 查詢左邊的分類
			 */
			mallShop_findRootList() {
				goods.mallShop_findRootList({
					shopId: this.id,
				}).then(res => {
					this.mallShop_findRootList_date = res.data ? res.data : []
					this.mallShop_spuInfoList(this.mallShop_findRootList_date[0].id, true)
				})
			},
			/**
			 * 查詢產品
			 */
			mallShop_spuInfoList(categoryId, isCs) {
				var that = this
				that.totalRow.status = 'loading'
				var list_sj = []
				goods.mallShop_spuInfoList({
					categoryId: categoryId,
					shopId: that.id,
					pageNumber: that.totalRow.pageNumber,
					rowNumber: that.totalRow.rowNumber
				}).then(res => {
					var date_list = res.data && res.data.list ? res.data.list : []
					for (var i = 0; i < date_list.length; i++) {
						var oneDate = date_list[i]
						oneDate['number'] = 0
						list_sj.push(oneDate)
					}
					that.totalRow.pageNumber = that.totalRow.pageNumber + 1
					that.$uniPopup.hideLoading(1000)
					setTimeout(function() {
						if (isCs) {
							that.mallShop_spuInfoList_date = list_sj
						} else {
							that.mallShop_spuInfoList_date = that.mallShop_spuInfoList_date.concat(list_sj)
						}
						if (list_sj.length < 30) {
							that.totalRow.status = 'nomore';
						} else {
							that.totalRow.status = 'loadmore';
						}
					}, 500);
				})
				that.spuViewHistory_save()
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				console.log(index)
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
				this.$uniPopup.showLoading('加载中')
				this.totalRow.pageNumber = 1
				this.mallShop_spuInfoList(this.mallShop_findRootList_date[index].id, true)
			},
			
			/**
			 * 保存用户浏览的历史记录
			 */
			spuViewHistory_save() {
				goods.spuViewHistory_save({
					shopId: this.mallShop_id_date.id,
				}).then(res => {})
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},


		}
	}
</script>

<style lang="less" scoped>
	.content_mall {
		background: #FFFFFF;
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.header {
		width: 100%;
		height: 88upx;
		text-align: center;
		position: relative;

		.back-img {
			width: 22upx;
			height: 38upx;
			position: absolute;
			top: 28upx;
			left: 26upx;
			border-radius: 27rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.rImg {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			height: 100%;

			.u-icon {
				margin-left: 14rpx;
				margin-right: 20rpx;
			}
		}
	}

	.gudtb {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		position: relative;
		height: 196rpx;
	}

	.mall_header {
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0px 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.2);
		border-radius: 30rpx 30rpx 0px 0px;
		z-index: 888;
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;

		.left {
			width: 500rpx;
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;
			margin-left: 25rpx;
			margin-top: 25rpx;

			.name {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.in{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #282828;
				}
				.psfs {
					height: 32rpx;
					background: #FFB200;
					border-radius: 10rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 32rpx;
					padding: 0rpx 10rpx;
					margin-left: 10rpx;
				}
				.businessStatus{
					height: 32rpx;
					background: #808080;
					border-radius: 10rpx;
					font-size: 18rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 32rpx;
					padding: 0rpx 15rpx;
					margin-left: 10rpx;
				}
			}

			.pf {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: 25rpx;

				text {
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #FFB200;
				}

				.xl {
					color: #555555;
					margin-left: 35rpx;
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
						color: #555555;
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
			}
		}

		.logo {
			width: 96rpx;
			height: 96rpx;
			border-radius: 10rpx;
			margin-top: 25rpx;
			margin-left: 25rpx;
		}

		.xiala {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.icon_xial {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.zhankaiView {
				width: calc(100% - 56rpx);
				display: flex;
				justify-content: center;
				align-content: flex-start;
				flex-wrap: wrap;
				margin: 0px 28rpx;
				border-top: 1rpx solid #DFDFDF;
				padding-bottom: 50rpx;
				.cell {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					align-content: flex-start;
					margin-top: 30rpx;

					.name {
						width: 140rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						color: #999999;
					}

					.img_v {
						width: 100%;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						margin-top: 20rpx;

						.tx {
							width: 202rpx;
							height: 136rpx;
							border-radius: 10rpx;
							margin-right: 20rpx;
						}
					}

					.wz {
						width: calc(100% - 140rpx);
						font-size: 26rpx;
						font-family: PingFang SC;
						color: #282828;
						display: flex;
						justify-content: flex-start;
						align-items: center;

						image {
							width: 26rpx;
							height: 26rpx;
							margin-left: 20rpx;
						}
					}

				}

				.cells {
					flex-wrap: wrap;
				}

				.yhupjia {
					width: 100%;
					border-top: 1rpx solid #DFDFDF;
					margin-top: 40rpx;
					display: flex;
					justify-content: flex-start;
					align-content: flex-start;
					flex-wrap: wrap;

					.pj_header {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 25rpx;

						text {
							font-size: 26rpx;
							font-family: PingFang SC;
							color: #999999;
						}

						.pj_r {
							display: flex;
							justify-content: flex-end;
							align-items: center;

							text {
								color: #282828;
							}
						}
					}

					.pj_cell {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-content: flex-start;
						margin-top: 20rpx;

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

							.name {
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
				}

				.shangla {
					margin-top: 50rpx;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					padding-bottom: 20rpx;
				}
			}
		}
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
		position: relative;

		.u-tab-view {
			width: 180rpx;
			height: 100%;
			background: #F5F5F5;

			.u-tab-item {
				height: 104rpx;
				background: #F5F5F5;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: 28rpx;
				color: #555555;
				padding: 0rpx 27rpx;

				.u-line-1 {
					width: 100%;
					text-align: center;
					overflow: hidden;
					white-space: normal;
					text-overflow: ellipsis;
				}
			}

			.u-tab-item-active {
				position: relative;
				background: #fff;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #802890;
			}

			.u-tab-item-active::before {
				content: "";
				position: absolute;
				top: -20rpx;
				right: 0;
				width: 20rpx;
				height: 20rpx;
				background-image: radial-gradient(circle at 0% 0%, transparent 0%, transparent 20rpx, #fff 20rpx, #fff 100%);
			}

			.u-tab-item-active::after {
				content: "";
				position: absolute;
				bottom: -20rpx;
				right: 0;
				width: 20rpx;
				height: 20rpx;
				transform: rotate(-90deg);
				background-image: radial-gradient(circle at 0% 0%, transparent 0%, transparent 20rpx, #fff 20rpx, #fff 100%);
			}
		}

		.right-box {
			width: calc(100% - 180rpx);

			.page-view {
				width: 100%;
				display: flex;
				justify-content: center;
				align-content: flex-start;
				flex-wrap: wrap;
				padding: 0px 20rpx;
				padding-bottom: 120rpx;

				.class-item {
					width: 100%;
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;
					align-content: flex-start;
					position: relative;
					.tx {
						width: 197rpx;
						height: 204rpx;
						border-radius: 15rpx;
					}

					.item_text {
						width: calc(100% - 217rpx);
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
							line-height: 36rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.ms {
							width: 100%;
							font-size: 22rpx;
							font-family: PingFang SC;
							color: #999999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-top: 10rpx;
						}

						.xl {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 10rpx;

							text {
								font-size: 22rpx;
								font-family: PingFang SC;
								color: #555555;
							}

							.number {
								display: flex;
								justify-content: flex-end;
								align-content: center;
								height: 100%;

								text {
									width: 100%;
									font-size: 24rpx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #555555;
									text-align: right;
								}

								.timer {
									font-size: 24rpx;
									margin-bottom: 10rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
						}

						.price {
							width: 100%;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							margin-top: 10rpx;

							text {
								font-size: 28rpx;
								font-family: PingFang SC;
								color: #FF884E;

							}

							.yj {
								color: #555555;
								font-size: 22rpx;
								margin-left: 10rpx;
								text-decoration: line-through
							}
						}
					}
					.moban{
						width: 100%;
						height: 100%;
						background: rgba(255,255,255,0.6);
						position: absolute;
						left: 0rpx;
						top: 0rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						text{
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
							background: rgba(0,0,0,0.4);
							padding: 2rpx 20rpx;
							border-radius: 20rpx;
						}
					}
					
				}
			}
		}


	}
</style>
