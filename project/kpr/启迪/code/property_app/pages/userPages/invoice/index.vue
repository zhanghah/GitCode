<template>
	<view class="invoice_wrap">
		<view class="wrap_top">
			<view class="top_tab">
				<ui-tabs :dataList="tabs" :initKey="curIndex" @change="tabChange"></ui-tabs>
			</view>
			<view class="jilu" @click="tojilu">开票记录</view>
		</view>
		<view class="wrap_content">
			<view v-if="curIndex === 'wy'">
				<view v-if="list.length<0">
					<view class="content_item_wy" v-for="(item,index) in list" :key="index">
						<view class="item_title">{{item.date}}</view>
						<view class="item_infos">
							<view class="infos_item" v-for="(child,i) in item.chargeList" :key="i">
								<view class="item_check" @click="checkbox(child,index,i)">
									<ui-checkbox :value="checkState"></ui-checkbox>
								</view>
								<view class="item_labels">
									<view class="labels_name">{{child.roomMsg.comName}}{{child.roomMsg.buildingNumber}}栋{{child.roomMsg.floorNumber}}-{{child.roomMsg.roomNumber}}</view>
									<view class="labels_time">{{child.payTime | formatDate}}</view>
								</view>
								<view class="item_price">
									<view class="price">{{child.money}}元</view>
									<view class="text" v-if="child.receiptStatus === '2'">已开票</view>
								</view>
							</view>

						</view>
					</view>
				</view>
				<no-result v-else></no-result>
			</view>

			<view class="content_item_tc" v-if="curIndex === 'tc'">
				<!-- <view class="item_title">8月</view> -->
				<view class="item_infos" v-if="list2.length>0">
					<view class="infos_item" v-for="(item,index) in list2" :key="index">
						<view class="item_check">
							<ui-checkbox></ui-checkbox>
						</view>
						<view class="item_labels">
							<view class="labels_name">临停车辆：渝D265864</view>
							<view class="labels_text">壹江郡停车场</view>
							<view class="labels_time">2019-08-11 04:52</view>
						</view>
						<view class="item_price">
							<view class="price">125.28元</view>
							<view class="text"></view>
						</view>
					</view>
				</view>
				<no-result v-else></no-result>
			</view>
		</view>
		<view class="wrap_footer">
			<view class="footer_item">
				<view class="checkbox_all" @click="checkAll">
					<ui-checkbox :value="checkAllstate"></ui-checkbox>
				</view>
				<view class="all">全选</view>
				<view class="price">
					开票金额：<view class="price_txt">¥{{price}}</view>
				</view>
				<view class="btn" @click="toAddInvoicePage">
					<ui-button>下一步</ui-button>
				</view>
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
		name: 'Invoice',
		data() {
			return {
				tabs: [{
						key: 'wy',
						label: '物业费'
					},
					{
						key: 'tc',
						label: '停车费'
					}
				],
				curIndex: 'wy',
				list: [],
				list2: [],
				price: 0,
				checkAllstate: false,
				checkState: false
			}
		},
		filters: {
			formatDate(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + '  ' + h + ':' + m + ':' + s;
			}
		},
		methods: {
			tabChange(e) {
				console.log(e)
				this.curIndex = e;
				if (e === 'tc') {
					this.getStopCarList()
				} else {
					this.getList()
				}
			},
			toAddInvoicePage() {
				if (!this.price) {
					this.$toast('请选择一条费用开票~');
					return
				}
				let arr = []
				this.list.forEach(res => {
					res.chargeList.forEach(child => {
						if (child.state) {
							arr.push(child)
						}
					})
				})

				uni.navigateTo({
					url: `/pages/userPages/invoice/addInvoice/index?price=${this.price}&list=${JSON.stringify(arr)}`,
				});
			},
			tojilu() {
				uni.navigateTo({
					url: '/pages/userPages/invoice/listInvoice/index',
				});
			},
			//物业发票列表
			getList() {

				api.my.getListCharge().then(res => {
					if (res.status !== '0') {
						return
					};
					res.data.forEach(res => {
						res.chargeList.forEach(child => {
							child.state = false
						})
					})
					this.list = res.data
					console.log(this.list)
				})
			},
			//停车发票列表
			getStopCarList() {
				let canshu = {
					carCode: '111'
				}
				api.my.GetCarInfo(canshu).then(res => {

				})
			},
			checkbox(child, index, i) {
				this.price = 0;
				console.log(child)
				if (!child.state) {
					this.list[index].chargeList[i].state = true
				} else {
					this.list[index].chargeList[i].state = false
				}
				let arr = []
				this.list.forEach(res => {
					res.chargeList.forEach(child => {
						if (child.state) {
							arr.push(child)
						}
					})
				})
				console.log(arr)
				if (arr.length) {
					arr.forEach(res => {
						if (res.state) {
							this.price += +res.money
						}
					})
					return
				}
				this.checkAllstate = false
			},
			checkAll() {
				this.price = 0;
				if (!this.checkAllstate) {
					this.checkAllstate = true
					this.checkState = true
				} else {
					this.checkAllstate = false
					this.checkState = false
				}
				this.list.forEach(res => {
					res.chargeList.forEach(child => {
						if (this.checkAllstate) {
							child.state = true
						} else {
							child.state = false
						}
						if (child.state) {
							this.price += +child.money
						}
					})
				})
				this.price = this.price.toFixed(2)
				console.log(this.list)
			}
		},
		onShow() {
			this.price = 0
			this.getList()
			this.checkAllstate = true
			this.checkState = true
			this.$nextTick(() => {
				this.checkState = false;
				this.checkAllstate = false
			});
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '申请发票',
			});
		},
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.invoice_wrap {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-top: 110rpx;
		padding-bottom: 120rpx;
	}

	.wrap_top {
		position: fixed;
		left: 0;
		top: 0;
		background-color: #fff;
		width: 100%;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 8rpx;

		.top_tab {
			height: 100%;
			width: 280rpx;
		}

		.jilu {
			width: 160rpx;
			height: 48rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #2280ff;
			border-top-left-radius: 24rpx;
			border-bottom-left-radius: 24rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #fff;
		}
	}

	.wrap_content {

		.content_item_wy {
			width: 100%;

			.item_title {
				height: 80rpx;
				padding-left: 37rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.item_infos {
				background-color: #fff;
				padding-left: 26rpx;

				.infos_item {
					height: 140rpx;
					width: 100%;
					padding: 34rpx 36rpx 34rpx 0;
					border-bottom: 1rpx solid #E6E6E6;
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;

					&:last-child {
						border-bottom: none;
					}

					.item_check {
						width: 40rpx;
						height: 100%;
						margin-right: 25rpx;
						padding-top: 5rpx;
					}

					.item_labels {
						flex: 3;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: flex-start;

						.labels_name {
							font-size: 34rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #020204;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}

						.labels_time {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9D9D9D;
						}
					}

					.item_price {
						height: 100%;
						margin-left: 10rpx;
						flex-shrink: 0;
						display: flex;
						flex-direction: column;
						align-items: flex-end;
						justify-content: space-between;

						.price {
							font-size: 34rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FB9200;
						}

						.text {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
						}
					}
				}
			}
		}

		.content_item_tc {
			width: 100%;

			.item_title {
				height: 80rpx;
				padding-left: 37rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.item_infos {
				background-color: #fff;
				padding-left: 26rpx;

				.infos_item {
					height: 180rpx;
					width: 100%;
					padding: 34rpx 36rpx 34rpx 0;
					border-bottom: 1rpx solid #E6E6E6;
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;

					&:last-child {
						border-bottom: none;
					}

					.item_check {
						width: 40rpx;
						height: 100%;
						margin-right: 25rpx;
						padding-top: 5rpx;
					}

					.item_labels {
						flex: 3;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: flex-start;

						.labels_name {
							font-size: 34rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #020204;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}

						.labels_text {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #919992;
						}

						.labels_time {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9D9D9D;
						}
					}

					.item_price {
						height: 100%;
						margin-left: 10rpx;
						flex-shrink: 0;
						display: flex;
						flex-direction: column;
						align-items: flex-end;
						justify-content: space-between;

						.price {
							font-size: 34rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FB9200;
						}

						.text {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
						}
					}
				}
			}
		}
	}

	.wrap_footer {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 110rpx;
		width: 100%;
		padding: 0 25rpx;
		background-color: #fff;

		.footer_item {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.all {
				// margin: 0 23rpx;
			}

			.price {
				display: flex;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9E9E9E;

				.price_txt {
					font-size: 28rpx;
					color: #020204;
				}
			}

			.btn {
				width: 240rpx;
				height: 80rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}

			/deep/ .ui-button {
				height: 80rpx;
			}
		}
	}
</style>
