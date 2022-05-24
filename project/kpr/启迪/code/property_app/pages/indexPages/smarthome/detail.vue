<template>
	<view class="page-smarthome-detail">
		<view class="top">
			<image src="../static/pic_furnish.png" mode=""></image>
		</view>
		<view class="switch">
			<view class="isopen">
				开关
			</view>
			<view class="swi">
				<u-switch v-model="checked" active-color="#802890"></u-switch>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:false
			}
		},
		methods: {
			
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "家居详情",
			});
		}
	}
</script>

<style lang="less" scoped>
	.page-smarthome-detail{
		height: 100vh;
		background-color: #F5F5F5;
		
		.top{
			width: 100%;
			height: 396rpx;
		}
		
		.switch{
			width: 92%;
			height: 100rpx;
			background-color: #FFFFFF;
			margin: 37rpx auto;
			padding: 0 27rpx;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
