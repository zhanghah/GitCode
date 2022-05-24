<template>
	<view class="myActivity_xq">
		<view class='xq_box'>
			<view class="title_box">
				<view>活动回顾 | 邻里健身活动，美好相伴，活动标题活动标题</view>
				<view class="time">金辉物业&nbsp;&nbsp;&nbsp;&nbsp;2020-03-10 </view>
			</view>
			<view class="xq">详情内容</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'MyActivity',
		data() {
			return {

			}
		},
		methods: {

		},
		onLoad(option) {
			
			uni.setNavigationBarTitle({
				title: '活动详情',
			});
		},
	}
</script>
<style lang="less" scoped>
	.xq_box {
		border-top: 1px solid #E3E3E3;
		color: #3F3A39;
		font-size: 36rpx;
		line-height: 60rpx;
		padding: 60rpx 24rpx 0 24rpx;

		.time {
			margin: 30rpx 0 36rpx 0;
			color: #999999;
			font-size: 26rpx;
		}

		.xq {
			color: #333333;
			font-size: 30rpx;
		}
	}
</style>
