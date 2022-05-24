<template>
	<view class="page-smarthome-index">
		<view class="top">
			<image class="set-img" src="../static/icon_znjj_bg.png" mode=""></image>
			<view class="top-title">
				<view class="back" @click="backPage">
					<image src="../static/icon_back.png" mode=""></image>
				</view>
				<view class="title">
					{{title}}
				</view>
			</view>
			<view class="top_content" v-if="userList">
				<view class="user">
					{{userList.proprietorName}}业主，欢迎回家
				</view>
				<view class="tips" @click="toChooseHouse">
					<view class="tips-house">
						房屋：{{floorName}}
					</view>
					<view class="choose-house">
						<image src="../static/icon_arrow.png" mode=""></image>
					</view>
				</view>
				<view class="no_result">暂无家庭环境相关信息</view>
			</view>
			<view class="top_content" v-else>

			</view>
		</view>

		<view class="tar">
			<view :class="index==0 ?'active':'text'" @click="changeHandel('shebei')">
				设备
			</view>
			<view :class="index==1 ?'active':'text'" @click="changeHandel('room')">
				房间
			</view>
		</view>
		
		<view v-if="index==0">
			<view v-if="shebeiData.length>0" class="shebei">
				<view class="shebei-num">
					我的设备(6)
				</view>
				
				<view class="shebei-type">
					<view class="tip" @click="toFurnishDetail">
						<view class="title">
							智能音响
						</view>
						<view class="position">
							已开启(客厅)
						</view>
						<view class="shebei-pic">
							<image class="pic" src="../static/icon_yx.png" mode=""></image>
							<image class="switch" src="../static/icon_kg.png" mode=""></image>
						</view>
					</view>
					<view class="tip" @click="toSecurityDetail">
						<view class="title">
							智能锁网关
						</view>
						<view class="position">
							已关闭(客厅)
						</view>
						<view class="shebei-pic">
							<image class="pic" src="../static/icon_security.png" mode=""></image>
							<image class="switch" src="../static/icon_close.png" mode=""></image>
						</view>
					</view>
					
					<view class="tip">
						<view class="title">
							智能音响
						</view>
						<view class="position">
							已开启(客厅)
						</view>
						<view class="shebei-pic">
							<image class="pic" src="../static/icon_yx.png" mode=""></image>
							<image class="switch" src="../static/icon_kg.png" mode=""></image>
						</view>
					</view>
					<view class="tip">
						<view class="title">
							水晶吊灯
						</view>
						<view class="position">
							已关闭(客厅)
						</view>
						<view class="shebei-pic">
							<image class="pic" src="../static/icon_ddj.png" mode=""></image>
							<image class="switch" src="../static/icon_close.png" mode=""></image>
						</view>
					</view>
					<view class="tip">
						<view class="title">
							水晶吊灯
						</view>
						<view class="position">
							已关闭(客厅)
						</view>
						<view class="shebei-pic">
							<image class="pic" src="../static/icon_ddj.png" mode=""></image>
							<image class="switch" src="../static/icon_close.png" mode=""></image>
						</view>
					</view>
				</view>
				
				<view class="btn" @click="addShebei">
					<ui-button class="button" type="transparent">+ 添加智能设备</ui-button>
				</view>
			</view>
			<!-- 无设备 -->
			<view class="content" v-else>
				<view class="pic-sb">
					<image src="../static/icon_shebei.png" mode=""></image>
				</view>
				<view class="text-sb">
					还没有设备
				</view>
				<view class="btn" @click="addShebei">
					<ui-button class="button" type="transparent">+ 添加智能设备</ui-button>
				</view>
			</view>
		</view>

		<view v-if="index==1">
			<view v-if="houseData.length>0" class="house">
				<view class="house-box" @click="toEquipment">
					<view class="house-name">
						<view class="title-kt">
							客厅>
						</view>
						<view class="shebei-num-kt">
							3个设备
						</view>
					</view>
					<view class="operation">
						<view class="edit" @click="editEquipment">
							<image src="../static/icon_zhjj_edit.png" mode=""></image>
						</view>
						<view class="delete">
							<image src="../static/icon_zhjj_delete.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="bedroom" @click="toEquipment">
					<view class="house-name">
						<view class="title-zw">
							卧室>
						</view>
						<view class="shebei-num-zw">
							3个设备
						</view>
					</view>
					<view class="operation">
						<view class="edit" @click="editEquipment">
							<image src="../static/icon_zhjj_edit.png" mode=""></image>
						</view>
						<view class="delete">
							<image src="../static/icon_zhjj_delete.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="btn" @click="addHouse">
					<ui-button class="button" type="transparent">+ 添加房间</ui-button>
				</view>
			</view>
			<view class="content" v-else>
				<view class="pic-fj">
					<image src="../static/icon_fangjian.png" mode=""></image>
				</view>
				<view class="text-fj">
					还没有房间
				</view>
				<view class="btn" @click="addHouse">
					<ui-button class="button" type="transparent">+ 添加房间</ui-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import {
		showToast
	} from '@/utils/utils.js';
	import api from '@/api';
	export default {
		data() {
			return {
				title: '智能家居',
				userList: '',
				floorName: '',
				index: 0,
				shebeiData:["1"],
				houseData:["1"]
			}
		},
		computed: {
			...mapState(['user', 'community', 'myHome']),
		},
		methods: {
			changeHandel(val) {
				if (val == 'shebei') {
					this.index = 0
				} else {
					this.index = 1
				}
			},
			// 进入家居详情
			toFurnishDetail(){
				uni.navigateTo({
					url:"./detail"
				})
			},
			// 进入安防设备详情
			toSecurityDetail(){
				uni.navigateTo({
					url:"./securitydetail"
				})
			},
			// 添加设备
			addShebei(){
				uni.navigateTo({
					url:"./addshebei"
				})
			},
			// 进入我的设备
			toEquipment(){
				uni.navigateTo({
					url:"./myequipment"
				})
			},
			// 添加房间
			addHouse(){
				uni.navigateTo({
					url:"./addhouse"
				})
			},
			// 编辑设备
			editEquipment(){
				uni.navigateTo({
					url:"./addhouse"
				})
			},
			// 获取住房列表
			async getHomeList() {
				const _this = this;
				if (_this.myHome.HouseMsg.id) {
					_this.floorName = _this.myHome.HouseMsg.name
				} else {
					const res = await api.my.getMyHousingPages({
						comId: _this.community.id,
						propertyId: _this.user.propertyId,
						userId: _this.user.id,
						checkStatus: 1,
					})
					console.log(res)
					if (res.status !== '0') {
						return
					}
					let data = res.data.records

					// 默认获取第一个房屋信息
					if (data.length > 0) {
						_this.userList = data[0]
						_this.floorName = _this.userList.communityName + _this.userList.buildingNumber + '栋' + _this.userList.unitNumber +
							'-' + _this.userList.floorNumber + '-' + _this.userList.roomNumber
						_this.myRoomId = _this.userList.roomId
					} else {
						uni.showToast({
							title: '请绑定房屋信息~',
							duration: 5000
						})
						// setTimeout(() => {
						// 	uni.navigateBack({
						// 		delta: 1
						// 	})
						// }, 5000)
					}

				}
			},
			backPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			toChooseHouse(){
				uni.navigateTo({
					url:"../choosehome/index"
				})
			}
		},
		mounted() {
			this.getHomeList()
		},
	}
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang-SC-Medium";
		font-weight: 500;
	}

	.page-smarthome-index {
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #F5F5F5;
		position: relative;

		.top {
			overflow: hidden;
			width: 100%;
			height: 640rpx;
			box-sizing: border-box;
			position: relative;
			
			.set-img{
				width: 100%;
				height: 100%;
			}

			.top-title {
				width: 100%;
				height: 50rpx;
				margin-top: 70rpx;

				.back {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					left: 31rpx;
					top: 12%;
					transform: translateY(-50%);
				}

				.title {
					position: absolute;
					left: 50%;
					top: 12%;
					transform: translate(-50%, -50%);
					font-size: 36rpx;
					font-size: #323330;
					font-weight: bold;
				}
			}

			.top_content {
				position: absolute;
				height: 100rpx;
				left: 35rpx;
				top: 143rpx;
				color: #323330;

				.user {
					font-size: 40rpx;
					font-weight: Bold;
				}

				.tips {
					display: flex;
					margin: 21rpx 0;
					font-size: 32rpx;
					.choose-house{
						width: 20rpx;
						height: 20rpx;
						margin-left: 15rpx;
					}
				}

				.no_result {
					font-size: 28rpx;
					color: #333333;
				}
			}
		}

		.tar {
			width: 230rpx;
			height: 50rpx;
			text-align: center;
			position: absolute;
			top: 470rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-between;
			line-height: 50rpx;
			font-size: 32rpx;

			.text {
				color: #7A7A7C;
			}

			& .active {
				font-weight: bold;
				color: #802890;
			}
		}

		.content {
			width: 702rpx;
			height: 515rpx;
			background: #FFFFFF;
			border-radius: 16px;
			position: absolute;
			top: 540rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			flex-direction: column;
			align-items: center;

			.pic-sb {
				width: 385rpx;
				height: 114rpx;
				margin-top: 134rpx;
			}

			.text-sb {
				margin-top: 48rpx;
				margin-bottom: 65rpx;
				font-size: 26rpx;
				color: #999898;
			}
			
			.pic-fj {
				width: 304rpx;
				height: 191rpx;
				margin-top: 113rpx;
			}
			
			.text-fj {
				margin-top: 32rpx;
				margin-bottom: 25rpx;
				font-size: 26rpx;
				color: #999898;
			}
		}
		
		.shebei{
			padding-bottom: 38rpx;
			.shebei-num{
				width: 702rpx;
				height: 100rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				position: absolute;
				top: 540rpx;
				left: 50%;
				transform: translateX(-50%);
				line-height: 100rpx;
				font-size: 30rpx;
				color: #333333;
				padding-left: 20rpx;
			}
			
			.shebei-type{
				margin: 20rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				
				.tip{
					width: 340rpx;
					height: 215rpx;
					margin-bottom: 23rpx;
					padding: 20rpx;
					background-color: #FFFFFF;
					border-radius: 16rpx;
					display: flex;
					flex-direction: column;
					
					.title{
						color: #4D4D4D;
						font-size: 30rpx;
					}
					
					.position{
						color: #999999;
						font-size: 24rpx;
						margin: 10rpx 0;
					}
					
					.shebei-pic{
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						
						.pic{
							width: 100rpx;
							height: 100rpx;
						}
					}
				}
				
				.tip:nth-child(odd){
					margin-right: 30rpx;
				}
				
				.switch{
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 15rpx;
				}
			}
		}
		
		.house{
			width: 100%;
			height: 240rpx;
			position: absolute;
			top: 540rpx;
			padding: 0 24rpx;
			
			.house-box{
				width: 100%;
				height: 100%;
				color: #333333;
				font-size: 32rpx;
				margin-bottom: 20rpx;
				padding: 21rpx 27rpx;
				display: flex;
				justify-content: space-between;
				background:url(../static/icon_znjj_kt.png)no-repeat center ;
				background-size: 100% 100%;
				
				.title-kt{
					font-weight: bold;
				}
				
				.shebei-num-kt{
					color: #666666;
					font-size: 24rpx;
					margin-top: 10rpx;
				}
				
				.operation{
					width: 124rpx;
					margin-top: 15rpx;
					display: flex;
					justify-content: space-between;
					
					.edit{
						width: 40rpx;
						height: 40rpx;
					}
					
					.delete{
						width: 40rpx;
						height: 40rpx;
					}
				}
				
			}
			.bedroom{
				width: 100%;
				height: 100%;
				color: #FEFEFE;
				font-size: 32rpx;
				margin-bottom: 20rpx;
				padding: 21rpx 27rpx;
				display: flex;
				justify-content: space-between;
				background:url(../static/icon_znjj_zw.png)no-repeat center ;
				background-size: 100% 100%;
				
				.title-zw{
					font-weight: bold;
				}
				
				.shebei-num-zw{
					color: #FFFFFF;
					font-size: 24rpx;
					margin-top: 10rpx;
				}
				
				.operation{
					width: 124rpx;
					margin-top: 15rpx;
					display: flex;
					justify-content: space-between;
					
					.edit{
						width: 40rpx;
						height: 40rpx;
					}
					
					.delete{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
			
			.btn{
				margin-top: 124rpx;
			}
			
		}
		
		.btn {
			width: 348rpx;
			height: 88rpx;
			margin: 0 auto;
		
			.button {
				border-radius: 44px;
			}
		}
	}
</style>
