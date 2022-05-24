<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			个人信息
		</nav-bar>
		<view class="conter">
			<view class="logo boder">
				<view class="logo_name">头像</view>
				<view class="logo_img" @tap="onCameraHandle">
					<image :src="`${imageView}${user.headPortrait}`" mode="" v-if="user.headPortrait"></image>
					<image src="/static/my/my6.png" mode="" v-else></image>
				</view>
				<view class="logo_right">
					<image src="/static/components/icon_link_arrow.png" mode=""></image>
				</view>
			</view>
			<view class="item boder">
				<view class="item_name">姓名</view>
				<view class="item_text">{{userInfo.userName}}</view>
			</view>
			<view class="item">
				<view class="item_name">手机号</view>
				<view class="item_text">{{userInfo.phone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</view>
			</view>
		</view>
		<view class="interval"></view>
		<view class="conter">
			<view class="item boder">
				<view class="item_name">部门</view>
				<view class="item_text">{{userInfo.departName}}</view>
			</view>
			<view class="item ">
				<view class="item_name">职务</view>
				<view class="item_text">{{userInfo.positionName}}</view>
			</view>
		</view>
		<view class="out" @tap="logoutHandler">退出登录</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import config from '../../config';
	import api from '@/api';

	export default {
		data() {
			return {
				userInfo: {},
				headIcon: '',
			}
		},
		computed: {
			...mapState(['user','imageView'])
		},
		methods: {
			...mapMutations('user', {
				clearUser: 'CLEAR_USER',
				updateUser: 'UPDATE_USER',
			}),
			logoutHandler() {
				uni.showModal({
					title: '提示',
					content: '确认退出登录',
					success: (res) => {
						if (res.confirm) {
							// 清除登录缓存
							this.clearUser();
							uni.reLaunch({
								url: '/pages/login/index',
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 获取个人信息
			getUserInfo() {
				this.userInfo = this.user
				console.log(this.user)
			},
			//上传图片
			onCameraHandle() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						console.log(res)
						this.headIcon = res.tempFilePaths[0];
						uni.uploadFile({
							url: `${config.apiRoot}/resourceApi/fileUpload/upload`,
							filePath: this.headIcon,
							name: 'file',
							formData: {
								'type': '4'
							},
							success: (res) => {
								if (+res.statusCode === 200) {
									let data = JSON.parse(res.data)
									let canshu = {
										headPortrait: data.data,
										id: this.user.id,
										employeeId:this.user.employeeId
									}
									api.user.updateUserInfo(canshu).then(res => {
										if (res.status !== '0') {
											return
										};
										this.userInfo.headPortrait = data.data
										this.updateUser(this.userInfo);
										console.log(this.userInfo)
										this.getUserInfo()
										uni.showToast({
											icon: 'none',
											title: '修改成功！'
										});
									})
								}
							}
						});
					}
				});
			},
		},
		beforeMount() {
			this.getUserInfo()
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.conter {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;

		.logo {
			width: 100%;
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;

			.logo_name {
				color: #333333;
				font-size: 32rpx;
			}

			.logo_img {
				flex: 1;
				display: -webkit-flex;
				justify-content: flex-end;
				align-items: center;
				line-height: 0;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
			}

			.logo_right {
				margin-left: 16rpx;

				image {
					width: 12rpx;
					height: 22rpx;
				}
			}
		}

		.boder {
			border-bottom: 1px solid #F6F6F6;
		}

		.item {
			width: 100%;
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.item_name {
				color: #333333;
				font-size: 32rpx;
			}

			.item_text {
				color: #999999;
				font-size: 30rpx;
			}
		}
	}

	.interval {
		width: 100%;
		height: 20rpx;
		background: #F5F5F5;
	}

	.out {
		width: 100%;
		padding: 30rpx 0;
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;
		color: #282828;
		font-size: 30rpx;
		margin-top: 20rpx;
	}
</style>
