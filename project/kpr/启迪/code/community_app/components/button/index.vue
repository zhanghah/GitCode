<template>
  <view :class="['ui-button', `ui-${type}`]">
		<slot />
  </view>
</template>

<script>

	export default {
    name: 'Button',
		components: {
    },
    props: {
      type: {
        type: String,
        default: 'primary',
      },
    },
		data() {
			return {
			}
		},
		methods: {
		},
		beforeMount() {
		},
	}
</script>

<style scoped lang="less">
  .ui-button {
    height: 95rpx;
    border-radius: 45rpx;
    font-size: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 57rpx;
    box-sizing: border-box;
  }
  .ui-transparent{
    background: none;
    border: 1rpx solid #1B76FF;
    color:#1B76FF;
    font-size: 30rpx;
    font-weight: 500;
  }
  .ui-primary {
    background: #3093FF;
    color: #FFFFFF;
  }
  .ui-default {
    background: #F1F4F7;
    color: #424242;
  }
  .ui-entrust{
    background: none;
    border: 1rpx solid #1B76FF;
    color:#1B76FF;
    font-size: 28rpx;
    font-weight: 500;
    padding: 0;
    height: 60rpx;
  }
</style>
