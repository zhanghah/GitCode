<template>
	<view class="shopping_Cart">
		<view class="shopping_v" :style="{'padding-top':top}">
			<mallSearch :isBack='true'></mallSearch>
			<mallShoppingCell ref="mallShoppingCell" A:isQx.sync="isQx" :mallShoppingCart_list.sync='mallShoppingCart_list' @onGetTableData="(res)=>onGetTableData(res)"></mallShoppingCell>
			<u-loadmore :status="totalRow.status" v-if="mallShoppingCart_list.length!=0"/>
			<no-result message="" v-else style="margin-top: 200rpx;"></no-result>
		</view>

		<view class="jiehusna">
			<view class="xianz" >
				<ui-checkbox v-model="isQx" v-on:input='checkboxChange'></ui-checkbox><text>全选</text>
			</view>
			<view class="hj">
				<text>合计 </text>
				<text class="price">¥{{$uniPopup.numFilter(husuanDate.price)}}</text>
				<text class="js" @click="jiehsuan">一键结算</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../../components/uni-icons/uni-icons.vue";
	import mallSearch from "../../../components/mallSearch/mallSearch.vue";
	import mallShoppingCell from "../../../components/mallShoppingCell/mallShoppingCell.vue";
	import goods from '../../../api/mallUser/goods.js';
	export default {
		data() {
			return {
				top: uni.getSystemInfoSync().statusBarHeight + 'px',
				totalRow: {
					pageNumber: 1,
					rowNumber: 20,
					status: 'loadmore'
				},
				husuanDate:{
					xuanzDateList:[],
					price:0
				},
				mallShoppingCart_list: [],
				isQx: false
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.mallShoppingCart_list=[]
			this.totalRow.status = 'loadmore';
			this.mallShoppingCartList()
		},
		methods: {
			/**
			 * 全选
			 * @param {Object} e
			 */
			checkboxChange: function(values) {
				this.$refs.mallShoppingCell.checkboxChange(values)
			},
			/**
			 * 核算 合計
			 */
			onGetTableData(e){
				this.husuanDate = e
			},
			/**
			 * 保存订单
			 */
			jiehsuan(){
				var s = JSON.stringify(this.husuanDate)
				this.$goPage(['/pages/mallUser/order/addOrder/addOrder'], function fun() {
					return {
						'addMallShoppingCartDTO':s
					}
				})
			},
			/**
			 * 购物车列表
			 */
			mallShoppingCartList() {
				var that = this
				if(that.totalRow.status == 'nomore' || that.totalRow.status == 'loading'){
					return
				}
				that.totalRow.status = 'loading'
				var dateSoure = {
					pageNumber: this.totalRow.pageNumber,
					rowNumber: this.totalRow.rowNumber
				}
				goods.mallShoppingCartList(dateSoure).then(res => {
					var date_list = res.data && res.data.list ? res.data.list : [];
					that.date_jieg(date_list)

				}).catch(res => {
					that.totalRow.status = 'loadmore';
				});
			},
			/**
			 * 数据转换
			 * @param {Object} e
			 */
			date_jieg(date_list) {
				var that = this
				var list_sj = []
				for (var i = 0; i < date_list.length; i++) {
					var oneDate = date_list[i]
					oneDate['isBj'] = false
					for (var j = 0; j < oneDate.mallShoppingCartVOList.length; j++) {
						oneDate.mallShoppingCartVOList[j]['isXZ'] = false
						oneDate.mallShoppingCartVOList[j]['isShow'] = false
					}
					list_sj.push(oneDate)
				}
				setTimeout(function() {
					that.mallShoppingCart_list = that.mallShoppingCart_list.concat(list_sj)
					if (list_sj.length < 30) {
						that.totalRow.status = 'nomore';
					} else {
						that.totalRow.pageNumber ++
						that.totalRow.status = 'loadmore';
					}
				}, 1000);
			}
		}
	}
</script>

<style lang="less" scoped>
	.shopping_Cart {
		background: #F5F5F5 url(../../../static/mall/tabbar/tuoyan.png)top center no-repeat;
		background-size: 100% 360rpx;
		width: 100%;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		overflow-x: hidden;
		padding-bottom: 120rpx;
		.jiehusna {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0rpx 30rpx;
			height: 97rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 24rpx 0px rgba(0, 0, 0, 0.1);
			position: fixed;
			left: 0rpx;
			bottom: 0rpx;
			z-index: 999;
			.xianz {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282828;

				text {
					margin-left: 15rpx;
				}
			}

			.hj {
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #555555;
				}

				.price {
					color: #802890;
					margin-left: 20rpx;
				}

				.js {
					width: 220rpx;
					height: 72rpx;
					background: linear-gradient(88deg, #802890 0%, #7928C5 100%);
					border-radius: 36rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					line-height: 72rpx;
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
