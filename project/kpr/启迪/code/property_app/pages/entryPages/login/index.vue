<template>
	<view class="page-login">
		<view class="content">
			<view class="top">
				<view class="title">欢迎来到业主APP</view>

				<view class="phone-input">
					<ui-input v-model="phone" type="number" placeholder="请输入手机号" :max="11">
						<view class="icon-phone" slot="icon"></view>
					</ui-input>
				</view>

				<view class="desc">未注册的手机号验证后自动创建平台账户</view>

				<view class="getCode" @tap="getCode">获取验证码</view>

				<view class="pwd-regist">
					<view class="pwd-login" @tap="toPwdLoginPage">
						密码登录
					</view>
					<view class="regist" @tap="toRegistePage">
						还没有账号，立即注册
					</view>
				</view>
				<view class="weChat-btn" @tap="handleThirdLoginApp">
					<image class="image" src="../static/login/icon_weixin.png" mode=""></image>
					<view class="weChat-login">微信登录</view>
				</view>
			</view>
			<view class="description">
				登录代表你同意
				<navigator src="/pages/index/index">《智慧物业平台服务协议》</navigator>、
				<navigator src="/pages/index/index">《隐私政策》</navigator>
				并授权使用您的账号信息（如昵称、头像等）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';

	export default {
		components: {},
		computed: {},
		data() {
			return {
				phone: '',
			}
		},
		onLoad() {},
		methods: {
			async getCode() {
				if (!this.phone.trim()) {
					this.$toast('请输入手机号');
					return;
				}

				if (!this.$utils.reg.mobile.test(this.phone)) {
					this.$toast('请输入正确的手机号');
					return;
				}

				const res = await api.user.sendCode({
					codeKey: 'login',
					phone: this.phone
				})

				if (res) {
					const query = {
						phone: this.phone
					};

					if (this.isDev) {
						query.code = res.data;
					}

					const queryString = this.$utils.buildQueryString(query);

					uni.navigateTo({
						url: `./validate?${queryString}`,
					});
				}
			},
			toPwdLoginPage() {
				console.log(112)
				uni.redirectTo({
					url: '/pages/entryPages/login/pwd',
				});
			},
			toRegistePage() {
				// 去注册
				uni.navigateTo({
					url: '/pages/entryPages/login/regist',
				});
			},
			// 微信授权登录
			handleThirdLoginApp() {
				var that = this
				uni.getProvider({

					service: 'oauth',

					success: function(res) {

						console.log(res.provider);

						//支持微信、qq和微博等

						if (~res.provider.indexOf('weixin')) {

							uni.login({

								provider: 'weixin',

								success: function(loginRes) {

									console.log("App微信获取用户信息成功", loginRes);

									that.getApploginData(loginRes) //请求登录接口方法

								},

								fail: function(res) {

									console.log("App微信获取用户信息失败", res);

								}

							})

						}

					}

				});
			},

			//请求登录接口方法

			getApploginData(data) {

			}

		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '登录',
			});
		},
	}
</script>

<style scoped lang="less">
	.page-login .content {
		height: calc(100vh - 141rpx);
		padding: 90rpx 70rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.top {
		width: 100%;
	}

	.title {
		color: #282828;
		font-size: 44rpx;
		margin-bottom: 84rpx;
	}


	.desc {
		color: #999999;
		font-size: 28rpx;
		margin-bottom: 50rpx;
		margin-top: 20rpx;
	}

	.description {
		color: #999999;
		font-size: 22rpx;
		text-align: center;

		navigator {
			display: inline;
			color: #3093FF;
		}
	}

	.getCode {
		text-align: center;
		margin: 0 auto;
		color: #FFFFFF;
		width: 570rpx;
		height: 95rpx;
		line-height: 95rpx;
		font-size: 28rpx;
		border-radius: 47.5rpx;
		background-color: #9840a6;
	}

	.pwd-regist {
		font-size: 28rpx;
		color: #C6AA6B;
		margin-top: 80rpx;
		display: flex;
		justify-content: space-between;
	}

	.weChat-btn {
		width: 250rpx;
		height: 88rpx;
		line-height: 88rpx;
		background-color: #F5F5F5;
		border-radius: 44rpx;
		text-align: center;
		font-size: 30rpx;
		margin: 180rpx auto;
		font-size: 30rpx;
		color: #656565;
		display: flex;
		justify-content: center;
		align-items: center;

		.image {
			width: 48rpx;
			height: 38rpx;
			margin-right: 12rpx;
		}
	}

	.phone-input {
		overflow: hidden;
		border-radius: 5rpx;

		.icon-phone {
			width: 29rpx;
			height: 36rpx;
			background: url(../static/login/icon_phone.png) no-repeat center center;
			background-size: 26rpx 36rpx;
		}
	}
</style>
