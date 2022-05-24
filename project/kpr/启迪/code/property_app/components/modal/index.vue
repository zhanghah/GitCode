<template>
  <view :class="['ui-modal']" v-if="visible">
    <view class="overlay" @click="closeHandler"></view>
    <view :class="['container', { full }]">
      <view class="close" @click="closeHandler" v-if="showClose"></view>

      <view class="content">
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
	export default {
    name: 'Modal',
		components: {
    },
    props: {
      full: {
        type: Boolean,
        default: false,
      },
      showClose: {
        type: Boolean,
        default: true,
      },
      value: {
        type: Boolean,
        default: false,
      },
    },
		data() {
			return {
        visible: false,
			}
    },
    watch: {
      value(val) {
        this.visible = val;
      }
    },
		methods: {
      closeHandler() {
        this.visible = false;

        this.$emit('input', this.visible);
      }
		},
		beforeMount() {
      this.visible = this.value;
		},
	}
</script>

<style scoped lang="less">
  .ui-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    .overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .close {
      position: absolute;
      top: 30rpx;
      right: 30rpx;
      width: 64rpx;
      height: 64rpx;
      background: url(@/static/components/icon_modal_delete.png) no-repeat center center;
      background-size: 34rpx 34rpx;
      z-index: 9999;
      background-color: #FFFFFF;
    }

    .container {
      box-sizing: border-box;
      padding: 30rpx;
      background-color: #FFFFFF;
      min-height: 100rpx;
      position: absolute;
      z-index: 9;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top-left-radius: 30rpx;
      border-top-right-radius: 30rpx;

      &.full {
        padding: 0;
      }
    }

    .content {
      max-height: 70vh;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
