<template>
	<view class="page-waterelectricity-index">
		<view class="contianer">
			<view class="shui" @click="toWater">
				<view class="icon"></view>
				<view class="text">
					<view class="apply">
						通水申请
					</view>
					<!-- <view>
						未申请
					</view> -->
				</view>
			</view>
			
			<view class="dian"  @click="toElectricity">
				<view class="icon"></view>
				<view class="text">
					<view class="apply">
						通电申请
					</view>
					<!-- <view>
						未申请
					</view> -->
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
			// 通水申请
			toWater(){
				uni.navigateTo({
					url:"./applywater"
				})
			},
			// 通电申请
			toElectricity(){
				uni.navigateTo({
					url:"./applyelectric"
				})
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '通水通电',
			});
		},
	}
</script>

<style lang="less" scoped>
	.page-waterelectricity-index{
		min-height: 100vh;
		background-color: #FFFFFF;
		
		.contianer{
			padding: 0 40rpx;
			
			.shui,.dian{
				width: 100%;
				height: 160rpx;
				margin-top: 31rpx;
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				
				.text{
					color: #FFFFFF;
					font-size: 30rpx;
					
					.apply{
						font-size: 36rpx;
					}
				}
			}
			
			.shui{
				background: url(../../indexPages/static/property/bg_wy.png) no-repeat;
				background-size: 100% 100%;
				
				.icon {
					width: 72rpx;
					height: 72rpx;
					background: url(../static/icon_shui.png) no-repeat;
					background-size: 100% 100%; 
					margin-right: 40rpx;
				}
			}
			
			.dian{
				background: linear-gradient(to right, #EDB430, #FED881);
				border-radius: 8rpx;
				
				.icon {
					width: 72rpx;
					height: 72rpx;
					background: url(../static/icon_dian.png) no-repeat;
					background-size: 100% 100%; 
					margin-right: 40rpx;
				}
			}
		}
	}
</style>
