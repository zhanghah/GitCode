<template>
	<view class="page-smarthome-type">
		<view class="content">
			<view class="navbar">
				<view v-for="(item, index) in menu" :key="index" @tap="handMenu(index)" :class="{ active: menuIndex == index }">
					<text :class="{ active: menuIndex == index }">{{ item }}</text>
				</view>
			</view>
			
			<view class="childMenu" v-if="menuIndex == 0">
				<view class="title">
					照明
				</view>
				<view class="contentBox">
					<view class="childBox">
						<view class="child-img">
							<image src="../static/icon_ddj.png" mode=""></image>
						</view>
						<view class="child-title">
							AI智能灯
						</view>
					</view>
					<view class="childBox">
						<view class="child-img">
							<image src="../static/icon_ddj.png" mode=""></image>
						</view>
						<view class="child-title">
							AI智能灯
						</view>
					</view>
					<view class="childBox">
						<view class="child-img">
							<image src="../static/icon_ddj.png" mode=""></image>
						</view>
						<view class="child-title">
							AI智能灯
						</view>
					</view>
					<view class="childBox">
						<view class="child-img">
							<image src="../static/icon_ddj.png" mode=""></image>
						</view>
						<view class="child-title">
							AI智能灯
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				menu:["照明","家居安防","摄像机","电源开关","厨房电器","环境电器","传感器"],
				menuIndex: 0,
			}
		},
		methods:{
			handMenu(index){
				this.menuIndex=index
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "设备类型",
			});
		},
	}
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
		font-weight: 500;
	}
	
	.page-smarthome-type {
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}
	
	.content{
		min-height: 100vh;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		
		.navbar {
			width: 254rpx;
			background-color: #fff;
			min-height: 100vh;
			margin-right: 20rpx;
			box-sizing: border-box;
		
			view {
				width: 182rpx;
				height: 72rpx;
				margin: 35rpx;
				text-align: center;
				line-height: 72rpx;
				font-size: 32rpx;
				border-radius: 36rpx;
		
				text {
					display: block;
					width: 100%;
				}
		
				&.active {
					background-color: #802890;
		
					text {
						color: #FFFFFF;
					}
				}
			}
		}
		
		.childMenu{
			// display: flex;
			// justify-content: flex-start;
			margin-top: 30rpx;
				.title{
					color: #333130;
					font-size: 32rpx;
					font-weight: bold;
				}
			.contentBox{
				width: 100%;
				overflow: hidden;
				display: flex;
				flex-wrap: wrap;
				
				
				.childBox{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-right: 28rpx;
					.child-img{
						width: 126rpx;
						height: 126rpx;
					}
					
					.child-title{
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
