<template>
	<view class="page-user">
		<view class="bg">
			<image src="@/static/user/bg.png"></image>
		</view>
		<view class="content">
			<nav-bar :useBack="false">
				<template slot="option">
					<view class="title">
						个人中心
					</view>
					<setting mode="white" style="margin-right: 15rpx;" @click.native="toSettingPage"></setting>
					<message mode="white" @click.native="toMessagePage"></message>
				</template>
			</nav-bar>
			<view class="user-info">
				<view class="photo">
					<image v-if="userInfo.headPortrait" mode="" :src="`${imageView}${userInfo.headPortrait}`">
					</image>
					<image v-else class="default-photo" src="@/static/user/user.png"></image>
				</view>

				<view class="base">
					<view class="name">
						{{userInfo.userName || '游客'}}
					</view>
					<view class="btn" @tap="toMyInfoPage">
						<view class="info">个人信息</view>
					</view>
				</view>
			</view>

			<view class="history">
				<view class="wrap">
					<view class="head">我的记录</view>

					<view class="items">
						<view class="col" @tap="toMypayhistory">
							<view class="icon">
								<image src="@/static/user/icon_jf.png" />
							</view>

							<view class="span">缴费记录</view>
						</view>

						<view class="col" @tap="toReportRecord">
							<view class="icon">
								<image src="@/static/user/icon_bs.png" />
							</view>

							<view class="span">报事记录</view>
						</view>

						<view class="col" @tap="toComplaint">
							<view class="icon">
								<image src="@/static/user/icon_ts.png" />
							</view>

							<view class="span">投诉记录</view>
						</view>
					</view>
				</view>
			</view>

			<view class="links">
				<ui-link label="我的积分" @click.native="toMyPointsPage">
					<image slot="icon" src="@/static/user/point.png" style="width: 100%; height: 100%"></image>
					<view slot="ext" class="link-ext">{{pointsInfo.points}}</view>
				</ui-link>

				<!-- <ui-link label="装修申请记录" @click.native="toRenovationPage">
					<image slot="icon" src="@/static/user/zhuangxiu.png" style="width: 100%; height: 100%"></image>
					<view slot="ext" class="link-ext"></view>
				</ui-link> -->

				<ui-link label="通水通电记录" @click.native="toShuidianPage">
					<image slot="icon" src="@/static/user/shuidian.png" style="width: 100%; height: 100%"></image>
					<view slot="ext" class="link-ext"></view>
				</ui-link>
				<ui-link label="场馆预约记录" @click.native="toChangguanPage">
					<image slot="icon" src="@/static/user/changguan.png" style="width: 100%; height: 100%"></image>
					<view slot="ext" class="link-ext"></view>
				</ui-link>

				<view class="dividing"></view>

				<ui-link label="我的房屋" @click.native="toMyHomePage">
					<image slot="icon" src="@/static/user/home.png" style="width: 100%; height: 100%"></image>
				</ui-link>
				<ui-link label="我的活动" @click.native="toMyActivityPage">
					<image slot="icon" src="@/static/user/activity.png" style="width: 100%; height: 100%"></image>
				</ui-link>

				<view class="dividing"></view>

				<!-- <ui-link label="组件示例" @click.native="toComponentsDemoPage" v-if="isDev"></ui-link> -->
			</view>

			<!-- <support></support> -->
			<tab-bar :setting="tabBar"></tab-bar>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/api';
	import Setting from '@/components/setting';
	import Message from '@/components/message';
	import Support from './components/support';

	export default {
		components: {
			Message,
			Setting,
			Support
		},
		data() {
			return {
				title: '个人中心',
				name: '',
				isDev: this.isDev,
				userInfo: {},
				pointsInfo:{},
				tabBar:{
					color: "#7A7A7C",
					selectedColor: "#1B76FF",
					list: [{
							"pagePath": "/pages/index/index",
							"iconPath": "../../static/tabbar/icon_home.png",
							"selectedIconPath": "../../static/tabbar/icon_home_active.png",
							"text": "首页"
						},
						{
							"pagePath": "/pages/service/index",
							"iconPath": "../../static/tabbar/icon_service.png",
							"selectedIconPath": "../../static/tabbar/icon_service_active.png",
							"text": "服务"
						},
						{
							"pagePath": "/pages/access/index",
							"iconPath": "../../static/tabbar/icon_door.png",
							"selectedIconPath": "../../static/tabbar/icon_door.png",
							"text": "门禁"
						},
						{
							"pagePath": "/pages/find/index",
							"iconPath": "../../static/tabbar/icon_find.png",
							"selectedIconPath": "../../static/tabbar/icon_find_active.png",
							"text": "发现"
						},
						{
							"pagePath": "/pages/user/index",
							"iconPath": "../../static/tabbar/icon_user.png",
							"selectedIconPath": "../../static/tabbar/icon_user_active.png",
							"text": "我的"
						}
					]
				},
			}
		},
		computed: {
			...mapState([
				'imageView',
				'user',
			]),
			userName() {
				return this.user.userName || this.user.nickName || this.user.phone;
			},
		},
		onLoad() {},
		onShow() {
			// if (!this.user.token) {
			// 	// 未登录
			// 	uni.navigateTo({
			// 		url: '/pages/entryPages/login/index',
			// 	})
			// 	return
			// }
			this.getUserInfo();
			this.getUserPoints();
		},
		methods: {
			toComponentsDemoPage() {
				uni.navigateTo({
					url: '/pages/examplePages/index/index'
				});
			},
			// 跳转至缴费记录
			toMypayhistory() {
				uni.navigateTo({
					url: '/pages/indexPages/property/payhistory/index'
				})
			},
			// 跳转至设置
			toSettingPage() {
				uni.navigateTo({
					url: '/pages/userPages/setting/index',
				});
			},
			// 跳转至消息中心
			toMessagePage() {
				uni.navigateTo({
					url: '/pages/userPages/myMessage/index',
				});
			},
			// 跳转个人信息
			toMyInfoPage() {
				uni.navigateTo({
					url: '/pages/userPages/myInfo/index',
				});
			},
			// 跳转我的积分
			toMyPointsPage() {
				uni.navigateTo({
					url: '/pages/userPages/myPoints/index',
				});
			},
			// 跳转我的房屋
			toMyHomePage() {
				uni.navigateTo({
					url: '/pages/userPages/myHome/index',
				});
			},
			// 跳转我的活动
			toMyActivityPage() {
				uni.navigateTo({
					url: '/pages/userPages/myActivity/index',
				});
			},
			//跳转报事记录
			toReportRecord() {
				uni.navigateTo({
					url: '/pages/userPages/reportRecord/index',
				});
			},
			//跳转投诉记录
			toComplaint() {
				uni.navigateTo({
					url: '/pages/userPages/complaint/index',
				});
			},
			// 跳转至装修申请记录
			toRenovationPage() {
				// uni.navigateTo({
				// 	url: '/pages/userPages/renovationRecord/index'
				// })
			},
			// 跳转至通水通电记录
			toShuidianPage() {
				uni.navigateTo({
					url: '/pages/userPages/shuidianRecord/index'
				})
			},
			toChangguanPage(){
				uni.navigateTo({
					url: '/pages/userPages/venueRecord/index'
				})
			},
			//获取用户信息
			getUserInfo() {
				this.userInfo=this.user
			},
			// 获取用户积分
			async getUserPoints() {
				try{
					const res= await api.my.getUserPoints({phoneNumber:this.userInfo.phone})
					if(res.data){
						this.pointsInfo=res.data
					}
				}catch(err){
					
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.page-user {
		position: relative;
		background: #f5f5f5;
		min-height: 100vh;
	}

	.title {
		color: #FFFFFF;
		position: absolute;
		left: 47rpx;
	}

	.bg {
		width: 750rpx;
		height: 492rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.bg image {
		width: 100%;
		height: 100%;
	}

	.content {
		position: relative;
		z-index: 1;
	}

	.user-info {
		padding: 45rpx;

		display: flex;
		align-items: center;

		color: #FFFFFF;
	}

	.base .name {
		font-size: 34rpx;
		margin-bottom: 15rpx;
	}

	.base .btn {
		width: 150rpx;
		height: 48rpx;
		border: 1rpx solid #FFFFFF;
		border-radius: 24rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 48rpx;
		color: #E3E7F6;
	}

	.photo {
		width: 132rpx;
		height: 132rpx;
		border: 2px solid #FFF;
		border-radius: 50%;
		overflow: hidden;

		margin-right: 34rpx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		.default-photo {
			width: 100rpx;
			height: 100rpx;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.history {
		min-height: 260rpx;
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;

		.wrap {
			background: #FFFFFF;
			width: 100%;
			border-radius: 16rpx;
			box-shadow: 1rpx 1rpx 20rpx rgba(0, 0, 0, 0.1);
			padding-left: 36rpx;
			box-sizing: border-box;
		}

		.head {
			color: #3A414B;
			font-size: 28rpx;
			padding: 29rpx 0;
			border-bottom: 1rpx solid #efefef;
		}

		.items {
			display: flex;
			color: #3A414B;
			font-size: 28rpx;
			justify-content: space-around;
			padding: 17rpx 35rpx 35rpx 0;
			box-sizing: border-box;

			.icon {
				width: 88rpx;
				height: 88rpx;
				overflow: hidden;
				margin: 0 auto;
				margin-bottom: 15rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.links {
		.link-ext {
			font-size: 36rpx;
			color: #FB9200;
		}

		.dividing {
			height: 20rpx;
		}
	}
</style>
