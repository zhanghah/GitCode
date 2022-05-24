<template>
	<view class="page-package-index">
		<view class="split"></view>
		<view class="tab-bar">
			<view :class="index==0?'active':''" @click="changeHandel('daishou')">
				<view>
					待收(1)
				</view>
				<!-- <view class="border">
					
				</view> -->
			</view>
			<view :class="index==1?'active':''" @click="changeHandel('yishou')">
				已收(1)
			</view>
		</view>
		<view class="content" v-if="current==1">
			<view class="content-box">
				<view class="image">
					<image src="../../../images/shopping/bg_jply_02.png" mode=""></image>
				</view>
				<view class="info">
					<view class="number">
						12-4589
					</view>
					<view class="phone">
						手机尾号4586地包裹
					</view>
					<view class="express">
						顺丰物流  |  df1556666995
					</view>
				</view>
			</view>
		</view>
		
		<view class="content" v-if="current==2">
			<view class="content-box">
				<view class="image">
					<image src="../../../images/shopping/bg_jply_02.png" mode=""></image>
				</view>
				<view class="info">
					<view class="number">
						已签收
					</view>
					<view class="phone">
						手机尾号4586地包裹
					</view>
					<view class="express">
						顺丰物流  |  df1556666995
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
				index:0,
				current:1
			}
		},
		methods:{
			changeHandel(val){
				if (val == 'daishou') {
					this.index = 0;
					this.current=1
				} else {
					this.index = 1;
					this.current=2
				}
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "待收包裹",
			});
		}
	}
</script>

<style lang="less" scoped>
	.split {
		height: 25rpx;
		background-color: #f5f5f5;
	}
	.page-package-index{
		min-height: 100vh;
		background-color: #FFFFFF;
		overflow: hidden;
	}
	
	.tab-bar{
		height: 100rpx;
		color: #333333;
		font-size: 35rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-around;
		align-items: center;
		
		.border{
			width: 60rpx;
			height: 5rpx;
			background-color: #802890
		}
		
		& .active{
			padding: 10rpx;
			color: #802890;
			border-bottom: 5rpx #802890 solid;
		}
	}
	.content{
		width: 100%;
		height: 100px;
		
		.content-box{
		padding: 30rpx;
			border-bottom: 1rpx #E6E6E6 solid;
			display: flex;
			align-items: center;
			.image{
				width: 200rpx;
				height: 200rpx;
			}
			
			.info{
				margin-left: 20rpx;
				.number{
					color: #333333;
					font-size: 38rpx;
					font-weight: bold;
				}
				
				.phone{
					color: #999999;
					font-size: 28rpx;
					margin: 35rpx 0;
					
				}
				
				.express{
					color: #333333;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
