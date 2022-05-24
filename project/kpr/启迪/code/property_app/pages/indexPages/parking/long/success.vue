<template>
  <view class="page-property-success">
    <view class="icon">
      <image src="../../static/property/icon_success.png"></image>
      <view>支付成功！￥158.00</view>
    </view>

    <view class="ifno">
      <ui-link label="订单编号：" :arrow="false" size="start">
        <view slot="ext" class="colors">6039C90287DB0012</view>
      </ui-link>
      <ui-link label="缴费时间：" :arrow="false" :border="false" size="start">
        <view slot="ext" class="colors">2018-10-20  15:32</view>
      </ui-link>
    </view>

    <view class="btn">
      <view><ui-button type="transparent" @click.native="back">返回</ui-button></view>
      <!-- <view><ui-button>申请发票</ui-button></view> -->
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    back() {
     uni.navigateBack({
     	delta:4
     })
    }
  },
  beforeMount() {
    uni.setNavigationBarTitle({
      title: '支付成功',
    });
  },
}
</script>

<style lang="less" scoped>
  *{
    font-family: "PingFang SC";
    font-weight: 500;
  }
	.page-property-success {
    min-height: 100vh;
    padding-bottom: 108rpx;
    box-sizing: border-box;
		background-color: #fff;
  }
  .icon{
    padding-top: 128rpx;
    padding-bottom: 51rpx;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    view{
      width: 100%;
      text-align: center;
      font-size: 36rpx;
      margin-top: 33rpx;
      color: #333333;
    }
    image{
      width: 136rpx;
      height: 136rpx;
    }
  }
  .btn{
    display: flex;
    justify-content: center;
    padding: 0rpx 30rpx;
    padding-top: 76rpx;
    view{
      width: 320rpx;
      height: 100rpx;
    }
  }
  .ifno {
    view.colors{
      font-size: 30rpx;
      color: #333333;
    }
  }
</style>