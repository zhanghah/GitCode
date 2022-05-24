<template>
	<view>
		<nav-bar-new :home="false" fontColor="#333333" :titleCenter="false" :backState="1000" :shadow="false"
			bgColor="#ffffff">
			业委会
			<view slot="right">
				<view class="nav_text">{{community.name}}</view>
			</view>
		</nav-bar-new>
		<view class="conter">
			<!-- 封面 -->
			<view class="cover">
				<image src="../../rentPages/static/zhsqs.png" mode=""></image>
			</view>
			<view class="notice" v-if="noticeList.length > 0" @tap="notice">
				<image src="/static/trade/home2.png"></image>
				<view class="notice_wrap">
					<view class="notice_txt">
						<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration"
							:circular="true" :vertical="true">
							<swiper-item v-for="(item, index) in noticeList" :key="index">
								<view class="swiper-item uni-bg-red">{{item}}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="menu">
				<view class="menu_li" @tap="applyAdd">
					<image src="/static/trade/home3.png" mode=""></image>
					<text>大会申请</text>
				</view>
				<view class="menu_li" @tap="online">
					<image src="/static/trade/home4.png" mode=""></image>
					<text>线上业主会</text>
				</view>
				<view class="menu_li" @tap="overhaul">
					<image src="/static/trade/home5.png" mode=""></image>
					<text>大修基金</text>
				</view>
				<view class="menu_li" @tap="proposal">
					<image src="/static/trade/home6.png" mode=""></image>
					<text>物业建议</text>
				</view>
			</view>
			
			<view class="release">
				<view class="release_title" @tap="applyList">
					<view class="release_name">业主大会申请提议</view>
					<view class="release_more">
						查看更多
						<image src="/static/trade/home9.png" mode=""></image>
					</view>
				</view>
				<view class="release_ul">
					<view class="release_li" v-for="(item,index) in meetingList" :key="index" @tap="applyDetails(item)" v-if="index < 5">
						<view class="release_data">
							<view class="data_new" v-if="index == 0">
								<image src="/static/trade/home10.png" mode=""></image>
							</view>
							<view class="data_name">
								{{item.name}}
							</view>
						</view>
						<view class="release_con">
							{{item.content}}
						</view>
						<view class="release_plate">
							<view class="data_than">
								<view class="than_title">
									<view class="than_refuse">
										<text class="text_a">{{item.refuse}}</text><text class="text_b">票</text>拒绝
									</view>
									<view class="than_agree">
										同意<text class="text_a">{{item.amount}}</text><text class="text_b">票</text>
									</view>
								</view>
								<view class="billie">
									<view class="speed" :style="{width:item.billie+'%'}">
										<view class="speed_img">
											<image src="/static/trade/home11.png" mode=""></image>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="release_time">
							<view class="vote">
								<view class="vote_imga">
									<image src="/static/trade/home12.png" mode=""></image>
								</view>
								投一票，我的立场我做主
								<view class="vote_imgb">
									<image src="/static/trade/home9.png" mode=""></image>
								</view>
							</view>
							<view class="time_right">
								{{item.time}}
							</view>
						</view>
					</view>
					<view class="nothing" v-if="meetingList.length == 0">
						<image src="/static/trade/nothing.png" mode=""></image>
						暂无信息
					</view>
				</view>
			</view>
			
			<view class="release">
				<view class="release_title" @tap="publicity">
					<view class="release_name">公示信息</view>
					<view class="release_more">
						查看更多
						<image src="/static/trade/home9.png" mode=""></image>
					</view>
				</view>
				<view class="release_ul">
					<view class="common_li" v-for="(item,index) in publicityList" :key="index" @tap="publiDetails(item)">
						<!-- <view class="common_img">
							<image src="/static/trade/home1.png" mode=""></image>
						</view> -->
						<view class="common_con">
							<view class="common_name">{{item.title}}</view>
							<view class="common_time">{{item.time}}</view>
						</view>
					</view>
					<view class="nothing" v-if="publicityList == 0">
						<image src="/static/trade/nothing.png" mode=""></image>
						暂无信息
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import api from '@/api';
	export default {
		data() {
			return {
				adverData: [
					{noticeTitle:'蓝电霸王龙小区烟雾'},
					{noticeTitle:'蓝电霸王龙小区烟雾浓度超过警戒线，请立即前往...'},
				],
				autoplay: true,
				interval: 2000,
				duration: 500,
				noticeList: [],
				meetingList: [],
				publicityList: [],
			}
		},
		computed:{
			...mapState(['community'])
		},
		onShow() {
			this.noticelists();
			this.getMeeting();
			this.getPublicity();
		},
		methods: {
			// 大会申请
			applyAdd() {
				uni.navigateTo({
					url: '/pages/tradePages/apply/add'
				})
			},
			// 大会申请列表
			applyList() {
				uni.navigateTo({
					url: '/pages/tradePages/apply/list'
				})
			},
			// 大会申请详情
			applyDetails(item) {
				uni.navigateTo({
					url: `/pages/tradePages/apply/details?id=${item.id}`
				})
			},
			// 线上业主会
			online() {
				uni.navigateTo({
					url:'/pages/tradePages/online/list'
				})
			},
			// 大修基金
			overhaul() {
				uni.navigateTo({
					url:'/pages/tradePages/overhaul/list'
				})
			},
			// 物业建议
			proposal() {
				uni.navigateTo({
					url:'/pages/tradePages/proposal/list'
				})
			},
			// 公示
			publicity() {
				uni.navigateTo({
					url:'/pages/tradePages/publicity/list'
				})
			},
			// 公示详情
			publiDetails(item) {
				var type = item.judge == 0?1:2
				uni.navigateTo({
					url: `/pages/tradePages/publicity/details?id=${item.id}&type=${type}`
				})
			},
			// 公告
			notice() {
				uni.navigateTo({
					url:'/pages/tradePages/notice/list'
				})
			},
			// 公告轮播
			async noticelists() {
				const res = await api.trade.noticeList();
				if (res) {
					this.noticeList = res.data;
				}
			},
			// 大会申请
			async getMeeting() {
				const res = await api.trade.meetingHome();
				if (res) {
					res.data.forEach((item,index) => {
						if(item.amount===item.refuse){
							item.billie=50
						}else{
							item.billie = parseInt((item.refuse / (item.refuse + item.amount)) * 100)
						}
					});
					this.meetingList = res.data;
				}
			},
			// 公示信息
			async getPublicity() {
				const res = await api.trade.homePublicity({});
				if (res) {
					this.publicityList = res.data;
				}
			}
		}
	}
</script>

<style lang="less">
.nav_text {
	color: #656565;
	font-size: 28rpx;
	padding-right: 34rpx;
}
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.cover {
		width: 100%;
		height: 300rpx;
		border-radius: 10rpx;
		line-height: 0;
		margin-bottom: 20rpx;
		image {
			width: 100%;
			height: 300rpx;
			border-radius: 10rpx;
		}
	}
	.notice {
		width: 100%;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		background: rgba(198, 170, 107, 0.05);
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
		image {
			width: 31rpx;
			height: 31rpx;
		}
		.notice_wrap {
			padding-left: 35rpx;
			flex: 1;
			display: flex;
			height: 40rpx;
			align-items: center;
			justify-content: space-between;
			.notice_txt {
				width: 100%;
				font-size: 26rpx;
				font-weight: 500;
				color: #C6AA6B;
				height: 40rpx;
				overflow: hidden;
				.swiper {
					height: 40rpx;
					.swiper-item {
						height: 40rpx;
						line-height: 40rpx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
	.menu {
		width: 100%;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 24rpx;
		display: -webkit-flex;
		justify-content: space-between;
	
		.menu_li {
			display: -webkit-flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
	
			image {
				width: 80rpx;
				height: 80rpx;
			}
	
			text {
				color: #656565;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
	.release {
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		margin-bottom: 24rpx;
		.release_title {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			display: -webkit-flex;
			justify-content: space-between;
			border-bottom: 1px solid #EEEEEE;
			.release_name {
				color: #282828;
				font-size: 32rpx;
				font-weight: bold;
			}
			.release_more {
				display: -webkit-flex;
				align-items: center;
				color: #999999;
				font-size: 22rpx;
				image {
					width: 18rpx;
					height: 18rpx;
					margin-left: 8rpx;
				}
			}
		}
		.release_ul {
			padding: 0 24rpx;
			box-sizing: border-box;
			.release_li {
				width: 100%;
				padding: 30rpx 0;
				border-bottom: 1px solid #EEEEEE;
				.release_data {
					display: -webkit-flex;
					flex-direction: row;
					align-items: center;
					margin-bottom: 15rpx;
					.data_name {
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						color: #0F1312;
						font-size: 28rpx;
						font-weight: bold;
					}
					.data_new {
						width: 30rpx;
						height: 30rpx;
						line-height: 0;
						margin-right: 5rpx;
						image {
							width: 30rpx;
							height: 30rpx;
						}
					}
				}
				.release_con {
					width: 100%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					font-size: 24rpx;
					color: #999999;
					margin-bottom: 20rpx;
				}
				.release_plate {
					display: -webkit-flex;
					margin-bottom: 14rpx;
					.data_labela {
						color: #C6AA6B;
						font-size: 22rpx;
						background: rgba(198, 170, 107, 0.1);
						border-radius: 6rpx;
						padding: 6rpx 15rpx;
					}
					.data_labelb {
						color: #7F298E;
						font-size: 22rpx;
						background: rgba(127, 41, 142, 0.1);
						border-radius: 6rpx;
						padding: 6rpx 15rpx;
					}
					.data_than {
						width: 100%;
						margin-bottom: 25rpx;
						.than_title {
							width: 100%;
							display: -webkit-flex;
							justify-content: space-between;
							margin-bottom: 20rpx;
							.than_refuse {
								color: #282828;
								font-size: 24rpx;
								.text_a {
									color: #C6AA6B;
									font-size: 36rpx;
									font-weight: bold;
								}
								.text_b {
									color: #C6AA6B;
									font-size: 22rpx;
									font-weight: bold;
									margin-right: 15rpx;
								}
							}
							.than_agree {
								color: #282828;
								font-size: 24rpx;
								.text_a {
									color: #7F298E;
									font-size: 36rpx;
									font-weight: bold;
									margin-left: 15rpx;
								}
								.text_b {
									color: #7F298E;
									font-size: 22rpx;
									font-weight: bold;
								}
							}
						}
						.billie {
							width: 100%;
							height: 10rpx;
							border-radius: 8rpx;
							background: #7F298E;
							position: relative;
							.speed {
								height: 10rpx;
								border-radius: 8rpx;
								background: #C6AA6B;
								position: absolute;
								.speed_img {
									width: 40rpx;
									height: 40rpx;
									line-height: 0;
									position: absolute;
									top: -15rpx;
									right: -20rpx;
									image {
										width: 40rpx;
										height: 40rpx;
									}
								}
							}
						}
					}
				}
				.release_time {
					width: 100%;
					display: -webkit-flex;
					justify-content: space-between;
					.vote {
						color: #656565;
						font-size: 24rpx;
						display: -webkit-flex;
						flex-direction: row;
						align-items: center;
						.vote_imga {
							width: 23rpx;
							height: 18rpx;
							line-height: 0;
							margin-right: 8rpx;
							image {
								width: 23rpx;
								height: 18rpx;
							}
						}
						.vote_imgb {
							width: 18rpx;
							height: 18rpx;
							line-height: 0;
							margin-left: 8rpx;
							image {
								width: 18rpx;
								height: 18rpx;
							}
						}
					}
					.time_right {
						color: #C6C8C7;
						font-size: 20rpx;
					}
				}
			}
			.release_li:last-child {
				border-bottom: none;
			}
			.nothing {
				padding: 40rpx 0;
			}
			.common_li {
				width: 100%;
				padding: 30rpx 0;
				border-bottom: 1px solid #EEEEEE;
				display: -webkit-flex;
				flex-direction: row;
				.common_img {
					width: 80rpx;
					height: 80rpx;
					line-height: 0;
					margin-right: 20rpx;
					image {
						width: 80rpx;
						height: 80rpx;
					}
				}
				.common_con {
					flex: 1;
					.common_name {
						width: 100%;
						color: #656565;
						font-size: 28rpx;
						font-weight: bold;
						margin-bottom: 16rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.common_time {
						width: 100%;
						color: #999999;
						font-size: 20rpx;
					}
				}
			}
			.common_li:last-child {
				border-bottom: none;
			}
		}
	}
}
</style>
