<template>
	<view class="activity">
    <view class="title">推荐活动</view>

		<view class="box" @click="activity(item.id,item.type)" v-for="(item,index) in source" :key="index">
			<view class="image">
				<image :src="`${imageView}${item.image}`"></image>
			</view>
			
			<view class="wrap">
				<view class="name">{{item.title}}</view>

				<view class="time">发布时间：{{item.endTime | date('YYYY-MM-DD')}}</view>

				<view class="go-detail">
					去看看
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
    name: 'Activity',
		components: {
		},
		props: {
			source: {
				type: Array,
				default() {
					return [];
				},
			},
		},
		data() {
			return {
			}
		},
		computed: {
			...mapState(['imageView']),
		},
		methods: {
			activity(id,type){
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
				if (type == 2) {
					//社区
					uni.navigateTo({
						url: `/pages/servicePages/communication/mjActivities?id=${id}&type=${type}`,
					});
				}else{
					//投票
					uni.navigateTo({
						url: `/pages/servicePages/communication/eventDetails?id=${id}&type=${type}`,
					});
				}
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="less">
	.title {
		color: #020204;
		font-size: 30rpx;
		margin: 23rpx 0;
		font-weight: bold;
	}
	.box {
		background: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
	}
	.image {
		width: 100%;
		height: 338rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.wrap {
		padding: 23rpx;
		position: relative;
	}

	.name {
		color: #3F3A39;
		font-size: 34rpx;	
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.time {
		font-size: 24rpx;
		color: #999999;
	}

	.go-detail {
		width: 117rpx;
		height: 46rpx;
		border: 1rpx solid #EF5050;
		border-radius: 4rpx;
		font-size: 24rpx;
		color: #EF5050;
		position: absolute;
		bottom: 25rpx;
		right: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
</style>
