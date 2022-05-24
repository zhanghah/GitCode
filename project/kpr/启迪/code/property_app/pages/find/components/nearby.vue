<template>
	<view class="">
		<view class="facillty">附近设施</view>
		<view class="nearby" @click="convenient">
			<!-- <image class="nearby-img" src="../../../static/find/nearby.png" mode=""></image> -->
			<view class="nearby-btm">
				<view class="nearby-btm-text">
					<view class="">
						学校
					</view>
					<view></view>
					<view>阿里啦啦阳光小学</view>
				</view>
				<view class="nearby--btm-site">
					<text>地址: 重庆市渝北区阳光小区右行800m</text>
				</view>
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
		methods: {
			convenient() {
				console.log(11)
				uni.navigateTo({
					url:"../servicePages/convenient/index"
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.facillty{
		font-size: 30rpx;
		font-weight: bold;
		color: #020204;
		margin-left: 25rpx;
	}
	.nearby{
		width: 702rpx;
		height: 416rpx;
		background-color: #FFFFFF;
		margin: 24rpx;
		border-radius: 15rpx;
		.nearby-img{
			width: 702rpx;
			height: 280rpx;
		}
		.nearby-btm{
			margin-top: 30rpx;
			height: 136rpx;
			.nearby-btm-text{
				display: flex;
				margin-left: 54rpx;
			}
			.nearby-btm-text view:nth-child(1){
				font-size: 30rpx;
				font-weight: bold;
				color: #020204;
			}
			.nearby-btm-text view:nth-child(2){
				width: 5rpx;
				height: 30rpx;
				background-color: #FB8E00;
				margin: 0 17rpx;
			}
			.nearby-btm-text view:nth-child(3){
				font-size: 30rpx;
				font-weight: 500;
				color: #020204;
			}
			.nearby--btm-site{
				margin-left: 54rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #9E9E9E;
			}
		}
	}

</style>
