<template>
	<view class="content_mall">
		<view class="zt">
			<view class="bq" v-if="order_zt == 1">等待支付，剩余 <u-count-down :timestamp="timer_djs" format="mm:ss">
				</u-count-down>
			</view>
			<text class="bq" v-else-if="order_zt == 3">等待商家接单中...</text>
			<text class="bq" v-else-if="order_zt == 4">支付超时</text>
			<text class="bq" v-else-if="order_zt == 6">订单已取消</text>
			<text class="bq" v-else-if="order_zt == 7">商家已接单,待配送</text>
			<text class="bq" v-else-if="order_zt == 8">已完成，待评价</text>
			<text class="bq" v-else-if="order_zt == 10">待收货</text>
			<text class="bq" v-else-if="order_zt == 11">已评价</text>
			<u-icon name="arrow-right" color="#656565" size="24"></u-icon>
		</view>
		<!-- 1=待支付,2=支付中,3=已支付,4=支付超时,5=订单已关闭,6=订单已关闭(手动)，7=商家已接单，8=已完成,9=催单 -->
		<!-- 待支付 -->
		<view class="gn" v-if="order_zt == 1">
			<view class="cell" @click="pay()">
				<image src="../../../static/mall/order/zf.png" mode="aspectFill"></image>
				<text>立即支付</text>
			</view>
			<view class="cell"
				@click="$goPage(['/pages/mallUser/order/changeOrders/changeOrders'],function fun() {return {'id': id,'isOrderXg':true,'sysUserReceivingAddressId':sysUserReceivingAddress.id}})">
				<image src="../../../static/mall/order/xg.png" mode="aspectFill"></image>
				<text>修改订单</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/dh.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
			<view class="cell" @click="closeOrder">
				<image src="../../../static/mall/order/qx.png" mode="aspectFill"></image>
				<text>取消订单</text>
			</view>
		</view>
		<!--  已支付--3  商家已接单--7-->
		<view class="gn" v-else-if="order_zt == 3 || order_zt == 7">
			<view class="cell">
				<image src="../../../static/mall/order/dh.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/kfu.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
			<view class="cell" @click="closeOrder">
				<image src="../../../static/mall/order/qx.png" mode="aspectFill"></image>
				<text>取消订单</text>
			</view>
		</view>
		<!-- 待收货--10 -->
		<view class="gn" v-else-if="order_zt ==10">
			<view class="cell">
				<image src="../../../static/mall/order/ysh.png" mode="aspectFill"></image>
				<text>确认收货</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/tk.png" mode="aspectFill"></image>
				<text>取消订单</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/dh.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/kfu.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
		</view>
		<!--  已取消--6  支付超时--4  已完成.待评价--8-->
		<view class="gn" v-else-if="order_zt == 8 || order_zt == 6  || order_zt == 4 || order_zt == 11 ">
			<view class="cell" v-if="order_zt ==8"
				@click="$goPage(['/pages/mallUser/order/evaluation/evaluation'],function fun() {return {'id': id}})">
				<image src="../../../static/mall/order/xg.png" mode="aspectFill"></image>
				<text>订单评价</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/qxdd.png" mode="aspectFill"></image>
				<text>再来一单</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/dh.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/kfu.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
		</view>



		<view class="gn" v-else-if="order_zt == 5">
			<view class="cell">
				<image src="../../../static/mall/order/ysh.png" mode="aspectFill"></image>
				<text>确认收货</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/dh.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/kfu.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/qxdd.png" mode="aspectFill"></image>
				<text>再来一单</text>
			</view>
		</view>
		<view class="gn" v-else-if="order_zt == 20">
			<view class="cell">
				<image src="../../../static/mall/order/tg.png" mode="aspectFill"></image>
				<text>拼团详情</text>
			</view>
			<view class="cell"
				@click="$goPage(['/pages/mallUser/order/changeOrders/changeOrders'],function fun() {return {'id': 0}})">
				<image src="../../../static/mall/order/xg.png" mode="aspectFill"></image>
				<text>修改订单</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/dh.png" mode="aspectFill"></image>
				<text>联系商家</text>
			</view>
			<view class="cell">
				<image src="../../../static/mall/order/qx.png" mode="aspectFill"></image>
				<text>取消订单</text>
			</view>
		</view>

		<view class="order_xx" v-if="sysUserReceivingAddress!=null">
			<text class="name_bt">订单基础信息</text>
			<view class="cell">
				<text class="list">地址</text>
				<text>{{sysUserReceivingAddress.receivingAddress}} {{sysUserReceivingAddress.detailedAddress}}</text>
			</view>
			<view class="cell">
				<text class="list">时间</text>
				<view class="time">
					<text>9-23 18:00</text>
					<u-icon name="arrow-right" color="#282828" size="24"></u-icon>
				</view>
			</view>
			<view class="cell">
				<text class="list">电话</text>
				<text>{{sysUserReceivingAddress.contactPhoneNumber}}</text>
			</view>
			<!-- <view class="cell">
				<text class="list">发票</text>
				<text class="no">未填写</text>
			</view> -->
		</view>
		<view class="order_list" v-if="mallOrder_GET_date!=null">
			<view class="cell_s_v" v-for="(item,index) in mallOrder_GET_date.subOrderList" :key='index'>
				<view class="dp"
					@click="$goPage(['/pages/mallUser/home/home'],function fun() {return {'id': item.mallShop.id}})">
					<view class="name">
						<u-image class="tx" width="40rpx" height="40rpx" border-radius='5'
							:src="item.mallShop?item.mallShop.shopHeadUrl:''">
							<view slot="error" style="font-size: 24rpx;">加载失败</view>
						</u-image>
						<text>{{item.mallShop.shopsName}}</text>
						<u-icon name="arrow-right" color="#282828" size="27"></u-icon>
					</view>
					<image v-if="order_zt==0 || order_zt==6" src="../../../static/mall/order/xx.png" mode="aspectFit">
					</image>
				</view>
				<view class="cell_v">
					<view class="cell" v-for="(cell,indexs) in item.goodsInfoVOList" :key='indexs'
						@click.stop="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': cell.id}})">
						<u-image class="tx" width="132rpx" height="130rpx" border-radius='12'
							:src="cell.goodsResourceDtos?cell.goodsResourceDtos[0].fileVisitUrl:''">
							<view slot="error" style="font-size: 24rpx;">加载失败</view>
						</u-image>
						<view class="text">
							<view class="wz">
								<text>{{cell.goodsName}}</text>
								<text>¥{{$uniPopup.numFilter(cell.goodsSalePrice)}}</text>
							</view>
							<view class="wz wzs">
								<text></text>
								<text>×{{cell.orderGoodsNumber}}</text>
							</view>
							<view class="wz wzs" v-if="order_zt==8 || order_zt==11" @click.stop="showMode(index,indexs)">
								<text></text>
								<text class="thuo">售后服务</text>
							</view>
						</view>
					</view>
				</view>
				<view class="price">
					<view class="maj majs Introduction" v-if="item.distributionMode">
						<text>订单方式</text>
						<text>{{item.distributionMode&&item.distributionMode.deliveryMode==0?'自提':'送货上门'}}</text>
					</view>
					<view class="maj majs">
						<text>备注</text>
						<text>{{item.remarks?item.remarks:'未填写'}}</text>
					</view>
				</view>
			</view>
			<view class="cell_s_v">
				<view class="price">
					<view class="maj">
						<text>总金额</text>
						<text class="q">¥ {{$uniPopup.numFilter(mallOrder_GET_date.totalAmount)}}</text>
					</view>
					<view class="maj">
						<text>店铺折扣</text>
						<text class="q">-¥ {{$uniPopup.numFilter(mallOrder_GET_date.preferentialAmount)}}</text>
					</view>
					<view class="hj">
						<text>已优惠 ¥{{$uniPopup.numFilter(mallOrder_GET_date.preferentialAmount)}}</text>
						<text class="q">合计 ¥{{$uniPopup.numFilter(mallOrder_GET_date.amountRequired)}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order_xx" style="margin-top: 22rpx;" v-if="mallOrder_GET_date!=null">
			<text class="name_bt">订单信息</text>
			<view class="cell">
				<text class="list">订单号码</text>
				<view class="time" @click="fuz(mallOrder_GET_date.id)">
					<text class="no">{{mallOrder_GET_date.id}}</text>
					<image src="../../../static/mall/order/fz.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="cell">
				<text class="list">下单时间</text>
				<text class="no">{{mallOrder_GET_date.createTime}}</text>
			</view>
			<view class="cell">
				<text class="list">支付方式</text>
				<view class="no">
					<text v-if="mallOrder_GET_date.paymentType==1">支付宝</text>
					<text v-else-if="mallOrder_GET_date.paymentType==2">微信</text>
					<text v-else-if="mallOrder_GET_date.paymentType==3">银联</text>
					<text v-else>伪支付</text>
				</view>
			</view>
		</view>
		<u-popup style="z-index: 1;" v-model="show" mode="bottom" border-radius="10" safe-area-inset-bottom>
			<view class="mode_view">
				<view class="yy">
					<text>退款原因</text>
					<picker @change="deliveryModeTap" :value="indexRefund" :range="mallOrderApplyRefundDTO"
						range-key="text">
						<view class="uni-input" v-if="indexRefund==-1">
							<text>请选择</text>
							<text class="xz">（必选）</text>
							<u-icon name="arrow-right" color="#656565" size="24"></u-icon>
						</view>
						<view class="uni-input" v-else>
							<text>{{mallOrderApplyRefundDTO[indexRefund].text}}</text>
							<u-icon name="arrow-right" color="#656565" size="24"></u-icon>
						</view>
					</picker>
				</view>
				<view class="wz">
					<view class="resourceIds">
						<textarea  v-model="applyReason.applyReason"  placeholder="请填写退款原因"/>
					</view>
					<view class="resourceIds">
						<uni-file-picker v-model="imgArr" :auto-upload="false" ref="imag_pic" mode="grid" title="" limit="9"
							file-mediatype="image" @select="(res) => select(res)" @delete='(res) => deleteTap(res)'></uni-file-picker>
					</view>
				</view>
				<view class="button_v">
					<view class="shopping_v">
						<view class="price">
							<text class="tk">退款至你的支付账户中</text>
							<text class="numb">退款金额 ¥{{price}} </text>
						</view>
						<text class="jsuan" @click="mallOrder">提交</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import order from '../../../api/mallUser/order.js'
	import user from '../../../api/mallUser/user.js'
	import api from '@/api/mallUser/api.js'
	import helper from '@/api/mallUser/helper.js'
	
	const baseUrl = helper.websiteUrl
	export default {
		data() {
			return {
				show: false,
				isOne: false,
				id: '',
				// 1=待支付,2=支付中,3=已支付,4=支付超时,5=订单已关闭,6=订单已关闭(手动)，7=商家已接单，8=已完成,9=催单
				order_zt: -1,
				timer_djs: 0,
				mallOrder_GET_date: null,
				sysUserReceivingAddress: null,
				mallOrderApplyRefundDTO: [
					{
						id: 1,
						text: "多拍、错拍、不想要"
					},
					{
						id: 2,
						text: "协商一致"
					}, {
						id: 3,
						text: "缺货"
					}, {
						id: 4,
						text: "其他"
					}
				],
				indexRefund: -1,
				applyReason:{
					applyReason:"",
					applyType:'',
					resourceId:[],
					orderId:'',
					refundDetailsDTOS:[{
						applyAmount:0,
						goodsNum:0,
						orderGoodsId:null
					}]
				},
				imgArr:[],
				img_dateArr:[],
				price:0,
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
			this.id = option.id
			this.mallOrder_GET(option.id)
		},
		methods: {
			mallOrder(){
				if(this.indexRefund == -1){
					this.$u.toast(`请先选择退款原因！`);
					return
				}
				var resourceId = []
				for (var i = 0; i < this.img_dateArr.length; i++) {
					resourceId.push(this.img_dateArr[i].id)
				}
				this.applyReason.resourceId= resourceId
				console.log(this.applyReason)
				order.mallOrderApplyRefund(this.applyReason).then(res => {
					this.$u.toast(`提交成功！`);
					this.show = false
				})
			},
			showMode(index,indexs) {
				var subOrderList = this.mallOrder_GET_date.subOrderList[index]
				this.imgArr=[]
				this.img_dateArr=[]
				this.applyReason={
					applyReason:"",
					applyType:'',
					resourceId:[],
					orderId:subOrderList.id,
					refundDetailsDTOS:[{
						applyAmount:subOrderList.goodsInfoVOList[indexs].goodsSalePrice,
						goodsNum:subOrderList.goodsInfoVOList[indexs].orderGoodsNumber,
						orderGoodsId:subOrderList.goodsInfoVOList[indexs].id
					}]
				}
				this.price = Number(subOrderList.goodsInfoVOList[indexs].goodsSalePrice)*Number(subOrderList.goodsInfoVOList[indexs].orderGoodsNumber)
				this.show = true
			},
			// 获取上传状态
			select(e) {
				for (var i = 0; i < e.tempFilePaths.length; i++) {
					this.uoload('/goods/saveApplyRefundImgs',e.tempFilePaths[i])
				}
			},
			deleteTap(e) {
				for (let item in this.img_dateArr) {
					if (this.img_dateArr[item].filePath == e.tempFilePath) {
						this.img_dateArr.splice(item, 1)
						console.log(this.img_dateArr)
						return
					}
				}
			},
			/**
			 * 申请原因	
			 */
			deliveryModeTap(e) {
				this.indexRefund = e.target.value
				this.applyReason.applyType = this.mallOrderApplyRefundDTO[e.target.value].id
			},
			/**
			 * 支付
			 */
			pay() {
				var that = this
				var date = {
					mainOrderId: that.id,
				}
				order.mallOrderPay_ingjj(date).then(res => {
					that.mallOrder_GET(this.id)
				})
			},
			/**
			 * 复制
			 * @param {Object} date
			 */
			fuz(date) {
				uni.setClipboardData({
					data: date,
					success: function() {
						console.log('success');
					}
				});
			},
			/**
			 * 关闭订单
			 */
			closeOrder() {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否取消订单！',
					success: function(res) {
						if (res.confirm) {
							var dateS = {
								mainOrderId: that.id,
							}
							order.mallOrder_PUT(userCancellationOfOrder).then(res => {
								that.$u.toast(`订单取消成功！`);
								that.list[index].mallShoppingCartVOList.splice(indexs, 1);
							})
						}
					}
				});
			},
			/**
			 * 订单详情
			 * @param {Object} id
			 */
			mallOrder_GET(id) {
				var that = this
				order.mallOrder_GET({
					id: id
				}).then(res => {
					var dateSoures = res.data ? res.data : [];
					if (dateSoures.subOrderList.length == 1) {
						that.isOne = true
					} else {
						that.isOne = false
					}
					that.mallOrder_GET_date = dateSoures
					that.order_zt = dateSoures&&dateSoures.orderStatus?dateSoures.orderStatus:0
					if (that.order_zt == 1) {
						var sj = new Date().getTime()
						that.timer_djs = Number((res.data.createTime + 1800000) - sj) / 1000
						console.log(that.timer_djs)
					}
					that.sysUserReceivingAddress_id(res.data.sysUserReceivingAddressId)
					for(var i=0;i<that.mallOrder_GET_date.subOrderList.length;i++){
						that.mallOrderApplyRefund_orderId(that.mallOrder_GET_date.subOrderList[i].id,i)
					}
				})
			},
			/**
			 * 获取退款记录
			 * @param {Object} orderId
			 */
			mallOrderApplyRefund_orderId(orderId,index){
				var that = this
				order.mallOrderApplyRefund_orderId({
					orderId: orderId
				}).then(res => {
					console.log(res)
				})
			},
			/**
			 * 收货地址
			 */
			sysUserReceivingAddress_id(id) {
				var that = this
				user.sysUserReceivingAddress_id({
					id: id
				}).then(res => {
					that.sysUserReceivingAddress = res ? res : null;
				})
			},
			uoload(url,filePath,index,index_s){
				var token = ''
				var token = api.getStorageSync(0)
				console.log(token)
				if (token != null) {
					token = token.token
				} else {
					token = ""
				}
				uni.uploadFile({
					url: baseUrl + url,
					filePath: filePath,
					name: 'file',
					header: {
						'token': token,
					},
					success: (uploadFileRes) => {
						var res = JSON.parse(uploadFileRes.data)
						console.log(res)
						if (res.code != 'success') {
							this.$uniPopup.showToast(res.message)
							return
						} else {
							//图片
							var imgArr ={
								fileVisitUrl:res.data[0].fileVisitUrl,
								id:res.data[0].id,
								filePath:filePath
							}
							this.img_dateArr.push(imgArr)
							console.log(this.img_dateArr)
						}
					},
					fail: (res) => {
						console.log('图片上传失败', res)
						this.$uniPopup.showToast('图片上传失败')
					}
				});
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

	.zt {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 55rpx;
		height: 88rpx;
		background: #FFFFFF;

		.bq {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #656565;

			text {
				color: #E52C2C;
			}
		}
	}

	.gn {
		width: 100%;
		height: 127rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.cell {
			width: 25%;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;

			image {
				width: 54rpx;
				height: 54rpx;
			}

			text {
				width: 100%;
				text-align: center;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #555555;
				margin-top: 5rpx;
			}
		}
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
			margin-bottom: 20rpx;
		}

		.cell {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 75rpx;

			text {
				text-align: right;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282828;
			}

			.time {
				width: 60%;
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
				width: 40%;
				text-align: left;
			}

			.no {
				color: #999999;
			}
		}
	}

	.order_list {
		width: 700rpx;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;

		.cell_s_v {
			width: 100%;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 0rpx 32rpx;
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

							.thuo {
								padding: 0rpx 10rpx;
								border: 1rpx solid #999999;
								border-radius: 20rpx;
								font-size: 16rpx;
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
					padding: 10rpx 0rpx;
				}

				.Introduction {
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

	}


	.mode_view {
		width: 100%;
		padding: 0rpx 20rpx;
		padding-bottom: 40rpx;
		.yy {
			width: 100%;
			height: 85rpx;
			border-bottom: 1rpx solid #F5F5F5;
			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282828;
			}

			.uni-input {
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.xz {
					color: #999999;
				}
			}
		}
	
		.wz{
			width: 100%;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;
			.resourceIds{
				width: 100%;
				margin-top: 10rpx;
				textarea{
					width: 100%;
					height: 150rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
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
			margin-top: 40rpx;
			.shopping_v {
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
					width: 460rpx;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
		
					text {
						margin: 0rpx;
						width: auto;
						font-size: 20rpx;
						color: rgba(255, 255, 255, 0.6);
						margin-left: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
					}
					.numb {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
						margin-left: 40rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						text-align: center;
					}
					.tk{
						white-space: nowrap;
					}
				}
		
				.jsuan {
					width: 160rpx;
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
	}
</style>
