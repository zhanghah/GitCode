<template>
	<view class="page-bracelet-notice">
		<view class="top">
			<view :class="['notice-info',{active:activeKey=='tx'}]" @tap="changeHandel('tx')">
				提醒消息
			</view>
			<view :class="['notice-info',{active:activeKey=='jc'}]" @tap="changeHandel('jc')">
				监测事件
			</view>
		</view>
		
		<view v-if="activeKey=='tx'">
			<view class="info">
				<view class="">
					手环进入电子围栏
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
			<view class="info">
				<view class="">
					手环进入电子围栏
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
	
		<view v-else>
			<view class="jc">
				<view class="tit">
					手环进入电子围栏
				</view>
				<image src="../../indexPages/static/icon_zhjj_delete.png" mode=""></image>
			</view>
			
			<view class="btn" @tap="addWacth">
				<ui-button type='transparent'>+添加监测事件</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeKey:'tx',
				curIndex:''
			}
		},
		methods:{
			changeHandel(val){
				console.log(val)
				this.activeKey=val
			},
			addWacth(){
				uni.navigateTo({
					url:"./addwatch"
				})
			},
			toMonitor(){
				uni.navigateTo({
					url:"./monitor"
				})
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: 'APP通知提醒'
			})
		}
	}
</script>

<style lang="less" scoped>
	.page-bracelet-notice {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}

	.top {
		width: 100%;
		padding: 30rpx 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #989898;
		font-size: 37rpx;
		font-weight: bold;
		font-style: PingFang-SC-Bold;

		.notice-info {
			padding: 15rpx;
			position: relative;

			&.active {
				color: #802890;
				border-bottom: 4rpx #802890 solid;

			}
		}
		// .notice-info:after {
		//             content: "";
		//             position: absolute;
		//             left: 50%;
		//             bottom: 0;
		// 			transform: translateX(-50%);
		//             width: 50%;
		//             height: 2px;
		//             background-color: #802890
		//         }

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
	
	.jc{
		margin: 20rpx 30rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 4rpx;
		color: #282828;
		font-size: 38rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		image{
			width: 45rpx;
			height: 45rpx;
		}
		
	}
		.btn{
			width: 348rpx;
			margin: 58rpx auto;
		}
</style>
