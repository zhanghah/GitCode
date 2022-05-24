<template>
	<view class="search">
		<view class="back_img" v-if="isBack==true" @click="$goPage('back')">
			<uni-icons type="arrowleft" size="20" color='#ffffff'></uni-icons>
		</view>
		<view class="shur" @click="searchTap">
			<image src="../../static/search.png" mode=""></image>
			<text>搜索商品</text>
		</view>
		<view class="address" @click="chooseLocation()">
			<image src="../../static/mall/home/address.png" mode=""></image>
			<text>{{getLocation?getLocation.name:'请选择'}}</text>
			<uni-icons type="arrowright" size="12" color='#ffffff'></uni-icons>
		</view>
		<view class="backHome" v-if="isHOME"  @click="$goPage('back')">
			<u-icon name="home-fill" color="#802890" size="28"></u-icon>
		</view>
	</view>
</template>

<script>
	import api from '@/api/mallUser/api.js'
	export default {
		name: "mallSearch",
		data() {
			return {
				getLocation: null,
			};
		},
		props: {
			isBack: {
				type: [Boolean],
				default: false,
			},
			search: {
				type: [Boolean],
				default: false,
			},
			isHOME:{
				type: [Boolean],
				default: false,
			},
		},
		mounted() {
			this.getLocation_s()
		},
		methods:{
			searchTap(){
				if(this.search==true){
					this.$goPage('back')
					return
				}
				this.$goPage(['/pages/mallUser/search/search'])
			},
			getLocation_s() {
				var that = this
				var address = api.getStorageSync(3)
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
							name:res.address?res.address.district + res.address.street + res.address.poiName :'无',
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
						that.getLocation = res
						api.setStorage('3',JSON.stringify(that.getLocation)).then((ress) => {
						})
					}
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.search {
		width: 100%;
		height: 54rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 35rpx;
		padding: 0rpx 28rpx;
		.back_img{
			width: 35rpx;
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-right: 10rpx;
			image{
				width: 20rpx;
			}
		}
		.shur {
			width: 388rpx;
			height: 54rpx;
			border: 1rpx solid #FFFFFF;
			border-radius: 27rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0rpx 15rpx;

			image {
				width: 30rpx;
				height: 32rpx;
			}

			text {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.5;
				margin-left: 10rpx;
			}
		}
		.address {
			width: 293rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			color: #FFFFFF;

			text {
				max-width: calc(100% - 50rpx);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 8rpx;
			}
		}
		
		.backHome{
			height: 40rpx;
			background: rgba(255,255,255,0.7);
			padding: 0rpx 20rpx;
			border-radius: 20rpx;
			margin-left: 10rpx;
		}
	}
</style>
