<template>
	<view class="page-entrust-index">
    <view class="rent-ad">
      <ad-block type="4"></ad-block>  
    </view>
    
    <view class="block">
      <view class="title">
        我是业主
      </view>

      <view class="content">
        <view class="col" @click.native="toRentalPage()">
          <image src="http://static.kupurui.cn/comapp/entrust/icon_zszx_bg1.png"></image>
          <view class="label">
            委托出租
          </view>
        </view>

        <view class="col"  @click.native="toRentalPage('sell')">
          <image src="http://static.kupurui.cn/comapp/entrust/icon_zszx_bg2.png"></image>
          <view class="label">
            委托出售
          </view>
        </view>
      </view>
    </view>

    <view class="block">
      <view class="title">
        我有需求
      </view>

      <view class="content">
        <view class="col" @click.native="toRentbuyPage()">
          <image src="http://static.kupurui.cn/comapp/entrust/icon_zszx_bg3.png"></image>
          <view class="label">
            我要租房
          </view>
        </view>

        <view class="col" @click.native="toRentbuyPage('buy')">
          <image src="http://static.kupurui.cn/comapp/entrust/icon_zszx_bg4.png"></image>
          <view class="label">
            我要买房
          </view>
        </view>
      </view>
    </view>


    <tab-bar :setting="tabBar"></tab-bar>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

  import iconWt from '../static/tabbar/icon_wt.png';
  import iconWta from '../static/tabbar/icon_wt_active.png';
  import iconZs from '../static/tabbar/icon_zs.png';
  import iconZsa from '../static/tabbar/icon_zs_active.png';

	export default {
		components: {
		},
		data() {
			return {
        adSource: [],
        tabBar: {
          color: "#7A7A7C",
	        selectedColor: "#1B76FF",
          list: [
            {
              pagePath: "/pages/rentPages/index/index",
              iconPath: iconZs,
              selectedIconPath: iconZsa,
              text: "租售"
            },
            {
              pagePath: "/pages/rentPages/entrust/index",
              iconPath: iconWt,
              selectedIconPath: iconWta,
              text: "委托"
            },
          ],
        },
			};
		},
		computed: {
			...mapState(['user']),
		},
		onLoad() {
      uni.setNavigationBarTitle({
				title: '委托',
			});
		},
		methods: {
      toRentalPage(url) {
		  console.log(888,url)
        uni.navigateTo({
          url: `./rental?pageType=${url === undefined ? 'rental' : 'sell'}`
        });
      },
      toRentbuyPage(url) {
        uni.navigateTo({
          url: `./rentbuy?pageType=${url === undefined ? 'renting' : 'buy'}`
        });
      }
		}
	}
</script>

<style scoped lang="less">
	.page-entrust-index {
    min-height: 100vh;
    padding: 25rpx;
    padding-bottom: 110rpx;
    box-sizing: border-box;
  }
  
  .rent-ad {
    height: 280rpx;
  }

  .block {
    margin-top: 15rpx;
    .title {
      font-size: 34rpx;
      color: #333333;
      font-weight: bold;
      padding: 30rpx 0;
    }

    .content {
      display: flex;
      justify-content: space-between;
    }

    .col {
      width: 330rpx;
      height: 180rpx;
      position: relative;
    }

    .label {
      position: absolute;
      top: 30rpx;
      left: 22rpx;
      font-size: 30rpx;
    }
  }
</style>
