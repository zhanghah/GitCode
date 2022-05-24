<template>
	<view class="conter">
		<view class="top">
			<image src="../../images/logo.png" mode=""></image>
			启迪智汇政务端
		</view>
		<view class="form">
			<view class="item">
				<input type="text" v-model="phone" placeholder="请输入账号" placeholder-class="placeholder" />
			</view>
			<view class="item">
				<input type="text" v-model="password" password placeholder="请输入密码" placeholder-class="placeholder" />
			</view>
			
			<view class="submit_ul">
				<view class="submit_btn" @tap="loginHandler">
					登录
				</view>
			</view>
			<view class="tips">
				<view class="tips_one">忘记密码？</view>
				<view class="tips_two">请联系023-12345678</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	import api from '@/api';
	import md5 from 'md5';
	export default {
		data() {
			return {
				phone: '13628350001',
				password: '123456',
			}
		},
		methods: {
			...mapMutations('user', {
				updateUser: 'UPDATE_USER',
			}),
			...mapActions('user',{
				setCommunity: 'setCommunity',
			}),
			async loginHandler() {
				if (!this.phone.trim()) {
					this.$toast('请输入账号');
					return;
				}
				// if (!this.$utils.reg.mobile.test(this.phone)) {
				// 	this.$toast('请输入正确的手机号');
				// 	return;
				// }
				if (!this.password.trim()) {
					this.$toast('请输入密码');
					return;
				}
				// // #ifdef APP-PLUS
				// var cid;
				// var pinf = plus.push.getClientInfo();    
				// cid = pinf.clientid;//客户端标识 只存在于app
				// //#endif
			
				const res = await api.user.login({
					// // #ifdef APP-PLUS
					// cid: cid,
					// //#endif
					phone: this.phone,
					pwd: this.password
				})
			
				if (res) {
					this.$toast('登录成功！');
					await this.updateUser(res.data);
					await this.setCommunity();
					uni.reLaunch({
						url: '/pages/tab/index',
					});
				}
			},
		}
	}
</script>

<style lang="less" scoped>
page {
	
}
.conter {
	width: 100%;
	height: 100vh;
	background: url(../../images/login_bg.png) no-repeat;
	background-size:100% 100%;
	.top {
		width: 100%;
		padding-top: 120rpx;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #7F298E;
		font-size: 44rpx;
		font-weight: bold;
		image {
			width: 178rpx;
			height: 178rpx;
			margin-bottom: 17rpx;
		}
	}
	.form {
		width: 100%;
		padding: 0 100rpx;
		padding-top: 100rpx;
		box-sizing: border-box;
		.item {
			width: 100%;
			padding: 30rpx 0;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #EEEEEE;
			input {
				
			}
			.placeholder {
				color: #999999;
				font-size: 30rpx;
			}
		}
		.submit_ul {
			padding-top: 48rpx;
		}
		.tips {
			margin-top: 88rpx;
			.tips_one {
				width: 100%;
				text-align: center;
				color: #7F298E;
				font-size: 24rpx;
			}
			.tips_two {
				width: 100%;
				text-align: center;
				color: #999999;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
}
</style>
