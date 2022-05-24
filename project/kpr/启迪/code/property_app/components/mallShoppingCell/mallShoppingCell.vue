<template>
	<view class="mallShoppingCell">
		<view class="cell_v" v-for="(item, index) in list" :key="index">
			<view class="sp"  >
				<view class="text" @click="$goPage(['/pages/mallUser/home/home'],function fun() {return {'id': item.byIdMallShopVO.id}})">
					<image :src="item.byIdMallShopVO.shopHeadUrl" mode="aspectFill"></image>
					<text>{{item.byIdMallShopVO.shopsName}}</text>
				</view>
				<text class="bj" @click="bj(index)">{{item.isBj?'完成':'编辑'}}</text>
			</view>
			<view class="cell">
				<u-swipe-action :show="cell.isShow" :index="indexs" v-for="(cell, indexs) in item.mallShoppingCartVOList" :key="indexs"
					@click="click(index,indexs,cell.id)" @open="open(index,indexs)" @close="close(index,indexs)" :options="options">
					<view class="item u-border-bottom">
						<view class="xianz" >
							<ui-checkbox v-model="cell.isXZ" v-on:input='(res)=>cell_CheckboxChange(cell.goodsNumber,cell.id,res)'></ui-checkbox>
						</view>
						<u-image
							@click="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': cell.goodsId}})"
							class="tx" width="162rpx" height="162rpx" border-radius='12'
							:src="cell.currentGoodsInfo.goodsResourceVOList[0].sysStaticResourceBO.fileVisitUrl">
							<view slot="error" style="font-size: 24rpx;">加载失败</view>
						</u-image>
						<view class="wz">
							<text class="list">{{cell.currentGoodsInfo.goodsName}}</text>
							<text class="list1">500g±50g/份</text>
							<view class="list2">
								<text class="xiajiang" v-if="cell.currentGoodsInfo.goodsSalePrice - cell.oldGoodsInfo.goodsPrice<0">比加入时降{{cell.oldGoodsInfo.goodsPrice - cell.currentGoodsInfo.goodsSalePrice}}元</text>
								<text>¥{{$uniPopup.numFilter(cell.currentGoodsInfo.goodsSalePrice)}}</text>
								<u-number-box :min='1' v-model="cell.goodsNumber" @change='(res)=>cartGoodsNumber(cell.id,res)'></u-number-box>
							</view>
						</view>
						<view class="moban" v-if="cell.currentGoodsInfo.goodsStatus==3">
							<text>已下架</text>
						</view>
						<view class="moban" v-if="cell.currentGoodsInfo.goodsStatus==4">
							<text>缺货</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
			<view class="yh">
				<view class="cell">
					<text>店铺满减</text>
					<text class="list">-¥ 2.00</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uSwipeAction from "@/uview-ui/components/u-swipe-action/u-swipe-action.vue";
	import goods from '../../api/mallUser/goods.js';
	export default {
		name: "mallShoppingCell",
		comments: {
			uSwipeAction
		},
		props: {
			isQx:{
				type: Boolean,
				default:false,
			},
			mallShoppingCart_list: {
				type: Array,
				default:[],
			},
		},
		data() {
			return {
				isCsh:true,
				checked: false,
				list: [],
				disabled: false,
				btnWidth: 180,
				husuanDate:{
					xuanzDateList:[],
					price:0
				},
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		watch:{
			mallShoppingCart_list(e){
				var that = this
				that.isCsh = true
				that.list=e
				setTimeout(function() {
					that.isCsh = false
				}, 1000);
			}
		},
		methods: {
			/**
			 * 单选
			 * @param {Object} index
			 * @param {Object} indexs
			 */
			cell_CheckboxChange(goodsNumber,goodsInfoId,values){
				if(!values){
					this.$emit('update:isQx', false )//取消
					this.hesuan()
				}else{
					this.hesuan()
				}
				// this.list.map((val, idx) => {
				// 	this.list[idx].mallShoppingCartVOList.map((vals, idxs) => {
				// 		if(vals.currentGoodsInfo.goodsStatus  == 3 || vals.currentGoodsInfo.goodsStatus  == 4 ){
				// 			this.list[idx].mallShoppingCartVOList[idxs].isXZ = false;
				// 		}else{
				// 			this.list[idx].mallShoppingCartVOList[idxs].isXZ = values;
				// 		}
				// 	})
				// })
			},
			/**
			 * 全选
			 * @param {Object} values
			 */
			checkboxChange(values){
				this.list.map((val, idx) => {
					this.list[idx].mallShoppingCartVOList.map((vals, idxs) => {
						if(vals.currentGoodsInfo.goodsStatus  == 3 || vals.currentGoodsInfo.goodsStatus  == 4 ){
							this.list[idx].mallShoppingCartVOList[idxs].isXZ = false;
						}else{
							this.list[idx].mallShoppingCartVOList[idxs].isXZ = values;
						}
					})
				})
				this.hesuan()
			},
			
			/**
			 * 核算 合计 全选数据传输
			 */
			hesuan(){
				this.husuanDate={
					xuanzDateList:[],
					price:0
				}
				this.list.map((val, idx) => {
					var mallShoppingCart = {
						byIdMallShopVO:this.list[idx].byIdMallShopVO,
						mallShoppingCartVOList:[]
					}
					this.list[idx].mallShoppingCartVOList.map((val, idxs) => {
						 var values = this.list[idx].mallShoppingCartVOList[idxs].isXZ
						if(values){
							this.husuanDate.price = this.husuanDate.price + Number( this.list[idx].mallShoppingCartVOList[idxs].currentGoodsInfo.goodsSalePrice * this.list[idx].mallShoppingCartVOList[idxs].goodsNumber)
							mallShoppingCart.mallShoppingCartVOList.push(this.list[idx].mallShoppingCartVOList[idxs])
						}
					})
					if(mallShoppingCart.mallShoppingCartVOList.length!=0){
						this.husuanDate.xuanzDateList.push(mallShoppingCart)
					}
				})
				this.$emit('onGetTableData',this.husuanDate)
			},
			/**
			 * 编辑
			 * @param {Object} index
			 */
			bj(index){
				console.log(this.list[index].isBj)
				if(!this.list[index].isBj){
					this.list.map((val, idx) => {
						if(index == idx){
							this.list[index].isBj = !this.list[index].isBj
							this.list[idx].mallShoppingCartVOList.map((val, idxs) => {
								this.list[idx].mallShoppingCartVOList[idxs].isShow = true;
							})
						}else{
							this.list[idx].isBj = false
							this.list[idx].mallShoppingCartVOList.map((val, idxs) => {
								this.list[idx].mallShoppingCartVOList[idxs].isShow = false;
							})
						}
					})
				}else{
					this.list[index].isBj = false
					this.list[index].mallShoppingCartVOList.map((val, idx) => {
						this.list[index].mallShoppingCartVOList[idx].isShow = false;
					})
				}
			},
			/**
			 * 关闭滑动操作
			 * @param {Object} index
			 * @param {Object} indexs
			 */
			close(index,indexs) {
				this.list[index].isBj = false
				this.list[index].mallShoppingCartVOList[indexs].isShow = false;
			},
			/**
			 * 打开滑动操作
			 * @param {Object} index
			 * @param {Object} indexs
			 */
			open(index,indexs) {
				this.list.map((val, idx) => {
					this.list[idx].mallShoppingCartVOList.map((val, idxs) => {
						this.list[idx].mallShoppingCartVOList[idxs].isShow = false;
					})
				})
				this.list[index].mallShoppingCartVOList[indexs].isShow = true;
				if(this.list[index].mallShoppingCartVOList.length==1){
					this.list[index].isBj = true
				}
			},
			/**
			 * 删除
			 * @param {Object} index
			 * @param {Object} indexs
			 * @param {Object} id
			 */
			click(index, indexs ,id) {
				console.log(index, indexs,id)
				goods.mallShoppingCartDELETEt({
					id:id
				}).then(res => {
					this.$u.toast(`删除成功`);
					if(this.list[index].mallShoppingCartVOList.length==1){
						this.list.splice(index, 1);
					}else{
						this.list[index].mallShoppingCartVOList.splice(indexs, 1);
					}
					this.hesuan()
				}).catch(res => {
					
				});
			},
			/**
			 * 修改购物车
			 * @param {Object} index
			 * @param {Object} indexs
			 * @param {Object} id
			 */
			cartGoodsNumber(cartGoodsId, goodsNumber) {
				if(this.isCsh){
					return
				}
				console.log(cartGoodsId, goodsNumber.value)
				goods.cartGoodsNumber({
					cartGoodsId:cartGoodsId,
					goodsNumber:goodsNumber.value
				}).then(res => {
					this.hesuan()
				}).catch(res => {
					
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.mallShoppingCell {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		margin-top: 35rpx;
		.cell_v {
			width: 696rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;
			margin-bottom: 35rpx;
			padding: 0rpx 20rpx;
			.sp {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;
				border-bottom: 1rpx solid rgba(223, 223, 223, 0.5);
				.text {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 10rpx;
					}

					text {
						margin-left: 20rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #282828;
					}
				}

				.bj {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #282828;
				}
			}
			.yh {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				min-height: 87rpx;
				.cell{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					text {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #282828;
						margin-left: 70rpx;
					}
					
					.list {
						font-size: 26rpx;
						color: #FF884E;
						margin-right: 15rpx;
					}
				}
			}
			.cell {
				width: 100%;

				.item {
					display: flex;
					padding: 30rpx 0rpx;
					height: 220rpx;
					position: relative;
					.xianz {
						width: calc(100% - 592rpx);
						height: 100%;
						display: flex;
						justify-content: flex-start;
						align-items: center;
					}
					
					image {
						width: 162rpx;
						height: 162rpx;
						margin-right: 30rpx;
						border-radius: 12rpx;
					}
					
					.wz {
						margin-left: 30rpx;
						width: 400rpx;
						height: 100%;
						display: flex;
						justify-content: flex-start;
						align-content: space-between;
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
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					
						.list1 {
							width: 100%;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							line-height: 30rpx;
							height: 30rpx;
							color: #555555;
						}
					
						.list2 {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							flex-wrap: wrap;
							text{
								height: 25rpx;
								line-height: 25rpx;
								font-weight: bold;
								color: red;
							}
							.xiajiang{
								width: 100%;
								font-size: 10rpx;
								font-weight: normal;
								color: red;
							}
						}
					}
					
					.moban{
						width: 100%;
						height: 100%;
						background: rgba(255,255,255,0.6);
						position: absolute;
						left: 0rpx;
						top: 0rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						text{
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
							background: rgba(0,0,0,0.4);
							padding: 2rpx 20rpx;
							border-radius: 20rpx;
						}
					}
				}

				
			}
		}
	}
</style>
