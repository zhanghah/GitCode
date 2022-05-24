<template>
	<view class="editPwd_wrap">
		<view class="wrap_pwd">
			<view class="new_input">
				<input type="password" maxlength="16" v-model="newPwd" placeholder="请输入新密码" />
			</view>
			<view class="confirm_input">
				<input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号" />
			</view>
		</view>
		<view class="wrap_strength">
		</view>
		<view class="wrap_btn" @tap="updatePwd">
			<ui-button>提交</ui-button>
		</view>
	</view>
</template>
<script>
	import api from '@/api'
	export default {
		name: 'EditPwd',
		data() {
			return {
				phone: '',
				newPwd: '',
				
			}
		},
		methods: {
			// 修改密码
			async updatePwd(){
				let pwdReg = /^[\w\W]{6,16}$/;
				if (!this.newPwd.trim()) {
					this.$toast('请输入密码');
					return;
				}
				if (!pwdReg.test(this.newPwd)) {
					this.$toast('请输入有效字符密码');
					return;
				}
				if (!this.$utils.reg.mobile.test(this.phone)) {
					this.$toast('请输入正确的手机号');
					return;
				}
				const res=await api.my.updatePwd({
					newPassword:this.newPwd,
					phoneNumber:this.phone
				})
				if(res.code=='success'){
					uni.showToast({
						icon:'none',
						title:'修改成功'
					})
					uni.navigateBack({
						delta:1
					})
				}
			},
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '修改密码',
			});
		},
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.editPwd_wrap {
		min-height: 100vh;
		padding-top: 16rpx;
		background-color: #f5f5f5;
	}

	.wrap_pwd {
		background-color: #fff;
		padding-left: 30rpx;

		.new_input {
			width: 100%;
			height: 120rpx;
			padding-right: 30rpx;
			border-bottom: 1rpx solid #E0E0E0;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.confirm_input {
			width: 100%;
			height: 120rpx;
			padding-right: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		input {
			width: 100%;
		}
	}

	.wrap_strength {
		width: 100%;
		padding: 10rpx 30rpx 0;
		margin-bottom: 50rpx;
	}

	.wrap_btn {
		padding: 0 24rpx;
	}
</style>
