<template>
  <view :class="['ui-adder']">
    <view
      class="col subtract"
      @tap.stop="subtractHandler"
    ></view>
    <view class="col">
      <input
        v-model="count"
        disabled
        class="number"
      >
    </view>
    <view
      class="col plus"
      @tap.stop="plusHandler"
    ></view>
  </view>
</template>

<script>

	export default {
    name: 'Adder',
		components: {
    },
    props: {
      value: {
        type: Number,
        default: 1,
      }
    },
		data() {
			return {
        count: 1,
			}
    },
    watch: {
      value(val) {
        this.count = val;
      }
    },
		methods: {
      subtractHandler() {
        this.count = Math.max(1, this.count - 1);

        this.$emit('input', this.count);
      },
      plusHandler() {
        this.count = this.count + 1;

        this.$emit('input', this.count);
      },
		},
		beforeMount() {
      this.count = this.value;
		},
	}
</script>

<style scoped lang="less">
  .ui-adder {
    width: 205rpx;
    height: 54rpx;
    background: #FFFFFF;
    border: 1rpx solid #E8E8E8;
    border-radius: 2rpx;
    display: flex;
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;

    input {
      text-align: center;
    }

    .col {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .subtract {
      background: url(@/static/components/icon_subtract.png) no-repeat center center;
      background-size: 20rpx 20rpx;
      border-right: 1rpx solid #EEEEEE;
    }

    .plus {
      background: url(@/static/components/icon_plus.png) no-repeat center center;
      background-size: 20rpx 20rpx;
      border-left: 1rpx solid #EEEEEE;
    }
  }
</style>
