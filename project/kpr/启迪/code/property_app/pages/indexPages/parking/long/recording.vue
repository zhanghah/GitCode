<template>
  <view class="pages-parking-recording">
    <!-- 月 -->
    <view class="month" v-if="type">
      <view class="content" v-for="i in 3" :key="i">
        <view class="month">{{i}}月</view>
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

    <!-- 储 -->
    <view class="reserve" v-else>
      <view class="content" v-for="i in 3" :key="i">
        <view class="month">{{i}}月</view>
        <view class="list" v-for="item in 2" :key="item">
          <view class="code">
            储值车牌：渝A48569
            <text>¥ 12.50</text>
          </view>
          <view class="pd">停车场：幸福五社小区停车场</view>
          <view>2019-09-13 15:32</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: true,
    }
  },
  onLoad(params) {
    if(params.type){
      this.type = false;
      uni.setNavigationBarTitle({
        title: '消费记录',
      });
    } else {
      uni.setNavigationBarTitle({
        title: '停车记录',
      });
    }
  },
}
</script>

<style lang="less" scoped>
  *{
    font-family: "PingFang SC";
    font-weight: 500;
  }
  .pages-parking-recording {
    min-height: 100vh;
    padding-bottom: 108rpx;
    box-sizing: border-box;
		background-color: #F5F5F5;
  }

  .content{
    .month{
      height: 72rpx;
      padding-left: 35rpx;
      font-size: 30rpx;
      line-height: 72rpx;
      color: #333333;
    }
    .contentChild{
      box-shadow: 0rpx 1rpx 0rpx 0rpx #E0E0E0;
      margin-bottom: 0.5rpx;
      background-color: #fff;
      color: #303331;
      font-size: 30rpx;
      padding: 35rpx 35rpx 0rpx 35rpx;
      view{
        padding-bottom: 35rpx;
      }
    }
    .list{
      background-color: #fff;
      color: #79807A;
      font-size: 28rpx;
      padding: 39rpx 30rpx 36rpx 30rpx;
      border-bottom: 1rpx solid #E0E0E0;
      margin-bottom: 1rpx;
      .code{
        font-size: 32rpx;
        color: #303331;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text{
          font-size: 36rpx;
          color: #333333;
          font-weight: bold;
        }
      }
      .pd{
        padding: 30rpx 0rpx 26rpx 0rpx;
      }
    }
  }
</style>