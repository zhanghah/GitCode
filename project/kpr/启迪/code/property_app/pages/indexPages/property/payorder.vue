<template>
	<view class="page-property-payorder">
		<view class="orderInfo">
			<view>
				<text>待支付：</text>
				<text class="price">¥158</text>
			</view>
			<view>
				<text>订单编号：</text>
				<text>20210722183535703</text>
			</view>
		</view>

		<view class="payType">
			支付方式
		</view>

		<view class="type">
			<ui-link :border="false" size="large" label=微信支付 :arrow="false">
				<image slot="icon" src="../static/property/icon_weixi.png"
					style="width: 60rpx; height: 51rpx; margin-top:10rpx"></image>
				<ui-checkbox slot="ext" v-model="chooseWX"></ui-checkbox>
			</ui-link>
			<ui-link label=支付宝支付 :arrow="false" :border="false" size="large">
				<image slot="icon" src="../static/property/icon_zfdd.png"
					style="width: 60rpx; height: 60rpx; margin-top:10rpx"></image>
				<ui-checkbox slot="ext" v-model="chooseZFB"></ui-checkbox>
			</ui-link>
		</view>

		<view class="btn">
			<ui-button @click.native="pay">立即支付</ui-button>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				test: '',
				chooseWX: false,
				chooseZFB: false,
				orderId: '',
				price: '',
				code: '',
				type: '',
			}
		},
		computed: {
			...mapState(['user', 'community'])
		},
		watch: {
			chooseWX() {
				if (this.chooseWX) {
					this.chooseZFB = false
				}
			},
			chooseZFB() {
				if (this.chooseZFB) {
					this.chooseWX = false
				}
			},
		},
		methods: {

			pay() {
				// let canshu = {
				// 	entity:{
				// 		orderId: this.orderId,
				// 		payTypeCode: this.code
				// 	},
				// 	propertyId:this.user.propertyId,
				// 	userId:this.user.id
				// }
				// if (this.chooseWX) {
				// 	api.lifejf.getPayMsg(canshu).then(res => {
				// 		if (res.status !== '0') {
				// 			return
				// 		};
				// 		console.log(canshu)
				// 		console.log(res)
				// 		uni.requestPayment({
				// 			timeStamp: res.data.timestamp,
				// 			nonceStr: res.data.noncestr,
				// 			package: `prepay_id=${res.data.prepay_id}`,
				// 			signType: "MD5",
				// 			paySign: res.data.sign,
				// 			success: function(res) {
				// 				console.log(res)
				// 				if (res.errMsg === "requestPayment:ok") {

				// 				}
				// 			},
				// 			fail: function(err) {
				// 				console.log(err)
				// 			}
				// 		})
				// 	})
				// }else{
				// 	uni.showToast({
				// 		title:"请选择支付方式",
				// 		icon:"none",
				// 		duration:1000
				// 	})
				// }
				console.log(this.type)
				if (this.type == 'linting') {
					uni.navigateTo({
						url:"../parking/success"
					})
				} else if (this.type == "long") {
					uni.navigateTo({
						url: "../parking/long/success"
					})
				} else {
					console.log(this.type)
					uni.navigateTo({
						url: `./paysuces?type=${this.type}`
					})
				}
			},
			// 获取缴费方式
			getCode() {
				api.lifejf.getPayType({
					comId: this.community.id,
				}).then(res => {
					if (res.status !== '0') {
						return
					};
					this.code = res.data[0].code
					console.log(res)
				})
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '支付订单',
			});
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.price = option.priceNum
			this.type = option.type

			this.getCode()
		}
	}
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
	}

	.page-property-payorder {
		min-height: 100vh;
		padding-bottom: 108rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}

	.orderInfo {
		background-color: #fff;
		padding: 31rpx 38rpx;
		font-size: 32rpx;
		font-family: "PingFang SC";
		font-weight: 500;
		color: #323330;

		view {
			display: flex;
			padding: 15rpx 0rpx;
			align-items: center;

			.price {
				font-size: 42rpx;
				color: #F2713F;
			}
		}
	}

	.payType {
		height: 94rpx;
		line-height: 94rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #666666;
		padding-left: 37rpx;
	}

	.btn {
		width: 690rpx;
		height: 88rpx;
		margin: 177rpx auto;
	}
</style>
