<template>
	<view class="content_mall">
		<view class="tabbar" :style="{'padding-top':top}" >
			<view class="shur"  @click="$goPage('back')">
				<uni-icons type="back" size="24" color='#802890'></uni-icons>
			</view>
			<view class="address" @click="chooseLocation()">
				<image src="../../../static/mall/home/address_s.png" mode=""></image>
				<text>{{getLocation?getLocation.name:'请选择'}}</text>
				<uni-icons type="arrowright" size="18" color='#802890'></uni-icons>
			</view>
		</view>
		<view class="search">
				<u-search placeholder="日照香炉生紫烟" v-model="keyword" @custom='searchTap' @search='searchTap'></u-search>
		</view>
		
		<view class="cell">
			<text class="name">历史搜索</text>
			<text class="mc" v-for="(item,index) in searchData" :key='index' @click="sewz(item)">{{item}}</text>
		</view>
		
		<view class="cell">
			<text class="name">大家都在搜</text>
			<text class="mc">水杯</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../../components/uni-icons/uni-icons.vue";
	import api from '@/api/mallUser/api.js'
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				top: uni.getSystemInfoSync().statusBarHeight + 'px',
				getLocation: null,
				keyword:'',
				searchData:[]
			}
		},
		onLoad() {
			var searchDate = api.getStorageSync(2) 
			if(searchDate){
				searchDate = JSON.parse(searchDate)
				this.searchData = searchDate
			}
			this.getLocation_s()
		},
		methods: {
			searchTap(value){
				console.log(value)
				var  that = this
				var searchDate = api.getStorageSync(2) 
				if(searchDate){
					searchDate = JSON.parse(searchDate)
					searchDate.push(value)
					api.setStorage('2', JSON.stringify(searchDate)).then((ress) => {
						that.$goPage(['/pages/mallUser/search/searchXQ/searchXQ'], function fun() {
							return {
								shopsName: value
							}
						})
					})
				}else{
					searchDate = []
					searchDate.push(value)
					api.setStorage('2',  JSON.stringify(searchDate)).then((ress) => {
						
					})
				}
				
			},
			sewz(value){
				this.$goPage(['/pages/mallUser/search/searchXQ/searchXQ'], function fun() {
					return {
						shopsName: value
					}
				})
			},
			getLocation_s() {
				var that = this
				var address = api.getStorageSync(3)
				console.log(address, address.length)
				if (address != null && address.length !=0) {
					that.getLocation = JSON.parse(address)
					return
				}
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						that.getLocation = {
							longitude: res.longitude,
							name:  res.address.district + res.address.street + res.address.poiName,
							latitude: res.latitude,
							address: "",
						}
						api.setStorage('3',JSON.stringify(that.getLocation)).then((ress) => {
						})
						
					}
				});
			},
			chooseLocation() {
				var that = this
				uni.chooseLocation({
					success: function(res) {
						console.log( res)
						that.getLocation = res
						api.setStorage('3',JSON.stringify(that.getLocation)).then((ress) => {
						})
					}
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.content_mall{
		background: #FFFFFF;
	}
	.tabbar {
		width: 100%;
		height: 54rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 35rpx;
		padding: 0px 28rpx;
		.shur {
			width: 388rpx;
			height: 54rpx;
			border-radius: 27rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	
		.address {
			width: 293rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			color: #802890;
	
			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 8rpx;
			}
			text{
				overflow:hidden; 
				text-overflow:ellipsis;
				white-space:nowrap;
			}
		}
	}
	.search{
		width: 100%;
		padding: 0px 30rpx;
		margin-top: 38rpx;
	}
	.cell{
		width: 100%;
		padding: 0px 30rpx;
		margin-top: 38rpx;
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;
		.name{
			width: 1000%;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #282828;
		}
		.mc{
			height: 54rpx;
			padding: 0px 25rpx;
			background: #EEEEEE;
			border-radius: 10rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #656565;
			line-height: 54rpx;
			margin-top: 20rpx;
			margin-right: 20rpx;
		}
	}
</style>
