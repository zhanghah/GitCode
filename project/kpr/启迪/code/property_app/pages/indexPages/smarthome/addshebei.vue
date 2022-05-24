<template>
	<view class="page-smarthome-addshebei">
		<view class="content">
			<!-- 扫描设备 -->
			<!-- <view>
				<view class="split"></view>
				<view class="scanning">
					<image src="../static/icon_scanning.png" mode=""></image>
				</view>
				
				<view class="tips">
					<view>正在扫描......</view>
					<view>请确保智能设备已连接电源，且位于手机附近</view>
				</view>
				
				<view class="tips">
					<view>扫描完成，没有发现设备</view>
					<view class="rescan" @click="rescan">重新扫描</view>
				</view>
			</view> -->
			
			<!-- 扫描到设备列表 -->
			<view class="shebei-list">
				<view class="list" @click="toAddForm">
					<view class="image">
						<image src="../static/icon_addshebei.png" mode=""></image>
					</view>
					<view class="right">
						<view class="title">
							水晶吊灯
						</view>
						<view class="mac">
							MAC地址：14：52：2d：56：58 
						</view>
						<view class="number">
							序列号：51256dewwdew45
						</view>
					</view>
				</view>
				<view class="list">
					<view class="image">
						<image src="../static/icon_addshebei.png" mode=""></image>
					</view>
					<view class="right">
						<view class="title">
							水晶吊灯
						</view>
						<view class="mac">
							MAC地址：14：52：2d：56：58 
						</view>
						<view class="number">
							序列号：51256dewwdew45
						</view>
					</view>
				</view>
			</view>
			
			<view class="btn">
				<view class="manual-btn">
					手动添加
				</view>
				<view class="scan-btn">
					扫描添加
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
			// 重新扫描
			rescan(){},
			
			// 转到toAddForm
			toAddForm(){
				uni.navigateTo({
					url:'./addform'
				})
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "添加智能设备",
			});
		}
	}
</script>

<style lang="less" scoped>
	.page-smarthome-addshebei{
		height: 100vh;
		box-sizing: border-box;
		background-color: #F5F5F5;
		
		.content{
			overflow: hidden;
			padding: 0rpx 35rpx 0 35rpx;
			
			.split{
				padding-top: 83rpx;
			}
			
			.scanning{
				width: 679rpx;
				height: 616rpx;
				border-radius: 10rpx;
				background-color: #FFFFFF;
				padding: 69rpx 107rpx 85rpx 107rpx;
				
			}
			
			.tips{
				margin-top: 74rpx;
				color: #020204;
				font-size: 32rpx;
				font-weight: bold;
				line-height: 60rpx;
				text-align: center;
				
				.rescan{
					color: #EF5050;
				}
				
			}
			
			.shebei-list{
				margin-top: 32rpx;
				
				.list{
					padding: 30rpx;
					display: flex;
					border-bottom: 1rpx #EEEEEE solid;
					background-color: #FFFFFF;
					
					.image{
						width: 70rpx;
						height: 112rpx;
					}
					
					.right{
						margin-left: 43rpx;
						color: #020204;
						
						.title{
							font-size: 30rpx;
							font-weight: bold;
							margin-bottom: 27rpx;
						}
						.mac,.number{
							font-size: 26rpx;
							line-height: 40rpx;
						}
					}
				}
			}
			
			.btn{
				width: 100%;
				display: flex;
				justify-content: space-between;
				text-align: center;
				margin-top: 130rpx;
				
				.manual-btn,.scan-btn{
					width: 314rpx;
					height: 82rpx;
					color: #FFFFFF;
					font-size: 32rpx;
					border-radius: 10rpx;
					line-height: 82rpx;
				}
				
				.manual-btn{
					background-color: #802890;
				}
				
				.scan-btn{
					background-color: #C6AA6B;
				}
			}
		}
	}
	
	.list:first-child{
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	.list:last-child{
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
	}
</style>
