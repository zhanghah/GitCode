<template>
	<view class="editName_wrap">
		<view class="wrap_top_content">
			<view class="wrap_input" v-if="isType">
				<input type="text" v-model="form.name" placeholder="请输入姓名" />
			</view>
			<view class="wrap_input" v-else>
				<input type="text" maxlength="8" v-model="form.nickname" placeholder="请输入昵称" />
			</view>
		</view>
		<view class="wrap_infos" v-if="isType">
			<view class="infos_name">用于服务时联系称呼，填写您的姓氏或全名都可以</view>
			<!-- <view class="infos_nickname" v-else>昵称用于邻里圈交流，不超过8个字，且不得与别人重复</view> -->
		</view>
		<view class="wrap_btn" @click="submit">
			<ui-button>提交</ui-button>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		showToast
	} from '@/utils/utils.js'
	export default {
		name: 'EditName',
		data() {
			return {
				form: {
					name: '',
					nickname: '',
				},
				type: '',
				userInfo:{},
			}
		},
		computed: {
			isType() {
				if (this.type === 'name') {
					return true
				}
				return false
			},
			...mapState(['user'])
		},
		onLoad(option) {
			this.type = option.type;
			if (this.type === 'name') {
				this.form.name = option.name
				uni.setNavigationBarTitle({
					title: '姓名',
				});
			} else if (this.type === 'nickname') {
				this.form.nickname = option.name
				uni.setNavigationBarTitle({
					title: '昵称',
				});
			}
		},
		methods: {
			...mapMutations('user', {
				updateUser: 'UPDATE_USER',
			}),
			async submit() {
				const _this = this;
				let canshu = {
					userName: _this.form.name
				}
				let canshu1 = {
					nickName: _this.form.nickname
				}
				let req = this.type === 'name' ? await api.my.userInfoUpdate(canshu) : await api.my.userInfoUpdate(canshu1);
				if (req.status !== '0') {
					return
				};
				if(this.form.name){
					this.userInfo.userName=this.form.name
				}
				if(this.form.nickname){
					this.userInfo.nickName=this.form.nickname
				}
				this.updateUser(this.userInfo);
				showToast('修改成功！')
				setTimeout(() => {
					uni.navigateBack()
				}, 500)
			},
			//获取用户信息
			getUserInfo() {
				this.userInfo = this.user;
			},
		}
	}
</script>
<style lang="less">
	.editName_wrap {
		min-height: 100vh;
		padding-top: 20rpx;
		background-color: #f5f5f5;
	}

	.wrap_top_content {
		margin-bottom: 21rpx;
	}

	.wrap_input {
		background-color: #fff;
		padding: 45rpx 34rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-family: Hiragino Sans GB;
		font-weight: normal;
		color: #333333;

		input {
			width: 100%;
			height: 100%;
		}
	}

	.wrap_infos {
		padding-left: 33rpx;
		margin-bottom: 32rpx;
		font-size: 24rpx;
		font-family: Hiragino Sans GB;
		font-weight: normal;
		color: #999999;
	}

	.wrap_btn {
		padding: 0 24rpx;
	}
</style>
