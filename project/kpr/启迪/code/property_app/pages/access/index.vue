<template>
	<view class="page-access-index">
		<view class="top">
			你好，{{userInfo.userName}}业主
		</view>
		
		<view class="content">
			<view class="home-info">
				<view class="home-name">
					幸福五社小区
				</view>
				<view class="change-home" @click="changeHome">
					切换房屋
				</view>
			</view>
			
			<view class="center">
				<view class="lock-img">
					<image src="../../static/access/icon_lock.png" mode=""></image>
				</view>
				<view class="tips">
					手机摇一摇，或点击开门
				</view>
				<view class="ewm" @click="toDoorQr">
					<image src="../../static/access/btn_ewm.png" mode=""></image>
					<view class="">
						门禁二维码
					</view>
				</view>
				
				<view class="face" @click="toFaceUpload">
					<image src="../../static/access/btn_face.png" mode=""></image>
					<view class="">
						人脸上传
					</view>
				</view>
				
				<!-- <view class="course" @click="toCourse">
					门禁教程
				</view> -->
			</view>
			<view class="bottom">
				<image src="../../static/access/bg_yjkm_03.png" mode=""></image>
			</view>
		</view>
		<tab-bar :setting="tabBar"></tab-bar>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
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
		computed:{
			...mapState(['user'])
		},
		methods:{
			toCourse(){
				uni.navigateTo({
					url:"../accessPages/accesscontrol/course"
				})
			},
			changeHome(){
				uni.navigateTo({
					url:"../indexPages/choosehome/index"
				})
			},
			toDoorQr(){
				uni.navigateTo({
					url:"../accessPages/accesscontrol/doorqr"
				})
			},
			toFaceUpload(){
				uni.navigateTo({
					url:"../accessPages/faceUpload/index"
				})
			},
			// 获取用户信息
			getUserInfo(){
				this.userInfo=this.user
			}
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:"../indexPages/visitor/index"
			})
		},
		beforeMount() {
			this.getUserInfo()
		},
	}
</script>

<style lang="less" scoped>
	.page-access-index{
		min-height: 100vh;
		background-color: #F5F5F5;
		overflow: hidden;
	}
	.top{
		padding: 37rpx;
		color: #4B4D49;
		font-size: 30rpx;
	}
	
	.content{
		width: 92%;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		
		.home-info{
			padding: 30rpx;
			border-bottom: 1rpx #E5E5E5 solid;
			display: flex;
			justify-content: space-between;
			
			.home-name{
				color: #303333;
				font-size: 32rpx;
			}
			
			.change-home{
				width: 162rpx;
				height: 44rpx;
				line-height: 44rpx;
				color: #EF5050;
				text-align: center;
				border: 1rpx #EF5050 solid;
				border-radius: 8rpx;
			}
		}
		
		.center{
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.lock-img image{
				width: 331rpx;
				height: 344rpx;
			}
			
			.tips{
				color: #303333;
				font-size: 32rpx;
			}
			
			.ewm{
				width: 268rpx;
				height: 78rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border: 2rpx #F05050 solid;
				color: #F05050;
				font-size: 36rpx;
				padding: 22rpx;
				margin-top: 56rpx;
				border-radius: 40rpx;
				
				image{
					width: 36rpx;
					height: 36rpx;
				}
			}
			
			.face{
				width: 268rpx;
				height: 78rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border: 2rpx #C6AA6B solid;
				color: #C6AA6B;
				font-size: 36rpx;
				padding: 22rpx;
				margin-top: 26rpx;
				border-radius: 40rpx;
				
				image{
					width: 36rpx;
					height: 36rpx;
					margin-right: 15rpx;
				}
			}
			
			.course{
				color: #282828;
				font-size: 36rpx;
				margin-top: 56rpx;
			}
		}
	
		.bottom{
			margin-top: 34rpx;
			image{
				width: 100%;
				height: 108rpx;
			}
		}
	}
</style>
