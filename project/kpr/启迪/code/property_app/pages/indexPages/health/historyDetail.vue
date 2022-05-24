<template>
	<view class="page-history-detail">
		<view class="top">
			<view class="img">
				<image src="../static/icon_zhjk_01.png" mode=""></image>
			</view>
			<view class="tips">
				身高
			</view>
		</view>
		<view class="content-box">
			<view class="indicators">180<span class="unit">cm</span></view>
			<view class="time">
				2021年3月2日
			</view>
		</view>
		<view class="content-box">
			<view class="indicators">180<span class="unit">cm</span></view>
			<view class="time">
				2021年3月2日
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	
			}
		},
		methods:{
		
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '历史健康数据',
			});
		}
	}
</script>

<style lang="less" scoped>
	.page-history-detail{
		padding: 0 24rpx;
		height: 100vh;
		background-color: #F5F5F5;
		
		.top{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 22rpx 0;
			.img{
				width: 45rpx;
				height: 45rpx;
				margin-right: 23rpx;
			}
			.tips{
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		
		.content-box{
			width: 100%;
			height: 150rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			.indicators{
				font-size: 40rpx;
				
				.unit{
					font-size: 30rpx;
					margin-left: 10rpx;
				}
			}
			
			.time{
				font-size: 30rpx;
			}
		}
	}
</style>
