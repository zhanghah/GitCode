<template>
	<view class="page-parking-index">
		<view class="top" v-if="navbarIndex=='lt'">
			<nav-bar :title="title">
				<template slot="option"> </template>
			</nav-bar>

			<view class="content">
				<view :class="{ active: navbarIndex == 'lt' }">临停缴费</view>
				<view @tap="navbarClick(true)" :class="{ active: navbarIndex == 'long' }">长期车缴费</view>
			</view>
		</view>

		<view v-if="navbarIndex=='long'" class="long-top">
			<view class="title">
				<view class="back" @tap="back">

				</view>
				<view class="title-name">
					停车缴费
				</view>
			</view>

			<view class="content">
				<view @tap="navbarClick()">临停缴费</view>
				<view class=" active">长期车缴费</view>
			</view>
		</view>
		<!-- 临停 -->
		<view v-if="navbarIndex == 'lt'" class="snap">
			<view class="cardCode">
				<view class="title">请输入缴费车辆</view>
				<view class="number-wrap">
					<!-- 输入缴费车辆组件 -->
					<car-number v-model="carNumber"></car-number>
				</view>
				<view class="btn">
					<ui-button @click.native="queryPay">查询缴费</ui-button>
				</view>
				<navigator class="hrefs" url="../property/payhistory/index?type=1" hover-class="none">缴费记录</navigator>
			</view>

			<view class="historyBox">
				<view class="history">
					<view class="title" @tap="clearList()">
						<view class="lab"> 历史车辆<text>(点击后立即缴费)</text> </view>
						<view class="clear">
							<image src="../static/icon_clear.png"></image>
							清空
						</view>
					</view>

					<view class="content">
						<view class="licensePlate" v-if="datas">
							<view v-for="itm in carCodeList" :key="itm" @tap="queryPay">
								<car-number-card :value="carNumber" size="small"></car-number-card>
							</view>
						</view>
						<no-result v-else></no-result>
					</view>
				</view>
			</view>
		</view>

		<!-- 长期 -->
		<view class="long" v-else>
			<view class="longContent" >
				<view class="block" @tap="toPageDetail('month')">
					<image src="../static/icon_longcar.png" style="width: 90rpx; height: 90rpx"></image>
					<view class="longInfo">
						<view>月租车牌：渝 A48569</view>
						<view class="gray pd17">停车场：幸福五社小区停车场</view>
						<view class="gray">费用到期时间：2019-09-25</view>
					</view>
					<view class="img">
						<image src="../static/icon_left.png" style="width: 17rpx; height: 30rpx"></image>
					</view>
				</view>
				
				<view class="block" @tap="toPageDetail('chuxu')">
					<image src="../static/icon_linting.png" style="width: 90rpx; height: 90rpx"></image>
					<view class="longInfo">
						<view>储值车牌：渝 A48569</view>
						<view class="gray pd17">停车场：幸福五社小区停车场</view>
						<view class="gray">预存余额：￥158</view>
					</view>
					<view class="img">
						<image src="../static/icon_left.png" style="width: 17rpx; height: 30rpx"></image>
					</view>
				</view>


				<navigator class="hrefs" url="../property/payhistory/index?type=1" hover-class="none">缴费记录</navigator>
			</view>

			<!-- <view class="nulls" v-else>
				<no-result message="暂无长期车辆，无相关信息"></no-result>
				<navigator class="hrefs records" url="../property/payhistory/index?type=1" hover-class="none">缴费记录
				</navigator>
			</view> -->
		</view>
		<!-- <ui-image-upload 
			@stateChange="stateChangeHandler"
			:params="{type: 12}"
			@success="uploadSuccessHandler"
		></ui-image-upload> -->
		
		
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import api from '@/api';
	import {
		showToast
	} from '@/utils/utils.js'

	import CarNumber from "../components/car-number";
	import CarNumberCard from "../components/car-number-card";

	export default {
		components: {
			CarNumber,
			CarNumberCard,
		},
		computed: {
			...mapState(['user', 'community']),
		},
		data() {
			return {
				longData: false, // 长期车牌有无数据
				datas: true,
				title: "停车缴费",
				carNumber: "",
				navbarIndex: '',
				carCodeList: [],
				chargeType: 'mont',
			};
		},
		watch: {
			carNumber(num) {
				console.log(num);
			},
		},
		methods: {
			// 切换顶部查询激活状态
			navbarClick(status) {
				if (status) {
					this.navbarIndex = 'long';
				} else {
					this.navbarIndex = 'lt';
				}
			},
			// 查询缴费
			async queryPay() {
				// if (!this.carNumber) {
				// 	showToast('请输入车牌号')
				// 	return
				// }
				// const res = await api.carcharge.getCarPay({
				// 	carCode: this.carNumber,
				// 	comId: this.community.id,
				// 	propertyId: this.user.propertyId,
				// 	userId: this.user.id
				// })
				// console.log(res.data)
				// if (res.data) {
				// 	uni.navigateTo({
				// 		url: "./costdetails",
				// 	});
				// 	this.carCodeList.push(res.data.carMsg.carCode)
				// }
				// this.carCodeList.push(this.carNumber)
				uni.navigateTo({
					url: "./costdetails",
				});


			},
			// 清空车辆历史数据
			clearList() {
				this.datas = !this.datas;
			},

			toPageDetail(type) {
				if (type == 'month') {
					// 月租车
					uni.navigateTo({
						url: "./long/monthinfo",
					});
				} else {
					// 储值
					uni.navigateTo({
						url: "./long/storeinfo",
					});
				}
			},
			// stateChangeHandler(state) {
			// 	console.log(state);
			// },
			// uploadSuccessHandler(res) {
			// 	console.log(res);
			// },
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(opt) {
			this.navbarIndex=opt.type
		},
		beforeMount() {},
	};
</script>

<style scoped lang="less">
	.page-parking-index {
		min-height: 100vh;
		padding-bottom: 108rpx;
		box-sizing: border-box;
		// padding-top: 20rpx;
		background-color: #f5f5f5;
	}

	.long-top {
		width: 100%;
		background: #802890;
		font-size: 26rpx;
		color: #F5F5F5;

		.title {
			width: 100%;
			padding: 100rpx 24rpx 0 30rpx;
			height: 44rpx;
			line-height: 44rpx;
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: bold;
			display: flex;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			position: relative;

			.back {
				width: 35rpx;
				height: 35rpx;
				background: url(@/static/components/icon_white_back.png) no-repeat center center;
				background-size: 30rpx 30rpx;
			}
			
			.title-name{
				height: 100%;
				position: absolute;
				top: 78rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.content {
			padding: 55rpx 25rpx 29rpx 25rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			view {
				margin-right: 20rpx;
			}
		}

		view.active {
			font-weight: bold;
			font-size: 36rpx;
		}
	}

	.top {
		width: 100%;
		height: 405.1rpx;
		background: url(../static/icon_tcjf.png) no-repeat;
		background-size: 100% 100%;
		font-size: 24rpx;
		font-weight: bold;
		color: #ffffff;

		.content {
			padding: 25rpx;
			padding-bottom: 60rpx;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			view {
				margin-right: 20rpx;
			}
		}

		view.active {
			font-size: 34rpx;
		}
	}

	.dividing {
		height: 20rpx;
		background: #f5f5f5;
	}

	.number-wrap {
		padding: 0rpx 30rpx;
	}

	.cardCode {
		width: 690rpx;
		height: 436rpx;
		background: #ffffff;
		border-radius: 16rpx;
		margin: 0 auto;
		padding: 10rpx 0rpx;

		.title {
			padding: 35rpx 0rpx 13rpx 0rpx;
			font-size: 36rpx;
			color: #333232;
			text-align: center;
		}

		.btn {
			padding: 25rpx;
		}

		.hrefs {
			text-align: center;
			font-size: 26rpx;
			color: #666666;
		}
	}

	.historyBox {
		padding: 0rpx 30rpx;
		margin-top: 66rpx;
	}

	.history {
		padding: 0rpx 20rpx 33rpx 20rpx;
		background-color: #fff;
		border-radius: 16rpx;

		.title {
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			height: 84rpx;
			color: #333232;
			align-items: center;
			border-bottom: 1rpx solid #e6e6e6;

			.lab text {
				color: #999797;
				font-size: 26rpx;
				margin-left: 16rpx;
			}

			.clear {
				display: flex;
				align-items: center;

				image {
					width: 24rpx;
					height: 30rpx;
					margin-right: 23rpx;
				}
			}
		}

		.content {
			& .licensePlate {
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				&>view {
					margin: 26rpx 7rpx;
					margin-top: 0rpx;
				}
			}

			padding-top: 26rpx;
		}
	}

	.snap {
		margin-top: -35rpx;
	}

	// 长期
	.longContent {
		padding: 26rpx 30rpx;
		
		.block{
			margin-bottom: 20rpx;
		}

		&>view {
			display: flex;
			font-size: 36rpx;
			color: #303331;
			padding: 25rpx 17rpx;
			background-color: #fff;
			border: 1px solid #e6e6e6;
			border-radius: 8px;

			image {
				margin-right: 22rpx;
			}

			.img {
				display: flex;
				align-items: center;
			}
		}

		.longInfo {
			width: 501rpx;

			view {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			view.gray {
				color: #79807a;
				font-size: 26rpx;
			}

			view.pd17 {
				padding: 17rpx 0rpx;
			}
		}

		.hrefs {
			position: fixed;
			bottom: 71rpx;
			left: 0rpx;
			right: 0rpx;
			text-align: center;
			font-size: 24rpx;
			color: #9e9e9e;
		}
	}

	.nulls {
		.hrefs {
			text-align: center;
			// padding-top: 33rpx;
			font-size: 24rpx;
			color: #9e9e9e;
		}

		.records {
			margin-top: 25rpx;
		}
	}
</style>
