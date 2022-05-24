<template>
	<view class="aboutus_wrap">
		<view class="wrap_top">
			<view class="top_icon"></view>
			<view class="top_name">业主APPV1.0</view>
		</view>
		<view class="wrap_center">
			<view @tap="toAgreement">
				<ui-link label="使用条款及用户协议"></ui-link>
			</view>
			<ui-link label="客服电话" :arrow="false">
				<view slot="ext" class="link-ext" @click.native="callTell" v-if="data.phone">{{data.phone}}</view>
				<view slot="ext" class="link-text">
					暂无电话
				</view>
			</ui-link>
		</view>
		<view class="wrap_footer">
			<view>Copyright©启迪佳莲</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'AboutUs',
		data() {
			return {
				msg: {},
				data: '',
			}
		},
		computed: {
			...mapState([
				'user',
			]),
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '关于我们',
			});
		},
		onShow() {
			this.getOne()
		},
		methods: {
			getOne() {
				api.my.getOne({}).then(res => {
					if (res) {
						this.data = res.data
						console.log(this.data)
					}
				})
			},
			toAgreement() {
				console.log(111)
				uni.navigateTo({
					url: '../agreement/index'
				})
			},

			// 拨打电话
			callTell() {
				uni.makePhoneCall({
					phoneNumber: this.data.phone //仅为示例
				});
			}
		}
	}
</script>
<style scoped lang="less">
	view {
		box-sizing: border-box;
	}

	.aboutus_wrap {
		min-height: 100vh;
		background-color: #f5f5f5;

		.wrap_top {
			width: 100%;
			height: 420rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.top_icon {
				width: 160rpx;
				height: 160rpx;
				background: url(@/static/user/logo.png) no-repeat center;
				background-size: 100% 100%;
				border: 1rpx solid #E0E0E0;
				border-radius: 20rpx;
				margin-bottom: 32rpx;
			}

			.top_name {
				font-size: 32rpx;
				font-family: Hiragino Sans GB;
				font-weight: normal;
				color: #808080;
			}
		}

		.wrap_center {

			.link-ext {
				font-size: 33rpx;
				font-family: Hiragino Sans GB;
				font-weight: normal;
				color: #802890;
			}
			.link-text{
				font-size: 28rpx;
			}
		}

		.wrap_footer {
			position: absolute;
			bottom: 54rpx;
			left: 0;
			width: 100%;
			height: 67rpx;

			font-size: 28rpx;
			font-family: Hiragino Sans GB;
			font-weight: normal;
			color: #999999;
			text-align: center;
		}
	}
</style>
