<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			物业建议
			<view slot="right">
				<view class="addbtn" @tap="add">新建</view>
			</view>
		</nav-bar-new>
		<view class="conter">
			<view class="release_ul">
				<view class="common_li" v-for="(item,index) in list" :key="index" @tap="details(item)">
					<view class="common_img">
						<image src="/static/trade/news.png" mode=""></image>
						<view class="unread" v-if="item.isRead == 1"></view>
					</view>
					<view class="common_con">
						<view class="common_name">
							<view class="text1">
								{{item.title}}
							</view>
							<!-- <view class="text2">{{item.time}}</view> -->
						</view>
						<view class="common_data">
							<text v-if="item.isReply == 1">[有人@我]</text>
							{{item.isReply == 0?'暂无回复，可点击查看':item.reply}}
						</view>
						<view class="common_time">
							{{item.time}}
						</view>
					</view>
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
				const res = await api.trade.getPropose(entity)
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
			details(item) {
				uni.navigateTo({
					url:`/pages/tradePages/proposal/details?id=${item.id}`
				})
			},
			add() {
				uni.navigateTo({
					url:'/pages/tradePages/proposal/add'
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
.addbtn {
	width: 100rpx;
	height: 56rpx;
	margin-right: 24rpx;
	border-radius: 10rpx;
	background: #7F298E;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	font-size: 26rpx;
	color: #FFFFFF;
}
.conter {
	width: 100%;
	padding: 0 24rpx;
	box-sizing: border-box;
	.release_ul {
		width: 100%;
		.nothing {
			padding-top: 200rpx;
		}
		.common_li {
			width: 100%;
			padding: 30rpx 0;
			display: -webkit-flex;
			flex-direction: row;
			.common_img {
				width: 100rpx;
				height: 100rpx;
				line-height: 0;
				margin-right: 30rpx;
				position: relative;
				image {
					width: 100rpx;
					height: 100rpx;
				}
				.unread {
					width: 20rpx;
					height: 20rpx;
					background: #F05050;
					border-radius: 50%;
					position: absolute;
					top: 0;
					right: 0;
				}
			}
			.common_con {
				flex: 1;
				.common_name {
					width: 100%;
					margin-bottom: 12rpx;
					display: -webkit-flex;
					flex-direction: row;
					.text1 {
						flex: 1;
						color: #282828;
						font-size: 32rpx;
						font-weight: bold;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.text2 {
						color: #999999;
						font-size: 22rpx;
						margin-left: 30rpx;
					}
				}
				.common_data {
					width: 100%;
					color: #656565;
					font-size: 24rpx;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					margin-bottom: 12rpx;
					text {
						color: #7F298E;
						font-size: 24rpx;
						margin-right: 10rpx;
					}
				}
				.common_time {
					width: 100%;
					color: #999999;
					font-size: 22rpx;
				}
			}
		}
		.common_li:last-child {
			border-bottom: none;
		}
	}
}
</style>
