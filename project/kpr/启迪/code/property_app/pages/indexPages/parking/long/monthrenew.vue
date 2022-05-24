<template>
  <view class="page-parking-monthrenew">
    <view class="type">
      <view
        v-for="item in data"
        :key="item.month"
        @tap="renewType(item)"
        :class="{'active' : activeMonth == item.month}"
      >
        续费 {{item.month}} 个月
        <view>¥ {{item.price}}</view>
      </view>
    </view>

    <view class="split">
      其它月份
    </view>

    <view class="content">
      <picker class="pickerMonth" :range="monthArray" :value="month" @change="handMonth">
        <view class="selectMonth">
          续费月数
          <view class="img">
            续费{{month}}个月
            <image src="../../static/icon_right.png" />
          </view>
        </view>
      </picker>
      <view class="tiems">
        费用到期时间将延长至
        <view class="img">{{dateTime}}</view>
      </view>
    </view>

    <view class="pay">
      <view class="price">
        待支付：<text>¥ {{price}}</text>
      </view>
      <view class="btn">
        <ui-button @click.native="queryPay">确认支付</ui-button>
      </view>
    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      activeMonth: 1,
      data: [
        {
          month: 1,
          price: 158
        },
        {
          month: 2,
          price: 316
        },
        {
          month: 3,
          price: 474
        },
        {
          month: 6,
          price: 984
        },
        {
          month: 9,
          price: 1422
        },
        {
          month: 12,
          price: 1896
        },
      ],
      month: '一',
      dateTime: '2020-12-8',
      monthArray: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'], // 预设为24个月暂时显示十二个月
      price: '158.00',
	  type:'long',
    }
  },
  methods: {
    // 续费类型
    renewType(item) {
      this.activeMonth = item.month;
      this.price = item.price + '.00';
      this.dateTime = dayjs('2020-12-8').add(Number(item.month), 'month').format("YYYY-MM-DD");
    },
    // 选择月份
    handMonth(e) {
      this.month = this.monthArray[Number(e.target.value)];
      this.dateTime = dayjs('2020-12-8').add(Number(e.target.value) + 1, 'month').format("YYYY-MM-DD");
    },
    // 支付
    queryPay() {
      uni.navigateTo({
         url: `../../property/payorder?type=${this.type}`
      });
    }
  },
  beforeMount() {
    uni.setNavigationBarTitle({
      title: '月租车牌续费',
    });
  },
}
</script>

<style lang="less" scoped>
  *{
    font-family: "PingFang SC";
    font-weight: 500;
  }
  .page-parking-monthrenew {
    min-height: 100vh;
    padding-bottom: 108rpx;
    box-sizing: border-box;
		background-color: #F5F5F5;
  }
  .type{
    display: flex;
    justify-content: space-around;
    padding: 30rpx;
    text-align: center;
    flex-wrap: wrap;
    &>view{
      width: 217rpx;
      padding: 34rpx 0rpx 32rpx 0rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #303331;
      background-color: #fff;
      border: 1rpx solid #E6E6E6;
      border-radius: 8rpx;
      &:nth-child(n+4){
        margin-top: 30rpx;
      }
      &.active{
        color: #F05050;
        border: 1rpx solid #F05050;  
        view{
          color:#F05050;
        }
      }
      view{
        font-size: 30rpx;
        font-weight: 500;
        color: #616661;
      }
    }
  }
  .split{
    padding: 28rpx 0rpx 30rpx 32rpx;
    font-size: 30rpx;
    color: #333333;
  }
  .content{
    padding: 0rpx 32rpx;
    .pickerMonth{
      width: 100%;
    }
    .pickerMonth{
      width: 100%;
    }
    view.selectMonth, view.tiems{
      padding: 44rpx 29rpx;
      background-color: #fff;
      border-radius: 8rpx;
      border-bottom: 1rpx solid #E6E6E6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 34rpx;
      color: #323330;
      &:last-child{
        border-bottom: 0rpx;
      }
      .img{
        font-size: 30rpx;
        color: #333333;
        display: flex;
        align-items: center;
        image{
          margin-left: 23rpx;
          width: 13rpx;
          height: 24rpx;
        }
      }
    }
  }
  .pay{
    position: fixed;
    bottom: 0rpx;
    left:0rpx;
    right: 0rpx;
    padding: 0rpx 32rpx;
    height: 108rpx;
    background: #FFFFFF;
    box-shadow: 0rpx -1rpx 0rpx 0rpx #E0E0E0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price{
      font-size: 34rpx;
      color: #333333;
      text{
        color: #F05050;
        font-weight: bold;
      }
    }
  }
</style>