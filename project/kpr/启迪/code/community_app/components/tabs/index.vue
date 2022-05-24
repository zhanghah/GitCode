<template>
  <view class="tabs_warp">
    <view
      class="tabs_item"
      v-for="item in baseData"
      :key="item.key"
      @click="onSelectHandle(item.key)"
    >
      <view :class="['tabs_text', {active:  activeKey === item.key}]">{{ item.label }}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'Tabs',
  props: {
    dataList: {
      type: Array,
      default: [],
    },
    initKey: {
      type: String,
      default: '',
    } 
  },
  data() {
    return {
      activeKey: '',
    }
  },
  computed: {
    baseData() {
      return  this.dataList || []
    },
  },
  watch: {
    initKey(val) {
      console.log(val, 'initKey');
    }
  },
  methods: {
    onSelectHandle(key) {
      this.activeKey = key;
      this.$emit("change",key);
    }
  },
  beforeMount() {
    this.activeKey = this.initKey;
  },
}
</script>
<style lang="less" scoped>
.tabs_warp {
  background-color: #fff;
  height: 100rpx;
  width: 100%;
  display: -webkit-flex;
}
.tabs_item {
  flex: 1;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #666666;
  padding: 37rpx 0;
}
.active {
  position: relative;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #1B76FF;
}
.active::after {
  content: '';
  position: absolute;
  bottom: -15rpx;
  left:50%;
  transform: translateX(-50%);
  width: 100%;
  border-bottom: 6rpx solid #1B76FF;
  border-radius: 8rpx;
}
</style>