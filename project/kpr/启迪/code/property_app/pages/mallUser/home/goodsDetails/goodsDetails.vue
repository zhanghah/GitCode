<template>
	<view class="content_mall">
		<view class="banner">
			<view class="header" :style="{'padding-top':top}">
				<view class="back-img" @click="$goPage('back')">
					<uni-icons type="back" size="24" color='#282828'></uni-icons>
				</view>
			</view>
			<u-swiper :list="goods_id_date.goodsResourceDtos" name="fileVisitUrl" mode='none' borderRadius="0"
				height="500" bg-color='transparent'></u-swiper>
			<view class="price">
				<text class="ms">秒杀价 ¥{{$uniPopup.numFilter(goods_id_date.goodsSalePrice)}}\n
					<text>¥{{$uniPopup.numFilter(goods_id_date.goodsPrice)}}</text></text>
				<view class="number">
					<!-- <text class="timer">距离结束 02:59:49</text> -->
					<text>剩余{{goods_id_date.surplusStock}}份</text>
				</view>
			</view>
		</view>
		<view class="name">
			<text class="list">{{goods_id_date.goodsName}}</text>
			<view class="xl">
				<text>月售{{goods_id_date.goodsSales}}</text>
				<!-- <text class="jrgwc">加入购物车</text> -->
				<view class="jrgwc jrgwcs"  v-if="goods_id_date.goodsStatus==3">
					<text>已下架</text>
				</view>
				<view class="jrgwc jrgwcs"  v-else-if="goods_id_date.goodsStatus==4">
					<text>缺货</text>
				</view>
				<view class="jrgwc" @click="addAndJian()" v-else>
					<u-icon name="plus" color="#ffffff" size="28"></u-icon>
				</view>
			</view>
		</view>
		<view class="ms">
			<text class="bt">商品描述</text>
			<text>{{goods_id_date.goodsRemark}}</text>
		</view>

		<view class="mall_header"
			@click="$goPage(['/pages/mallUser/home/home'],function fun() {return {'id': goods_id_date.shopId}})"
			v-if="goods_id_date.mallShopVO!=null">
			<view class="left">
				<text class="names">{{goods_id_date.mallShopVO.shopsName}}</text>
				<view class="pf">
					<u-icon name="star-fill" color="#FFB200" size="38"></u-icon>
					<text>4.6</text>
					<text class="xl">月售56</text>
					<view class="daz">
						<text class="one">50减5</text>
						<text>100减15</text>
					</view>
				</view>
			</view>
			<u-image class="logo" width="96rpx" height="96rpx" border-radius='10'
				:src="goods_id_date.mallShopVO.shopHeadUrl">
			</u-image>
			<u-icon class="arrow_right" name="arrow-right" color="#999999" size="24"></u-icon>
		</view>

		<view class="yhupjia">
			<view class="pj_header">
				<text>用户评价({{findEvaluateList_totalRow}})</text>
				<view class="pj_r"
					@click="$goPage(['/pages/mallUser/home/goodsDetails/evaluation/evaluation'],function fun() {return {'id':id}})">
					<text>更多</text>
					<u-icon name="arrow-right" color="#999999" size="24"></u-icon>
				</view>
			</view>
			<view class="pj_cell" v-for="(item,index) in findEvaluateList_date" :key='index'>
				<u-image class="tx" width="88rpx" height="88rpx" border-radius='44'
					:src="item.userInfoVO&&item.userInfoVO.headResourceURL?item.userInfoVO.headResourceURL:''">
				</u-image>
				<view class="text">
					<view class="names"><text>可爱的辛巴</text> <text class="time">上午 08:27</text>
					</view>
					<u-rate :count="values" active-color='#FFB200' disabled v-model="values">
					</u-rate>
					<view class="content_text">
						<text>{{item.evaluateContent}}</text>
						<u-image v-for="(cell,indexs) in item.staticResourceVOS" :key='indexs' class="image" width="118rpx" height="118rpx" border-radius='10'
							:src="cell.fileVisitUrl">
						</u-image>
					</view>
				</view>
			</view>
		</view>
		<mallShoppingCart :isModeShow.sync="modeDate.isModeShow"></mallShoppingCart>
		<mallShoppingMode :goodsId="modeDate.id" :isModeShow.sync="modeDate.isModeShow"
			:goods_id_date.sync='modeDate.goods_id_date' @onGetTableData="(res)=>onGetTableData(res)">
		</mallShoppingMode>
	</view>
</template>

<script>
	import mallShoppingCart from "../../../../components/mallShoppingCart/mallShoppingCart";
	import mallShoppingMode from "../../../../components/mallShoppingMode/mallShoppingMode";
	import goods from '../../../../api/mallUser/goods.js'
	import api from '@/api';
	import store from '@/store/index.js';
	export default {
		components: {
			mallShoppingCart,
			mallShoppingMode
		},
		data() {
			return {
				values: 2,
				goods_id_date: {},
				findListBySpuId_date: [],
				mallShop_id_date: null,
				findEvaluateList_date: [],
				findEvaluateList_totalRow:0,
				top: uni.getSystemInfoSync().statusBarHeight + 'px',

				modeDate: {
					id: null,
					isModeShow: false,
					goods_id_date: null
				},
				list4: [{
					url: 'https://cdn.uviewui.com/uview/resources/video.mp4',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东',
					poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
				}, {
					url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				}, {
					url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}],
			};
		},
		onLoad(optin) {
			this.id = optin.id
			if (optin.id) {
				this.goods_id_list()
				this.getUserInfo()
			}
		},
		methods: {
			onGetTableData(res) {
				this.id = res
				this.goods_id_list()
			},
			/**
			 * 加入購物車數量變動
			 * @param {Object} index
			 * @param {Object} isAdd
			 */
			addAndJian() {
				if (this.findListBySpuId_date.length == 0) {
					return
				}
				this.modeDate.id = this.goods_id_date.id
				this.modeDate.goods_id_date = this.findListBySpuId_date
				this.modeDate.isModeShow = true
			},
			/**
			 * 商品详情
			 */
			goods_id_list() {
				goods.goods_id({
					id: this.id
				}).then(res => {
					console.log(res)
					this.goods_id_date = res.data ? res.data : {}
					this.findListBySpuIdlist(this.goods_id_date.spuId)
					this.findEvaluateList()
				})
			},
			/**
			 * 根据产品id查询商品列表信息(不含分页)
			 */
			findListBySpuIdlist(spuId) {
				goods.findListBySpuId({
					spuId: spuId
				}).then(res => {
					console.log(res)
					this.findListBySpuId_date = res.data ? res.data : {}
				})
			},
			/**
			 * 获取商品评价列表
			 */
			findEvaluateList() {
				goods.findEvaluateList({
					goodsId: this.id,
					pageNumber: 1,
					rowNumber: 10
				}).then(res => {
					this.findEvaluateList_date = res.data && res.data.list? res.data.list : [],
					this.findEvaluateList_totalRow = res.data && res.data.totalRow ? res.data.totalRow : 0;
					this.spuViewHistory_save()
				})
			},
			/**
			 * 保存用户浏览的历史记录
			 */
			spuViewHistory_save() {
				goods.spuViewHistory_save({
					shopId: this.goods_id_date.shopId,
					spuId: this.goods_id_date.spuId
				}).then(res => {})
			},
			async getUserInfo() {
				var params  ={
					phone:store.state.user.phone
				}
				const res= await api.user.getUserInfo(params)
				if(res){
					console.log(res)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.banner {
		width: 100%;
		height: 500rpx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		.header {
			width: 100%;
			height: 88upx;
			text-align: center;
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			z-index: 999;

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

		.price {
			width: 100%;
			height: 90rpx;
			background: rgba(0, 0, 0, 0.5);
			position: absolute;
			left: 0rpx;
			bottom: 0rpx;
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.ms {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFB200;

				text {
					font-size: 24rpx;
					color: #FFFFFF;
					opacity: 0.6;
					font-weight: 400;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.number {
				display: flex;
				justify-content: flex-end;
				align-content: center;
				flex-wrap: wrap;
				height: 100%;

				text {
					width: 100%;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: right;
					white-space: nowrap;
				}

				.timer {
					font-size: 24rpx;
					margin-bottom: 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}

	.name {
		width: 100%;
		height: 130rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		align-content: center;
		flex-wrap: wrap;
		padding: 0rpx 30rpx;

		.list {
			width: 100%;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #282828;
		}

		.xl {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			margin-top: 15rpx;

			text {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}

			.jrgwc {
				width: 35rpx;
				height: 35rpx;
				background: #802890;
				color: #FFFFFF;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.jrgwcs {
				width: 100rpx;
				height: 35rpx;
				background: #F5F5F5;
				color: #3F3A39;
				border-radius: 2rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

	}

	.ms {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;
		padding: 0rpx 30rpx;

		text {
			width: 100%;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #282828;
			line-height: 40rpx;
		}

		.bt {
			width: 100%;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #656565;
			margin-top: 20rpx;
		}
	}

	.mall_header {
		width: 100%;
		background: #FFFFFF;
		z-index: 888;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 30rpx;
		margin-top: 50rpx;

		.left {
			width: 500rpx;
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;
			height: 100%;

			.names {
				width: 100%;
				height: 30rpx;
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
		}
	}

	.yhupjia {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;
		padding: 30rpx;
		margin-bottom: 50rpx;

		.pj_header {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

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
				background: #FFFFFF;
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
					}

					.image {
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
</style>
