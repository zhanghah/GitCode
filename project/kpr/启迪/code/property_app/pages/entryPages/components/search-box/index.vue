<template>
  <view class="search-box">
    <view class="wrap">
      <view class="icon"></view>
      <view class="input">
        <input @input="inputHandler" v-model="keyval" type="text" name="key" :placeholder="placeholder">
      </view>
    </view>
  </view>
</template>

<script>
	export default {
    name: 'SearchBox',
		components: {
    },
    props: {
      value: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
    },
		data() {
			return {
        keyval: '',
			};
    },
		methods: {
      inputHandler(e) {
        this.$emit('input', this.keyval);
      }
		},
		beforeMount() {
      this.keyval = this.value;
    },
    mounted() {
    },
	}
</script>

<style scoped lang="less">
  .search-box {
    padding: 20rpx 22rpx;
    
    .wrap {
      height: 76rpx;
      background: #F5F5F5;
      border-radius: 38rpx;
      display: flex;
      padding: 0 35rpx;
      box-sizing: border-box;
      align-items: center;
    }

    .icon {
      width: 34rpx;
      height: 34rpx;
      background: url(../../static/bind/icon_search.png) no-repeat;
      background-size: 100% 100%;
      flex-shrink: 0;
      flex-grow: 0;
      margin-right: 16rpx;
    }

    .input {
      flex: 1;
      height: 100%;
    }

    input {
      
      color: #666666;
      font-size: 30rpx;
      height: 100%;
    }
	}
</style>
