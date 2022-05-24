<template>
	<view class="mallShoppingMode">
		<u-popup v-model="isShow" mode="center" :mask-close-able='false' :closeable='true' @close="guanb">
			<view class="mode_gwc" v-if="goods_id_date">
				<view class="tx">
					<!-- <image src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode="aspectFill"></image> -->
					<u-image class="tx" width="120rpx" height="120rpx" border-radius='5'
						:src="goods_id_date[xuanz.isCp].goodsResourceDtos?goods_id_date[xuanz.isCp].goodsResourceDtos[0].fileVisitUrl:''">
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u-image>
					<view class="text">
						<text>{{goods_id_date[xuanz.isCp].goodsName}}</text>
						<text>¥{{$uniPopup.numFilter(goods_id_date[xuanz.isCp].goodsSalePrice)}}</text>
					</view>
				</view>
				<view class="fl">
					<text class="name">产品</text>
					<view :class="xuanz.isCp==index?'act cell':'cell'" v-for="(item,index) in goods_id_date" :key='index'  @click="cpTap(index)">
						<text>{{item.goodsName}}</text>
						<text class="jg">¥{{item.goodsSalePrice}}</text>
					</view>
				</view>
				<view class="fl" v-if="getListByGoodsId_date!=0">
					<text class="name">规格</text>
					<view :class="xuanz.isFL==index?'act cell':'cell'" v-for="(item,index) in getListByGoodsId_date" :key='index' @click="flTap(index)">
						<text>{{item.detailedName}}</text>
						<text class="jg" v-if="item.categoryPrice!=0">¥{{item.categoryPrice}}</text>
					</view>
				</view>
				<view class="fl">
					<text class="name names">数量</text>
					<view class="number">
						<u-icon @click="numberTap(false)" name="minus-circle-fill" color="#802890" size="37">
						</u-icon>
						<text>{{xuanz.number}}</text>
						<u-icon name="plus-circle-fill" color="#802890" size="37"@click="numberTap(true)"></u-icon>
					</view>
				</view>
				<view class="fls">
					<text class="guig">已选规格：{{xuanz.guige}}</text>
				</view>
				<view class="hej">
					<view class="hj">
						<text>总计: </text>
						<text class="price">¥{{$uniPopup.numFilter(xuanz.price)}}</text>
					</view>
					<view class="add">
						<view class="an">
							<u-icon name="plus" color="#FFFFFF" size="26"></u-icon>
							<text @click="mallShoppingCartTap()">购物车</text>
						</view>
						<view class="jiehusna">
							<text  @click="$goPage(['/pages/mallUser/order/addOrder/buy/buy'],function fun() {return {'id': goods_id_date[xuanz.isCp].id,'number':xuanz.number}})">去结算</text>
						</view>
						
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import goods from '../../api/mallUser/goods.js'
	export default {
		name: "mallShoppingMode",
		props: ['isModeShow', 'goodsId', 'goods_id_date'],
		data() {
			return {
				getListByGoodsId_date:[],
				isShow:false,
				xuanz:{
					isCp:0,
					isFL:0,
					guige:'',
					price:0.00,
					number: 1, 
				}
			};
		},
		watch: {
			isModeShow(e) {
				console.log(this.goodsId)
				this.isShow = e
				if(e==false){
					return
				}
				console.log(this.goods_id_date[0].goodsResourceDtos[0].fileVisitUrl)
				this.goods_id_date.map((val, idxs) => {
					if(this.goodsId == val.id){
						this.xuanz.isCp = idxs
						this.getListByGoodsId_list(this.goods_id_date[this.xuanz.isCp].id)
						return
					}
				})
			}
		},
		methods: {
			cpTap(index){
				if(this.xuanz.isCp == index){
					return
				}
				this.xuanz.isCp = index
				this.$emit('onGetTableData',this.goods_id_date[index].id)
				this.getListByGoodsId_list(this.goods_id_date[index].id)
			},
			flTap(index){
				if(this.xuanz.isFL == index){
					return
				}
				this.xuanz.isFL = index
				this.guiz()
			},
			numberTap(isAdd){
				if(isAdd){
					this.xuanz.number ++
				}else{
					if(this.xuanz.number<=1){
						return
					}
					this.xuanz.number --
				}
				this.guiz()
			},
			guiz(){
				console.log( this.goods_id_date,this.getListByGoodsId_date,this.xuanz.isCp,this.xuanz.isFL)
				if(this.getListByGoodsId_date.length!=0){
					this.xuanz.guige = this.goods_id_date[this.xuanz.isCp].goodsName +'  、'+this.getListByGoodsId_date[this.xuanz.isFL].detailedName
					this.xuanz.price = Number(this.goods_id_date[this.xuanz.isCp].goodsSalePrice + this.getListByGoodsId_date[this.xuanz.isFL].categoryPrice)*this.xuanz.number 
				}else{
					this.xuanz.guige = this.goods_id_date[this.xuanz.isCp].goodsName 
					this.xuanz.price = Number(this.goods_id_date[this.xuanz.isCp].goodsSalePrice)*this.xuanz.number 
				}
			},
			/**
			 * 加入购物车
			 */
			mallShoppingCartTap() {
				goods.mallShoppingCart({
					goodsId: this.goods_id_date[this.xuanz.isCp].id,
					goodsNumber: this.xuanz.number
				}).then(res => {
					console.log(res)
					this.$uniPopup.showToast('加入购物车成功！')
					this.guanb()
				})
			},
			
			/**
			 * 分类明细
			 */
			getListByGoodsId_list(goodsId){
				goods.getListByGoodsId({
					goodsId: goodsId,
				}).then(res => {
					this.getListByGoodsId_date = res.data ?res.data :[]
					this.guiz()
				})
			},
			guanb() {
				this.$emit('update:goodsId', null)
				this.$emit('update:goods_id_date', null)
				this.$emit('update:isModeShow', false)
				this.xuanz={
					isCp:0,
					isFL:0,
					guige:'',
					price:0.00,
					number: 1, 
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.mode_gwc {
		width: 696rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 40rpx 50rpx;
		.tx {
			width: 100%;
			height: 165rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-bottom: 45rpx;

			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 10rpx;
			}

			.text {
				display: flex;
				justify-content: flex-start;
				align-content: space-between;
				flex-wrap: wrap;
				width: calc(100% - 155rpx);
				height: 120rpx;
				margin-left: 35rpx;

				text {
					width: 100%;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #282828;
					line-height: 36rpx;
				}
			}
		}

		.fl {
			width: 100%;
			display: flex;
			align-content: flex-start;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 35rpx;
			.name {
				width: 100%;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				line-height: 36rpx;
				height: 36rpx;
				padding: 0rpx;
			}
			.names {
				width: 20%;
			}
			.cell {
				min-width: 280rpx;
				height: 60rpx;
				background: #FFFFFF;
				border: 1rpx solid #DFDFDF;
				border-radius: 10rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: 20rpx;
				text {
					width: 100%;
					height: 100%;
					line-height: 60rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #282828;
					text-align: center;
				}

				.jg {
					padding: 0rpx 10rpx;
					border-left: 1rpx solid #DFDFDF;
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #FF884E;
				}
			}

			.act {
				border: 1rpx solid #802890;
				background: #F6EDF8;
				text {
					color: #802890;
				}
				.jg {
					border-left: 1rpx solid #802890;
				}
			}

			.number {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				text {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #282828;
					padding: 0rpx 10rpx;
				}
			}

		}

		.fls {
			width: 696rpx;
			min-height: 60rpx;
			position: relative;
			left: -50rpx;
			margin-top: 40rpx;
			background: #F5F5F5;
			padding: 0rpx 50rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.guig {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #656565;
				line-height: 36rpx;
				width: 100%;
				text-align: left;
			}
		}

		.hej {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 85rpx;

			.hj {
				display: flex;
				align-items: center;
				justify-content: flex-start;

				text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #656565;
					line-height: 36rpx;
				}

				.price {
					color: #FF884E;
					font-size: 34rpx;
					margin-left: 10rpx;
				}
			}

			.add {
				display: flex;
				justify-content: center;
				align-items: center;
				.an{
					height: 66rpx;
					background: linear-gradient(88deg, #802890 0%, #7928C5 100%);
					border-radius: 33rpx;
					padding: 0rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						margin-left: 10rpx;
					}
				}
				.jiehusna{
					height: 66rpx;
					background: #FFB200;
					border-radius: 33rpx;
					padding: 0rpx 25rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;
					margin-left: 10rpx;
				}
			}
		}
	}

	/deep/.u-mode-center-box {
		background: transparent;
	}
</style>
