<template>
	<view class="page-property-payhistory-index">
		<view class="navbar">
			<view :class="{ active: active == 0 }" @tap="handActive(0)">物业费</view>
			<view :class="{ active: active == 1 }" @tap="handActive(1)">停车费</view>
		</view>

		<!-- 物业费 -->
		<view class="ul_box" v-if="active == 0">
			<view v-if="propertyList.length>0">
				<view class="ul_li" v-for="(item,index) in propertyList" :key="index">
				<view class="moth">{{item.date}}</view>
				<view class="content" @tap="toMydetailsPage(v)" v-for="(v,i) in item.chargeList" :key="i">
					<image class="img" src="../../static/property/icon_home.png"></image>
					<view class="info">
						<view class="subtitle">{{v.roomMsg.comName}}{{v.roomMsg.buildingNumber}}栋{{v.roomMsg.unitNumber}}-{{v.roomMsg.floorNumber}}-{{v.roomMsg.roomNumber}}</view>
						<view>{{v.payTime | date("YY-MM-DD HH:mm")}}</view>
					</view>
					<view class="price">￥{{v.money}}元</view>
				</view>
			</view>
			</view>
			<view class="nulls" v-else>
				<no-result message="暂无相关信息"></no-result>
			</view>
		</view>

		<!-- 停车费 -->
		<view class="parking" v-else>
			<view class="parking-charge" v-if="carChargeList.length!=0">
				<view class="parkingContent" v-for="(item,index) in carChargeList" :key="index">
					<view class="list" @click="toDetailPage(index)">
						<view class="code">
							{{index == 0 ? '储值车牌' : index == 1 ? '月租车牌' : index == 2 ? '临停缴费' : ''}}：渝A48569
							<text>¥{{item.money}}</text>
						</view>
						<view class="pd">停车场：{{item.parkingLotName}}</view>
						<view class="date">
							{{item.parkingTime}}
							<text v-if="index == 2">有效期至2019-12-10</text>
						</view>
					</view>
				</view>
			</view>
			<view class="nulls" v-else>
				<no-result message="暂无相关信息"></no-result>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				active: 0,
				current: 1,
				size: 10,
				total: '',
				propertyList: [
					{
						date:'9月',
						chargeList:[
							{
								roomMsg:{
									comName:'幸福五社小区',
									buildingNumber:1,
									unitNumber:3,
									floorNumber:2,
									roomNumber:7
								},
								payTime:'2021-09-15 14:07',
								money:168.42
							},
						]
					},
					{
						date:'8月',
						chargeList:[
							{
								roomMsg:{
									comName:'幸福五社小区',
									buildingNumber:1,
									unitNumber:3,
									floorNumber:2,
									roomNumber:7
								},
								payTime:'2021-08-27 09:37',
								money:154.58
							},
						]
					}
				],
				carChargeList: [
					{
						money:20,
						parkingLotName:'幸福五社小区地下停车场',
						parkingTime:'2021-08-02 12:15',
					}
				],
			};
		},
		computed: {
			...mapState(['user', 'community'])
		},
		methods: {
			handActive(i) {
				if (this.active != i) {
					this.active = i;
					if (i == 1) {
						this.getCarCharge()
					} else {
						this.loadData()
					}
				}
			},
			toMydetailsPage(value) {
				let navData = JSON.stringify(value)
				uni.navigateTo({
					url: "./details?navData=" + navData,
				});
			},
			toDetailPage(i) {
				uni.navigateTo({
					url: `./details?type=${i == 0 ? 'store' : i == 1 ? 'month' : i == 2 ? 'temporary' : ''}`
				});
			},

			//列表
			loadData() {
				let canshu = {
					current: this.current,
					size: this.size,
					userId: this.user.id,
					propertyId: this.user.propertyId
				}
				api.my.getPageCharge(canshu).then(res => {
					if (res.status !== '0') {
						return
					};
					console.log(res)
					let {
						total
					} = res.data
					this.total = total;
					this.propertyList = res.data.records

				})
			},
			async getCarCharge() {
				try {
					let res = await api.carcharge.getPage({
						current: this.current,
						propertyId: this.$config.propertyId,
						size: this.size,
						userId: this.user.id,
						comId: this.community.id,
					})
					if (res.data.records.length !== 0) {
						this.carChargeList = res.data.records
					}
				} catch {
					//
				} finally {
					uni.stopPullDownRefresh();

				}
			}
		},
		mounted() {
			this.loadData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			if (this.active == 0) {
				this.propertyChargeList = [];
				this.loadData()
			} else {
				this.carChargeList = []
				this.getCarCharge()
			}
		},
		onLoad(option) {
			this.active = Number(option.type) || 0;
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "缴费记录",
			});
		},
	};
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.page-property-payhistory-index {
		min-height: 100vh;
		padding-bottom: 108rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}

	.navbar {
		height: 98rpx;
		line-height: 98rpx;
		display: flex;
		color: #4c4c4c;
		font-size: 26rpx;
		background-color: #fff;

		view.active {
			font-size: 30rpx;
			color: #A94ABA;
			font-weight: 600;
			font-weight: bold;
		}

		view {
			padding: 0rpx 24rpx;
		}
	}

	.ul_li {

		// box-shadow: 0px -1px 0px 0px #E0E0E0;
		.moth {
			font-size: 28rpx;
			color: #666666;
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 32rpx;
		}

		.content {
			box-shadow: 0px -1px 0px 0px #e0e0e0;
			padding: 32rpx 30rpx;
			display: flex;
			background-color: #fff;

			.img {
				width: 48rpx;
				height: 48rpx;
				margin-right: 22rpx;
			}

			.info {
				flex: 1;
				font-size: 28rpx;
				font-weight: 500;
				color: #79807a;

				.pd {
					padding: 19rpx 0rpx 25rpx 0rpx;
				}

				.subtitle {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #303331;
					font-size: 32rpx;
				}
			}

			.price {
				display: flex;
				align-items: center;
				font-size: 36rpx;
				font-weight: bold;
				color: #333333;
			}
		}
	}

	.parking {
		padding: 26rpx 0rpx;

		.month {
			background-color: #fff;
			padding: 26rpx 0rpx 26rpx 31rpx;
			font-size: 28rpx;
			color: #666666;
		}

		.list {
			background-color: #fff;
			color: #79807a;
			font-size: 28rpx;
			padding: 39rpx 30rpx 36rpx 30rpx;
			border-bottom: 1rpx solid #e0e0e0;
			margin-bottom: 1rpx;

			.code {
				font-size: 32rpx;
				color: #303331;
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					font-size: 36rpx;
					color: #333333;
					font-weight: bold;
				}
			}

			.pd {
				padding: 6rpx 0rpx;
			}

			.date {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #808080;
			}
		}
	}
</style>
