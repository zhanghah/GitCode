<template>
	<view class="content_mall"  ref="order_list_v">
		<view class="order_xx">
			<text class="name_bt">订单基础信息</text>
			<view class="cell" v-if="isOne">
				<text class="list">订单方式</text>
				<picker @change="deliveryModeTap" :value="shopDelivery_findInfo_datE_Index"
					:range="shopDelivery_findInfo_date" range-key="text">
					<view class="uni-input">{{shopDelivery_findInfo_date[shopDelivery_findInfo_datE_Index].text}}</view>
				</picker>
			</view>
			<view class="cell"
				@click="$goPage(['/pages/mallUser/address/address'],function fun() {return {'isXz': true}})">
				<text class="list">地址</text>
				<text>{{sysUserReceivingAddress_date?sysUserReceivingAddress_date.receivingAddress + sysUserReceivingAddress_date.detailedAddress:"请选择收货地址"}}</text>
			</view>
			<view class="cell">
				<text class="list">时间</text>
				<view class="time" @click="pickershow = true">
					<text style="white-space:nowrap">{{timeOfAppointment}}</text>
					<u-icon name="arrow-right" color="#282828" size="24"></u-icon>
				</view>
			</view>
			<view class="cell" @click="changeOrders">
				<text class="list">电话</text>
				<text>{{sysUserReceivingAddress_date?sysUserReceivingAddress_date.contactPhoneNumber:''}}</text>
			</view>
			<view class="cell" @click="changeOrders" v-if="isOne">
				<text class="list">备注</text>
				<text :class="!remarks?'no':''">{{remarks?remarks:"未填写"}}</text>
			</view>
			<!-- <view class="cell" @click="$goPage(['/pages/mallUser/order/changeOrders/changeOrders'])">
				<text class="list">发票</text>
				<text class="no">未填写</text>
			</view> -->
		</view>
		<div class="order_list_v">
			<view class="order_list" v-for="(item,index) in addMallShoppingCartDTO.xuanzDateList" :key='index'>
				<view class="dp"
					@click="$goPage(['/pages/mallUser/home/home'],function fun() {return {'id': item.byIdMallShopVO.id}})">
					<view class="name">
						<image :src="item.byIdMallShopVO.shopHeadUrl" mode="aspectFill"></image>
						<text>{{item.byIdMallShopVO.shopsName}}</text>
						<u-icon name="arrow-right" color="#282828" size="27"></u-icon>
					</view>
				</view>
				<view class="cell_v">
					<view class="cell" v-for="(cell, indexs) in item.mallShoppingCartVOList" :key="indexs"
						@click="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': cell.goodsId}})">
						<u-image class="tx" width="132rpx" height="130rpx" border-radius='12'
							:src="cell.currentGoodsInfo.goodsResourceVOList[0].sysStaticResourceBO.fileVisitUrl">
							<view slot="error" style="font-size: 24rpx;">加载失败</view>
						</u-image>
						<view class="text">
							<view class="wz">
								<text>{{cell.currentGoodsInfo.goodsName}}</text>
								<text>¥ {{$uniPopup.numFilter(cell.currentGoodsInfo.goodsSalePrice)}}</text>
							</view>
							<view class="wz wzs">
								<text>产自云南，美味多汁，500g/份</text>
								<text>×{{cell.goodsNumber}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="price" v-if="!isOne">
					<view class="maj majs">
						<text>配送方式</text>
						<picker @change="deliveryModeTap" :value="item.byIdMallShopVO.shopDelivery_findInfo_datE_Index"
							:range="item.byIdMallShopVO.shopDelivery_findInfo_date" range-key="text">
							<view class="uni-input">
								{{item.byIdMallShopVO.shopDelivery_findInfo_date?item.byIdMallShopVO.shopDelivery_findInfo_date[item.byIdMallShopVO.shopDelivery_findInfo_datE_Index].text:'无'}}
							</view>
						</picker>
					</view>
					<view class="maj majs">
						<text class="list">备注</text>
						<u-input v-model="item.byIdMallShopVO.remarks" type="text" inputAlign="right"/>
					</view>
				</view>
			</view>
		</div>
		<view class="order_list" style="margin-bottom: 160rpx;">
			<view class="price">
				<view class="maj">
					<text>店铺满减</text>
					<text class="q">-¥ 0.00</text>
				</view>
				<view class="hj">
					<text>已优惠 ¥0.00</text>
					<text class="q">合计 ¥{{addMallShoppingCartDTO.price}}</text>
				</view>
			</view>
		</view>

		<view class="button_v">
			<view class="shopping_v">
				<view class="price">
					<text class="numb">¥{{$uniPopup.numFilter(addMallShoppingCartDTO.price)}} </text>
					<text>已优惠 ¥568</text>
				</view>
				<text class="jsuan" @click="mallOrder">提交订单</text>
			</view>
		</view>
		<u-picker mode="time" v-model="pickershow" :params="params" @confirm='confirm'></u-picker>
	</view>
</template>

<script>
	import user from '../../../../api/mallUser/user.js'
	import order from '../../../../api/mallUser/order.js'
	import store from '../../../../store/index.js';
	import goods from '../../../../api/mallUser/goods.js';
	export default {
		data() {
			return {
				isOne: false,
				addMallShoppingCartDTO: {
					price: 0,
					xuanzDateList: []
				},
				sysUserReceivingAddress_date: null,
				remarks: null,
				params: {
					year: false,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				pickershow: false,
				isDeliveryMode: false,
				shopDelivery_findInfo_datE_Index: 0,
				shopDelivery_findInfo_date: [],
				timeOfAppointment: this.happenTimeFun(new Date())
			};
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: "#7928C5",
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},
		onLoad(option) {
			
			this.addMallShoppingCartDTO = JSON.parse(option.addMallShoppingCartDTO)
			this.sysUserReceivingAddress_list()
		},
		methods: {
			/**
			 * 配送方式
			 */
			deliveryModeTap(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.shopDelivery_findInfo_datE_Index = e.target.value
			},
			/**
			 * 配送时间选择
			 */
			confirm(e) {
				console.log()
				this.timeOfAppointment = e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
			},
			/**
			 * 电话 、备注
			 */
			changeOrders() {
				var that = this
				
				if(!that.isOne){
					return
				}
				if (!that.sysUserReceivingAddress_date) {
					that.$u.toast(`请先选择地址！`);
					return
				}
				that.$goPage(['/pages/mallUser/order/changeOrders/changeOrders'], function fun() {
					return {
						'phone': that.sysUserReceivingAddress_date.contactPhoneNumber
					}
				})
			},

			/**
			 * 默认地址
			 */
			sysUserReceivingAddress_list() {
				var that = this
				user.sysUserReceivingAddress_list({
					defaultAddressStatus: true,
				}).then(res => {
					console.log(res)
					that.sysUserReceivingAddress_date = res.data && res.data.list ? res.data.list[0] : null;
					// this.shopDelivery_findInfo(this.addMallShoppingCartDTO.xuanzDateList[0].byIdMallShopVO.id)
					var list = that.addMallShoppingCartDTO.xuanzDateList
					if (this.addMallShoppingCartDTO.xuanzDateList.length == 1) {
						this.isOne = true
					} else {
						this.isOne = false
					}
					list.map((val, idx) => {
						that.shopDelivery_findInfo(val.byIdMallShopVO.id, idx)
					})
				})
			},
			/**
			 * h获取配送方式
			 */
			shopDelivery_findInfo(shopId, idx) {
				var that = this
				goods.shopDelivery_findInfo({
					shopId: shopId,
				}).then(res => {
					var date_list = res.data ? res.data : null;

					for (var j = 0; j < date_list.length; j++) {
						if (date_list[j].deliveryMode == 0) {
							date_list[j]['text'] = '自提'
						} else {
							date_list[j]['text'] = '送货上门'
						}
					}
					if (that.isOne) {
						that.shopDelivery_findInfo_date = date_list
					} else {
						that.addMallShoppingCartDTO.xuanzDateList[idx].byIdMallShopVO[
							'shopDelivery_findInfo_datE_Index'] = 0
						that.addMallShoppingCartDTO.xuanzDateList[idx].byIdMallShopVO[
							'shopDelivery_findInfo_date'] = date_list
						that.addMallShoppingCartDTO.xuanzDateList[idx].byIdMallShopVO[
							'remarks'] = ''
					}
					that.$forceUpdate()
					console.log(this.addMallShoppingCartDTO)
				})
			},

			/**
			 * 保存订单
			 */
			mallOrder() {
				var that = this
				if (!that.sysUserReceivingAddress_date) {
					that.$u.toast(`请选择收货地址！`);
					return
				}
				var dateSoure = {
					addMallOrderShopGoodsDTOList:[],
					sysUserReceivingAddressId: that.sysUserReceivingAddress_date.id,
					userId: store.state.user.userId,
				}
				var list = that.addMallShoppingCartDTO.xuanzDateList
				list.map((val, idx) => {
					if(that.isOne){
						var addMallOrderShopGoodsDTOList={
							distributionMode:that.shopDelivery_findInfo_date[that.shopDelivery_findInfo_datE_Index].deliveryMode,
							remarks: that.remarks ? that.remarks : '',
							shopId:val.byIdMallShopVO.id,
							goodsList: [],
						}
						val.mallShoppingCartVOList.map((vals, idxs) => {
							var goodsList = {
								goodsInfoId: vals.goodsId,
								goodsNumber: vals.goodsNumber,
								mallShoppingCartId: vals.id
							}
							addMallOrderShopGoodsDTOList.goodsList.push(goodsList)
						})
						dateSoure.addMallOrderShopGoodsDTOList.push(addMallOrderShopGoodsDTOList)
					}else{
						var addMallOrderShopGoodsDTOList={
							distributionMode: val.byIdMallShopVO.shopDelivery_findInfo_date.length != 0 ? val.byIdMallShopVO.shopDelivery_findInfo_date[val.byIdMallShopVO.shopDelivery_findInfo_datE_Index].deliveryMode : '0',
							remarks: val.byIdMallShopVO.remarks ? val.byIdMallShopVO.remarks : '',
							shopId:val.byIdMallShopVO.id,
							goodsList: [],
						}
						val.mallShoppingCartVOList.map((vals, idxs) => {
							var goodsList = {
								goodsInfoId: vals.goodsId,
								goodsNumber: vals.goodsNumber,
								mallShoppingCartId: vals.id
							}
							addMallOrderShopGoodsDTOList.goodsList.push(goodsList)
						})
						dateSoure.addMallOrderShopGoodsDTOList.push(addMallOrderShopGoodsDTOList)
					}
					
				})
				order.mallOrder(dateSoure).then(res => {
					that.$u.toast(`订单提交成功！`);
					setTimeout(function() {
						that.$goPage('closeall',['/pages/mallUser/tabbar/tabbar'], function fun() {
							return {
								content: 3
							}
						})
					}, 500);
				})
			},
			/**
			 * //时间戳数据处理
			 * @param {Object} num
			 */
			happenTimeFun(num) { //时间戳数据处理
				let date = new Date(num);
				//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM; //月补0
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d; //天补0
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h; //小时补0
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m; //分钟补0
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s; //秒补0
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			},
		}
	}
</script>

<style lang="less" scoped>
	.content_mall {
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
	}

	.order_xx {
		width: 700rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 0rpx 32rpx;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		padding-bottom: 24rpx;
		margin-bottom: 22rpx;
		margin-top: 20rpx;

		.name_bt {
			width: 100%;
			border-bottom: 1rpx solid #DFDFDF;
			height: 68rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #555555;
			text-align: left;
			line-height: 68rpx;
		}

		.cell {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			min-height: 75rpx;

			text {
				width: 70%;
				text-align: right;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282828;
			}

			.time {
				width: 70%;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				image {
					width: 26rpx;
					height: 26rpx;
					margin-left: 10rpx;
				}
			}

			.list {
				width: 30%;
				text-align: left;
			}

			.no {
				color: #999999;
			}
		}
	}

	.order_list_v {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
	}

	.order_list {
		width: 700rpx;
		border-radius: 20rpx;
		background: #FFFFFF;
		padding: 0rpx 32rpx;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		margin-bottom: 20rpx;

		.dp {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			border-bottom: 1rpx solid #DFDFDF;

			image {
				width: 40rpx;
				height: 40rpx;
			}

			.name {
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 10rpx;
				}

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #282828;
					line-height: 50rpx;
					margin-left: 15rpx;
				}

				.u-icon {
					margin-left: 20rpx;
					line-height: 50rpx;
				}
			}
		}

		.cell_v {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;
			padding-bottom: 30rpx;

			.cell {
				width: 100%;
				margin-top: 30rpx;
				height: 130rpx;
				display: flex;
				justify-content: flex-start;
				align-content: flex-start;

				image {
					width: 132rpx;
					height: 130rpx;
					border-radius: 10rpx;
				}

				.text {
					width: calc(100% - 152rpx);
					display: flex;
					justify-content: space-between;
					align-content: flex-start;
					flex-wrap: wrap;
					margin-left: 20rpx;

					.wz {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;

						text {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #282828;
							max-width: 70%;
						}
					}

					.wzs {
						margin-top: 20rpx;

						text {
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #999999;
						}
					}
				}
			}
		}

		.price {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;
			margin-top: 30rpx;
			padding-bottom: 20rpx;

			.maj {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10rpx 0rpx;

				text {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #282828;
				}

				.q {
					font-size: 26rpx;
					color: #FF884D;
				}
			}

			.majs {
				border-bottom: 1rpx solid #F5F5F5;
			}

			.hj {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #999999;
				margin-top: 50rpx;

				.q {
					color: #282828;
					margin-left: 50rpx;
				}
			}
		}

	}

	.button_v {
		width: 100%;
		height: 130rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;

		.shopping_v {
			position: fixed;
			width: 621rpx;
			height: 90rpx;
			background: #802890;
			border-radius: 45rpx;
			bottom: 20rpx;
			left: 66rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.price {
				width: 420rpx;
				height: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				text {
					margin: 0rpx;
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.6);
					margin-left: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
				}

				.numb {
					font-size: 42rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					margin-left: 40rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}

			.jsuan {
				width: 202rpx;
				height: 90rpx;
				background: #FFB200;
				border-radius: 0px 45rpx 45rpx 0px;
				line-height: 90rpx;
				text-align: center;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}
</style>
