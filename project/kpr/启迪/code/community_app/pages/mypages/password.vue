<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			修改密码
		</nav-bar>
		<view class="conter">
			<view class="see">
				请为您的账号<text>{{user.phone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</text>修改密码
			</view>
			<view class="title">新密码</view>
			<view class="item_ul">
				<view class="item">
					<view class="item_name">请输入6位新密码</view>
					<view class="item_input">
						<input v-model="pwd" type="text" password placeholder="请输入" placeholder-class="placeholder" />
					</view>
				</view>
				<view class="item">
					<view class="item_name">请确认新密码</view>
					<view class="item_input">
						<input v-model="pwdOK" type="text" password placeholder="请输入" placeholder-class="placeholder" />
					</view>
				</view>
			</view>
			<view class="over">
				<view class="submit_btn" @tap="updatePassword">
					完成
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import api from '@/api';
	export default {
		data() {
			return {
				pwd:'',
				pwdOK:'',
			}
		},
		computed:{
			...mapState(['user'])
		},
		methods: {
			async updatePassword(){
				let pwdReg = /^[\w\W]{6,16}$/;
				const query={
					employeeId:this.user.employeeId,
					id:this.user.id,
					pwd:this.pwd,
					pwdOK:this.pwdOK
				};
				if (!this.pwd.trim()) {
					this.$toast('请输入密码');
					return;
				}
				if (!pwdReg.test(this.password)) {
					this.$toast('请输入有效字符密码');
					return;
				}
				if (!this.pwdOK.trim()) {
					this.$toast('请确认密码');
					return;
				}
				if (this.pwd != this.pwdOK) {
					this.$toast('两次输入的密码不一致');
					return;
				}
				const res=await api.user.updateUserInfo(query);
				if(res.status=='0'){
					this.$toast('修改成功!')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				}
			}
		}
	}
</script>

<style lang="less">
page {
	background: #f5f5f5;
}
.conter {
	width: 100%;
	.see {
		width: 100%;
		height: 150rpx;
		margin-top: 20rpx;
		background: #FFFFFF;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		color: #999999;
		font-size: 32rpx;
		text {
			color: #282828;
			margin: 0 10rpx;
		}
	}
	.title {
		width: 100%;
		color: #999999;
		font-size: 26rpx;
		padding: 15rpx 34rpx;
		box-sizing: border-box;
	}
	.item_ul {
		width: 100%;
		background: #FFFFFF;
		padding: 0 34rpx;
		box-sizing: border-box;
		.item {
			width: 100%;
			padding: 30rpx 0;
			border-bottom: 1px solid #EEEEEE;
			display: -webkit-flex;
			flex-direction: row;
			.item_name {
				color: #282828;
				font-size: 30rpx;
			}
			.item_input {
				flex: 1;
				input {
					width: 100%;
					text-align: right;
					font-size: 30rpx;
					border: none;
					outline: none;
				}
				.placeholder {
					color: #aaaaaa;
				}
			}
		}
	}
	.over {
		width: 100%;
		padding: 0 34rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
	}
}
</style>
