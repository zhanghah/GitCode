<template>
  <view :class="['ui-noresult']">
    <view class="icon"></view>
    <view class="message">{{message}}</view>
		<slot />
  </view>
</template>

<script>
	export default {
    name: 'Button',
		components: {
    },
    props: {
      message: {
        type: String,
        default: '暂无内容',
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
  .ui-noresult {
    padding: 0 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
      width: 400rpx;
      height: 367rpx;
      background: url(@/static/noresult.png) center no-repeat;
      background-size: 100% ;
    }
	}
</style>
