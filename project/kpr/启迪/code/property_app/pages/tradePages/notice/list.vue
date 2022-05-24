<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			通知公告
		</nav-bar-new>
		<view class="conter">
			<view class="list_ul">
				<view class="list" v-for="(item,index) in list" :key="index" @tap="details(item)">
					<view class="list_title">
						<view class="title_name">{{item.title}}</view>
						<view class="title_state" :class="item.isRead == 0?'cor':''">
							{{item.isRead == 0?'未读':'已读'}}
						</view>
					</view>
					<view class="list_time">
						{{item.createTime}}
					</view>
					<!-- <view class="list_con">
						{{item.content}}
					</view> -->
					<view class="list_details">详情</view>
				</view>
				<view class="nothing" v-if="list.length == 0">
					<image src="/static/trade/nothing.png" mode=""></image>
					暂无信息
				</view>
				<uni-load-more :status="loadStatus" v-if="list.length > 0"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	
	export default {
		data() {
			return {
				list:[],
				page: 1,
				size: 10,
				loadStatus: 'more',
			}
		},
		onShow(){
			this.page = 1;
			this.getList();
		},
		methods: {
			// 列表
			async getList() {
				var entity = {
					current: this.page,
					size: this.size,
				}
				const res = await api.trade.getNotice(entity)
				if (res) {
					if (this.page == 1) {
						this.list = res.data.records;
						this.loadStatus = 'noMore';
					} else {
						if (res.data.records.length != 0) {
							this.list = this.list.concat(res.data.records);
						    this.loadStatus = 'more';
						} else {
						    this.loadStatus = 'noMore';
						}
					}
				}
			},
			// 详情
			details(item) {
				uni.navigateTo({
					url: `/pages/tradePages/notice/details?id=${item.id}`
				})
			},
		},
		onReachBottom() {
		    this.page++;
		    this.getList();
		}
	}
</script>

<style lang="less">
page {
	background: #f5f5f5;
}
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.list_ul {
		width: 100%;
		.list {
			width: 100%;
			border-radius: 10rpx;
			background: #FFFFFF;
			padding: 24rpx;
			padding-bottom: 0;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			.list_title {
				width: 100%;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 12rpx;
				.title_name {
					flex: 1;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					color: #333333;
					font-size: 32rpx;
					font-weight: bold;
				}
				.title_state {
					color: #999999;
					font-size: 24rpx;
					margin-left: 30rpx;
				}
				.cor{
					color: #C6AA6B;
				}
			}
			.list_time {
				width: 100%;
				color: #999999;
				font-size: 20rpx;
				margin-bottom: 20rpx;
			}
			.list_con {
				width: 100%;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				color: #656565;
				font-size: 26rpx;
				padding-bottom: 24rpx;
				line-height: 44rpx;
			}
			.list_details {
				width: 100%;
				padding: 24rpx 0;
				border-top: 1px solid #EEEEEE;
				color: #AB8BBC;
				font-size: 24rpx;
			}
		}
	}
}
</style>
