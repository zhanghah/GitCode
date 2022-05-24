<template>
  <view class="page-parking-monthinfo">
    <view class="top">
      <view class="info">
        <view class="content">
          <image src="../../static/icon_linting.png"></image>
          <view class="txt">
            <view>月租车牌：渝A•48569</view>
            <view class="introduction">
              停车场：幸福五社小区停车场
            </view>
          </view>
        </view>
      </view>
      <view class="time">
        <ui-link label="费用到期时间" :arrow="false" :border="false">
          <view slot="ext" class="colors">2020-09-25</view>
        </ui-link>
      </view>
    </view>

    <view class="parkingRecording">
      <navigator hover-class="none">
        <ui-link label="停车记录" :arrow="false">
        </ui-link>
      </navigator>

      <view class="content">
        <view class="contentChild" v-for="item in 2" :key="item">
          <view>
            入场通道：入口1
          </view>
          <view>
            停车时长：2小时15分钟
          </view>
          <view>
            进场时间：2019-03-11 00:00:12
          </view>
          <view>
            离场时间：2019-03-11 00:00:12
          </view>
        </view>
      </view>
    </view>

    <view class="btn">
      <ui-button @click.native="toRenewPage">立即续费</ui-button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    toRenewPage() {
      uni.navigateTo({
         url: './monthrenew'
     })
    }
  },
  beforeMount() {
    uni.setNavigationBarTitle({
      title: '月租车详情',
    });
  },
}
</script>

<style lang="less" scoped>
  *{
    font-family: "PingFang SC";
    font-weight: 500;
  }
  .page-parking-monthinfo {
    min-height: 100vh;
    padding-bottom: 108rpx;
    box-sizing: border-box;
		background-color: #F5F5F5;
  }
  .info{
    background: #fff;
    padding: 32rpx 30rpx 5rpx 30rpx;
    .content{
      background: #FFFFFF;
      border-radius: 8rpx;
      padding: 23rpx 28rpx;
      box-shadow: 0rpx 3rpx 6rpx rgba(0,0,0,0.1);
      display: flex;
      justify-content: flex-start;
      image{
        border-radius: 50%;
        width: 90rpx;
        height: 90rpx;
        overflow: hidden;
        flex-shrink:0;
        margin-right: 22rpx;
      }
      .txt{
        font-size: 36rpx;
        color: #333333;
        .introduction{
          font-size: 26rpx;
          color: #808080;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .time{
    .colors{
      font-size: 30rpx;
    }
    color: #9E9E9E;
  }
  .parkingRecording{
    padding-top: 24rpx;
    .colors{   
      font-size: 28rpx;
      color: #999999;
      font-weight: 500;
    }
    .content{
      .contentChild{
        box-shadow: 0px -1px 0px 0px #E0E0E0;
        background-color: #fff;
        color: #303331;
        font-size: 30rpx;
        padding: 35rpx 35rpx 0rpx 35rpx;
        view{
          padding-bottom: 35rpx;
        }
      }
    }
  }
  .btn{
    position: fixed;
    bottom: 0rpx;
    left: 0rpx;
    right: 0rpx;
    height: 108rpx;
    z-index: 9;
    // display: flex;
    // align-items: center;
    background-color: #fff;
    // margin-top: 10rpx;
    padding:  10rpx 32rpx;
  }
</style>