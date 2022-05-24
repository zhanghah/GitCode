<template>
	<view class="myInfo_wrap">
		<view class="myInfo_top">
			<view class="name">用户头像</view>
			<view class="icon">
				<image class="icon_img" :src="`${imageView}${userInfo.headPortrait}`"></image>
			</view>
			<view class="camera" @tap="onCameraHandle"></view>
		</view>
		<view class="myInfo_cont">
			<ui-link label="姓名" @click.native="toEditNamePage('name')">
				<view slot="ext" class="link-ext">{{userInfo.userName}}</view>
			</ui-link>
			<ui-link label="昵称" @click.native="toEditNamePage('nickname')">
				<view slot="ext" class="link-ext">{{userInfo.nickName}}</view>
			</ui-link>
			<ui-form-picker label="性别" placeholder="请选择性别" v-model="userInfo.sex" v-if="userInfo.sex"
				:range="[{ label: '男', key: '1' }, { label: '女', key: '2' }]" @change="sexChangeHandler">
			</ui-form-picker>
			<view class="pickerTime">
				<view>出生年月</view>
				<view class="times">
					<picker mode="date" :end="endtime" :value="userInfo.birthday" @change="changeHandler">
						<view class="uni-input" v-if="userInfo.birthday">{{birthday |date('YYYY-MM-DD')}}</view>
						<view class="uni-input" v-else>请选择出生年月</view>
					</picker>
				</view>
			</view>
			<ui-form-picker label="学历" placeholder="请选择学历" v-model="userInfo.xueli" :range="xueliList"
				@change="xueliChangeHandler">
			</ui-form-picker>
		</view>
		<view class="myInfo_bind">
			<ui-link label="微信绑定" @click.native="handleThirdLoginApp">
				<view slot="ext" class="link-bind">未绑定</view>
			</ui-link>
		</view>
		<view class="myInfo_bottom">
			<ui-link label="手机号" :arrow="false">
				<view slot="ext" class="link-ext">{{userInfo.phone}}</view>
			</ui-link>
			<ui-link label="修改密码" @click.native="toEditPwdPage"></ui-link>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import config from '../../../config';
	import dayjs from 'dayjs';
	export default {
		name: 'MyInfo',
		data() {
			return {
				endtime: '',
				headIcon: '',
				headPortrait: '',
				userInfo: {},
				birthday: undefined,
				xueli: '',
				xueliList: [{
						label: '初中',
						key: '1'
					},
					{
						label: '高中',
						key: '2'
					},
					{
						label: '中技/中专',
						key: '3'
					},
					{
						label: '大专',
						key: '4'
					},
					{
						label: '本科',
						key: '5'
					},
					{
						label: '硕士',
						key: '6'
					},
					{
						label: '博士',
						key: '7'
					},
				]
			}
		},
		filters: {

		},
		computed: {
			...mapState(['user', 'imageView'])
		},
		methods: {
			...mapMutations('user', {
				updateUser: 'UPDATE_USER',
			}),
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
										id: this.user.id
									}
									api.my.userInfoUpdate(canshu).then(res => {
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
			// 修改 姓名 昵称
			toEditNamePage(e) {
				console.log(e)
				let name = ''
				if (e === 'name') {
					name = this.userInfo.userName
				} else {
					name = this.userInfo.nickName
				}
				uni.navigateTo({
					url: `/pages/userPages/myInfo/editName/index?name=${name}&type=${e}`
				});
			},
			// 性别选择
			sexChangeHandler(e) {
				this.userInfo.sex = e.key;
				let canshu = {
					id: this.user.id,
					sex: e.key
				}
				this.updateUser(this.userInfo);
				api.my.userInfoUpdate(canshu).then(res => {
					if (res.status !== '0') {
						return
					};
					uni.showToast({
						icon: 'none',
						title: '修改成功！'
					});
					this.getUserInfo()
				})
			},
			// 生日选择
			changeHandler(e) {
				this.birthday = e.target.value
				let nowTime = new Date().getTime(); //当前时间
				this.endtime = dayjs(nowTime).format('YYYY-MM-DD');
				let birthdayTime = Date.parse(e.target.value);
				console.log(birthdayTime)
				let canshu = {
					id: this.user.id,
					birthday: birthdayTime
				}
				api.my.userInfoUpdate(canshu).then(res => {
					if (res.status !== '0') {
						return
					};
					uni.showToast({
						icon: 'none',
						title: '修改成功！'
					});
					this.userInfo.birthday = this.birthday;
					this.updateUser(this.userInfo);
					this.getUserInfo()
				})
			},
			// 修改密码
			toEditPwdPage() {
				uni.navigateTo({
					url: `/pages/userPages/myInfo/editPwd/index?txt=${this.userInfo.phone}`
				});
			},

			// 学历
			xueliChangeHandler(e) {
				// console.log(e)
				// console.log(this.userInfo)
			},

			//获取用户信息
			getUserInfo() {
				this.userInfo = this.user;
				this.birthday = this.user.birthday
			},

			//日期
			formatDate(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d;
			},
			handleThirdLoginApp() {
				var that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									// console.log("App微信获取用户信息成功", loginRes);
									// 获取用户信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											// console.log('-------获取微信用户所有-----');
											// console.log(infoRes.userInfo);
											uni.showToast({
												icon:'none',
												title:infoRes.userInfo.openId
											})
										}
									});
								},
								fail: function(res) {
									console.log("App微信获取用户信息失败", res);
								}
							})
						}
					}
				});
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '个人信息',
			});
		},
		onShow() {
			this.getUserInfo()
		}
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.myInfo_wrap {
		min-height: 100vh;
		padding-top: 20rpx;
		background-color: #f5f5f5;

		.link-ext {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}

	.myInfo_top {
		position: relative;
		height: 160rpx;
		width: 100%;
		padding: 0 32rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;

		.name {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}

		.icon {
			width: 128rpx;
			height: 128rpx;
			border-radius: 50%;
			overflow: hidden;

			.icon_img {
				width: 100%;
				height: 100%;
			}
		}

		.camera {
			position: absolute;
			right: 32rpx;
			bottom: 12rpx;
			width: 50rpx;
			height: 50rpx;
			background: url('../static/info/camera.png') no-repeat;
			background-size: 100%;
		}
	}

	.myInfo_cont {
		margin-bottom: 20rpx;
	}

	.pickerTime {
		width: 100%;
		height: 110rpx;
		line-height: 110rpx;
		padding-left: 39rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-bottom: 1rpx solid #EEEEEE;

		.times {
			margin-right: 30rpx;

		}

		.uni-input {
			width: 200rpx;
			height: 90rpx;
			color: #808080;
			text-align: center;
		}
	}

	.myInfo_bind {
		margin-bottom: 20rpx;

		.link-bind {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}
</style>
