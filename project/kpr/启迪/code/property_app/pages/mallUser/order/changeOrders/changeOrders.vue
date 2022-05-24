<template>
	<view class="content_mall">
		<view class="invoice">
			<view class="cell" @click="$goPage(['/pages/mallUser/address/address'],function fun() {return {'isXz': true}})" v-if="isOrderXg==true">
				<text class="name">收货地址</text>
				<text class="wz">{{sysUserReceivingAddress_date?sysUserReceivingAddress_date.receivingAddress + sysUserReceivingAddress_date.detailedAddress:"请选择收货地址"}}</text>
				<u-icon name="arrow-right" color="#ffffff" size="27"></u-icon>
			</view>
			<view class="cell"  @click="$goPage(['/pages/mallUser/address/address'],function fun() {return {'isXz': true}})" v-if="isOrderXg==true">
				<text class="name">电话</text>
				<text  class="wz">{{sysUserReceivingAddress_date?sysUserReceivingAddress_date.contactPhoneNumber:'未填写'}}</text>
				<u-icon name="arrow-right" color="#ffffff" size="27"></u-icon>
			</view>
			<view class="cell"  v-if="isOrderXg==false">
				<text class="name">电话</text>
				<input type="text"  v-model="dateSorse.phone" disabled placeholder="未填写"/>
				<u-icon name="arrow-right" color="#ffffff" size="27"></u-icon>
			</view>
			<view class="cell">
				<text class="name">备注</text>
				<input type="text"  v-model="dateSorse.remarks" placeholder="未填写"/>
				<u-icon name="arrow-right" color="#ffffff" size="27"></u-icon>
			</view>
			<!-- <view class="cell" @click="$goPage(['/pages/mallUser/order/invoice/invoice'],function fun() {return {'id': 0}})">
				<text class="name">发票</text>
				<view class="fp">
					<input type="text" value="" placeholder="未选择"/>
					<u-icon name="arrow-right" color="#999999" size="27"></u-icon>
				</view>
			</view> -->
		</view>
		<text class="ann" @click="bc">保存</text>
	</view>
</template>

<script>
	import order from '../../../../api/mallUser/order.js'
	import user from '../../../../api/mallUser/user.js'
	export default {
		data() {
			return {
				isOrderXg:false,
				id:'',
				isNav: 0,
				navDate: ['公司', '个人', '非企业单位' ],
				dateSorse:{
					phone:'',
					remarks:"",
				},
				sysUserReceivingAddress_date: null,
			};
		},
		onLoad(option) {
			this.dateSorse.phone = option.phone
			console.log(option)
			if(option.isOrderXg){
				this.isOrderXg = true
				this.id = option.id
				this.mallOrder_GET(option.id)
			}
		},
		methods:{
			bc(){
				var that = this
				if(that.isOrderXg == true){
					var dateS={
						id:that.id,
						remarks:that.dateSorse.remarks,
						sysUserReceivingAddressId:that.sysUserReceivingAddress_date.id
					}
					order.mallOrder_PUT(dateS).then(res => {
						that.$u.toast(`修改订单成功！`);
						that.$goPage('back')
					})
				}else{
					var pages = getCurrentPages()
					var prevPage = pages[pages.length - 2];
					prevPage.$vm.remarks=that.dateSorse.remarks
					that.$goPage('back')
				}
			},
			/**
			 * 订单详情
			 * @param {Object} id
			 */
			mallOrder_GET(id){
				var that = this
				order.mallOrder_GET({id:id}).then(res => {
					that.dateSorse.remarks =  res.data? res.data.remarks : [];
					that.sysUserReceivingAddress_id(res.data.sysUserReceivingAddressId)
				})
			},
			/**
			 * 收货地址
			 */
			sysUserReceivingAddress_id(id){
				var that = this
				user.sysUserReceivingAddress_id({id:id}).then(res => {
					that.sysUserReceivingAddress_date = res? res : null;
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.content_mall {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}
	.invoice {
		width: 100%;
		margin-top: 20rpx;
		background: #FFFFFF;
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 0rpx 20rpx;
		.cell{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 40rpx;
			height: 90rpx;
			border-bottom: 1rpx solid #DFDFDF;
			.name{
				width: 120rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282828;
				height: 56rpx;
				line-height: 56rpx;
			}
			.wz,
			input{
				width: calc(100% - 120rpx);
				text-align: right;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 30rpx;
				height: 30rpx;
			}
			.fp{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
			}
		}
		.ts{
			width: 100%;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			margin-top: 50rpx;
		}
	}
	
	
	.ann {
		width: 450rpx;
		height: 90rpx;
		background: linear-gradient(88deg, #802890 0%, #7928C5 100%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 90rpx;
		text-align: center;
		position: fixed;
		bottom: 50rpx;
		left: 150rpx;
	}
</style>
