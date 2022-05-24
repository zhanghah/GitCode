<template>
	<view class="page-login">
		<view class="content">
			<view class="top">
				<image src="../static/login/logo_00.png" mode=""></image>
			</view>
			<view class="title">
				启迪智汇业主端
			</view>

			<view class="form">
				<view class="phone-input">
					<input class="input" v-model="phone" type="number" placeholder="请输入手机号">
					<view class="icon-phone"></view>
					</input>
				</view>
				<view class="split">

				</view>
				<view class="pwd-input">
					<input class="input" v-model="password" minlength="6" maxlength="12" :type="localType"
						placeholder="请输入密码">
					<view class="icon-pwd"></view>
					<view class="option" v-if="password">
						<view :class="['eye', { close: localType === 'password', open: localType === 'text' }]"
							@tap="eyeHandler"></view>
					</view>
					</input>
				</view>
			</view>
			<view class="error-tip" v-if="!status">
				<text>
					账号或密码错误，请重新输入
				</text>
			</view>
			<view class="reg">
				<view class="regist" @tap="toRegist">
					还没有账号，立即注册
				</view>
				<view class="forget">
					<!-- 忘记密码？ -->
				</view>
			</view>
			<view class="login" @tap="loginHandler">登录</view>

			<view class="other-login">
				<view class="line"></view>
				<view class="other">
					其它登录方式
				</view>
				<view class="line"></view>
			</view>
			<view class="email">
				<image src="../static/login/email.png" mode=""></image>
			</view>

			<view class="bottom"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import api from '@/api';
	import md5 from 'md5';

	export default {
		components: {},
		data() {
			return {
				phone: '13628350001',
				password: '123456',
				errorMsg: '',
				localType: 'password',
				status:true,
			}
		},
		computed: {
			...mapState(['community']),
		},
		methods: {
			...mapMutations('user', {
				updateUser: 'UPDATE_USER',
				houseMsg: 'HOUSE_MSG'
			}),
			async loginHandler() {
				try {
					var reg = /^1[3456789]\d{9}$/; //电话正则
					if (!this.phone.trim()) {
						this.$toast('请输入手机号');
						return;
					}
					if (!reg.test(this.phone)) {
						this.$toast('请输入有效的手机号码');
						return
					}

					if (!this.password.trim()) {
						this.$toast('请输入密码');
						return;
					}
					const res = await api.user.login({
						phone: this.phone,
						pwd: this.password
					})
					console.log(res)
					if (res.status=='0') {
						this.$toast('登录成功！');
						this.status=true

						this.updateUser(res.data);

						// 读取缓存中是否有小区信息缓存
						if (this.community.id) { // 有小区信息缓存， 跳转到首页
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/index/index',
								});
							}, 1000);
						} else { // 要求进行小区信息选择
							uni.redirectTo({
								url: `/pages/entryPages/bind/choosecom?bindHome=1`,
							});
						}
					}
				} catch (err) {
					this.status=false
				}
			},
			eyeHandler() {
				console.log(this.localType)
				if (this.localType === 'text') {
					this.localType = 'password'
				} else {
					this.localType = 'text'
				}
			},
			toRegist(){
				uni.navigateTo({
					url:'./regist'
				})
			},
		},
		beforeMount() {},
	}
</script>

<style scoped lang="less">
	.page-login {
		min-height: 100vh;
	}

	.content {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 90rpx 70rpx;
	}

	.top {
		margin-top: 86rpx;

		image {
			width: 136rpx;
			height: 127rpx;
			text-align: center;
		}
	}

	.title {
		color: #492C4E;
		font-size: 42rpx;
		margin-bottom: 84rpx;
		margin-top: 23rpx;
	}

	.form {
		width: 100%;
		// height: 220rpx;
		border-radius: 20rpx;
		padding: 0 23rpx;
		box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.1);

		.split {
			width: 100%;
			border-bottom: 1rpx #DFDFDF solid;
		}

		.phone-input,
		.pwd-input {
			overflow: hidden;
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 5rpx;
			display: flex;
			align-items: center;
			margin: 20rpx 0;
			position: relative;

			.icon-phone {
				position: absolute;
				left: 0;
				z-index: 9;
				width: 29rpx;
				height: 36rpx;
				margin: 0 15rpx;
				background: url(../static/login/icon-phone.png) no-repeat center center;
				background-size: 26rpx 36rpx;
			}

			.icon-pwd {
				position: absolute;
				left: 0;
				z-index: 9;
				width: 29rpx;
				height: 36rpx;
				margin: 0 15rpx;
				background: url(../static/login/icon_lock.png) no-repeat center center;
				background-size: 26rpx 36rpx;
			}

			.option {
				position: absolute;
				top: 50%;
				right: 10rpx;
				transform: translateY(-50%);
				z-index: 9;
				display: flex;
				align-items: center;

				.eye {
					width: 40rpx;
					height: 40rpx;
					background-repeat: no-repeat;
					background-position: center center;

					&.close {
						background-image: url(../static/login/down-mmdl.png);
						background-size: 32rpx 27rpx;
					}

					&.open {
						background-image: url(../static/login/eye-mmdl.png);
						background-size: 38rpx 37rpx;
					}
				}

				.delete-phone {
					width: 36rpx;
					height: 36rpx;
					background-repeat: no-repeat;
					background-position: center center;
					background-image: url(../static/login/delete-mmdl.png);
					background-size: 36rpx 36rpx;
				}

				.delete-pwd {
					margin-right: 35rpx;
					width: 36rpx;
					height: 36rpx;
					background-repeat: no-repeat;
					background-position: center center;
					background-image: url(../static/login/delete-mmdl.png);
					background-size: 36rpx 36rpx;
				}
			}
		}

	}
	
	.error-tip{
		width: 100%;
		margin-top: 30rpx;
		color: #F05050;
		font-size: 28rpx;
		text{
			margin-left: 30rpx;
		}
	}
	
	.reg{
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		padding: 0 20rpx;
		color: #424242;
		font-size: 28rpx;
	}

	.login {
		text-align: center;
		color: #FFFFFF;
		width: 460rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
		border-radius: 28rpx;
		background-color: #9840a6;
		margin-top: 67rpx;
		margin-bottom: 35rpx;
	}

	.other-login {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.line {
			width: 150rpx;
			height: 1rpx;
			border: 1rpx #DFDFDF solid;
		}

		.other {
			margin: 0 10rpx;
			color: #DFDFDF;
			font-size: 24rpx;
		}
	}

	.email {
		width: 56rpx;
		height: 56rpx;
		margin-top: 41rpx;
	}

	.bottom {
		width: 100%;
		height: 202rpx;
		position: fixed;
		bottom: 0;
		background-image: url(../static/login/bottom.png);
		background-size: 110% 100%;
		background-position-x: -50rpx;
	}

	.pwd-login {
		color: #424242;
		font-size: 28rpx;
		text-align: center;
		margin-top: 35rpx;
	}

	.input {
		width: 100%;
		padding: 25rpx 35% 25rpx 60rpx;
		border: 0;
	}

	.error {
		color: #FF4C4C;
		font-size: 24rpx;
	}

	.forgetpass {
		margin-top: 68rpx;
		color: #424242;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 60rpx;

		navigator {
			padding: 0 10rpx;
		}
	}
</style>
