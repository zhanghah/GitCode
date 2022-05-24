<template>
	<view class="services">
    <view class="title">
      <view class="h1">生活服务</view>
      <view class="line"></view>
      <view class="h2">超有料的社区生活</view>
    </view>

		<view class="content">
			<view class="col" @click="serviceEvents(1)">
				<image src="@/static/index/icon_1.png"></image>
				<view class="wrap">
					<view class="h1">邻里圈</view>
					<view class="h2">爱宠, 运动, 公约</view>
				</view>
			</view>
			<view class="col" @click="serviceEvents(2)">
				<image src="@/static/index/icon_2.png"></image>
				<view class="wrap">
					<view class="h1">社区新闻</view>
					<view class="h2">实时资讯随时看</view>
				</view>
			</view>
			<view class="col" @click="serviceEvents(3)">
				<image src="@/static/index/icon_3.png"></image>	
				<view class="wrap">
					<view class="h1">便民服务</view>
					<view class="h2">周边设施一键通</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
    name: 'Services',
		components: {
		},
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
      serviceEvents(id){
				switch(id) {
						case 1:
								uni.navigateTo({
										url: '/pages/servicePages/circle/index'
								});	
								break;
						case 2:
								uni.navigateTo({
										url: '/pages/indexPages/community/index'
								});	
								break;
						case 3:
								uni.navigateTo({
										url: '/pages/servicePages/convenient/index'
								});	
								break;
								default:
				} 
    //     uni.navigateTo({
				// 	 url: '/pages/indexPages/community/index'
				// });
      }
		}
	}
</script>

<style scoped>
  .services {
    padding: 24rpx;
  }

	.title {
    display: flex;
    align-items: center;
    color: #666666;
		margin-bottom: 35rpx;
    font-size: 24rpx;
  }

  .title .line {
    height: 28rpx;
    width: 2rpx;
    margin: 0 13rpx;
    background: #D2D2D2;
  }

  .title .h1 {
    font-size: 36rpx;
    color: #333;
    font-weight: bold;
  }

	.content {
		display: flex;
		justify-content: space-between;
	}

	.col {
		position: relative;
		color: #FFF;
		width: 216rpx;
		height: 282rpx;
		overflow: hidden;
	}

	.col image {
		width: 100%;
		height: 100%;
	}

	.col .wrap {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 30rpx 24rpx;
	}
	.col .h1 {
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}
	.col .h2 {
		font-size: 22rpx;
	}
</style>
