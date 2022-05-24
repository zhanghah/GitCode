<template>
	<view class="page-property-payhistory-details">
		<view class="info">
			<view class="title">
				<view>
					<image v-if="type == 'property'" class="img" src="../../static/property/icon_home.png"></image>
					<image v-if="type == 'temporary'" class="img" src="../../static/icon_longcar.png"></image>

					{{type == 'property' ? '物业费 - ' : type == 'store' ? '储值车牌：' : type == 'month' ? '月租车牌' : ''}}
					<text v-if="type == 'property'">{{homeName}}</text>
					<text v-else-if="type == 'temporary'">渝F58651</text>
					<text v-else>渝A48569</text>
				</view>
			</view>

			<view class="price" v-if="type == 'property' || type == 'temporary'">¥{{money}}</view>
			<view class="price" v-else>20元</view>

			<view class="info_content">
				<view>
					订单编号：<text>{{recieptCode}}</text>
				</view>
				<view>
					缴费时间：<text>{{ '2021-08-02 12:15' |date('YYYY-MM-DD HH:mm')}}</text>
					<!-- 缴费时间：<text>{{payTime|date('YYYY-MM-DD HH:mm')}}</text> -->
				</view>
				<!-- temporary -->
				<view v-if="type == 'temporary'">
					停车时长：<text>1 小时 20 分钟</text>
				</view>
				<!-- temporary/store/month -->
				<view v-if="type != 'property'">
					停车场：<text>幸福五社小区停车场</text>
				</view>
				<!-- month -->
				<view v-if="type == 'month'">
					续费月数：<text>2019-10-25 至 2019-10-25</text>
				</view>
			</view>
		</view>
		<view class="mingxi">
			<view class="title">
				缴费明细
			</view>
			<view class="content">
				<view class="payname">
					电梯房
					<text>(2021/01/02-2022/02/02)</text>
				</view>
				<view class="yj">
					应缴金额：￥156.98
				</view>
				<view class="jf">
					计费金额：￥100
				</view>
				<view class="zn">
					滞纳金：￥14.00
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'month',
				navData: '',
				homeName: '', //房屋名称
				money: '', //缴费金额
				recieptCode: '', //订单编号
				payTime: '', //缴费时间

			}
		},
		methods: {
		},
		onLoad(option) {
			// type:store 储值 / month 月租车 / temporary 临停 / property 物业
			if (option.navData) {
				let {comName,buildingNumber,unitNumber,floorNumber,roomNumber}=JSON.parse(option.navData).roomMsg
				let {money,recieptCode,payTime}=JSON.parse(option.navData)
				this.homeName = comName + buildingNumber + '栋' + unitNumber +
					'-' + floorNumber + '-' + roomNumber;
				this.money =money;
				this.recieptCode =recieptCode;
				this.payTime = payTime
			}
			this.type = option.type || 'property';
			if (option.type != 'property') {
				uni.setNavigationBarTitle({
					title: "缴费详情",
				});
			} else {
				uni.setNavigationBarTitle({
					title: "费用详情",
				});
			}

		}
	}
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.page-property-payhistory-details {
		min-height: 100vh;
		padding-bottom: 108rpx;
		box-sizing: border-box;
		padding-top: 20rpx;
		background-color: #F5F5F5;
	}

	.info {
		padding: 32rpx 28rpx;
		margin-bottom: 23rpx;
		background-color: #fff;

		.title {
			font-size: 32rpx;
			color: #303331;
			display: flex;
			justify-content: space-around;
			align-items: center;

			view {
				display: flex;
				justify-content: space-around;
				align-items: center;
			}

			.img {
				width: 48rpx;
				height: 48rpx;
				margin-right: 21rpx;
			}
		}

		.price {
			font-size: 36rpx;
			font-weight: bold;
			padding: 29rpx 0rpx;
			color: #333333;
			text-align: center;
		}
	}

	.info_content {
		font-size: 28rpx;
		color: #79807A;

		view {
			display: flex;
			justify-content: space-between;
			padding: 10rpx 0rpx;

			&:first-child {
				padding-top: 35rpx;
			}

			text {
				color: #303331;
			}
		}
	}

	.mingxi{
		width: 100%;
		background-color: #FFFFFF;
		padding: 30rpx;
		
		.title{
			color: #303331;
			font-size: 30rpx;
			font-weight: bold;
			padding-bottom: 29rpx;
			border-bottom: 1rpx #E3E3E3 solid;
		}
		
		.content{
			color: #666666;
			line-height: 48rpx;
			.payname{
				color: #303331;
				font-size: 30rpx;
				padding: 30rpx 0;
				text{
				color: #999999;
					
				}
			}
			
			view{
				font-size: 26rpx;
			}
		}
	}
</style>
