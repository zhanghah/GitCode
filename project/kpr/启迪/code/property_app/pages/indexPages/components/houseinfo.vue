<template>
	<view class="house">
    <view class="icon"></view>
    <view class="content">
      <view class="room">
        {{info.room}}
      </view>
      <view class="user">
        <view class="icon-user"></view>
        业主：{{info.name}} {{info.phone}}
      </view>
    </view>
    <view class="arrow"></view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
			}
    },
    props: {
      info: {
        type: Object,
        default() {
          return {};
        },
      },
    },
		methods: {
		},
		beforeMount() {
		},
	}
</script>  

<style scoped lang="less">
	.house {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    border: 1px solid #E6E6E6;
    padding: 25rpx 17rpx;
    border-radius: 8rpx;
    box-shadow: 0 0 12rpx #E6E6E6;
  }

  .content {
    flex: 1;
    padding: 0 23rpx;
    color: #303331;

    .room {
      font-size: 36rpx;
      margin-bottom: 10rpx;
    }

    .user {
      color: #79807A;
      font-size: 26rpx;
      display: flex;
      align-items: center;
    }

    .icon-user {
      width: 18rpx;
      height: 21rpx;
      background: url(../static/property/icon_user.png) no-repeat;
      background-size: 100% 100%;
      margin-right: 10rpx;
    }
  }
  .icon {
    width: 90rpx;
    height: 90rpx;
    background: url(../static/property/icon_home.png) no-repeat;
    background-size: 100% 100%;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .arrow {
    width: 11rpx;
    height: 19rpx;
    background: url(../static/property/icon_arrow.png) no-repeat;
    background-size: 100% 100%;
    flex-shrink: 0;
    flex-grow: 0;
  }
</style>
