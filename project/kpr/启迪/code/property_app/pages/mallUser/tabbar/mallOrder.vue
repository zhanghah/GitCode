<template>
	<view class="order_view">
		<view class="search">
			<view class="shur" @click="$goPage(['/pages/mallUser/search/search'])">
				<image src="../../../static/mall/home/searchs.png" mode=""></image>
				<input type="search" value="" placeholder="搜索商家" />
			</view>
		</view>
		<view class="order_v">
			<view class="nav">
				<text :class="isOrderNav == index?'act':''" @click="isOrderNavTap(index)"
					v-for="(item,index) in orderNavList" :key='index'>{{item}}</text>
			</view>
			<view class="scroll">
				<scroll-view class="scroll-Y" scroll-y="true" scroll-x="false" @scrolltolower='scrolltolower'>
					<view class="cell" v-for="(item,index) in  mallOrder_list_date" :key='item.id' v-if="item.subOrderList!=0">
						<view class="cell_s" v-for="(cell_s,index_s) in item.subOrderList" :key='cell_s.id' @click="$goPage(['/pages/mallUser/order/order'],function fun() {return {'id': item.id}})" >
							<view class="bt" v-if="cell_s.mallShop" >
								<view class="img">
									<image :src="cell_s.mallShop.shopHeadUrl" mode="aspectFill"></image>
									<text>{{cell_s.mallShop.shopsName}}</text>
								</view>
								<view class="orderStatus" v-if="index_s==0">
									<text class="dfk" v-if="item.orderStatus==1">待支付</text>
									<text class="dfk" v-else-if="item.orderStatus==2">支付中</text>
									<text class="dfk" v-else-if="item.orderStatus==3">已支付</text>
									<text class="dfk" v-else-if="item.orderStatus==4">支付超时</text>
									<text class="dfk" v-else-if="item.orderStatus==5 || item.orderStatus==6">已取消</text>
									<text class="dfk" v-else-if="item.orderStatus==7">商家已接单</text>
									<text class="dfk" v-else-if="item.orderStatus==8">已完成</text>
									<text class="dfk" v-else-if="item.orderStatus==10">待收货</text>
									<text class="dfk" v-else-if="item.orderStatus==11">已评价</text>
									<!-- <text class="dfk" v-else="item.orderStatus==7">商家已接单	</text> -->
								</view>
							</view>
							<view class="sp" v-if="cell_s.goodsInfoVOList&&cell_s.goodsInfoVOList.length!=1" >
								<scroll-view class="img_v" scroll-x="true" scroll-y="false">
									<view class="scroll-view-item_H img_ce" v-for="(img_cell,index) in cell_s.goodsInfoVOList">
										<u-image class="tx" width="128rpx" height="128rpx" border-radius='12'
											:src="img_cell.goodsResourceDtos?img_cell.goodsResourceDtos[0].fileVisitUrl:''">
											<view slot="error" style="font-size: 24rpx;">加载失败</view>
										</u-image>
									</view>
								</scroll-view>
								<view class="price">
									<text class="jg">¥{{$uniPopup.numFilter(cell_s.amountRequired)}}</text>
									<text>共{{numberJs(cell_s.goodsInfoVOList)}}件</text>
								</view>
							</view>
							<view class="sp" v-else>
								<view class="item " v-for="(cell,indexs) in cell_s.goodsInfoVOList" :key='cell.id'>
									<u-image  class="tx" width="128rpx" height="128rpx" border-radius='12'
										:src="cell.goodsResourceDtos?cell.goodsResourceDtos[0].fileVisitUrl:''">
										<view slot="error" style="font-size: 24rpx;">加载失败</view>
									</u-image>
									<view class="wz">
										<text class="list">{{cell.goodsName}}</text>
										<!-- <text class="list1">500g±50g/份</text> -->
									</view>
								</view>
								<view class="price">
									<text class="jg">¥{{$uniPopup.numFilter(cell_s.amountRequired)}}</text>
									<text>共{{cell_s.goodsInfoVOList[0].orderGoodsNumber}}件</text>
								</view>
							</view>
						</view>
						<view class="order_ann" >
							<view class="price">
								<text >合计：</text>
								<text class="jg">¥{{$uniPopup.numFilter(item.amountRequired)}}</text>
							</view>
							<view class="ann">
								<!-- 1=待支付,2=支付中,3=已支付,4=支付超时,5=订单已关闭,6=订单已关闭(手动)，7=商家已接单，8=已完成,9=催单 -->
								<text v-if="item.orderStatus==1 && item.orderStatus==2" @click="closeOrder(index,item.id)">取消订单</text>
								<text class="youx" v-if="item.orderStatus==1"  @click="pay(index,item.id)">付款</text>
								<text class="youx" v-if="item.orderStatus==10"  @click="qrsh(index,item.id)">确认收货</text>
								<!-- <text class="youx" v-if="item.orderStatus==4 || item.orderStatus==5 || item.orderStatus==6">再次购买</text> -->
							</view>
						</view>
					</view>
					<u-loadmore :status="totalRow.status" v-if="mallOrder_list_date!=0" />
					<no-result message="" v-else style="margin-top: 200rpx;"></no-result>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../../components/uni-icons/uni-icons.vue";
	import uswiper from "../../../components/uni-icons/uni-icons.vue";
	import order from '../../..//api/mallUser/order.js'
	export default {
		data() {
			return {
				isOrderNav: 0,
				orderNavList: ['全部订单','待支付','待收货', '已完成'],
				totalRow: {
					pageNumber: 1,
					rowNumber: 10,
					status: 'loadmore'
				},
				mallOrder_list_date: []
			};
		},
		mounted() {
			this.czhi()
		},
		methods: {
			isOrderNavTap(index){
				this.isOrderNav =index
				this.czhi()
			},
			/**
			 * 确认收货
			 */
			qrsh(index,mainOrderId){
				var that = this
				
				uni.showModal({
					title: '提示',
					content: '是否确认收货！',
					success: function(res) {
						if (res.confirm) {
							var date = {
								mainOrderId: mainOrderId,
							}
							order.orderConfirmReceipt(date).then(res => {
								that.$u.toast(`确认收货成功！`);
								that.mallOrder_list_date[index].orderStatus = 8
							})
						}
					}
				});
			},
			/**
			 * 支付
			 */
			pay(index,mainOrderId) {
				var that = this
				var date = {
					mainOrderId: mainOrderId,
				}
				order.mallOrderPay_ingjj(date).then(res => {
					that.mallOrder_list_date[index].orderStatus = 7
				})
			},
			/**
			 * 重置
			 */
			czhi(){
				this.mallOrder_list_date = []
				this.totalRow.pageNumber = 1;
				var orderStatus = ''
				this.totalRow.status = 'loadmore';
				if(this.isOrderNav==1){
					orderStatus=1
				}else if(this.isOrderNav==2){
					orderStatus=10
				}else if(this.isOrderNav==3){
					orderStatus=8
				}
				this.mallOrder_list(orderStatus)
			},
			scrolltolower(){
				var orderStatus = ''
				if(this.isOrderNav==1){
					orderStatus=8
				}else if(this.isOrderNav==2){
					orderStatus=8
				}else{
					
				}
				this.mallOrder_list(orderStatus)
			},
			/**
			 * 获取订单列表
			 */
			mallOrder_list(orderStatus) {
				var that = this
				if(that.totalRow.status == 'nomore' || that.totalRow.status == 'loading'){
					return
				}
				that.totalRow.status = 'loading'
				var dateSoure = {
					pageNumber: that.totalRow.pageNumber,
					rowNumber: that.totalRow.rowNumber,
					parentId: 0,
					orderStatus:orderStatus
				}
				order.mallOrder_list(dateSoure).then(res => {
					var list_sj = res.data && res.data.list ? res.data.list : [];
					
					setTimeout(function() {
						that.mallOrder_list_date = that.mallOrder_list_date.concat(list_sj)
						if (list_sj.length < 10) {
							that.totalRow.status = 'nomore';
						} else {
							that.totalRow.pageNumber ++ 
							that.totalRow.status = 'loadmore';
						}
					}, 200);
				})
			},
			/**
			 * 关闭订单
			 */
			closeOrder(index,id) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否取消订单！',
					success: function(res) {
						if (res.confirm) {
							var dateS = {
								mainOrderId: id,
							}
							order.mallOrder_PUT(userCancellationOfOrder).then(res => {
								that.$u.toast(`订单取消成功！`);
								that.mallOrder_list_date[index].orderStatus = 6
							})
						}
					}
				});
			
			},
			
			/**
			 * 数量统计
			 * @param {Object} date
			 */
			numberJs(date){
				console.log(date)
				var number = 0
				for(var i=0;i<date.length;i++){
					number = number+date[i].orderGoodsNumber
				}
				return number
			}
		}
	}
</script>

<style lang="less" scoped>
	.order_view {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.search {
			width: 100%;
			height: 66rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 24rpx;
			padding: 0px 28rpx;

			.shur {
				width: 100%;
				height: 66rpx;
				background: #FFFFFF;
				border-radius: 33rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0rpx 15rpx;

				image {
					width: 30rpx;
					height: 32rpx;
				}

				input {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-left: 20rpx;
				}
			}
		}

		.order_v {
			width: 100%;
			background: #F5F5F5;
			display: flex;
			margin-top: 20rpx;
			height: 100%;
			overflow: hidden;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;

			.nav {
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					width: 100%;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 100rpx;
					color: #555555;
					text-align: center;
				}

				.act {
					position: relative;
					color: #802890;
					font-weight: bold;

					&::after {
						content: "";
						width: 50rpx;
						height: 6rpx;
						background: linear-gradient(90deg, #802890 0%, #7928C5 100%);
						border-radius: 3rpx;
						bottom: 0rpx;
						left: calc(50% - 25rpx);
						position: absolute;
					}
				}
			}

			.scroll {
				display: flex;
				width: 100%;
				height: calc(100% - 100rpx);
				.scroll-Y {
					height: 100%;
				}

				.cell {
					display: flex;
					justify-content: flex-start;
					align-content: flex-start;
					flex-wrap: wrap;
					width: 696rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					margin-left: 28rpx;
					margin-bottom: 20rpx;
					padding: 0px 20rpx;

					.cell_s {
						display: flex;
						justify-content: flex-start;
						align-content: flex-start;
						flex-wrap: wrap;
						width: 100%;
						padding-bottom: 30rpx;
						border-bottom: 1rpx solid #F5F5F5;
					}


					.bt {
						width: 100%;
						// border-bottom: 1rpx solid #DFDFDF;
						border-bottom: 1rpx solid #F5F5F5;
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 82rpx;

						.img {
							display: flex;
							justify-content: flex-start;
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
								margin-left: 20rpx;
							}
						}
						.orderStatus{
							display: flex;
							justify-content: flex-end;
							align-items: center;
							.dfk {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #E52C2C;
							}
						}
						
					}

					.sp {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;
						position: relative;

						.img_v {
							width: 100%;
							height: 128rpx;
							white-space: nowrap;
							.img_ce {
								width: 128rpx;
								height: 128rpx;
								border-radius: 10rpx;
								margin-right: 13rpx;
								display: inline-block;
							}
						}

						.item {
							width: calc(100% - 130rpx);
							display: flex;
							height: 128rpx;
							position: relative;

							.xianz {
								width: calc(100% - 592rpx);
								height: 100%;
								display: flex;
								justify-content: flex-start;
								align-items: center;
							}

							image {
								width: 128rpx;
								height: 128rpx;
								margin-right: 30rpx;
								border-radius: 12rpx;
							}

							.wz {
								margin-left: 30rpx;
								width: 400rpx;
								height: 128rpx;
								display: flex;
								justify-content: flex-start;
								align-content: center;
								flex-wrap: wrap;

								.list {
									width: 100%;
									height: 30rpx;
									font-size: 30rpx;
									font-family: PingFang SC;
									font-weight: bold;
									color: #282828;
									line-height: 30rpx;
									overflow: hidden;
									text-overflow: ellipsis; // 超出显示'...' (fatehr)
									display: -webkit-box; // 将元素作为弹性伸缩盒子模型显示 。(text)
									-webkit-line-clamp: 2; // 用来限制在一个块元素显示的文本的行数  (text)
									-webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式 (text)
								}
								.list1 {
									width: 100%;
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 500;
									line-height: 30rpx;
									height: 30rpx;
									color: #555555;
									margin-top: 10rpx;
								}
							}

							.moban {
								width: 100%;
								height: 100%;
								background: rgba(255, 255, 255, 0.6);
								position: absolute;
								left: 0rpx;
								top: 0rpx;
								display: flex;
								justify-content: center;
								align-items: center;

								text {
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: bold;
									color: #FFFFFF;
									background: rgba(0, 0, 0, 0.4);
									padding: 2rpx 20rpx;
									border-radius: 20rpx;
								}
							}
						}

						.price {
							height: 128rpx;
							display: flex;
							justify-content: flex-end;
							align-content: center;
							flex-wrap: wrap;
							position: absolute;
							right: 0rpx;
							top: 0rpx;
							padding: 0rpx 10rpx;
							width: 130rpx;
							background: rgba(255, 255, 255, 0.7);
							text {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #555555;
								text-align: right;
							}
							.jg {
								width: 100%;
								font-size: 26rpx;
								font-weight: bold;
								color: #282828;
							}
						}
					}

					.order_ann {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 30rpx;
						margin-bottom: 30rpx;
						.price{
							display: flex;
							justify-content: space-between;
							align-items: center;
							text {
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #282828;
								text-align: right;
							}
							.jg {
								font-weight: bold;
								color: red;
							}
						}
						.ann{
							display: flex;
							justify-content: space-between;
							align-items: center;
							text {
								height: 56rpx;
								border: 1rpx solid #999999;
								border-radius: 28rpx;
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #282828;
								padding: 0rpx 23rpx;
								line-height: 54rpx;
								margin-left: 30rpx;
								min-width: 140rpx;
								text-align: center;
							}
							
							.youx {
								color: #802890;
								border: 1rpx solid #802890;
							}
						}
					}
				}
			}
		}
	}
</style>
