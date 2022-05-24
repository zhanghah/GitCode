<template>
	<view class="message">
    <view :class="['icon', mode]"></view>
    <!-- <view class="tag">8</view> -->
	</view>
</template>

<script>
	export default {
    name: 'Message',
		components: {
    },
    props: {
      mode: {
        type: String,
        default: 'black',
      },
    },
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style scoped>
  .message {
    font-size: 30rpx;
    color: #020204;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .icon {
    width: 80rpx;
    height: 80rpx;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40rpx 40rpx;
  }

  .icon.black {
    background-image: url(@/static/components/icon_message_black.png);
  }

  .icon.white {
    background-image: url(@/static/components/icon_message_white.png);
  }

  .tag {
    font-size: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    background-color: #F93865;
    height: 25rpx;
    border-radius: 25rpx;
    position: absolute;
    right: 10rpx;
    top: 10rpx;
    padding: 0 8rpx;
  }
</style>
