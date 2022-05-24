<template>
	<view class="page-smarthome-myequipment">
		<view class="content">
			<view class="photo">
				<swiper class="swiper" :indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#802890"
					:autoplay="true">
					<swiper-item v-for="(item,index) in list" :key="index">
						<view class="swiper-item">
							<image style="width: 100%;height: 100%;" mode="scaleToFill" :src="item.image" />
						</view>
						<view class="title">{{item.title}}></view>
						<view class="num">{{item.num}}个设备</view>
					</swiper-item>
				</swiper>
			</view>

			<view class="equipment-list">
				<view class="equipment-info" @click="toFurnishDetail">
					<view class="title">
						智能音响
					</view>
					<view class="position">
						已开启(客厅)
					</view>
					<view class="shebei-pic">
						<image class="pic" src="../static/icon_yx.png" mode=""></image>
						<image class="switch" src="../static/icon_kg.png" mode=""></image>
					</view>
				</view>
				
				<view class="equipment-info" @click="toSecurityDetail">
					<view class="title">
						智能锁网关
					</view>
					<view class="position">
						已关闭(客厅)
					</view>
					<view class="shebei-pic">
						<image class="pic" src="../static/icon_security.png" mode=""></image>
						<image class="switch" src="../static/icon_close.png" mode=""></image>
					</view>
				</view>
				<view class="equipment-info" @click="toFurnishDetail">
					<view class="title">
						水晶吊灯
					</view>
					<view class="position">
						已关闭(客厅)
					</view>
					<view class="shebei-pic">
						<image class="pic" src="../static/icon_ddj.png" mode=""></image>
						<image class="switch" src="../static/icon_close.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: "../static/icon_znjj_kt.png",
						id: 1,
						title: '客厅',
						num: 3
					},
					{
						image: "../static/icon_znjj_zw.png",
						id: 2,
						title: '主卧',
						num: 3
					}
				],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods:{
			// 进入家居详情
			toFurnishDetail(){
				uni.navigateTo({
					url:"./detail"
				})
			},
			// 进入安防设备详情
			toSecurityDetail(){
				uni.navigateTo({
					url:"./securitydetail"
				})
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "房间设备",
			});
		}
	}
</script>

<style lang="less" scoped>
	.page-smarthome-myequipment {
		min-height: 100vh;
		background-color: #F5F5F5;
		overflow: hidden;
	}

	.content {
		padding: 0 23rpx;

		.photo {
			width: 100%;
			height: 229rpx;
			margin-top: 26rpx;
			position: relative;

			.title {
				position: absolute;
				top: 20rpx;
				left: 25rpx;
				color: #333333;
				font-size: 30rpx;
			}

			.num {
				position: absolute;
				top: 60rpx;
				left: 25rpx;
				color: #666666;
				font-size: 24rpx;
			}

			.swiper {
				width: 100%;
				height: 100%;
			}

			.swiper-item {
				height: 100%;
				background-color: #e7e7e7;
			}
		}
	
		.equipment-list{
			margin-top: 68rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			
			.equipment-info{
				width: 340rpx;
				height: 215rpx;
				margin-bottom: 23rpx;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				
				.title{
					color: #4D4D4D;
					font-size: 30rpx;
				}
				
				.position{
					color: #999999;
					font-size: 24rpx;
					margin: 10rpx 0;
				}
				
				.shebei-pic{
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					
					.pic{
						width: 100rpx;
						height: 100rpx;
					}
				}
			}
			
			.equipment-info:nth-child(odd){
				margin-right: 20rpx;
			}
			
			.switch{
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 15rpx;
			}
		}
	}
</style>
