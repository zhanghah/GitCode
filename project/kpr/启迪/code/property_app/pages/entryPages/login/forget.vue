<template>
	<view class="page-forget">
		<view class="top">
			<view class="title">找回密码</view>
			
			<view class="phone-input">
				<ui-input
					:clearable="phone!=''"
					type="number"
					placeholder="请输入手机号"
					v-model="phone"
					:max="11"
				>
					<view class="icon-phone" slot="icon"></view>
				</ui-input>
			</view>

			<view class="code-login">
				<ui-input
					type="number"
					placeholder="请输入验证码"
					v-model="code"
				>
					<view class="icon-code" slot="icon"></view>
					<view slot="ext" v-if="time==0" @click="getCodeHandler" class="get-code">获取验证码</view>
					<view slot="ext" v-if="time > 0" class="time">重新发送({{time}})</view>
				</ui-input>
			</view>
			
			<view class="pwd-input">
				<ui-input
					:clearable="password!=''"
					type="password"
					placeholder="请输入6-12个字符密码"
					v-model="password"
				>
					<view class="icon-pwd" slot="icon"></view>
				</ui-input>
			</view>

			<ui-strength :value="this.password" v-if="this.password"></ui-strength>

			<view class="pwd-input">
				<ui-input
					:clearable="confirm!=''"
					type="password"
					placeholder="请确认确认密码"
					v-model="confirm"
				>
					<view class="icon-pwd" slot="icon"></view>
				</ui-input>
			</view>

			<view class="btn-wrap" @tap="submitHandler">确认</view>
		</view>	
	</view> 
</template>

<script>
	import api from '@/api';
	import md5 from 'md5';

	export default {
		components: {
		},
		data() {
			return {
				phone: '',
				code: '',
				password: '',
				confirm: '',
				time:0
			}
		},
		methods: {
			async getCodeHandler() {
				let pwdReg= /^[\w\W]{6,16}$/;
				if (!this.phone.trim()) {
					this.$toast('请输入手机号');
					return;
				}
				
				if (!this.$utils.reg.mobile.test(this.phone)) {
					this.$toast('请输入正确的手机号');
					return;
				}

				const res = await api.user.sendCode({
					codeKey: 'retrievePwd',
					phone: this.phone
				});

				if (res) {
					//
					this.$toast('验证码发送成功！');
					this.time=60;
					this.createTimer();
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
			},
			
			async submitHandler() {
				let pwdReg= /^[\w\W]{6,16}$/;
				if (!this.phone.trim()) {
					this.$toast('请输入手机号');
					return;
				}
				
				if (!this.$utils.reg.mobile.test(this.phone)) {
					this.$toast('请输入正确的手机号');
					return;
				}

				if (!this.code.trim()) {
					this.$toast('请输入验证码');
					return;
				}

				if (!this.password.trim()) {
					this.$toast('请输入新密码');
					return;
				}
				
				if (!pwdReg.test(this.password)) {
					this.$toast('请输入有效字符密码');
					return;
				}

				if (!this.confirm.trim()) {
					this.$toast('请输入确认密码');
					return;
				}

				if (this.password !== this.confirm) {
					this.$toast('两次输入的密码不一致');
					return;
				}

				const res = await api.user.retrievePwd({
					phone: this.phone,
					phoneCode: this.code,
					propertyId: this.$config.propertyId,
					pwd: md5(this.password),
				});

				if (res) {
					this.$toast('密码重置成功！');
					setTimeout(() => {
						uni.redirectTo({
							 url: './pwd'
						});
					}, 1500);
				}
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '登录',
			});
		},
	}
</script>

<style scoped lang="less">
	.page-forget {
		min-height: 100vh;
		padding: 90rpx 70rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.top {
		width: 100%;
	}

	.title {
		color: #424242;
		font-size: 44rpx;
		margin-bottom: 84rpx;
	}

	.icon-phone {
		width: 29rpx;
		height: 36rpx;
		background: url(../static/login/icon-phone.png) no-repeat center center;
		background-size: 26rpx 36rpx;
	}

	.icon-code {
		width: 32rpx;
		height: 36rpx;
		background: url(../static/login/icon-yzm.png) no-repeat center center;
		background-size: 32rpx 36rpx;
	}

	.icon-pwd {
		width: 29rpx;
		height: 36rpx;
		background: url(../static/login/icon_lock.png) no-repeat center center;
		background-size: 29rpx 35rpx;
	}

	.code-login {
		margin-top: 30rpx;
	}

	.pwd-input {
		margin-top: 30rpx;
		margin-bottom: 10rpx;
	}

	.error {
		color: #FF4C4C;
		font-size: 24rpx;
	}

	.btn-wrap {
		margin-top: 83rpx;
		text-align: center;
		color: #FFFFFF;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 30rpx;
		border-radius: 47.5rpx;
		background-color: #9840a6;
	}
	.get-code {
		margin-left: 20rpx;
		color: #80C26A;
		font-size: 30rpx;
	}
</style>
