<template>
	<view class="event-details">
    <view class="title">
        <h3>活动回顾 | 邻里健身活动，美好相伴，活 动标题活动标题</h3>
        <p>金辉物业<span>2020-03-10</span></p>
		</view>
    <!-- <image src="../static/activity/bg-hdxq-01.png"></image> -->
    <!-- <image src="../static/activity/bg-hdxq-01.png"></image> -->
    <view class="content">
        酒店（HOTEL），又称旅舍、宾馆，是提供安全、 舒适，让使用者得到短期的休息或睡眠空间的商业 机构。
    </view>
	</view>
</template>

<script>
	// import mainList from './components/mainList.vue';
	// import api from '@/api';
	

	export default {
		components: {
			// mainList,
		},
		data() {
			return {
				current:0,
        visibility:false,
        active:false,
        isActive:true,
        items: [
          {name: 'USA', value: '美国'},
          {name: 'CHN', value: '中国', checked: 'true'},
          {name: 'BRA', value: '巴西'},
          {name: 'JPN', value: '日本'},
          {name: 'ENG', value: '英国'},
          {name: 'TUR', value: '法国'},
        ]
			}
		},
		methods: {
      getNum(index) {
         this.current=index;
      },
      radioChange(e) {
         console.log('radio发生change事件，携带value值为：', e.detail.value)
      },

		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '新闻详情',
			});
		},
	}
</script>  

<style scoped lang="less">
  .event-details{
    background: white;
		font-family: 'PingFang-SC-Bold';
    height:100vh;
    padding:0 28rpx;
    overflow: auto;
  }

  .title{
    margin:20rpx 0;
    line-height: 60rpx;
  }
  .title h3{
    font-size: 36rpx;
    color: #3F3A39;
  }
   .title p{
    font-size: 26rpx;
    margin-top: 30rpx;
    color: #999999;
    span{
      margin-left: 20rpx;
    }
  }
  image{
    width: 100%;
    height: 444rpx;
    margin-bottom: 20rpx;
  }
  .content{
    font-size: r30px;
    font-weight: 500;
    color: #333333;
    line-height: r48px;
  }
</style>
