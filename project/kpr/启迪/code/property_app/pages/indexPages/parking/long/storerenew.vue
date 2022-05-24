<template>
  <view class="page-parking-storerenew">
    <view class="type">
      <view
        v-for="(item, index) in datas"
        :key="index"
        @tap="renewType(item)"
        :class="{ active: activeMoney == item }"
      >
        {{ item }} 元
      </view>
    </view>

    <view class="split"> 其它金额 </view>

    <view class="content">
      <view class="selectMonth">
        续费金额
        <view class="img">
          <input
            type="number"
            maxlength="4"
            class="uni-input"
            v-model="money"
            @input="changeValue"
            placeholder="请输入 0~1000 内的金额"
          />
        </view>
      </view>
      <view>
        续费后预存余额将变为
        <view class="img">¥ {{ price }}</view>
      </view>
    </view>
    <view class="pay">
      <view class="price">
        待支付：<text>¥ {{ price }}</text>
      </view>
      <view class="btn">
        <ui-button @click.native="queryPay">确认支付</ui-button>
      </view>
    </view>
  </view>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      activeMoney: 100, // 选择续费金额
      datas: [100, 200, 500, 1000, 2000, 5000],
      price: "100.00", // 剩余金额
      money: undefined ,// 其它金额
	  type:'long'
    };
  },
  methods: {
    // 续费类型
    renewType(items) {
      console.log(items)
      this.activeMoney = items;
      this.price = 100 + items + '.00';
      this.money = '';
    },
    // 其他金额
    changeValue(e) {
      if(Number(e.target.value) <= 1000 && Number(e.target.value) > 0) {
        this.price = 100 + Number(e.target.value) + '.00';
      } else {
        this.price = '100.00'
        this.money = '';
      }
    },
    // 支付
    queryPay() {
      uni.navigateTo({
         url: `../../property/payorder?type=${this.type}`
      });
    },
  },
  beforeMount() {
    uni.setNavigationBarTitle({
      title: "储值车牌续费",
    });
  },
};
</script>

<style lang="less" scoped>
* {
  font-family: "PingFang SC";
  font-weight: 500;
}
.page-parking-storerenew {
  min-height: 100vh;
  padding-bottom: 108rpx;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.type {
  display: flex;
  justify-content: space-around;
  padding: 30rpx;
  text-align: center;
  flex-wrap: wrap;
  view {
    width: 217rpx;
    padding: 34rpx 0rpx 32rpx 0rpx;
    font-size: 48rpx;
    font-weight: bold;
    color: #303331;
    background-color: #fff;
    border: 1rpx solid #e6e6e6;
    border-radius: 8rpx;
    &:nth-child(n + 4) {
      margin-top: 30rpx;
    }
    &.active {
      color: #F05050;
      border: 2rpx solid #F05050;
    }
  }
}
.split {
  padding: 28rpx 0rpx 30rpx 32rpx;
  font-size: 30rpx;
  color: #333333;
}
.content {
  padding: 0rpx 32rpx;
  & > view {
    padding: 44rpx 29rpx;
    background-color: #fff;
    border-radius: 8rpx;
    border-bottom: 1rpx solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 34rpx;
    color: #323330;
    &:last-child {
      border-bottom: 0rpx;
    }
    .img {
      // width: 347rpx;
      font-size: 30rpx;
      color: #333333;
      display: flex;
      align-items: center;
      .uni-input {
        width: 360rpx;
        text-align: right;
        font-size: 30rpx;
        color: #333333;
      }
    }
  }
}
.selectMonth {
  position: relative;
  .pickerMonth {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
.pay {
  position: fixed;
  bottom: 0rpx;
  left: 0rpx;
  right: 0rpx;
  padding: 0rpx 32rpx;
  height: 108rpx;
  background: #ffffff;
  box-shadow: 0rpx -1rpx 0rpx 0rpx #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .price {
    font-size: 34rpx;
    color: #333333;
    text {
      color: #F05050;
      font-weight: bold;
    }
  }
}

.record{
  font-size: 24rpx;
  color: #9E9E9E;
  position: fixed;
  bottom: 150rpx;
  left: 0rpx;
  height: 20rpx;
  text-align: center;
  right: 0rpx;
}
</style>