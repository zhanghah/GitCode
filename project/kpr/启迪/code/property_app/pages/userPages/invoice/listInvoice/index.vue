<template>
	<view class="list_invoice_wrap">
		<view class="list" v-if="list.length>0">
			<view class="box" @click="toXq(item)" v-for="(item,index) in list" :key="index">
				<view class="time_box">
					<view class="time">{{item.createTime|formatDate}}</view>
					<view class="store" v-if="item.dealStatus === '0'">未开票<image src="../../static/myHome/icon_arrow.png" mode=""></image></view>
					<view class="store1" v-else-if="item.dealStatus === '1'">已开票<image src="../../static/myHome/icon_arrow.png" mode=""></image></view>
					<view class="store" v-else>开票中<image src="../../static/myHome/icon_arrow.png" mode=""></image></view>
				</view>
				<view class="type">{{item.type === '1'?'纸质':'电子'}}</view>
				<view class="price_box">
					<view class="text">{{item.feeType === '1'?'物业费':'车位费'}}</view>
					<view class="price">￥{{item.money}}</view>
				</view>
			</view>
		</view>
		<no-result v-else></no-result>
	</view>
</template>
<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	export default {
		name: 'AddInvoice',
		data() {
			return {
				curIndex: '', // 判断是物业费还是停车费
				index: 1, // 判断是电子发票还是纸质发票
				form: {
					info: '',
					email: '',
				},
				current:1,
				size:10,
				list:[]
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
			onElectronHandle() {
				this.index = 1;
			},
			onPaperHandle() {
				this.index = 2;
			},
			toXq(item){
				console.log(item)
				uni.navigateTo({
					url: `/pages/userPages/invoice/xqInvoice/index?id=${item.id}`,
				});
			},
			
			getList(){
				let canshu = {
					current:this.current,
					size:this.size
				}
				api.my.getInvoicePage(canshu).then(res=>{
					if(res.status !== '0'){return};
					this.list = res.data.records
				})
			}
		},
		onShow(){
			this.getList()
		},
		onLoad(option) {
			this.curIndex = option.curIndex;
			uni.setNavigationBarTitle({
				title: '开票记录',
			});
		},
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.list_invoice_wrap {
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	.list{
		width: 100%;
		padding-top:20rpx;
		.box{
			height: 220rpx;
			background: #fff;
			padding:0 32rpx;
			margin-bottom:20rpx;
			.time_box{
				display: flex;
				color:#020204;
				font-size:32rpx;
				justify-content: space-between;
				padding:30rpx 0 23rpx 0;
				.store{
					color:#FB9200;
					font-size:30rpx;
					display: flex;
					align-items: center;
					image{
						width: 14rpx;
						height: 24rpx;
						margin-left:16rpx;
					}
				}
				.store1{
					image{
						width: 14rpx;
						height: 24rpx;
						margin-left:16rpx;
					}
				}
			}
			.type{
				color:#9E9E9E;
				font-size:28rpx;
				margin-bottom:23rpx;
			}
			.price_box{
				display: flex;
				justify-content: space-between;
				color:#1B76FF;
				font-size:28rpx;
				align-items: center;
				.price{
					color:#020204;
					font-size:36rpx;
				}
			}
		}
	}
</style>
