<template>
	<view class="page-validate">
		<view class="title">
			输入验证码
		</view>

		<view class="desc">
			验证码已发送至 <view class="phone">{{phone}}</view>
		</view>

		<code-input :length="6" @change="codeChangeHandler"></code-input>

		<view v-if="msgError" class="resinput">
			{{msgError}}
		</view>
		<view class="timer" v-if="time > 0">
			{{time}}秒后重新获取验证码
		</view>

		<view v-else class="resend" @click="resendCodeHandler">重新获取验证码</view>
		<view style="margin-top: 100rpx;" v-if="code">测试验证码：{{code}}</view>
		<view class="description">
			登录代表你同意
			<navigator url="/pages/index/index">《智慧物业平台服务协议》</navigator>、
			<navigator url="/pages/index/index">《隐私政策》</navigator>
			并授权使用您的账号信息（如昵称、头像等）以便您统一管理
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import api from '@/api';
	import CodeInput from '@/components/code-input';

	export default {
		components: {
			CodeInput
		},
		data() {
			return {
				phone: '',
				code: '',
				time: 60,
				timer: null,
				msgError: ''
			}
		},
		computed: {
			...mapState(['community']),
		},
		methods: {
			...mapMutations('user', {
				updateUser: 'UPDATE_USER',
			}),
			async resendCodeHandler() {
				const res = await api.user.sendCode({
					codeKey: 'login',
					phone: this.phone
				});
				console.log(res)

				if (res) {
					this.$toast('验证码发送成功！')
					this.time = 60;
					this.createTimer();
				}
			},
			async codeChangeHandler(code) {
				try {
					const res = await api.user.loginByCode({
						phone: this.phone,
						phoneCode: code,
					});

					if (res) {
						this.$toast('登录成功！');
						// cache userData
						const {
							user
						} = res.data;

						this.updateUser(user);

						// 读取缓存中是否有小区信息缓存
						if (this.community.id) { // 有小区信息缓存， 跳转到首页
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/index/index',
								});
							}, 1000);
						} else { // 要求进行小区信息选择
							uni.redirectTo({
								url: '/pages/entryPages/bind/choosecity',
							});
						}
					}
				} catch (err) {
					if (err) {
						this.msgError = "验证码错误，请重新输入"
					}
				}

			},
			createTimer() {
				this.timer = setInterval(() => {
					this.time = this.time - 1;

					if (this.time <= 0) {
						this.clearTimer();
					}
				}, 1000);
			},
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					console.log('clearTimer');
					this.timer = null;
				}
			}
		},
		beforeMount() {
			console.log('page beforeMount');
			uni.setNavigationBarTitle({
				title: '验证',
			});
		},
		mounted() {
			this.createTimer();
		},

		onLoad(option) {
			this.phone = option.phone;

			// if (this.isDev) {
				this.code = option.code;
			// }
		},
		onUnload() {
			this.clearTimer();
		},
	}
</script>

<style scoped lang="less">
	.page-validate {
		min-height: 100vh;
		padding: 90rpx 80rpx;
		color: #424242;
		box-sizing: border-box;
	}

	.title {
		font-size: 44rpx;
		margin-bottom: 20rpx;
	}

	.desc {
		font-size: 24rpx;
		margin-bottom: 40rpx;
		display: flex;
		justify-content: flex-start;

		.phone {
			margin-left: 10rpx;
		}
	}

	.timer {
		margin-top: 23rpx;
		font-size: 24rpx;
	}

	.resend {
		margin-top: 23rpx;
		font-size: 24rpx;
		color: #FF8A4D;
	}

	.resinput {
		margin-top: 50rpx;
		color: #F05050;
		font-size: 24rpx;
	}

	.description {
		color: #999999;
		font-size: 22rpx;
		text-align: center;
		margin-top: 700rpx;
	
		navigator {
			display: inline;
			color: #3093FF;
		}
	}
</style>
