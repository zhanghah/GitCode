<template>
	<view class="my_view" >
		<text class="name_bt">个人中心</text>
		<view class="grxx" v-if="user">
			<!-- <image :src="user.headPortrait" mode="aspectFill"></image> -->
			<image mode="aspectFill" :src="`${imageView}${user.headPortrait}`">
			</image>
			<text>{{user.userName}}</text>
		</view>
		<view class="cell_v ">
			<view class="cell cells" @click="$goPage(['/pages/mallUser/shoppingCart/shoppingCart'])">
				<view class="img">
					<image src="../../../static/mall/my/list1.png" mode="aspectFill"></image>
					<!-- <u-badge type="error" is-center count="7"></u-badge> -->
				</view>
				<text>购物车</text>
			</view>
			<view class="cell cells" @click="order">
				<view class="img">
					<image src="../../../static/mall/my/list.png" mode="aspectFill"></image>
					<!-- <u-badge type="error" is-center count="7"></u-badge> -->
				</view>
				<text>订单</text>
			</view>
			<view class="cell " @click="$goPage(['/pages/mallUser/collection/collection'])">
				<view class="img">
					<image src="../../../static/mall/my/list2.png" mode="aspectFill"></image>
					<!-- <u-badge type="error" is-center count="7"></u-badge> -->
				</view>
				<text>收藏</text>
			</view>
		</view>
	
		<view class="list">
			<view class="cell " @click="$goPage(['/pages/mallUser/address/address'])">
				<view class="nam">
					<image src="../../../static/mall/my/address.png" mode="scaleToFill"></image>
					<text>地址管理</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view class="cell " @click="$goPage(['/pages/mallUser/order/evaluation/index'])">
				<view class="nam">
					<image src="../../../static/mall/my/pj.png" mode="scaleToFill"></image>
					<text>我的评论</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view class="cell cells" @click="$goPage(['/pages/mallUser/order/tuikuan/tuikuan'])">
				<view class="nam">
					<image src="../../../static/mall/my/sh.png" mode="scaleToFill"></image>
					<text>我的售后/退款</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<!-- <view class="cell cells">
				<view class="nam">
					<image src="../../../static/mall/my/phone.png" mode="scaleToFill"></image>
					<text>绑定手机号</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniIcons from "../../../components/uni-icons/uni-icons.vue";
	import uswiper from "../../../components/uni-icons/uni-icons.vue";
	import order from '../../..//api/mallUser/order.js'
	import store from '../../../store/index.js';
	import helper from '@/api/mallUser/helper.js'
	import config from '@/config/index.js';
	export default {
		props: {
			content:{
				type: [Number,String],
				default:4,
				
			},
		},
		computed: {
			...mapState([
				'imageView',
			]),
		},
		data() {
			return {
				user:null,
				baseUrl:config.apiRoot,
				userInfo: {}
			};
		},
		mounted() {
			this.user = store.state.user
			this.userInfo=this.user
			console.log(this.user )
		},
		methods: {
			order(){
				this.$emit('update:content', 3 )
			}
		}
	}
</script>

<style lang="less" scoped>
	.my_view {
		background: url(../../../static/mall/tabbar/tuoyan.png)top center no-repeat;
		background-size: 100% 360rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		.name_bt {
			width: 100%;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			margin-top: 43rpx;
		}
	
		.grxx {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: 35rpx;
	
			image {
				width: 102rpx;
				height: 102rpx;
				margin-left: 47rpx;
				border-radius: 50%;
			}
	
			text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				margin-left: 20rpx;
			}
		}
	
		.cell_v {
			width: 696rpx;
			height: 160rpx;
			background: #FFFFFF;
			box-shadow: 0px 2rpx 18rpx 0px rgba(0, 0, 0, 0.14);
			border-radius: 20rpx;
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
	
			.cell {
				width: calc(100%/3);
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
	
				.img,
				image {
					width: 52rpx;
					height: 52rpx;
					position: relative;
				}
	
				text {
					width: 100%;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #555555;
					text-align: center;
					margin-top: 10rpx;
				}
			}
	
			.cells {
				position: relative;
	
				&::after {
					content: '';
					width: 1rpx;
					height: 50rpx;
					background: #DFDFDF;
					position: absolute;
					right: 0px;
					top: calc(50% - 25rpx);
				}
			}
		}
	
		.list {
			width: 696rpx;
			background: #FFFFFF;
			box-shadow: 0px 2rpx 18rpx 0px rgba(0, 0, 0, 0.14);
			border-radius: 20rpx;
			margin-top: 30rpx;
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;
			padding: 0px 27rpx;
	
			.cell {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 90rpx;
				border-bottom: 1rpx solid #DFDFDF;
	
				.nam {
					display: flex;
					justify-content: flex-start;
					align-items: center;
	
					image {
						width: 34rpx;
						height: 34rpx;
					}
	
					text {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #282828;
						margin-left: 15rpx;
					}
				}
			}
	
			.cells {
				border: none;
			}
		}
	}
	
</style>
