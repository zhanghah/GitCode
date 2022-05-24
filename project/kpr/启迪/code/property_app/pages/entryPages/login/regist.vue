<template>
	<view class="page-regist">
		<view class="top">
			<view class="title">注册</view>

			<view class="phone-input">
				<ui-input :clearable="phoneNumber!=''" type="number" placeholder="请输入手机号" v-model="phoneNumber">
					<view class="icon-phone" slot="icon"></view>
				</ui-input>
			</view>

			<view class="code-login">
				<ui-input type="number" placeholder="请输入验证码" v-model="code">
					<view class="icon-code" slot="icon"></view>
					<view slot="ext" v-if="time==0" @click="getCodeHandler" class="get-code">获取验证码</view>
					<view slot="ext" v-if="time > 0" class="time">重新发送({{time}})</view>
				</ui-input>
			</view>

			<view class="pwd-input">
				<ui-input :max="16" :min="6" :clearable="password!=''" type="password" placeholder="请输入6-16位有效密码"
					v-model="password">
					<view class="icon-pwd" slot="icon"></view>
				</ui-input>
			</view>

			<ui-strength :value="this.password" v-if="this.password"></ui-strength>

			<view class="pwd-input">
				<ui-input :clearable="confirm!=''" type="password" placeholder="请确认密码" v-model="confirm">
					<view class="icon-pwd" slot="icon"></view>
				</ui-input>
			</view>

			<view class="agree">
				<u-checkbox-group>
					<u-checkbox v-model="checked" shape="square" @change="checkboxChange" active-color="#802890">
						我已阅读并同意《用户协议》</u-checkbox>
				</u-checkbox-group>
			</view>

			<view class="btn-wrap" @tap="registHandler">立即注册</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from "vuex";

	export default {
		data() {
			return {
				phoneNumber: '',
				code: '',
				password: '',
				confirm: '',
				checked: false,
				localType: 'text',
				resend: false,
				time: 0,
				timer: null,
			}
		},
		computed: {
			...mapState(['user']),
		},
		methods: {
			checkboxChange() {
				console.log(this.checked)
			},

			// 发送注册请求
			async registHandler() {
				let pwdReg = /^[\w\W]{6,16}$/;
				if (!this.phoneNumber.trim()) {
					this.$toast('请输入手机号');
					return;
				}

				if (!this.$utils.reg.mobile.test(this.phoneNumber)) {
					this.$toast('请输入正确的手机号');
					return;
				}
				if (!this.code.trim()) {
					this.$toast('请输入验证码');
					return;
				}
				if (!this.password.trim()) {
					this.$toast('请输入密码');
					return;
				}
				if (!pwdReg.test(this.password)) {
					this.$toast('请输入6-16位有效密码');
					return;
				}
				if (!this.confirm.trim()) {
					this.$toast('请确认密码');
					return;
				}
				if (this.password != this.confirm) {
					this.$toast('两次输入的密码不一致');
					return;
				}
				if (!this.checked) {
					this.$toast('请勾选《用户协议》')
					return;
				}
				
				const result= await api.user.checkedCode({
					code:this.code,
					phone:this.phoneNumber,
					type:1
				}) 
				const params = {
					password: this.password,
					phoneNumber:this.phoneNumber,
					registerSource:3
					
				}
				setTimeout(async ()=>{
					if(result.status=='0'){
						const res= await api.user.registerVoucher(params)
						if(res){
							this.$toast('注册成功');
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},500)
						}
					}
				},800)
			},

			// 发送验证码
			async getCodeHandler() {
				let pwdReg = /^[\w\W]{6,16}$/;
				if (!this.phoneNumber.trim()) {
					this.$toast('请输入手机号');
					return;
				}

				if (!this.$utils.reg.mobile.test(this.phoneNumber)) {
					this.$toast('请输入正确的手机号');
					return;
				}
				const res = await api.user.sendCode({
					phone: this.phoneNumber,
					type:1
				})
				console.log(res)
				if (res) {
					this.time = 60;
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
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '注册',
			});
		},
	}
</script>

<style lang="less" scoped>
	.page-regist {
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
	
	.icon-nickname {
		width: 32rpx;
		height: 36rpx;
		background: url(../static/login/icon-nickname.png) no-repeat center center;
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
