<template>
  <view class="page-parking-costdetails">
    <view class="info">
      <view class="content">
        <image src="../static/icon_user.png"></image>
        <view class="txt">
          <view>幸福五社小区停车场</view>
          <view class="introduction">
            收费规则：30分钟内免费，2小时内5元之后每小时2元，每日封顶20元。
          </view>
        </view>
      </view>
    </view>

    <view class="contentBox">
      <view class="content">
        <view class="numberPlate">
          <car-number-card :value="carNumber"></car-number-card>
        </view>
        <ui-link label="停车时长" :arrow="false">
					<view slot="ext" class="link-ext"><text>1</text>小时<text>40</text>分钟</view>
				</ui-link>
        <ui-link label="入场时间" :arrow="false">
					<view slot="ext" class="link-ext colors">2018-07-11 09:45:25</view>
				</ui-link>
        <view class="price">
          <view class="title">应付</view>
          <view class="money">￥<text>8.00</text></view>
        </view>
      </view>
    </view>

    <view class="btn">
      <ui-button @click.native="handPay">立即缴费</ui-button>
    </view>
  </view>
</template>

<script>
import CarNumberCard from '../components/car-number-card';

export default {
  components: {
    CarNumberCard
  },
  data() {
    return {
      carNumber: '渝AT920W',
	  type:'linting'
    }
  },
  methods: {
    handPay() {
      uni.navigateTo({
        url: `../property/payorder?type=${this.type}`
      })
    }
  },
  beforeMount() {
    uni.setNavigationBarTitle({
      title: '费用详情',
    });
  },
}
</script>

<style lang="less" scoped>
  *{
    font-family: "PingFang SC";
    font-weight: 500;
  }
  .page-parking-costdetails {
    min-height: 100vh;
    padding-bottom: 108rpx;
    box-sizing: border-box;
		background-color: #F5F5F5;
	}
  .info{
    background: #fff;
    padding: 32rpx 30rpx;
    .content{
      background: #FFFFFF;
      border-radius: 8rpx;
      padding: 23rpx 28rpx;
      box-shadow: 0rpx 3rpx 6rpx rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      image{
        border-radius: 50%;
        width: 90rpx;
        height: 90rpx;
        overflow: hidden;
        flex-shrink:0;
        margin-right: 22rpx;
      }
      .txt{
        font-size: 34rpx;
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
  .contentBox{
    margin-top: 27rpx;
    padding: 0rpx 30rpx 0rpx 30rpx;
    .content{
      background-color: #fff;    
      box-shadow: 0px 6px 6px 0px rgba(128, 128, 128, 0.07);
      border-radius: 8px 8px 0px 0px;
      .numberPlate{
        display: flex;
        justify-content: space-around;
        padding: 35rpx 0rpx;
        border-bottom: 1rpx solid #E6E6E6;
      }
      .link-ext{
        color: #808080;
        font-size: 26rpx;
        font-weight: bold;
        &.colors{
          font-size: 30rpx;
          color: #333;
        }
        text{
          color: #FE8525;
          font-size: 36rpx;
        }
      }
      .price{
        padding: 52rpx 0rpx;
        background-color: #FCECFF;
        text-align: center;
        .title{
          font-size: 28rpx;
          color: #808080;
          // padding-bottom: 25rpx;
        }
        .money{
          color: #333333;
          font-size: 28rpx;
          text{
            font-size: 60rpx;
          }
        }
      }
    }
  }
  .btn{
    margin-top: 44rpx;
    padding: 0rpx 30rpx;
  }
</style>