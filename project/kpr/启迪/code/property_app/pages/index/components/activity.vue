<template>
	<view class="activity">
		<view class="title" @tap="toCommunication">
			<view class="h1">小区交流</view>
			<view class="line"></view>
			<view class="h2">多姿多彩的社区活动</view>
			<view class="arrow"></view>
		</view>

		<view class="content">
			<scroll-view :scroll-x="true" :scroll-y="false" class="scroller">
				<view class="scroll-content">
					<view class="item" v-for="item in source" :key="item.id" @click="activityGo(item.id,item.type)">
						<view class="image-wrap">
							<view class="tips">
								{{item.type==0?'投票活动':(item.type==1?'社区活动':'报名活动')}}
							</view>
							<image :src="`${imageView}${item.image}`"></image>
						</view>
						<view class="name">{{item.title}}</view>
						<view class="time">活动时间：{{item.startTime | date('MM月DD日')}}-{{item.endTime | date('MM月DD日')}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {
		name: 'Activity',
		components: {},
		props: {
			source: {
				type: Array,
				default () {
					return [];
				},
			},
		},
		data() {
			return {}
		},
		computed: {
			...mapState(['imageView']),
		},
		onLoad() {},
		methods: {
			activityGo(id, type) {
				this.setStorage()
				if (type != 2) {
					//投票
					uni.navigateTo({
						url: `/pages/servicePages/communication/eventDetails?id=${id}&type=${type}`,
					});
				}
				if (type == 2) {
					//社区
					uni.navigateTo({
						url: `/pages/servicePages/communication/mjActivities?id=${id}&type=${type}`,
					});
				}
			},
			toCommunication(){
				this.setStorage()
				uni.navigateTo({
					url:"/pages/servicePages/communication/index"
				})
			},
			// 将浏览历史存入缓存
			setStorage(){
				let values=uni.getStorageSync('recently_used')
				// 如果缓存中最近使用数据为空
				if(!values){
					let recentlyUsed=[]
					recentlyUsed.push("小区交流")
					uni.setStorageSync('recently_used',recentlyUsed)
				}else{
					// 如果缓存中不存在该菜单
					if(values.indexOf("小区交流")==-1){
						// 如果缓存中小于4
						if(values.length<4){
							values.unshift("小区交流");
							uni.setStorageSync('recently_used',values)
						}else{
							values.pop()
							values.unshift("小区交流");
							uni.setStorageSync('recently_used',values)
						}
					}else{
						// 缓存中存在
						// 查找该菜单在数组中位置
						let index = values.indexOf("小区交流");
						let first = values.splice(index , 1)[0];
						values.unshift(first);
						uni.setStorageSync('recently_used',values)
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.activity {
		padding: 24rpx;
	}

	.title {
		display: flex;
		align-items: center;
		color: #666666;
		font-size: 24rpx;
		margin-bottom: 35rpx;
		position: relative;
	}
	.title .arrow {
		background: url(@/static/index/icon_arrow_right.png) no-repeat;
		background-size: 100% 100%;
		width: 30rpx;
		height: 30rpx;
		flex-grow: 0;
		flex-shrink: 0;
		position: absolute;
		right: 0;
	}

	.line {
		height: 28rpx;
		width: 2rpx;
		margin: 0 13rpx;
		background: #D2D2D2;
	}

	.h1 {
		font-size: 36rpx;
		color: #333;
		font-weight: bold;
	}

	.scroll-content {
		display: flex;
	}

	.image-wrap {
		width: 400rpx;
		height: 200rpx;
		overflow: hidden;
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
		margin-bottom: 20rpx;
		background: rgba(0, 0, 0, 0.1);
		position: relative;
		
		.tips{
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			z-index: 99;
			background-color: #802890;
			font-size: 32rpx;
			color: #FFFFFF;
			padding: 10rpx 20rpx;
		}
		
	}

	.image-wrap image {
		width: 100%;
		height: 100%;
	}

	.item {
		margin-right: 20rpx;
	}

	.item:last-child {
		margin-right: 0;
	}

	.item .name {
		color: #333;
		font-size: 32rpx;
		height: 45rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.item .time {
		color: #999;
		font-size: 24rpx;
	}
</style>
