<template>
	<view class="setting">
    <view :class="['icon', mode]"></view>
	</view>
</template>

<script>
	export default {
    name: 'Setting',
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
  .setting {
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
    background-image: url(@/static/components/icon_setting_black.png);
  }

  .icon.white {
    background-image: url(@/static/components/icon_setting_white.png);
  }
</style>
