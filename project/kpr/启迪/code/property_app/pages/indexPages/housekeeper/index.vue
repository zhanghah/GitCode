<template>
	<view class="pages-housekeeper-index">
		<view class="top">
			<nav-bar>
				<template slot="option"> </template>
			</nav-bar>
			<view class="top_content">
				<view>{{userInfo.userName}}</view>
				<view class="tips">业主，您好</view>
			</view>
			<view class="top_content">

			</view>
		</view>

		<view class="content">
			<view class="title">
				<view class="floorName">{{floorName ||''}}</view>
				<view class="btn" @click="navTo">切换房屋</view>
			</view>
			<view class="info" v-if="housekeeperInfo">
				<view class="userAvatar">
					<image :src="`${imageView}${housekeeperInfo.headPortrait}`" />
				</view>
				<view class="name">{{housekeeperInfo.name||''}}</view>
				<view class="motto">{{housekeeperInfo.motto||''}}</view>
				<view class="txt">联系电话</view>
				<view class="number">{{housekeeperInfo.phone||''}}</view>
				<view class="contact ">
					<view class="phone" @tap="handelPhone">
						<view class="icon">
							<image src="../static/btn_gjfw_05.png" mode="" />
						</view>
						<view class="phone_v">拨打电话</view>
					</view>

					<view class="message" @tap="handelMessage">
						<view class="badge" v-if="housekeeperInfo.number">
							<u-badge type="error" :count="housekeeperInfo.number"></u-badge>
						</view>
						<view class="icon">
							<image src="../static/btn_message.png" mode="" />
						</view>
						<view class="phone_v">留言</view>
					</view>
				</view>
			</view>
			<no-result v-else message="暂无管家信息"></no-result>
			<view class="submit1">
				<button class="button" type="primary" @tap="handleSuggest">投诉建议</button>
			</view>
			<view class="submit2">
				<button class="button" type="primary" @tap="hanleRepair">报事报修</button>
			</view>
			<view></view>
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
				userInfo: {}, //用户信息
				homeList: {}, //默认第一个住房信息
				myRoomId: '', //我的住房Id
				buildingId: '', //楼栋id
				housekeeperId: '', //管家id
				unitId: '', //单元id
				floorId: '', //楼层id
				floorName: '', //当前住房名称
				housekeeperInfo: '', //管家信息
			}
		},
		computed: {
			...mapState(['user', 'community', 'imageView', 'myHome']),
		},
		watch:{
			floorName(){
				this.getInfo()
			}
		},
		methods: {
			handelPhone() {
				if (this.housekeeperInfo) {
					uni.makePhoneCall({
						phoneNumber: this.housekeeperInfo.phone
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '未有楼栋管家电话'
					})
				}
			},
			handelMessage() {
				uni.navigateTo({
					url: `./message?houseKeeperId=${this.housekeeperInfo.id}&roomId=${this.myRoomId}&unitId=${this.unitId}&floorId=${this.floorId}&buildingId=${this.buildingId}`
				})
			},
			// 获取住房列表(默认住房分页列表中第一条数据)
			async getHomeList() {
				const query = {
					current: 1,
					size: 10,
					checkStatus: 1
				}
				const res = await api.my.getMyHousingPages(query);
				console.log(res)
				if (res.data.records.length > 0) {
					this.homeList = res.data.records[0];
					this.myRoomId = this.homeList.roomId
					this.buildingId = this.homeList.buildingId //楼栋id
					this.unitId = this.homeList.unitId //单元id
					this.floorId = this.homeList.floorId //楼层id
					this.floorName = this.homeList.communityName + this.homeList.buildingNumber + '栋' + this
						.homeList.unitNumber + '-' + this.homeList.floorNumber + '-' + this.homeList
						.roomNumber;
				}
			},
			// 获取管家信息
			async getInfo() {
				if (this.myRoomId) {
					const res = await api.my.getHousekeeperInfo({
						roomId: this.myRoomId
					})
					if (res.status != '0') {
						return
					}
					this.housekeeperInfo = res.data
				}
			},

			// 获取用户信息
			getUserInfo() {
				this.userInfo = this.user
			},
			// 切换房屋
			navTo() {
				// uni.showToast({
				// 	title:'请绑定房屋信息~',
				// 	duration:5000
				// })
				uni.navigateTo({
					url: '../choosehome/index',
				})
			},
			// 改变房屋
			changeHome() {
				uni.$on('changeHome', data => {
					this.floorName = data.communityName + data.buildingNumber + '栋' + data.unitNumber +
						'-' + data.floorNumber + '-' + data.roomNumber
					this.buildingId = data.buildingId //楼栋id
					this.unitId = data.unitId //单元id
					this.floorId = data.floorId //楼层id
					this.myRoomId=data.roomId//房屋ID
					console.log(data)
				})
			},

			handleSuggest() {
				uni.navigateTo({
					url: '../suggest/index'
				})
			},
			hanleRepair() {
				uni.navigateTo({
					url: '../repair/index'
				})
			}

		},
		async mounted() {
			this.changeHome();
			this.getUserInfo();
			await this.getHomeList(),
				await this.getInfo()
		}
	}
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.pages-housekeeper-index {
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}

	.top {
		width: 100%;
		height: 385rpx;
		// padding-bottom: 300rpx;
		box-sizing: border-box;
		background: url(http://static.kupurui.cn/comapp/property/bg_gjfw_1.png) no-repeat;
		background-size: 100% 100%;

		.top_content {
			height: 100rpx;
			padding-top: 46rpx;
			padding-bottom: 127rpx;
			padding-left: 31rpx;
			font-size: 46rpx;
			font-weight: bold;
			color: #020204;

			view.tips {
				// padding-bottom: 127rpx;
				font-size: 28rpx;
				font-weight: 500;
			}
		}
	}

	.content {
		width: 92%;
		height: 100%;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-top: -107rpx;
		padding-bottom: 24rpx;

		// 房屋名
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0rpx 43rpx;
			height: 107rpx;
			border-bottom: 1rpx solid #E6E6E6;

			.floorName {
				width: 100%;
				font-size: 32rpx;
				color: #303333;
				font-weight: bold;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.btn {
				color: #802890;
				font-size: 28rpx;
				text-align: center;
				line-height: 44rpx;
				width: 162rpx;
				height: 44rpx;
				border: 1rpx solid #802890;
				border-radius: 8rpx;
				overflow: hidden;
			}
		}
		
		
		// 管家个人信息
		.info {
			display: flex;
			flex-direction: column;
			align-items: center;

			.userAvatar {
				width: 250rpx;
				height: 250rpx;
				border-radius: 50%;
				margin-top: 52rpx;

				image {
					border-radius: 50%;
				}
			}

			.name {
				color: #020204;
				font-size: 36rpx;
				font-weight: bold;
				margin-top: 52rpx;
			}

			.motto {
				color: #9E9E9E;
				font-size: 30rpx;
				margin-top: 26rpx;
			}

			.txt {
				color: #020204;
				font-size: 30rpx;
				margin-top: 61rpx;
			}

			.number {
				color: #F8C344;
				font-size: 32rpx;
				margin-top: 22rpx;
			}

			.contact {
				width: 50%;
				display: flex;
				justify-content: space-around;
				margin-top: 51rpx;

				.phone {
					.icon {
						width: 120rpx;
						height: 120rpx;
						background-color: #e6d4e9;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}
				}

				.message {
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;

					.badge {
						position: absolute;
						top: -20rpx;
						right: -18rpx;
					}

					.icon {
						width: 120rpx;
						height: 120rpx;
						background-color: #eee5d2;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}
				}

				.phone_v {
					margin-top: 24rpx;
				}
			}
		}
	}

	.submit1 {
		width: 80%;
		margin: 30rpx auto;

		.button {
			border-radius: 14rpx;
			background-color: #802890;
			font-size: 30rpx;
			font-weight: Bold;
			height: 100rpx;
			line-height: 100rpx;
		}
	}

	.submit2 {
		width: 80%;
		height: 100rpx;
		bottom: 24rpx;
		margin: 30rpx auto;

		.button {
			border-radius: 14rpx;
			background-color: #C6AA6B;
			font-size: 30rpx;
			font-weight: Bold;
			height: 100rpx;
			line-height: 100rpx;
		}
	}
</style>
