<template>
	<view class="editPhone_wrap">
		<view class="wrap_old">
			<view class="old_phone">
				<view class="old_text">当前手机号：</view>
				<view class="old_input">
					<input type="text" v-model="phone" placeholder="请输入原手机号" />
				</view>
			</view>
			<view class="old_code">
				<view class="old_code_input">
					<input type="text" placeholder="短信验证码" v-model="oldCode"/>
				</view>
				<view class="old_code_text" @click="getYzm(true)">{{yzmText}}</view>
			</view>
		</view>
		<view class="wrap_new">
			<view class="new_phone">
				<view class="new_input">
					<input type="text" v-model="newPhone" placeholder="请输入新的手机号" />
				</view>
			</view>
			<view class="new_code">
				<view class="new_code_input">
					<input type="text" placeholder="短信验证码" v-model="newCode"/>
				</view>
				<view class="new_code_text" @click="getYzm(false)">{{yzmText1}}</view>
			</view>
		</view>
		<view class="wrap_info">
			修改手机号后，下次登录可以使用新的手机号
		</view>
		<view class="wrap_btn" @click="submit">
			<ui-button>提交</ui-button>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	import reg from '@/utils/reg.js'
	export default {
		name: 'EditPhone',
		data() {
			return {
				phone: '',
				newPhone: '',
				yzmText:'获取验证码',
				yzmText1:'获取验证码',
				newCode:'',
				oldCode:''
			}
		},
		methods: {
			//获取验证码
			getYzm(store){
				const _this = this;
				let time = 60
				let canshu = {}
				if(store){//当前手机
					if(_this.phone === ''){
						this.$toast('请输入手机号~')
						return
					}else if(!reg.phone.test(_this.phone)){
						this.$toast('请输入正确的手机号~')
						return
					}else{
						canshu.codeKey  = 'oldPhoneCode';
						canshu.phone  = _this.phone
					}
				}else{//新手机
					if(_this.newPhone === ''){
						this.$toast('请输入手机号~')
						return
					}else if(!reg.phone.test(_this.newPhone)){
						this.$toast('请输入正确的手机号~')
						return
					}else{
						canshu.codeKey  = 'newPhoneCode';
						canshu.phone  = _this.newPhone
					}
				}
				api.my.sendPhoneCode(canshu).then(res=>{
					if(res.status !== '0'){return};
					_this.countDown(time,store)
				}).catch(err=>{
					time = 60
					_this.yzmText = '获取验证码'
					_this.yzmText1 = '获取验证码'
				})
			},
			
			//倒计时
			countDown(time,store){
				const _this = this;
				// clearInterval(int);
				var int = setInterval(()=>{
					time--
					if(store){
						_this.yzmText = `${time} 秒`
						if(time === 0){
							time = 60
							clearInterval(int);
							_this.yzmText = '获取验证码'
						}
					}else{
						_this.yzmText1 = `${time} 秒`
						if(time === 0){
							time = 60
							clearInterval(int);
							_this.yzmText1 = '获取验证码'
						}
					}
				},1000)
			},
			
			//提交
			submit(){
				const _this = this;
				let canshu = {
					newPhone:_this.newPhone,
					newPhoneCode:_this.newCode,
					oldPhone:_this.phone,
					oldPhoneCode:_this.oldCode
				}
				if(_this.phone === ''){
					this.$toast('请输入手机号~')
					return
				}else if(!reg.phone.test(_this.phone)){
					this.$toast('请输入正确的手机号~')
					return
				}else if(_this.oldCode === ''){
					this.$toast('请输入验证码~')
					return
				}else if(_this.newPhone === ''){
					this.$toast('请输入手机号~')
					return
				}else if(!reg.phone.test(_this.newPhone)){
					this.$toast('请输入正确的手机号~')
					return
				}else if(_this.newCode === ''){
					this.$toast('请输入新手机验证码~')
					return
				}else{
					api.my.updatePhone(canshu).then(res=>{
						if(res.status !== '0'){return};
						this.$toast('修改成功');
						setTimeout(()=>{
							uni.navigateBack({ delta: 1 });
						},500)
					})
				}
			}
		},
		onLoad(option) {
			this.phone = option.txt;
			uni.setNavigationBarTitle({
				title: '修改手机号',
			});
		},
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.editPhone_wrap {
		min-height: 100vh;
		padding-top: 16rpx;
		background-color: #f5f5f5;
	}

	.wrap_old {
		padding-left: 30rpx;
		background-color: #fff;
		font-size: 32rpx;
		font-family: Hiragino Sans GB;
		font-weight: normal;
		color: #666666;
		margin-bottom: 30rpx;

		.old_phone {
			padding-right: 30rpx;
			height: 120rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1rpx solid #E0E0E0;

			.old_text {
				width: 200rpx;
			}

			.old_input {
				flex: 1;
			}
		}

		.old_code {
			padding-right: 30rpx;
			height: 120rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.old_code_input {
				flex: 1;
			}

			.old_code_text {
				width: 200rpx;
				height: 72rpx;
				margin-left: 20rpx;
				background: #FFFFFF;
				border: 1rpx solid #1B76FF;
				border-radius: 36rpx;
				font-size: 30rpx;
				font-family: Hiragino Sans GB;
				font-weight: normal;
				color: #1B76FF;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.wrap_new {
		background-color: #fff;
		font-size: 32rpx;
		font-family: Hiragino Sans GB;
		font-weight: normal;
		color: #666666;
		padding-left: 30rpx;
		margin-bottom: 40rpx;

		.new_phone {
			height: 120rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1rpx solid #E0E0E0;

			.new_input {
				width: 100%;
				padding-right: 30rpx;
			}
		}

		.new_code {
			padding-right: 30rpx;
			height: 120rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.new_code_input {
				flex: 1;
			}

			.new_code_text {
				width: 200rpx;
				height: 72rpx;
				margin-left: 20rpx;
				background: #FFFFFF;
				border: 1rpx solid #1B76FF;
				border-radius: 36rpx;
				font-size: 30rpx;
				font-family: Hiragino Sans GB;
				font-weight: normal;
				color: #1B76FF;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.wrap_info {
		padding: 0 32rpx;
		font-size: 24rpx;
		font-family: Hiragino Sans GB;
		font-weight: normal;
		color: #999999;
		margin-bottom: 46rpx;
	}

	.wrap_btn {
		padding: 0 24rpx;
	}
</style>
