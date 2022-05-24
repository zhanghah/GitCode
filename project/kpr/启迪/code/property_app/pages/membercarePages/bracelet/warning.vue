<template>
	<view class="page-bracelet-warning">
		<view class="info">
			<view class="">
				手环超出安全范围
			</view>
			<view class="address">
				<view class="add">
					<view class="">
						位置：幸福五社小区门禁1号口
					</view>
					<view class="time">
						2020-08-23 17:23:16
					</view>
				</view>
				<view class="btn-watch" @tap="toMonitor">
					查看监控
				</view>
					
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			toMonitor(){
				uni.navigateTo({
					url:"./monitor"
				})
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title:'报警信息'
			})
		}
	}
</script>

<style lang="less" scoped>
	.page-bracelet-warning{
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}
	
	.info{
		margin: 20rpx 30rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 4rpx;
		color: #282828;
		font-size: 38rpx;
		font-weight: bold;
		.address{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;
			font-weight: 500;
			
			.add{
				font-size: 32rpx;
				color: #282828;
				
				.time{
					color: #999999;
					margin-top: 20rpx;
				}
			}
			
			.btn-watch{
				padding: 10rpx;
				color: #802890;
				font-size: 32rpx;
				border-radius: 4rpx;
				border: 1rpx #802890 solid;
			}
		}
	}
</style>
