<template>
	<view class="page-smarthome-security">
		<view class="top">
			<view class="img">
				<image src="../static/icon_lock.png" mode=""></image>
			</view>
			<view class="title">
				设备名称：密码门
			</view>
			<view class="gateway">
				设备网关门磁
			</view>
			<view class="mac">
				网关MAC：126366555636+
			</view>
		</view>
		<view class="content">
			<view class="switch">
				<view class="isopen">
					安防状态
				</view>
				<view class="swi">
					<view>布防</view>
					<u-switch v-model="checked" active-color="#802890"></u-switch>
				</view>
			</view>
			
			<view class="content-box">
				<view class="warn-info">
					<view>
						报警信息 (4)
					</view>
					<view>
						更多>
					</view>
				</view>
				<view class="warn-list" v-for="(item,index) in dataList" :key="index">
					<view class="left">
						<view class="">
							门磁报警，请注意查看
						</view>
						<view class="address">
							位置：{{item.address}}
						</view>
						<view class="time">
							{{item.time}}
						</view>
					</view>
					<view class="right">
						<view :class="item.status==0?'status':'processed'">
							待处理
						</view>
						<view class="btn" v-if="item.status==0">
							一键消警
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
				checked:false,
				dataList:[
					{
						address:'幸福五社小区1栋1单元1层12-0',
						time:'2020-08-25  16:18:23',
						status:0
					},
					{
						address:'幸福五社小区1栋1单元1层12-0',
						time:'2020-08-21  14:56:23',
						status:1
					},
					{
						address:'幸福五社小区1栋1单元1层12-0',
						time:'2020-08-19  18:32:25',
						status:1
					},
					{
						address:'幸福五社小区1栋1单元1层12-0',
						time:'2020-08-12  14:12:23',
						status:1
					},
				]
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "家居详情",
			});
		}
	}
</script>

<style lang="less" scoped>
	.page-smarthome-security{
		min-height: 100vh;
		background-color: #F5F5F5;
	}
	.top{
		height: 396rpx;
		background-color: #FDF1FF;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #474C4F;
		font-size: 30rpx;
		
		.img{
			width: 105rpx;
			height: 129rpx;
			margin-top: 48rpx;
			margin-bottom: 36rpx;
		}
		
		.title{
			line-height: 60rpx;
		}
		
		.mac{
			margin-top: 20rpx;
		}
	}
	
	.content{
		width: 100%;
		padding: 0 24rpx;
		
		.switch{
			height: 100rpx;
			background-color: #FFFFFF;
			margin: 37rpx 0;
			padding: 0 29rpx;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.swi{
				display: flex;
				align-items: center;
				
				view{
					margin-left: 20rpx;
				}
			}
		}
		
		.content-box{
			background-color: #FFFFFF;
			border-radius: 10rpx;
			
			.warn-info{
				height: 100rpx;
				color: #020203;
				font-size: 30rpx;
				padding: 0 23rpx;
				font-weight: bold;
				line-height: 100rpx;
				border-bottom:  1rpx #E6E6E6 solid;
				display: flex;
				justify-content: space-between;
				
				view:nth-child(2){
					font-weight: 500;
				}
			}
			
			.warn-list{
				height: 186rpx;
				border-bottom: 1rpx #E6E6E6 solid;
				display: flex;
				justify-content: space-between;
				padding: 0 23rpx;
				font-size: 30rpx;
				margin-top: 29rpx;
				
				.left{
					color: #020203;
					font-size: 30rpx;
					
					.address,.time{
						color: #9E9E9E;
						font-size: 24rpx;
						margin-top: 20rpx;
					}
				}
				
				.right{
					display: flex;
					flex-direction: column;
					// justify-content: space-around;
					align-items: flex-end;
					
					.status{
						color: #EF5050;
					}
					
					&.processed{
						color: #7A7A7C;
					}
					
					.btn{
						padding: 14rpx;
						border-radius: 10rpx;
						color: #802890;
						border: 1rpx #802890 solid;
						margin-top: 40rpx;
					}
				}
			}
		}
	}
</style>
