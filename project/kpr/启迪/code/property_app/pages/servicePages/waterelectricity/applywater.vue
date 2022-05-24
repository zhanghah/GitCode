<template>
	<view class="page-waterelectricity-apply">
		<view class="tips">
			提示：若情况紧急，请拨打<text @tap="handDial">客服热线</text>
			<image src="../../indexPages/static/icon_phone.png" style="width: 26rpx; height: 24rpx;margin-left: 22rpx;"
				mode="" />
		</view>
		<view class="search" @click="navTo">
			<ui-link :label="floorName || '约克郡壹号半岛15栋12-6'" :border="false">
				<image slot="icon" src="../../indexPages/static/icon_home.png" style="width: 58rpx; height: 58rpx">
				</image>
			</ui-link>
		</view>
		<view class="split"></view>
		<ui-link label="联系人" :arrow="false">
			<input slot="ext" class="link-ext" type="text" v-model="userName" />
		</ui-link>
		<ui-link label="联系电话" :arrow="false">
			<input maxlength="11" slot="ext" class="link-ext" type="number" v-model="phone" />
		</ui-link>

		<ui-link label="预约开通时间" @tap="showTime=true">
			<view slot="ext" :class="['link-ext', {'inactivated': !startime}]">
				<picker mode="date" :value="startime" @change="bindDateChanges">
					<view class="uni-input-start" v-if="!startime">请选择</view>
					<view class="uni-input" v-if="startime">{{startime }}</view>
				</picker>
			</view>
		</ui-link>

		<view class="submit">
			<view class="btn" @tap="clickSubmit">
				<ui-button>提交</ui-button>
			</view>
		</view>

		<u-popup v-model="showPopup" mode="center" border-radius="40">
			<view class="pupop">
				<image class="success" src="../static/icon_success_zx.png" mode=""></image>

				<view class="result">
					提交成功
				</view>
				<view class="btn" @click="popupHandel">
					<ui-button>确定</ui-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import api from '@/api';
	export default {
		computed: {
			...mapState(['user', 'community', "imageView", "myHome"]),
		},
		data() {
			return {
				showTime: false,
				showPopup: false,
				current: 1,
				size: 10,
				floorName: '',
				waterPhone: '', //通水电话
				userName: '',
				phone: '',
				startime: '',
				roomId: '',
				homeList: '',
				userList: '',
			}
		},
		methods: {
			popupHandel(){
				this.showPopup=false;
				uni.navigateBack({
					delta:1
				})
			},
			// 获取个人信息
			getUserInfo() {
				this.userName = this.user.userName;
				this.phone = this.user.phone;
				console.log(this.userName)
			},
			// 切换房屋
			navTo() {
				uni.navigateTo({
					url: '/pages/indexPages/choosehome/index',
				});
			},

			// 拨号
			handDial() {
				if (this.waterPhone) {
					uni.showActionSheet({
						itemList: [`客服：${this.waterPhone}`, '拨打'],
						success: (res) => {
							if (res.tapIndex == 1) {
								uni.makePhoneCall({
									phoneNumber: this.waterPhone //仅为示例
								});
							}
						},
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '还没有通水服务电话'
					})
				}
			},
			// 获取通水服务电话、
			async getPropertyPhone() {
				const query = {
					phoneType: 'water',
				}
				const res = await api.service.getPropertyPhone(query)
				if (res.status !== '0') {
					return
				} else {
					this.waterPhone = res.data.waterPhone[0]
				}
			},
			bindDateChanges(e) {
				this.startime = e.target.value
				console.log(this.startime)
			},

			changeHome() {
				uni.$on('changeHome', data => {
					console.log(data)
					this.userList = data;
					this.roomId = this.userList.roomId;
					this.floorName = data.floorName
				})
			},

			// 提交
			async clickSubmit() {
				const canshu = {
					applicationType: 'WATER',
					name: this.userName,
					phone: this.phone,
					roomId: this.roomId,
					startTime: this.startime
				}
				const res = await api.service.postWaterAdd(canshu)
				if (res.status == '0') {
					this.showPopup = true
				}
			},
			//获取住房列表
			getHomeList() {
				const _this = this;
				let canshu = {
					current: _this.current,
					size: _this.size,
					checkStatus: 1,
				}
				api.my.getMyHousingPages(canshu).then(res => {
					if (res.status !== '0') {
						return
					} else {
						if (res.data.records.length > 0) {
							_this.homeList = res.data.records[0];
							_this.floorName = _this.homeList.communityName + _this.homeList.buildingNumber + '栋' +
								_this
								.homeList.unitNumber + '-' + _this.homeList.floorNumber + '-' + _this.homeList
								.roomNumber;
							_this.roomId = _this.homeList.roomId
						}
					}
				})
			},
		},
		mounted() {
			this.getPropertyPhone()
			this.getUserInfo();
			this.getHomeList();
			this.changeHome()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "申请通水",
			});
		}
	}
</script>

<style lang="less" scoped>
	view,
	text {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.page-waterelectricity-apply {
		min-height: 100vh;
		padding-bottom: 162rpx;
		box-sizing: border-box;
		overflow: hidden;
		background-color: #F5F5F5;
	}

	.split {
		height: 25rpx;
	}

	.tips {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-weight: normal;
		color: #EF5050;
		padding: 23rpx 24rpx;
		background-color: #fcdcdc;

		image {
			margin-left: 9rpx;
		}

		text {
			text-decoration: underline;
		}
	}

	.link-ext {
		max-width: 450rpx;
		font-size: 30rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;

		&.inactivated {
			color: #999999;
		}
	}

	.submit {
		position: fixed;
		bottom: 212rpx;
		left: 0rpx;
		right: 0rpx;
		height: 88rpx;
		z-index: 9;
		padding: 0 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			width: 100%;
		}
	}

	.pupop {
		width: 400rpx;
		height: 450rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.success {
			width: 235rpx;
			height: 204rpx;

		}

		.result {
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
		}

		.btn {
			width: 100%;
			padding: 0 80rpx;
			margin-top: 0;
		}
	}
</style>
