<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			会议列表
		</nav-bar-new>
		<view class="top" :style="{ top: headH + 'px' }">
			<view class="serch_ul">
				<view class="serch">
					<image src="/static/trade/serch.png" mode=""></image>
					<input type="text" v-model="text" @confirm="serchcon" placeholder="请输入" />
				</view>
				<view class="cancel" @tap="cancel">
					取消
				</view>
			</view>
			<view class="tab">
				<view class="span" :class="active == index ? 'spaned' : ''" v-for="(item,index) in tab" :key="index" @tap="tabClick(index)">{{item}}</view>
			</view>
		</view>
		<view class="conter">
			<view class="list">
				<view class="release_li" v-for="(item,index) in list" :key="index" @tap="details(item)">
					<view class="release_data">
						<view class="data_new" v-if="index == 0 && active == 0">
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
						<view class="data_labela">
							拒绝{{item.refuse}}票
						</view>
						<view class="data_labelb">
							同意{{item.amount}}票
						</view>
					</view>
					<view class="release_time">
						<view class="time_right">
							{{item.time}}
						</view>
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
</template>

<script>
	import { mapState } from 'vuex';
	import api from '@/api';
	
	export default {
		data() {
			return {
				text: '',
				list:[],
				tab: ['申请中','已召开','已过期'],
				active: 0,
				headH:'',
				page: 1,
				size: 10,
				loadStatus: 'more',
			}
		},
		onShow(){
			let _this = this;
			this.page = 1;
			this.getList();
			this.$nextTick(function() {
				_this.initFn()
			})
		},
		methods: {
			initFn() {
				var _this = this;
				uni.getSystemInfo({
					success: function(res) {
						var body = res.screenHeight;
						let info = uni.createSelectorQuery().in(_this.$refs.navBar).select(".header_fixed");
						info.boundingClientRect(function(data) {
							_this.headH = data.height;
						}).exec();
					}
				});
			},
			tabClick(index) {
				this.active = index;
				this.list = [];
				this.page = 1;
				this.getList();
			},
			// 搜索
			serchcon() {
				this.page = 1;
				this.getList();
			},
			// 取消搜索
			cancel() {
				this.text = '';
				this.page = 1;
				this.getList();
			},
			// 列表
			async getList() {
				var entity = {
					conveneStatus: this.active,
					current: this.page,
					name: this.text,
					size: this.size,
				}
				const res = await api.trade.getMeetingPage(entity)
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
					url: `/pages/tradePages/apply/details?id=${item.id}`
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
	.top {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.serch_ul {
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			background: #FFFFFF;
			.serch {
				flex: 1;
				height: 68rpx;
				padding: 0 28rpx;
				background: #F5F5F5;
				border-radius: 50rpx;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
				image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}
				input {
					flex: 1;
					border: none;
					outline: none;
					font-size: 26rpx;
				}
			}
			.cancel {
				color: #333333;
				font-size: 30rpx;
				margin-left: 30rpx;
			}
		}
		.tab {
			width: 100%;
			display: flex;
			background: #fff;
			align-items: center;
			.span {
				flex: auto;
				text-align: center;
				position: relative;
				color: #999999;
				font-size: 32rpx;
				height: 102rpx;
				line-height: 102rpx;
			}
		
			.spaned {
				color: #282828;
		
				&::before {
					content: '';
					position: absolute;
					width: 40%;
					height: 6rpx;
					background: #282828;
					border-radius: 8rpx;
					margin: auto;
					left: 0px;
					right: 0px;
					bottom: 0px;
				}
			}
		}
	}
	.conter {
		padding: 24rpx;
		box-sizing: border-box;
		padding-top: 190rpx;
		.list {
			width: 100%;
			.release_li {
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				border-radius: 6rpx;
				background: #FFFFFF;
				margin-bottom: 24rpx;
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
						margin-left: 10rpx;
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
		}
		.data {
			width: 100%;
			.data_li {
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				border-radius: 6rpx;
				background: #FFFFFF;
				margin-bottom: 24rpx;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
				.data_img {
					width: 80rpx;
					height: 80rpx;
					line-height: 0;
					margin-right: 20rpx;
					image {
						width: 80rpx;
						height: 80rpx;
					}
				}
				.data_con {
					flex: 1;
					.data_title {
						width: 100%;
						display: -webkit-flex;
						justify-content: space-between;
						align-items: center;
						.title_left {
							color: #282828;
							font-size: 30rpx;
							font-weight: bold;
						}
						.title_right {
							display: -webkit-flex;
							flex-direction: row;
							align-items: center;
							.title_time {
								color: #999999;
								font-size: 22rpx;
								margin-right: 30rpx;
							}
							.dian {
								width: 14rpx;
								height: 14rpx;
								border-radius: 50%;
								background: #F05050;
							}
						}
					}
					.data_text {
						width: 100%;
						margin-top: 10rpx;
						display: -webkit-flex;
						flex-direction: row;
						align-items: center;
						.texts {
							flex: 1;
							color: #656565;
							font-size: 24rpx;
						}
						image {
							width: 14rpx;
							height: 26rpx;
							margin-left: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
