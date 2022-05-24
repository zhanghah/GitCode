<template>
	<view class="wuye_list">
		<view class="list_wrap" v-if="msgList.length>0">
			<view class="list_item" v-for="(item,index) in msgList" :key="index">
				<view class="item_wrap">
					<view class="item_title">{{item.propertyType==1?'缴费提醒':(item.propertyType==2?'报事报修进度':'投诉建议进度')}}
					</view>
					<view class="item_time">{{item.createTime |date('YYYY-MM-DD HH:mm')}}</view>
					<view class="item_infos">
						{{item.content}}
					</view>
				</view>
				<ui-link label="点击查看详情" :border="false"></ui-link>
			</view>
		</view>
		<no-result v-else message='暂无数据'></no-result>
	</view>
</template>
<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'WuYe',
		data() {
			return {
				current: 1,
				size: 10,
				msgList: []
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '物业消息',
			});
		},
		onShow() {
			this.getList()
		},
		methods: {
			//消息列表
			getList() {
				let canshu = {
					current: this.current,
					size: this.size,
					type: '2'
				}
				api.my.getMessage(canshu).then(res => {
					if (res.status === '0') {
						this.msgList = res.data.records
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.wuye_list {
		min-height: 100vh;
		padding: 24rpx 30rpx;
		background-color: #f5f5f5;
	}

	.list_wrap {
		.list_item {
			background-color: #fff;
			margin-bottom: 20rpx;
			border-radius: 12rpx;
			overflow: hidden;

			.item_wrap {
				padding: 30rpx 18rpx 30rpx 23rpx;
				border-bottom: 1rpx solid rgba(159, 151, 147, 0.3);

				.item_title {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #020204;
					margin-bottom: 14rpx;
				}

				.item_time {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9E9E9E;
					margin-bottom: 26rpx;
				}

				.item_infos {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #7A7A7C;
					line-height: 40rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					line-clamp: 3;
					-webkit-box-orient: vertical;
				}
			}

			.item_detail {
				height: 78rpx;
				width: 100%;

			}
		}
	}
</style>
