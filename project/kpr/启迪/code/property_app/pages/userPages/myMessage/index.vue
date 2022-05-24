<template>
	<view class="message_wrap">
		<view class="message_list">
			<view class="list_item" @click="toWuYePage">
				<view class="item_icon wuye">
					<view class="tag" v-if="msg[1].count !=='0'">
						<u-badge type="error" :count="msg[1].count"></u-badge>
					</view>
				</view>
				<view class="item_infos">
					<view class="infos_name">物业消息</view>
					<view class="infos_text" v-if="msg[1].count !=='0'">您有{{msg[1].count}}条互动消息</view>
					<view class="infos_text" v-else>暂无消息</view>
				</view>
				<!-- <view class="item_time">2019-01-12 12:00</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'MyMessage',
		data() {
			return {
				msg: [
					 {
					      "type": "1",
					      "count": "100"
					    },
					    {
					      "type": "2",
					      "count": "0"
					    }
				]
			}
		},
		methods: {
			toWuYePage() {
				uni.navigateTo({
					url: '/pages/userPages/myMessage/wuye/index'
				});
			},

			//获取所有未读消息
			getMsg() {
				api.my.unreadCount().then(res => {
					if (res.status === '0') {
						// this.msg = res.data
					}
				})
			}
		},
		onShow() {
			this.getMsg()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '消息中心',
			});
		},
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.message_wrap {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-top: 20rpx;
	}

	.message_list {
		width: 100%;

		.list_item {
			width: 100%;
			height: 150rpx;
			background-color: #fff;
			padding: 30rpx 24rpx;
			border-bottom: 1rpx solid #EEE;
			display: flex;

			.item_icon {
				position: relative;
				left: 0;
				right: 0;
				width: 90rpx;
				height: 90rpx;
				flex-shrink: 0;
				border-radius: 50%;
				// overflow: hidden;
				margin-right: 29rpx;
				background-color: skyblue;

				// image {
				//   width: 100%;
				//   height: 100%;
				// }
				.tag {
					position: absolute;
					top: -20rpx;
					right: -30rpx;
				}
			}

			.item_infos {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				padding: 10rpx 0;

				.infos_name {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #020204;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}

				.infos_text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9E9E9E;
				}
			}

			.item_time {
				padding-top: 16rpx;
				margin-right: 20rpx;
				min-width: 215rpx;
				flex-shrink: 0;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #9E9E9E;
			}

			.linlq {
				background: url("../static/invitation/linlq.png") no-repeat;
				background-size: 100%;
			}

			.anfang {
				background: url("../static/invitation/anfang.png") no-repeat;
				background-size: 100%;
			}

			.wuye {
				background: url("../static/invitation/wuye.png") no-repeat;
				background-size: 100%;
			}

			&:last-child {
				border-bottom: none;
			}
		}
	}
</style>
