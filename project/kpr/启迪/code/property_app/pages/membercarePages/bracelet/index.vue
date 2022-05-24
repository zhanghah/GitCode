<template>
	<view class="page-bracelet-index">
		<view class="balance_detail">
			<image class="img" src="../static/bannershxq.png" mode=""></image>
			<view class="app-notice" @tap="toNotice">
				<view class="tit">
					APP通知提醒
				</view>
				<view class="event">
					无提醒事件
				</view>
			</view>
			<view class="baojing-info" @tap="toWarning">
				<view class="info">
					<view>
						报警信息
					</view>
					<view class="num-tips">
						1
					</view>
				</view>
				<view class="bottom">
					有1条报警信息
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				item:''
			}
		},
		methods:{
			toNotice(){
				uni.navigateTo({
					url:'./notice'
				})
			},
			toWarning(){
				uni.navigateTo({
					url:'./warning'
				})
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title:'手环详情'
			})
		},
		onLoad(opt) {
			this.item=opt.item
		}
	}
</script>

<style lang="less" scoped>
	.page-bracelet-index{
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}
	
	.balance_detail{
		
		.img{
			width: 100%;
			height: 300rpx;
		}
		
		.app-notice{
			width: 100%;
			background-color: #FFFFFF;
			padding: 30rpx;
			color: #999999;
			font-size: 32rpx;
			margin: 20rpx 0;
			
			.tit{
				color: #282828;
				font-size: 38rpx;
				margin-bottom: 10rpx;
			}
		}
		
		.baojing-info{
			background-color: #FFFFFF;
			padding: 30rpx;
			.info{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #282828;
				font-size: 38rpx;
				.num-tips{
					min-width: 40rpx;
					min-height: 40rpx;
					background-color: #F05050;
					color: #FFFFFF;
					border-radius: 50%;
					text-align: center;
					margin-right: 30rpx;
					font-size: 26rpx;
				}
			}
				
			.bottom{
				color: #999999;
				font-size: 32rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
