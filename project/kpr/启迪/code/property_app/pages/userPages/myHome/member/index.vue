<template>
	<view class="myMember_box">
		<!-- top -->
		<view class="yz_box">
			<image class="img" src="../../static/myHome/myHome_icon1.png" mode="" />
			<view class="msg">
				<view class="num">
					{{homeList.communityName}}{{homeList.buildingNumber}}栋{{homeList.unitNumber}}单元{{homeList.floorNumber}}-{{homeList.roomNumber}}
				</view>
				<view class="yz_msg">
					<image src="../../static/myHome/myHome_icon2.png" mode="" />
					<view class="name">
						{{homeList.type === '1'?'业主':homeList.type === '2'?'租户':'亲属'}}：{{homeList.proprietorName}}
						{{homeList.proprietorPhone}}
					</view>
				</view>
			</view>
		</view>
		<!-- 房屋信息 -->
		<view class="home-info">
			<view class="title">
				房屋信息
			</view>
			<view class="block">
				<view class="left">
					<view class="">
						建筑面积：{{homeInfo.buildingArea || ""}}㎡
					</view>
					<template v-if="homeInfo.roomStatus">
						<view class="" v-if="homeInfo.roomStatus=='house'">
							业态属性：住宅
						</view>
						<view class="" v-if="homeInfo.roomStatus=='office'">
							业态属性：写字楼
						</view>
						<view class="" v-if="homeInfo.roomStatus=='business'">
							业态属性：商城
						</view>
						<view class="" v-if="homeInfo.roomStatus=='industry'">
							业态属性：工业
						</view>
						<view class="" v-if="homeInfo.roomStatus=='other'">
							业态属性：其他
						</view>
					</template>
					<view class="" v-else>
						业态属性：住宅
					</view>

				</view>
				<view class="right">
					<view class="">
						套内面积：{{homeInfo.insideArea || ""}}㎡
					</view>
					<view class="">
						物业管理费：158.2元
					</view>
				</view>
			</view>
		</view>

		<!-- 成员 -->
		<view class="member">
			<view class="title">
				成员
			</view>
			<view class="member-info" v-for="(item,index) in memberList" :key="index">
				<view class="left">
					<image src="../../../../static/tmp/17.png" mode=""></image>
					<view :class="item.type=='2'?'tenant':(item.type=='3'?'relatives':'yz')">
						{{item.type=='1'?'业主':(item.type=='2'?'租户':'亲属')}}
					</view>
					<view class="name">
						{{item.userName}}
					</view>
					<view class="phone">
						{{item.phone}}
					</view>
				</view>
				<view class="right" v-if="item.type!='1'">
					<image @tap="toEdit(item)" class="edit" src="../../static/address/edit.png" mode=""></image>
					<image src="../../static/invoiceTitle/invoiceTitle_remove.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="addHome">
			<ui-button @click.native="addMember()">添加成员</ui-button>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {},
		computed: {
			...mapState(['user', 'community'])
		},
		data() {
			return {
				userInfo: {}, //用户信息
				homeList: {}, //房屋列表
				homeInfo: {}, //房屋信息
				memberList: [], //成员列表
			}
		},
		methods: {
			// 获取房屋信息
			async getHomeInfo() {
				const res = await api.my.getHomeInfo({
					id: this.homeList.roomId
				});
				console.log(this.homeList)
				if (res) {
					this.homeInfo = res.data
				}
			},

			//获取成员列表
			async getCyList() {
				const res = await api.my.getMemberList({
					roomId: this.homeList.roomId
				});
				if (res) {
					this.memberList = res.data
				}
			},

			// 编辑成员信息
			toEdit(val) {
				uni.navigateTo({
					url: `./addmember?homeList=${JSON.stringify(this.homeList)}&memberInfo=${JSON.stringify(val)}&type=1`
				})
			},
			// 添加成员
			addMember(){
				uni.navigateTo({
					url: `./addmember?homeList=${JSON.stringify(this.homeList)}&type=2`
				})
			},
			// 获取用户信息
			getUserInfo() {
				this.userInfo = this.user
			},
		},
		mounted() {
			this.getUserInfo();
			this.getCyList();
			this.getHomeInfo();
		},
		onLoad(opt) {
			this.homeList = JSON.parse(opt.msg)
			uni.setNavigationBarTitle({
				title: '我的成员',
			});
		},
	}
</script>
<style lang="less" scoped>
	.myMember_box {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;
		overflow: hidden;
		position: relative;

		.yz_box {
			width: 92%;
			padding: 25rpx 32rpx 29rpx 17rpx;
			background: #fff;
			display: flex;
			border: 1px solid #E6E6E6;
			border-radius: 8rpx;
			margin: 29rpx auto 32rpx auto;
			align-items: center;

			.img {
				width: 90rpx;
				height: 90rpx;
				margin-right: 23rpx;
			}

			.msg {
				width: 80%;

				.num {
					color: #303331;
					font-size: 36rpx;
					overflow: hidden;
					/*超出部分隐藏*/
					white-space: nowrap;
					/*不换行*/
					text-overflow: ellipsis;
					/*超出部分文字以...显示*/
				}

				.yz_msg {
					color: #79807A;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					margin-top: 22rpx;

					image {
						width: 22rpx;
						height: 22rpx;
						margin-right: 8rpx;
					}
				}
			}
		}

		.home-info {
			padding: 0 30rpx;

			.title {
				margin-left: 10rpx;
				color: #323330;
				font-size: 30rpx;
				font-weight: bold;
			}

			.block {
				margin-top: 21rpx;
				background-color: #FFFFFF;
				padding: 48rpx 38rpx;
				display: flex;
				justify-content: space-between;
				color: #323330;
				font-size: 28rpx;
				border-radius: 16rpx;

				.left,
				.right {
					line-height: 48rpx;
				}
			}
		}

		.member {
			padding: 0 30rpx;
			margin-top: 20rpx;

			.title {
				margin-left: 10rpx;
				color: #323330;
				font-size: 30rpx;
				font-weight: bold;
				margin-bottom: 21rpx;
			}

			.member-info {
				background-color: #FFFFFF;
				padding: 16rpx 30rpx;
				border-bottom: 1rpx #E6E6E6 solid;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.relatives {
						background-color: #80C269;
						color: #FFFFFF;
						padding: 0 10rpx;
						font-size: 24rpx;
						border-radius: 15rpx;
					}

					.yz {
						background-color: #802890;
						color: #FFFFFF;
						padding: 0 10rpx;
						font-size: 24rpx;
						border-radius: 15rpx;
					}

					.tenant {
						background-color: #FF884D;
						color: #FFFFFF;
						padding: 0 10rpx;
						font-size: 24rpx;
						border-radius: 15rpx;
					}

					image {
						width: 88rpx;
						height: 88rpx;
						margin-right: 20rpx;
					}

					.name {
						margin: 0 20rpx;

					}

					.phone {
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}

				.right {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-shrink: 0;

					.edit {
						margin-right: 42rpx;
					}

					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}
	}
	.addHome {
		width: 100%;
		padding: 30rpx;
		position: fixed;
		bottom: 60rpx;
	}
</style>
