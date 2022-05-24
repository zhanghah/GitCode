<template>
	<view class="page-property-deposited">
		<view class="house-wrap" @click="navTo">
			<view class="house">
				<view class="icon"></view>
				<view class="content">
					<view class="room">
						{{room}}
					</view>
					<view class="user">
						<view class="icon-user"></view>
						<view v-if="userList.type==1">业主：</view>
						<view v-if="userList.type==2">租客：</view>
						<view v-if="userList.type==3">亲属：</view>
						<view>{{name.replace(/^(.).+(.)$/g, "**$2")}}</view>
						<view>{{phone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</view>
						<view class="yetai"> 业态：</view>
						<view>普通住宅</view>
					</view>
				</view>
				<view class="arrow"></view>
			</view>
		</view>

		<view class="info">
			<view class="wallet">
				<view class="title">账户总余额</view>
				<view class="price">800元</view>
				<view class="balaninfo" @click="openMx">
					<text class="balance_detail">余额明细</text>
					<view>
						<image class="img" src="../static/btn_up.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="info_content" v-if="show">
				<view >
					<text>住宅物业费余额</text>
					<text>200元</text>
				</view>
				<view >
					<text>公摊电费余额</text>
					<text>200元</text>
				</view>
			</view>
		</view>

		<view class="prestoreditems">
			<view class="pickerCost">
				<view>预存费项</view>
				<view class="link-ext">
					<picker mode="selector" @change="changeProject" :value="index" :range="changeFeeItemList">
						<view class="picker-flex">
							<view class="uni-input">{{changeFeeItemList[index]}}</view>
							<view class="icon">
								<image class="icon-image" src="../static/icon_arrow.png" mode=""></image>
							</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="pickerTime">
				<view>预存时间</view>
				<view class="times">
					<picker mode="date" fields="month" :start="startDate" :value="startime" @change="bindDateChanges">
						<view class="uni-input-start" v-if="!startime">开始时间</view>
						<view class="uni-input" v-if="startime">{{startime }}</view>
					</picker>
					<view class="split">至</view>
					<picker mode="date" fields="month" :start="startDate" :value="endtime" @change="bindDateChange">
						<view class="uni-input-end" v-if="!endtime">结束时间</view>
						<view class="uni-input" v-if="endtime">{{endtime }}</view>
					</picker>
				</view>
			</view>
		</view>

		<view class="totalbtton">
			<view class="title" @click="toJl">预存记录</view>
			<view class="total">
				<view class="price">
					合计：<text>￥806.20</text>
				</view>
				<ui-button class="btn" @click.native="handPay">确认支付</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import HouseInfo from '../components/houseinfo';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				startDate:'',
				startime: undefined,
				endtime: undefined,
				index: 0,
				userList: [], //用户信息列表
				room: '',
				name: '',
				phone: '',
				preFeePrice: 0, //预存费余额
				detailList: [], //预存费 列表
				feeItemList: [], //预存费项
				feeItemId: '', //预存费项ID
				changeFeeItemList: [], //选中预存费项
				month: 0, //月份
				types: 0, //计算方式
				price: 0, //预存费项单价
				show:false,
				type:'deposited',
			}
		},
		computed: {
			...mapState(['user', 'community']),
			totalMoney(){
				return this.userList.feeArea* this.price * this.month
			}
		},
		components: {
			HouseInfo,
		},
		methods: {
			// 明细
			openMx(){
				if(this.show){
					this.show=false
				}else{
					this.show=true
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
					this.userList = res.data.records[0]
					let houseInfo = res.data.records[0];
					this.room = houseInfo.communityName + houseInfo.buildingNumber + '栋' + houseInfo.unitNumber + '-' + houseInfo.floorNumber +
						'-' + houseInfo.roomNumber
					this.name = houseInfo.proprietorName;
					this.phone = houseInfo.proprietorPhone;
					
					this.getListFeeItem();
					this.getPreFee();
				})
			},

			// 切换房屋
			navTo(e) {
				uni.navigateTo({
					url: '/pages/indexPages/choosehome/index',
				});
			},

			// 修改房屋
			changeHome() {
				uni.$on('changeHome', data => {
					console.log(data)
					this.userList = data;
					this.room = data.communityName + data.buildingNumber + '栋' + data.unitNumber +
						'-' + data.floorNumber + '-' + data.roomNumber
				})
			},

			//结束时间
			bindDateChange(e) {
				this.endtime = e.target.value
				if (!this.startime) {
					this.$toast('请先选择开始时间~')
					this.endtime = undefined
					return
				} else if (Date.parse(this.endtime) < Date.parse(this.startime)) {
					this.$toast('结束时间不能小于开始时间~')
					this.endtime = undefined
					return
				}

				this.getPrice()
			},
			//开始时间 
			bindDateChanges(e) {
				this.startime = e.target.value
				console.log(Date.parse(this.startime))
				if (Date.parse(this.endtime) < Date.parse(this.startime)) {
					this.$toast('开始时间不能大于结束时间~')
					this.startime = undefined
					return
				}
				if (this.endtime) {
					this.getPrice()
				}
			},

			//算价格
			getPrice() {
				var startDate = new Date(this.startime)
				var endDate = new Date(this.endtime)
				var startTimeYear = startDate.getFullYear();
				var endTimeYear = endDate.getFullYear();
				var startTimeMonth=startDate.getMonth();
				var endTimeMonth=endDate.getMonth()
				var numMonth
				// 如果不是同年
				if(endTimeYear>startTimeYear){
					 var numYear=endTimeYear-startTimeYear;//年差
					 this.month=(12*numYear)-startTimeMonth+endTimeMonth+1
				}else{
					 this.month=endTimeMonth-startTimeMonth+1
				}
			},

			// 预存费项
			changeProject(e) {
				this.index = e.target.value;
				this.feeItemId = this.feeItemList[+this.index].id
				this.types = this.feeItemList[+this.index].feeFormula
				this.price = this.feeItemList[+this.index].price
				console.log(this.index,this.feeItemId,this.types,this.price)
			},
			// 支付
			handPay() {
				let canshu = {
					advancesReceivedList: [{
						endTime: Date.parse(this.endtime),
						feeItemId: this.feeItemId,
						money: this.totalMoney.toFixed(2) ,
						startTime: Date.parse(this.startime)
					}],
					comId: this.community.id,
					money: this.totalMoney.toFixed(2),
					propertyId: this.user.propertyId,
					roomId: this.userList.roomId
				}
				console.log(canshu)
				if (!this.startime || !this.endtime) {
					uni.showToast({
						title: '请选择时间',
						icon: 'none'
					})
				} else {
					// 预缴费
					api.lifejf.paypre(canshu).then(res => {
						if (res.status !== '0') {
							return
						};
						uni.navigateTo({
							url: `./payorder?priceNum=${this.totalMoney}&orderId=${res.data.orderNumber}&type=${this.type}`,
						});
						console.log(res)
					})
				}
			},

			toJl() {
				uni.navigateTo({
					url: `./storedrecords?roomId=${this.userList.roomId}`,
				});
			},
			// 根据住房ID获取预缴费余额
			getPreFee() {
				api.lifejf.getPreFee({
					roomId: this.userList.roomId
				}).then(res => {
					if (res.status !== '0') {
						return
					};
					this.preFeePrice = res.data.money ? res.data.money : 0
				})
			},

			// 根据住房ID获取计费科目所有列表
			getListFeeItem() {
				this.changeFeeItemList = []
				api.lifejf.getListFeeItem({
					roomId: this.userList.roomId
				}).then(res => {
					if (res.status !== '0') {
						return
					};
					console.log(res.data)
					this.feeItemList = res.data
					this.feeItemId=this.feeItemList[0].id
					this.price=this.feeItemList[0].price
					this.feeItemList.forEach(item => {
						this.changeFeeItemList.push(item.name)
					})
				})
			},
			// 获取当前时间
			getNewTime(){
				var time=new Date()
				var y = time.getFullYear();
				var m = time.getMonth()+1;
				if(m<10){
					m='0'+(m+1)
				}else if(m==12){
					m='01'
				}else{
					m=m+1
				}
				this.startDate= y+'-'+m
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '预缴充值',
			});
			this.getMyHousingPages();
			this.getNewTime();
		},
		onLoad(option) {
		}
	}
</script>

<style lang="less" scoped>
	* {
		margin: 0rpx;
		padding: 0rpx;
	}


	.page-property-deposited {
		min-height: 100vh;
		padding-bottom: 108rpx;
		box-sizing: border-box;
		background-color: #F5F5F5;
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

	.info {
		padding: 15rpx;

		.wallet {
			width: 720rpx;
			background: url(../static/property/bg_wyjf_03.png) no-repeat;
			height: 220rpx;
			background-size: 100% 100%;
			color: #FFFFFF;
			font-family: "PingFang SC";
			font-weight: 500;

			view {
				padding-left: 30rpx;
			}

			.title {
				font-size: 31rpx;
				padding-top: 35rpx;
			}

			.price {
				font-size: 48rpx;
				margin: 5rpx 0rpx 25rpx 0rpx;
			}

			.balaninfo {
				display: flex;
				height: 26rpx;
				line-height: 26rpx;
				font-size: 28rpx;
				.balance_detail{
					
				}
				.img{
					width: 26rpx;
					height: 26rpx;
				}
			}
		}

		.info_content {
			font-size: 31rpx;
			font-family: "PingFang SC";
			font-weight: 500;
			color: #666666;
			padding: 0rpx 30rpx;
			background: #FFFFFF;
			padding-bottom: 33rpx;

			view {
				display: flex;
				justify-content: space-between;
				// padding: 20rpx 0rpx;
				padding-top: 40rpx;
			}
		}
	}

	.prestoreditems {
		margin-top: 30rpx;

		.link-ext {
			color: #666666;
			font-size: 31rpx;
			font-weight: 500;
			font-family: 'PingFang SC';

			.picker-flex {
				display: flex;

				.icon {
					width: 10rpx;
					height: 20rpx;
					margin-left: 16rpx;

					.icon-image {
						width: 10rpx;
						height: 20rpx;
					}
				}
			}
		}

		.pickerCost {
			height: 100rpx;
			line-height: 100rpx;
			padding: 10rpx 35rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			border-bottom: 1rpx solid #E6E6E6;
		}

		.pickerTime {
			height: 110rpx;
			line-height: 110rpx;
			padding: 10rpx 35rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;

			.times {
				display: flex;
				justify-content: space-between;

				view.split {
					padding: 0rpx 39rpx;
				}
			}

			.uni-input {
				width: 165rpx;
				height: 90rpx;
				text-align: center;
				color: #F05050;
				border-bottom: 1rpx solid #F05050;
			}
			
			.uni-input-start,.uni-input-end{
				width: 165rpx;
				height: 90rpx;
				text-align: center;
				color: #666666;
				border-bottom: 1rpx solid #999999;
			}
		}
	}

	.totalbtton {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
		z-index: 99;

		.title {
			font-size: 24rpx;
			font-family: "PingFang SC";
			font-weight: 500;
			color: #9E9E9E;
			text-align: center;
			padding-bottom: 21rpx;
			// width: 100%;
		}
	}

	.total {
		width: 750rpx;
		height: 108rpx;
		background: #FFFFFF;
		box-shadow: 0rpx -1rpx 0rpx 0rpx #E0E0E0;
		align-items: center;
		display: flex;
		justify-content: space-between;
		
		.btn{
			margin-right: 40rpx;
		}

		view.price {
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: Bold;
			color: #333333;
			padding-left: 32rpx;

			text {
				color: #F05050,
			}
		}
	}
</style>
