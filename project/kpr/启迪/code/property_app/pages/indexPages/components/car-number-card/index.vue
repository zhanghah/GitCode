<template>
  <view :class="['car-number-card', type, size]">
    <div class="box">
      {{value || '无号牌'}}
    </div>
  </view>
</template>

<script>
	export default {
    name: 'CarNumberCard',
		components: {
    },
    props: {
      value: {
        type: String,
        default: '',
      },
      size: {
        type: String,
        default: 'default',
      },
    },
		data() {
			return {
			}
    },
    computed: {
      type() {
        return this.value.length === 8 ? 'car-newenergy' : 'car-default';
      },
    },
    mounted() {
    },
	}
</script>

<style scoped lang="less">
  .car-number-card {
    width: 450rpx;
    height: 111rpx;
    background: #1B76FF;
    border-radius: 12rpx;
    padding: 5rpx 6rpx;
    box-sizing: border-box;

    &.car-newenergy {
      background: #00A552;
    }

    .box {
      border: 3rpx solid #FFFFFF;
      width: 100%;
      height: 100%;
      border-radius: 12rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 68rpx;
      color: #FEFEFE;
      font-weight: bold;
    }

    &.small {
      width: 206rpx;
      height: 56rpx;
      padding: 2rpx 3rpx;
      border-radius: 6rpx;

      .box {
        border-radius: 6rpx;
        font-size: 30rpx;
        font-weight: normal;
      }
    }
	}
</style>
