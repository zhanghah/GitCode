<template>
	<view class="page-property-payment">
		<view class="house-wrap" @click="navTo">
			<view class="house">
				<view class="icon"></view>
				<view class="content">
					<view class="room">
						{{roomName}}
					</view>
					<view class="user">
						<view class="icon-user"></view>
						<view v-if="userList.type==1">业主：</view>
						<view v-if="userList.type==2">租客：</view>
						<view v-if="userList.type==3">亲属：</view>
						<view>{{name.replace(/^(.).+(.)$/g, "$1*")}}</view>
						<view>{{phone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</view>
						<view class="yetai"> 业态：</view>
						<view>普通住宅</view>
					</view>
				</view>
				<view class="arrow"></view>
			</view>
		</view>

		<view class="pay-info">
			<view class="pre-pay wrap">
				<view class="icon"></view>
				<view class="content">
					物业预存余额 <view class="money" v-if="preFeePrice">￥{{`${preFeePrice}`}}</view>
					 <view class="money" v-else>￥0</view>
				</view>
				<view class="btn" @click="toCz">预缴充值</view>
			</view>
			<view class="deduction">
				<view>是否使用预收金抵扣</view>
				<u-switch v-model="checked" active-color="#FEC1C1"></u-switch>
			</view>
		</view>

		<view class="payment-list">
			<view class="not-pay">
				<view class="vertical"></view>
				当前未缴
			</view>
			<view class="total wrapper">
				<view class="checkall" @tap="checkAll">
					<ui-checkbox :value="checkAllstate"></ui-checkbox>
				</view>
				<view class="text">全选</view>

				<view class="money">合计： ￥{{totalMoney}}</view>
			</view>

			<view class="container" v-for="(item,index) in list" :key="index">
				<template v-if="list.length">
					<view class="item">
						<view class="month-wrap">
							<view @tap="changeCheckbox(item,index)">
								<ui-checkbox v-model="item.checked"></ui-checkbox>
							</view>
							<view class="date">
								<text>{{item.billName}}</text>
								<text>{{item.chargeStartTime}}-{{item.chargeEndTime}}</text>
							</view>
						</view>
						<view class="info-wrap">
							<view class="content">
								<view class="late">
									<view>
										应缴金额:
									</view>
									<view class="money">
										￥{{item.finalPayAmount}}
									</view>
								</view>
								<view class="detail" @tap="openMx(item.show,index)">
									<view>
										费用明细
									</view>
									<view class="arrow open"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="detail-info" v-if="item.show">
						<view class="info-item">
							<view>
								计费金额
							</view>
							<view class="number">
								￥{{item.needPayAmount}}
							</view>
						</view>
						<view class="info-item">
							<view>
								滞纳金
							</view>
							<view class="number">
								￥{{item.latePayAmount}}
							</view>
						</view>
					</view>
				</template>
			</view>
		</view>

		<view class="box">
			<view class="total-money">
				合计：
				<view class="money">
					￥{{totalMoney}}
				</view>
			</view>

			<view class="pay-btn" @click="submit">
				<ui-button>确认支付</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';

	import HouseInfo from '../components/houseinfo';

	export default {
		components: {
			HouseInfo,
		},
		data() {
			return {
				checked: false, //是否抵扣
				checkAllstate: false,//
				jfPrice: 100,
				znPrice: 23.98,
				allPrice: '',
				userList: [], //用户信息列表
				roomName: '',
				name: '',
				phone: '',
				list: [{
						billId: 3,
						billName: "住宅缴费",
						chargeEndTime: "2021/08/01",
						chargeItemName: "物业费",
						chargeStartTime: "2021/07/01",
						createTime: "1681547745111",
						finalPayAmount: "168",
						latePayAmount: "28",
						needPayAmount: "140",
						payState: 0,
						checked:false,
						show:false
					},
					{
						billId: 4,
						billName: "住宅缴费",
						chargeEndTime: "2021/09/01",
						chargeItemName: "物业费",
						chargeStartTime: "2021/08/01",
						createTime: "1681547745111",
						finalPayAmount: "168",
						latePayAmount: "28",
						needPayAmount: "140",
						payState: 0,
						checked:false,
						show:false
					},
				],
				// totalMoney: 0, //合计价格
				preFeePrice: '', //预缴费余额
				ids: [], //未缴费id
				type: 'payment',
				houseId: '', //房间id
				houseType: 0, //房间类型;1-住宅,2-商铺
				pChargeItemId: '', //收费项id
				pageNumber: 1,
				payState: 0, //0=未支付,1=待付款，2=支付中,3=支付失败，4=已支付,5=退款中,6=退款失败,7=退款成功
				rowNumber: 10,
			}
		},
		computed: {
			...mapState(['user', 'community']),
			totalMoney(){
				let money=0
				this.list.forEach(item=>{
					if(item.checked){
						money+=parseFloat(item.finalPayAmount)
					}
				})
				return money
			}
		},
		watch: {
			ids() {
				if(this.list.length==this.ids.length){
					this.checkAllstate=true
				}else{
					this.checkAllstate=false
				}
			}
		},
		methods: {
			// 打开明细
			openMx(show,index) {
				if (show) {
					this.list[index].show = false
				} else {
					this.list[index].show = true
				}
			},
			// 全选
			checkAll() {
				console.log(this.checkAllstate)
				if(this.checkAllstate){
					this.checkAllstate=false;
					this.ids=[];
					this.totalMoney=0
					this.list.forEach((item)=>{
						item.checked=false;
					})
				}else{
					this.ids=[]
					this.checkAllstate=true
					this.list.forEach((item)=>{
						item.checked=true;
						this.ids.push(item.billId)
						// this.totalMoney+=parseFloat(item.finalPayAmount)  
					})
				}
			},

			changeCheckbox(item,index) {
				if(item.checked){
					this.ids.push(item.billId)
				}else{
					this.ids.splice(this.ids.findIndex(value=>value == item.billId), 1);
				}
			},

			// 获取我的住房分页列表
			getMyHousingPages() {
				const query = {
					propertyId: this.user.propertyId,
					userId: this.user.id,
					checkStatus: 1,
					current: 1,
					size: 1000
				}
				api.my.getMyHousingPages(query).then(res => {
					if (res.status !== '0') {
						return
					};
					this.userList = res.data.records[0];
					this.houseId = res.data.records[0].roomId
					let houseInfo = res.data.records[0];
					this.roomName = houseInfo.communityName + houseInfo.buildingNumber + '栋' + houseInfo
						.unitNumber +
						'-' + houseInfo.floorNumber +
						'-' + houseInfo.roomNumber
					this.name = houseInfo.proprietorName;
					this.phone = houseInfo.proprietorPhone
					this.getList();
					this.getPreFee()
				})
			},

			// 切换房屋
			navTo(e) {
				uni.navigateBack({
					delta: 1
				})
				this.getList()
			},

			// 修改房屋
			changeHome() {
				uni.$on('changeHome', data => {
					this.userList = data;
					this.roomName = data.communityName + data.buildingNumber + '栋' + data.unitNumber +
						'-' + data.floorNumber + '-' + data.roomNumber
				})
			},

			//获取所有未缴纳账单列表 
			getList() {
				api.lifejf.postWyfList({
					hasLatePayAmount: true, //是否产生滞纳金; true-有滞纳金,false-无滞纳金
					houseId: this.houseId, //房间id
					houseType: 1, //房间类型;1-住宅,2-商铺
					// pChargeItemId: 0, //收费项id
					pageNumber: 1,
					rowNumber: 10,
				}).then(res => {
					if (res.status !== '0') {
						return
					};
					res.data.forEach(item => {
						item.checkall = false
						console.log(item)
					})
					// this.list = res.data.list
				})
			},

			// 获取物业预存余额
			getPreFee() {
				// api.lifejf.getPreFee({
				// 	roomId: this.userList.roomId
				// }).then(res => {
				// 	if (res.status !== '0') {
				// 		return
				// 	};
				// })
			},

			toCz() {
				uni.navigateTo({
					url: `/pages/indexPages/property/deposited?roomMsg=${JSON.stringify(this.msg)}`,
				});
			},
			// 确认支付
			submit() {
				let canshu = {
					ids: this.ids,
					roomId: this.userList.roomId
				}
				api.lifejf.getPay(canshu).then(res => {
					if (res.status !== '0') {
						return
					};
					uni.navigateTo({
						url: `./payorder?priceNum=${this.total}&orderId=${res.data.orderNumber}&type=${this.type}`,
					});
				})
				// if (this.ids.length > 0) {
				// }else{
				// 	this.$toast('请选择缴费事项')
				// }
			}

		},
		mounted() {
			this.getMyHousingPages();
			this.changeHome()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '物业缴费',
			});
		}
	}
</script>

<style scoped lang="less">
	.page-property-payment {
		min-height: 100vh;
		padding-bottom: 108rpx;
		box-sizing: border-box;
		background-color: #F5F5F5;
	}

	.wrap {
		padding: 0 25rpx;
	}

	.wrapper {
		padding: 30rpx;
	}

	.house-wrap {
		padding: 25rpx 30rpx;
		background-color: #FFFFFF;

		.house {
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			border: 1px solid #E6E6E6;
			padding: 25rpx 17rpx;
			border-radius: 8rpx;
			box-shadow: 0 0 12rpx #E6E6E6;

			.icon {
				width: 90rpx;
				height: 90rpx;
				background: url(../static/property/icon_home.png) no-repeat;
				background-size: 100% 100%;
				flex-shrink: 0;
				flex-grow: 0;
			}

			.arrow {
				width: 11rpx;
				height: 19rpx;
				background: url(../static/property/icon_arrow.png) no-repeat;
				background-size: 100% 100%;
				flex-shrink: 0;
				flex-grow: 0;
			}

			.content {
				flex: 1;
				padding: 0 23rpx;
				color: #303331;

				.room {
					font-size: 36rpx;
					margin-bottom: 10rpx;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.user {
					color: #79807A;
					font-size: 26rpx;
					display: flex;
					align-items: center;

					.icon-user {
						width: 18rpx;
						height: 21rpx;
						background: url(../static/property/icon_user.png) no-repeat;
						background-size: 100% 100%;
						margin-right: 10rpx;

					}

					.yetai {
						margin-left: 16rpx;
					}
				}

			}
		}
	}

	.pay-info {
		padding: 10rpx 25rpx 35rpx;
		background: #FFFFFF;

		.deduction {
			padding: 20rpx 25rpx 0 25rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.pre-pay {
		display: flex;
		align-items: center;

		.icon {
			width: 33rpx;
			height: 38rpx;
			background: url(../static/property/icon_money.png) no-repeat;
			background-size: 100% 100%;
			flex-shrink: 0;
			flex-grow: 0;
		}

		.content {
			color: #303331;
			font-size: 30rpx;
			flex: 1;
			display: flex;
			align-items: center;
			padding: 0 17rpx;

			.money {
				color: #F05050;
				font-size: 42rpx;
				margin-left: 20rpx;
			}
		}

		.btn {
			flex-shrink: 0;
			flex-grow: 0;
			width: 180rpx;
			height: 64rpx;
			background: #FFFFFF;
			border: 1rpx solid #F05050;
			font-size: 28rpx;
			border-radius: 32rpx;
			color: #F05050;
			display: flex;
			align-items: center;
			justify-content: center;
		}

	}

	.payment-list {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		overflow: hidden;

		.not-pay {
			padding: 0 30rpx;
			display: flex;
			margin-top: 22rpx;
			color: #333333;
			font-size: 30rpx;
			font-weight: bold;

			.vertical {
				width: 8rpx;
				height: 40rpx;
				background-color: #802890;
				border-radius: 4rpx;
				margin-right: 20rpx;
			}
		}

		.total {
			display: flex;
			color: #333333;
			font-size: 30rpx;
			font-weight: bold;

			.text {
				flex: 1;
			}
		}

		.checkall {
			margin-right: 20rpx;
			flex-shrink: 0;
			flex-grow: 0;
		}

		.container {
			background-color: #F5F5F5;

			.item {
				border-top: 1rpx solid #DBDBDB;
				font-size: 30rpx;
				padding-left: 30rpx;
				background-color: #FFFFFF;
				padding-bottom: 37rpx;

				.month-wrap {
					display: flex;
					padding: 40rpx 0;
					padding-right: 30rpx;

					.date {
						margin-left: 20rpx;
					}
				}

				.content {
					display: flex;
					justify-content: space-between;
					padding: 0 38rpx 0 77rpx;

					.late {
						display: flex;
						color: #999999;
						font-size: 25rpx;

						.money {
							margin-left: 10rpx;
							color: #F05050;
						}
					}

					.detail {
						display: flex;
						align-items: center;
						color: #999999;
						font-size: 25rpx;

						.arrow {
							width: 21rpx;
							height: 13rpx;
							background: url(../static/property/btn_wyjf_06.png) no-repeat;
							background-size: 100%;
							margin-left: 20rpx;
						}

						.open {
							background-image: url(../static/property/btn_wyjf_07.png);
						}
					}
				}

			}

			.detail-info {
				width: 100%;
				background-color: #F5F5F5;
				padding: 25rpx 30rpx 0 94rpx;
				color: #999999;
				font-size: 25rpx;

				.info-item {
					display: flex;
					justify-content: space-between;
					padding-bottom: 25rpx;
				}
			}
		}
	}

	.box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		border-top: 1rpx solid #E0E0E0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10rpx 32rpx;
		color: #333333;
		font-size: 34rpx;

		.total-money {
			display: flex;

			.money {
				font-weight: Bold;
				color: #F05050;
			}
		}
	}
</style>
