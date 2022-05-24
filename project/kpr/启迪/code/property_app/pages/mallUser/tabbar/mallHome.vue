<template>
	<view class="home_view" id="mainBox">
		<scroll-view scroll-y="true" class="scroll-Y" lower-threshold='100' @scrolltolower="findListDate_list">
			<view class="bj_v">
				<mallSearch :isBack='false' :isHOME='true'></mallSearch>
				<view class="banner">
					<u-swiper :list="lista" mode='none' :effect3d="true" height="280" bg-color='transparent'></u-swiper>
				</view>
				<view class="list_content">
					<view class="cell" v-for="(item,index) in list_content" :key='index'>
						<image :src="'../../../static/mall/home/lust'+index+'.png'" mode=""></image>
						<text>{{item.text}}</text>
					</view>
					<view class="cell" @click="$emit('update:content', 1 )">
						<image :src="'../../../static/mall/home/lust4.png'" mode=""></image>
						<text>更多</text>
					</view>
				</view>
				<view class="sjView">
					<view class="bt">
						<text class="wz">附近商家</text>
						<view class="gd" @click="$goPage(['/pages/mallUser/search/searchXQ/searchXQ'])">
							<text>查看更多 </text>
							<uni-icons type="arrowright" size="12" color='#555555'></uni-icons>
						</view>
					</view>
					<view class="nav">
						<text v-for="(item,index) in navList" :key='index' @click="cshuaSJ(index)"
							:class="isNav==index?'act':''">{{item}}</text>
					</view>
					<scroll-view scroll-x="true" class="scroll-X" enable-flex>
						<view @click="$goPage(['/pages/mallUser/home/home'],function fun() {return {'id': item.id}})"
							class="sj_cell" v-for="(item,index) in mallShop_list_date" :key='index'>
							<image :src="item.shopHeadUrl" mode="aspectFill"></image>
							<text class="mz">{{item.shopsName}}</text>
							<text>{{item.shopsAddreass}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="cell_v">
					<view class="navs">
						<text v-for="(item,index) in navLists" :key='index' @click="cshua(index)"
							:class="isNavs==index?'act':''">{{item}}</text>
					</view>
					<view class="" v-for="(item,index) in navLists" :key='index' v-if="isNavs==index">
						<u-waterfall v-model="findListDate" ref="uWaterfall">
							<template v-slot:left="{leftList}">
								<view
									@click="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': item.id}})"
									class="cell" v-for="(item, index) in leftList" :key="index">
									<u-lazy-load threshold="-450" border-radius="15"
										:image="item.goodsResourceDtos?item.goodsResourceDtos[0].fileVisitUrl:''"
										img-mode='aspectFill' height="350" :index="index">
									</u-lazy-load>
									<view class="title">
										{{item.goodsName}}
									</view>
									<view class="tag-owner">
										<text>¥ <text>{{$uniPopup.numFilter(item.goodsSalePrice)}}</text> </text>
										<text class="yuanj">¥{{$uniPopup.numFilter(item.goodsPrice)}}</text>
									</view>
									<view class="moban" v-if="item.goodsStatus==3">
										<text>已下架</text>
									</view>
									<view class="moban" v-if="item.goodsStatus==4">
										<text>缺货</text>
									</view>
								</view>
							</template>
							<template v-slot:right="{rightList}">
								<view
									@click="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': item.id}})"
									class="cell" v-for="(item, index) in rightList" :key="index">
									<u-lazy-load threshold="-450" border-radius="15"
										:image="item.goodsResourceDtos?item.goodsResourceDtos[0].fileVisitUrl:''"
										img-mode='aspectFill' height="350" :index="index">X
									</u-lazy-load>
									<view class="title">
										{{item.goodsName}}
									</view>
									<view class="tag-owner">
										<text>¥ <text>{{$uniPopup.numFilter(item.goodsSalePrice)}}</text> </text>
										<text class="yuanj">¥{{$uniPopup.numFilter(item.goodsPrice)}}</text>
									</view>
									<view class="moban" v-if="item.goodsStatus==3">
										<text>已下架</text>
									</view>
									<view class="moban" v-if="item.goodsStatus==4">
										<text>缺货</text>
									</view>
								</view>
							</template>
						</u-waterfall>
					</view>
					<u-loadmore :status="loadStatus" @loadmore="findListDate_list"></u-loadmore>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniIcons from "../../../components/uni-icons/uni-icons.vue";
	import uswiper from "../../../components/uni-icons/uni-icons.vue";
	import goods from '../../../api/mallUser/goods.js';
	import mallSearch from "../../../components/mallSearch/mallSearch.vue";
	export default {
		content: {
			type: [Number, String],
			default: 0,
		},
		data() {
			return {
				top: uni.getSystemInfoSync().statusBarHeight + 'px',
				getLocation: null,
				isNav: 0,
				isNavs: 0,
				navList: ['配送到家', '点评高分'],
				navLists: ['配送到家', '销售量高', '点评高分'],
				list_content: [{
						url: '',
						text: '美食'
					},
					{
						url: '',
						text: '甜点饮品'
					},
					{
						url: '',
						text: '医药'
					},
					{
						url: '',
						text: '超市'
					}
				],
				lista: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				findListDate: [],
				mallShop_list_date: [],
				pageDate: {
					pageNumber: 1,
					rowNumber: 10,
				},
				loadStatus: 'loadmore',
			};
		},
		mounted() {
			this.cshuaSJ(0)
			this.cshua(0)
		},
		methods: {
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			},
			cshua(index) {
				this.isNavs = index
				this.loadStatus = 'loadmore';
				this.pageDate.pageNumber = 1
				this.findListDate = []
				this.findListDate_list(true)
			},
			cshuaSJ(index) {
				this.isNav = index
				var pageDateSoures = null
				if (index == 0) {
					pageDateSoures = {
						pageNumber: "1",
						rowNumber: "10",
						doorToDoorDelivery: 1,
						distanceSort: 1
					}
				} else {
					pageDateSoures = {
						pageNumber: "1",
						rowNumber: "10",
						praiseDegreeSort: 1,
					}
				}
				this.mallShop_list(pageDateSoures)
			},
			/**
			 * 附近商家
			 */
			mallShop_list(pageDateSoures) {

				goods.mallShop(pageDateSoures).then(res => {
					console.log(res)
					this.mallShop_list_date = res.data && res.data.list ? res.data.list : [];
				})
			},
			/**
			 * 商品列表
			 */
			findListDate_list(isOne) {
				var that = this
				if (that.loadStatus == 'nomore' || that.loadStatus == 'loading') {
					return
				}
				that.loadStatus = 'loading';
				var pageDateSoures = that.pageDate
				pageDateSoures['extendStatus'] = Number(that.isNavs + 1)
				goods.findList(pageDateSoures).then(res => {
					var date_list = res.data && res.data.list ? res.data.list : []
					setTimeout(function() {

						that.findListDate = that.findListDate.concat(date_list)
						if (date_list.length < 10) {
							that.loadStatus = 'nomore';
						} else {
							that.pageDate.pageNumber++
							that.loadStatus = 'loadmore';
						}
						console.log(that.findListDate)
					}, 500);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.home_view {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;

		.scroll-Y {
			width: 100%;
			height: 100%;
		}

		.bj_v {
			background: #F5F5F5 url(../../../static/mall/tabbar/tuoyan.png)top center no-repeat;
			background-size: 100% 360rpx;
			width: 100%;
		}

		.banner {
			width: 100%;
			height: 280rpx;
			margin-top: 23rpx;
		}

		.list_content {
			width: 100%;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.cell {
				width: 20%;
				display: flex;
				justify-content: center;
				align-content: flex-start;
				flex-wrap: wrap;

				image {
					width: 100rpx;
					height: 100rpx;
				}

				text {
					width: 100%;
					text-align: center;
					height: 25rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #555555;
					line-height: 25rpx;
					margin-top: 13rpx;
				}
			}
		}

		.sjView {
			width: 696rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;
			margin: 25rpx auto;

			.bt {
				width: 100%;
				padding: 0rpx 24rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 25rpx;

				.wz {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #282828;
				}

				.gd {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 24rpx;
					color: #555555;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					text {
						margin: 0rpx;
					}
				}
			}

			.nav {
				width: 100%;
				background: #FFFFFF;
				margin-top: 25rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0rpx 24rpx;

				text {
					width: 150rpx;
					height: 56rpx;
					background: #F5F5F5;
					border-radius: 28rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #555555;
					text-align: center;
					line-height: 56rpx;
					margin-right: 24rpx;
				}

				.act {
					position: relative;
					color: #802890;
					background: #F9F2FA;
				}
			}

			.scroll-X {
				width: 100%;
				height: 235rpx;
				margin-top: 23rpx;
				padding-left: 15rpx;
				white-space: nowrap;
				margin-bottom: 30rpx;

				.sj_cell {
					display: inline-block;
					width: 180rpx;
					height: 234rpx;
					background: #F5F5F5;
					border-radius: 16rpx;
					margin-left: 15rpx;

					image {
						width: 180rpx;
						height: 140rpx;
						background: #D2D2D2;
						border-radius: 16rpx 16rpx 0px 0px;
						float: left;
					}

					text {
						width: calc(100% - 20rpx);
						color: #656565;
						float: left;
						font-size: 22rpx;
						text-align: center;
						font-weight: normal;
						margin-left: 10rpx;
						overflow: hidden; //溢出隐藏   (father)
						text-overflow: ellipsis; //超出显示省略号 (father)
						white-space: nowrap; //强制文本在一行内显示 (text)
						text-align: left;
					}

					.mz {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #282828;
						line-height: 34rpx;
						margin-top: 15rpx;
					}
				}
			}
		}


		.cell_v {
			width: 100%;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;
			padding: 17rpx;
			padding-bottom: 100rpx;

			.navs {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0rpx 30rpx;
				margin-bottom: 30rpx;

				text {
					width: 150rpx;
					height: 56rpx;
					background: #EEEEEE;
					border-radius: 28rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #555555;
					line-height: 56rpx;
					text-align: center;
				}

				.act {
					background: #802890;
					color: #FFFFFF;
				}
			}

			.u-waterfall {
				width: 100%;
			}

			.u-load-more-wrap {
				width: 100%;
			}

			.cell {
				width: 338rpx;
				margin: 9rpx;
				background: #FFFFFF;
				border-radius: 15rpx;
				position: relative;

				.title {
					width: 100%;
					padding: 0rpx 18rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					margin-top: 12rpx;
					color: #282828;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.tag-owner {
					width: 100%;
					padding: 0rpx 18rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-top: 10rpx;
					margin-bottom: 10rpx;

					text {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FF884D;

						text {
							font-size: 36rpx;
						}
					}

					.yuanj {
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						font-size: 24rpx;
						margin-left: 10rpx;
						text-decoration: line-through;
					}


				}

				.moban {
					width: 100%;
					height: 100%;
					background: rgba(255, 255, 255, 0.6);
					position: absolute;
					left: 0rpx;
					top: 0rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
						background: rgba(0, 0, 0, 0.4);
						padding: 2rpx 20rpx;
						border-radius: 20rpx;
					}
				}
			}
		}
	}
</style>
