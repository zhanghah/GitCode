<template>
	<view class="shopping_v">
		<view class="price" v-if="mallShoppingCartList_data">
			<view class="img">
				<image src="../../static/mall/home/shoping.png" mode="aspectFill">
					<u-badge type="error" :is-center='true' :count="mallShoppingCartList_data.goodsTypeNumber"></u-badge>
				</image>
			</view>
			<text class="numb">¥{{$uniPopup.numFilter(mallShoppingCartList_data.actualTotalPrice)}} <text>¥{{mallShoppingCartList_data.primaryTotalPrice}}</text></text>
		</view>
		<text class="jsuan" @click="$goPage(['/pages/mallUser/shoppingCart/shoppingCart'])">去结算</text>
	</view>
</template>

<script>
	import goods from '../../api/mallUser/goods.js'
	
	export default {
		name: "mallShoppingCart",
		data() {
			return {
				mallShoppingCartList_data: null
			};
		},
		props: {
			isModeShow: {
				type: Boolean,
				default: false,
			},
		},
		watch: {
			isModeShow(e) {
				console.log("购物车",e)
				this.goodsTypeNumberAndTotalPrice()
			}
		},
		mounted() {
			this.goodsTypeNumberAndTotalPrice()
		},
		methods: {
			
			/**
			 * 购物车列表
			 */
			goodsTypeNumberAndTotalPrice() {
				goods.goodsTypeNumberAndTotalPrice({}).then(res => {
					this.mallShoppingCartList_data = res.data? res.data : []
				})
			}
		}
	}
</script>

<style lang="less">
	.shopping_v {
		position: fixed;
		width: 621rpx;
		height: 90rpx;
		background: #802890;
		border-radius: 45rpx;
		bottom: 20rpx;
		left: 66rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.price {
			width: 420rpx;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.img {
				width: 70rpx;
				height: 70rpx;
				margin-left: 40rpx;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.numb {
				font-size: 42rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				margin-right: 40rpx;

				text {
					font-size: 28rpx;
					color: #FFFFFF;
					opacity: 0.6;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}
		}

		.jsuan {
			width: 202rpx;
			height: 90rpx;
			background: #FFB200;
			border-radius: 0px 45rpx 45rpx 0px;
			line-height: 90rpx;
			text-align: center;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
		}
	}
</style>
