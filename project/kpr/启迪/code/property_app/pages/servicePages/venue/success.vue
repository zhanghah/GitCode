<template>
	<view class="page-success">
		<view class="img">
			<image src="../../indexPages/static/property/icon_success.png" mode=""></image>
		</view>
		<view class="tips">
			提交成功！
		</view>
		<view class="wait">
			预约结果会有场馆人员电话告知，请耐心等待！
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
				title: '提交成功',
			});
		},
	}
</script>

<style lang="less" scoped>
	.page-success{
		min-height: 100vh;
		background-color: #FFFFFF;
		padding:100rpx 30rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.img{
			width: 136rpx;
			height: 136rpx;
		}
		
		.tips{
			color: #333333;
			font-size: 36rpx;
			margin: 40rpx;
		}
		
		.wait{
			color: #808080;
			font-size: 32rpx;
		}
	}
</style>
