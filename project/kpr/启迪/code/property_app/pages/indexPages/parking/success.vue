<template>
  <view class="page-parking-success">
    <view class="info">
      <view class="tips">
        <image src="../static/property/icon_success.png"></image>
        <view>缴费成功！</view>
        <view class="txt">请在<text>15分钟内</text>离场，否则会产生新的费用！</view>
      </view>

      <view class="content">
        <ui-link label="订单编号：" size="start" :arrow="false">
					<view slot="ext" class="link-ext colors">6039C90287DB0012</view>
				</ui-link>
        <ui-link label="缴费日期：" size="start" :arrow="false">
					<view slot="ext" class="link-ext colors">2018-07-11 09:45:25</view>
				</ui-link>
        <ui-link label="车牌号：" size="start" :arrow="false">
					<view slot="ext" class="link-ext colors">LT58651</view>
				</ui-link>
        <ui-link label="停车场：" size="start" :arrow="false">
					<view slot="ext" class="link-ext colors">旺得旺城停车场</view>
				</ui-link>
        <ui-link label="停车场费用总计：" size="start" :arrow="false">
					<view slot="ext" class="link-ext colors">¥154.00</view>
				</ui-link>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    
  },
  beforeMount() {
    uni.setNavigationBarTitle({
      title: '缴费成功',
    });
	
  },
}
</script>

<style lang="less" scoped>
  *{
    font-family: "PingFang SC";
    font-weight: 500;
  }
  .page-parking-success {
    min-height: 100vh;
    padding-bottom: 108rpx;
    box-sizing: border-box;
    // padding-top: 20rpx;
		background-color: #F5F5F5;
  }
  
  .info{
    padding-top: 57px;
    background-color: #fff;
    .tips{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      image{
        width: 136rpx;
        height: 136rpx;
        border-radius: 50%;
        margin-bottom: 33rpx;
      }
      view{
        width: 100%;
        text-align: center;
        font-size: 36rpx;
        color: #333333;
        &.txt{
          margin-right: 20rpx;
          font-size: 30rpx;
          text{
            color: #FD6637;
          }
        }
      }
    }
    .content{
      padding-top: 39rpx;
      .colors{
        font-size: 32rpx;
        color:#333333;
      }
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
</style>