<template>
	<view class="myHome_box">
		<view v-if="homeList.length" class="home_box">
			<view class="content_box" v-for="(item,index) in homeList" :key="index">
				<view class="yz_box" @click="toMember(index)">
					<image class="img" src="../../static/myHome_icon1.png" mode="" />
					<view class="msg">
						<view class="num">
							{{item.communityName + item.buildingNumber + '栋' + item.unitNumber +
							'-' + item.floorNumber + '-' + item.roomNumber}}
							<view class="label" v-if="item.type==1">业主</view>
							<view class="label" v-else-if="item.type==2">租户</view>
							<view class="label" v-else>亲属</view>
						</view>
						<view class="yz_msg">
							<image src="../../static/myHome_icon2.png" mode="" />
							<view class="name">业主：{{item.proprietorName.replace(/^(.).+(.)$/g, "*$2")}}
								{{item.proprietorPhone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</view>
							<!-- <image class="right" src="../../static/property/icon_arrow.png" mode="" /> -->
						</view>
						<!-- <view class="member">
							<image src="../static/myHome/myHome_icon3.png" mode="" />
							<view class="name">成员：2</view>
							<view class="state">1人申请加入</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>

		<no-result v-else message="暂无房屋~"></no-result>
		<view class="addButton" @click="toAddHome">
			<view>+新增房屋</view>
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
		data() {
			return {
				homeList: [],
				current: 1,
				size: 10,
				total: '',
				status: ''
			}
		},
		computed: {
			...mapState(['user', 'community'])
		},
		methods: {
			toMember(e) {
				this.homeList.forEach((item, index) => {
					if (e === index) {
						uni.$emit('changeHome', item)
						// console.log(item)
						let roomName = item.communityName + item.buildingNumber + '栋' + item.unitNumber +
							'-' + item.floorNumber + '-' + item.roomNumber
						let HouseMsg = {
							id: item.roomId,
							proprietorId:item.proprietorId,
							name: roomName
						}
						this.$store.commit('myHome/HOUSE_MSG', HouseMsg)
						console.log(item)
					}
				})
				uni.navigateBack({
					delta: 1
				})
			},

			toAddHome() {
				uni.navigateTo({
					url: '/pages/userPages/myHome/add/index',
				});
			},

			//获取住房列表
			async getHomeList() {
				try {
					const _this = this;
					let canshu = {
						current: _this.current,
						size: _this.size,
						comId: _this.community.id,
						propertyId: _this.user.propertyId,
						userId: _this.user.id,
						checkStatus:1
					}
					await api.my.getMyHousingPages(canshu).then(res => {
						if (res.status !== '0') {
							return
						};
						console.log(res.data)
						this.homeList = res.data.records;
						let {
							size,
							total
						} = res.data
						this.size = size;
						this.total = total
					})
				} catch(err) {
					//error
				} finally {
					uni.stopPullDownRefresh();
				}

			},


		},
		// 下拉刷新
		onPullDownRefresh() {
			this.homeList = []
			this.getHomeList()
		},
		onShow() {
			this.getHomeList()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '我的房屋',
			});
		},
	}
</script>
<style lang="less" scoped>
	.myHome_box {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;
		overflow: hidden;
		position: relative;

		.home_box {
			margin-bottom: 120rpx;
		}

		.content_box {
			width: 92%;
			margin: 0 auto;
			margin-top: 22rpx;

			.yz_box {
				padding: 25rpx 32rpx 29rpx 17rpx;
				background: #fff;
				display: flex;
				margin-bottom: 20rpx;
				border: 1px solid #E6E6E6;
				border-radius: 8rpx;

				.img {
					width: 90rpx;
					height: 90rpx;
					margin-right: 23rpx;
				}

				.msg {
					width: 82%;

					.num {
						color: #303331;
						font-size: 36rpx;
						display: flex;
						align-items: center;

						.label {
							width: 72rpx;
							height: 30rpx;
							line-height: 30rpx;
							background: #1B76FF;
							border-radius: 15rpx;
							text-align: center;
							font-size: 24rpx;
							color: #fff;
							margin-left: 25rpx;
						}
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

						.right {
							width: 13rpx;
							height: 21rpx;
							margin-left: auto;
						}
					}

					.member {
						display: flex;
						align-items: center;
						margin-top: 15rpx;

						image {
							width: 22rpx;
							height: 22rpx;
							margin-right: 8rpx;
						}

						.name {
							color: #79807A;
							font-size: 26rpx;
						}

						.state {
							width: 196rpx;
							height: 36rpx;
							line-height: 36rpx;
							background: #F66060;
							border-radius: 18rpx;
							font-size: 26rpx;
							color: #fff;
							text-align: center;
							margin-left: 22rpx;
						}
					}

					.sh {
						color: #1B76FF;
						font-size: 26rpx;
						margin-top: 18rpx;
					}
				}
			}

			.box {
				align-items: center;
			}
		}

		.addButton {
			position: absolute;
			bottom: 20rpx;
			left: 0;
			width: 100%;

			view {
				width: 92%;
				height: 88rpx;
				line-height: 88rpx;
				background: linear-gradient(0deg, #1B76FF, #3093FF);
				box-shadow: 0px -1px 0px 0px #E0E0E0;
				border-radius: 44rpx;
				margin: 0 auto;
				text-align: center;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>
