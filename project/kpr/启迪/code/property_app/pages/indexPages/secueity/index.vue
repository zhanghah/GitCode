<template>
	<view class="pages-security-index">
		<view class="content">
			<view class="trajectory">
				<view class="person" @click="handlePerson">
					<view class="img">
					<image src="../static/icon_gj.png" mode=""></image>
				</view>
				<view class="text">
					人员轨迹
				</view>
				</view>
				
			</view>
			<view class="top">
				<view class="community">
					<text class="left">当前组团：</text>
					<text class="right">{{homeInfo.communityName}}</text>
				</view>
				<view class="switch">
					<view class="icon" @click="handleSwitch">
						<image src="../static/btn_aqws.png" mode=""></image>
					</view>
					<text @click="handleSwitch">切换</text>
				</view>
			</view>
			<view class="map" v-if="mapInfo.length>0">
				<image src="../static/bg_map.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				homeInfo: {}, //组团选择的定位小区名称
				userList: [], //用户所拥有的小区列表
				mapInfo: [], //底图信息
			}
		},
		computed: {
			...mapState(['user', 'community'])
		},
		methods: {
			// 获取组团定位小区名称
			async getHomeList() {
				const res = await api.my.getMyHousingPages({
					comId: this.community.id,
					propertyId: this.$config.propertyId,
					userId: this.user.id
				})
				if (res.status !== '0') {
					return
				} else {
					let data = res.data.records
					// 筛选出审核通过的房屋
					for (let val in data) {
						if (data[val].checkStatus == 1) {
							this.userList.push(data[val])
						}
					}
					// 如果用户存在小区列表信息
					if (this.userList.length > 0) {
						// 则默认取第一个
						this.homeInfo = this.userList[0]
					}
				}
			},
			// 获取小区监控底图
			async getMonitorMap(){
				const res= await api.community.getMonitorMap({
					comId:this.community.id,
					propertyId:this.$config.propertyId
				})
				if(res.status!='0'){
					return
				}
				console.log(res)
				this.mapInfo=res.data
			},
			// 切换小区
			handleSwitch() {
				uni.navigateTo({
					url: '../suggest/myHome/index'
				})
			},
			handlePerson(){
				uni.navigateTo({
					url:'./track'
				})
			},
			changeHome() {
				uni.$on('changeHome', data => {
					this.homeInfo = data;
				})
			}
		},
		mounted() {
			this.getHomeList()
			this.changeHome()
			this.getMonitorMap()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "安全卫士",
			});

		},
	}
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.pages-security-index {
		min-height: 100vh;
		padding-bottom: 108rpx;
		box-sizing: border-box;
		background-color: #e6e6e6;
		position: relative;
	}

	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		
		.trajectory{
			background-color: #FFFFFF;
			border-top-left-radius: 8rpx;
			border-top-right-radius: 8rpx;
			width: 702rpx;
			height: 60rpx;
			z-index: 99;
			position: fixed;
			top: 20rpx;
			right: 24rpx;
			display: flex;
			line-height: 42rpx;
			.person{
				display: flex;
				position: fixed;
				right: 44rpx;
				margin-top: 20rpx;
				.img{
					width: 36rpx;
					height: 25rpx;
				
				}
				.text{
					color: #1B76FF;
					font-size: 28rpx;
					line-height: 42rpx;
				}
			}
			
		}

		.top {
			position: absolute;
			width: 702rpx;
			height: 80rpx;
			border-bottom-left-radius: 8rpx;
			border-bottom-right-radius: 8rpx;
			background-color: #FFFFFF;
			top: 79rpx;
			left: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 99;

			.community {
				width: 100%;
				margin-left: 30rpx;
				font-size: 28rpx;

				.left {
					color: #9E9E9E;
				}

				.right {
					color: #020204;
				}
			}

			.switch {
				width: 100%;
				margin-right: 30rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.icon {
					width: 28rpx;
					height: 28rpx;
					margin-right: 9rpx;
				}
			}
		}

		.map {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
