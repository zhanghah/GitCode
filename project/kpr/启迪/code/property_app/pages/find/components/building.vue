<template>
	<view class="activity">
    <view class="title">附近设施</view>

		<view class="box" @click="buildingGo(source.id,source.type)">
			<view class="image">
				<image :src="`${imageView}${source.image}`"></image>
			</view>
			
			<view class="wrap">
				<view class="info">
					<view class="type">{{source.type}}</view>
					<view class="line"></view>
					<view class="name">{{source.name}}</view>
				</view>

				<view class="address">地址：{{source.address || '-'}}</view>
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
				type: Object,
				default() {
					return Object.create(null);
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
		onLoad() {
		},
		methods: {
			buildingGo(id,type){
				console.log(id,type)
				uni.navigateTo({
					url:`/pages/servicePages/convenient/details?id=${id}&type=${type}`
				})
			},
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
	}
	.image {
		width: 100%;
		height: 280rpx;
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
		font-size: 30rpx;	
	}

	.address {
		font-size: 24rpx;
		color: #999999;
	}

	.info {
		display: flex;
		align-items: center;
		margin-bottom: 18rpx;
	}

	.type {
		color: #020204;
		font-size: 30rpx;
		font-weight: bold;
	}

	.line {
		width: 3rpx;
		height: 30rpx;
		background: #FB8E00;
		margin: 0 20rpx;
	}
</style>
