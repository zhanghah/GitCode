<template>
	<view class="service-goods">
		<view class="head" @tap="headTouchHandler">
			<view class="title">
				<view class="name">{{name}}</view>
				<template v-if="desc">
					<view class="line"></view>
					<view class="desc">{{desc}}</view>
				</template>
			</view>

			<view class="arrow"></view>
		</view>

		<view class="goods-list">
			<view class="item" v-for="i in 3" :key="i">
				<view class="img">
					<!-- <image></image> -->
				</view>
				<view class="name">长寿湖太极岛休闲生态2日游</view>
				<view class="price">
					<view class="money"><view class="icon">￥</view> 28.2</view>
					<view class="number">已售2589</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/api"
	export default {
    name: 'ServiceGoods',
		components: {
		},
		props: {
			type: String,
			name: String,
			desc: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
			}
		},
		beforeMount() {
		},
		methods: {
			getGoodsList(){
				uni.request({
					url:"https://shop.kupurui.cn/index.php?s=/api/goods/lists",
					method:"POST",
					data:{
								token:"08b1ff175508ebe008770166dc574e6f",
								wxapp_id:"10017",
								page:"1",
								listRows:"4",
								sortType:"all",
								sortPrice:"0",
								is_recommended:"1",
								goods_type:"20"
					},
					success(res) {
						console.log(res)
					}
				})
			},
			headTouchHandler() {
				this.$emit('more');
			},
		}
	}
</script>

<style scoped lang="less">
  .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 30rpx;
	}

	.title {
		display: flex;
		align-items: center;

		.name {
			font-size: 34rpx;
			color: #020204;
			font-weight: bold;
		}

		.line {
			width: 2rpx;
			height: 24rpx;
			background-color: #9E9E9E;
			margin: 0 20rpx;
		}

		.desc {
			font-size: 24rpx;
			color: #9E9E9E;
		}
	}
	.arrow {
		width: 13rpx;
		height: 24rpx;
		background: url(@/static/components/icon_link_arrow.png) no-repeat;
		background-size: 100% 100%;
	}

	.goods-list {
		display: flex;
		flex-wrap: wrap;
	}
	.item {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 50rpx;
		.name {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 30rpx;
			padding-right: 20rpx;
		}
		.img {
			width: 340rpx;
			height: 340rpx;
			background-color: rgba(0, 0, 0, 0.1);
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}

		.price {
			display: flex;
			align-items: center;

			.number {
				font-size: 26rpx;
				color: #999999;
			}

			.money {
				display: flex;
				align-items: flex-end;
				font-size: 36rpx;
				color: #FB9200;
				font-weight: bold;
				margin-right: 10rpx;

				.icon {
					font-size: 24rpx;
					position: relative;
					bottom: 6rpx;
				}
			}
		}
	}
</style>
