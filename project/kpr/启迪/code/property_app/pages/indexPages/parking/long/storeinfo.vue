<template>
  <view class="page-parking-storeinfo">
    <view class="top">
      <view class="info">
        <view class="content">
          <image src="../../static/icon_linting.png"></image>
          <view class="txt">
            <view>储值车牌：渝A•48569</view>
            <view class="introduction">
              停车场：幸福五社小区停车场
            </view>
          </view>
        </view>
      </view>
      <view class="price">
        <view>
          <image src="../../static/property/icon_money.png" mode="" />
          预存余额
        </view>
        <text>¥ 158</text>
      </view>
    </view>

    <view class="content">
      <navigator url="./recording?type=reserve" hover-class="none">
        <ui-link label="消费记录">
          <view slot="ext" class="colors">查看更多</view>
        </ui-link>
      </navigator>

      <view class="list" v-for="item in 3" :key="item">
        <view class="code">
          储值车牌：渝A48569
          <text>¥ 12.50</text>
        </view>
        <view class="pd">停车场：幸福五社小区停车场</view>
        <view>2019-09-13 15:32</view>
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
         url: './storerenew'
      });
    }
  },
  beforeMount() {
    uni.setNavigationBarTitle({
      title: '储值车详情',
    });
  },
}
</script>

<style lang="less" scoped>
  *{
    font-family: "PingFang SC";
    font-weight: 500;
  }
  .page-parking-storeinfo {
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
  .price{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 31rpx;
    image{
      width: 33rpx;
      height: 38rpx;
      margin-right: 17rpx;
    }
    view{
      display: flex;
      align-items: center;
    }
    text{
      font-size: 42rpx;
      color: #FF2036;
    }
    font-size: 30rpx;
    color: #303331;
  }
  .top{
    background-color: #fff;
  }
  .content{
    padding-top: 24rpx;
    padding-bottom: 24rpx;
    .colors{
      color:#999999;
      font-size: 28rpx;
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
  .btn{
    position: fixed;
    bottom: 0rpx;
    left: 0rpx;
    right: 0rpx;
    height: 108rpx;
    z-index: 9;
    background-color: #fff;
    padding:  10rpx 32rpx;
  }
</style>