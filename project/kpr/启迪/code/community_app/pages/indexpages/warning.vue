<template>
	<view>
		<nav-bar ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			智能预警
		</nav-bar>
		<view class="tab" :style="{ top: headH + 'px' }">
			<view class="span" :class="active == 1 ? 'spaned' : ''" @tap="tabClick(1)">黑名单预警</view>
			<view class="span" :class="active == 2 ? 'spaned' : ''" @tap="tabClick(2)">消防预警</view>
		</view>
		<view class="conter">
			<view class="list" v-for="(item,index) in list" :key="index" v-if="active == 1" @tap="details_a">
				<view class="list_li">
					<view class="list_img">
						<image src="/static/index/home6.png" mode=""></image>
					</view>
					<view class="list_con">
						<view class="list_title">
							吸毒人员李二哈进入幸福五社小区，请注意监控动态
						</view>
						<view class="list_time">
							2021.05.12 11:23:12
						</view>
					</view>
				</view>
			</view>
			<view class="data" v-for="(item,index) in list" :key="index" v-if="active == 2">
				<view class="data_li">
					<view class="data_top">
						<view class="data_img">
							<image src="/static/index/icon11.png" mode=""></image>
						</view>
						<view class="data_title">
							{{item.alarmTitle}}
						</view>
					</view>
					<view class="data_con">
						<view class="data_time">
							{{item.createTime}}
						</view>
						<view class="data_type">
							{{item.typeName}}
						</view>
					</view>
					<view class="data_address">
						位置：{{item.seat}}
					</view>
					<view class="data_text" @tap="details_b(item.id)">
						<view class="texts">查看详情</view>
						<image src="/static/index/right.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="nothing" v-if="list.length == 0">
				<image src="/static/index/nothing.png" mode=""></image>
				暂无信息
			</view>
			<uni-load-more :status="loadStatus" v-if="list.length > 0"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import api from '@/api'
	export default {
		data() {
			return {
				list: [],
				active: 2,
				headH: '',
				current: 1,
				size: 10,
				total: 0,
				loadStatus: 'more',
			}
		},
		onShow() {
		},
		methods: {
			tabClick(index) {
				this.active = index;
			},
			async getList() {
				const query = {
					currentPage: this.current,
					pageSize: this.size
				}
				const res = await api.inform.getAlarmTotalList(query)
				if (res) {
					this.current = res.data.current,
						this.total = res.data.total

					if (this.current == 1) {
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
			// 黑名单详情
			details_a(id) {
				uni.navigateTo({
					url: `/pages/indexpages/warning_details_black?id=${id}`
				})
			},
			// 消防预警详情
			details_b(id) {
				uni.navigateTo({
					url: `/pages/indexpages/warning_details_fire?id=${id}`
				})
			},
		},
		beforeMount() {
			this.getList()
		},
		onReachBottom() {
			this.current++;
			this.getList();
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.qh {
		display: flex;
		align-items: center;
		color: rgb(51, 51, 51);
		font-size: 32rpx;
	}

	.qh image {
		width: 20rpx;
		height: 11rpx;
		margin-left: 20rpx;
	}

	.serch {
		padding-right: 34rpx;
		line-height: 0;

		image {
			width: 30rpx;
			height: 31rpx;
		}
	}

	.tab {
		width: 100%;
		display: flex;
		background: #fff;
		align-items: center;
		// position: fixed;
		// left: 0;
		// top: 120rpx;
		z-index: 999;

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

	.conter {
		padding: 24rpx;
		box-sizing: border-box;
		padding-top: 46rpx;

		.list {
			width: 100%;

			.list_li {
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				border-radius: 6rpx;
				background: #FFFFFF;
				margin-bottom: 24rpx;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;

				.list_img {
					width: 120rpx;
					height: 120rpx;
					line-height: 0;
					margin-right: 20rpx;

					image {
						width: 120rpx;
						height: 120rpx;
						border-radius: 6rpx;
					}
				}

				.list_con {
					flex: 1;

					.list_title {
						width: 100%;
						color: #282828;
						font-size: 28rpx;
					}

					.list_time {
						width: 100%;
						color: #999999;
						font-size: 22rpx;
						margin-top: 10rpx;
					}
				}
			}
		}

		.data {
			width: 100%;
			height: 300rpx;
			background: #FFFFFF;
			margin-bottom: 24rpx;
			border-radius: 6rpx;
			position: relative;

			.data_li {
				width: 100%;
				box-sizing: border-box;
				display: -webkit-flex;
				flex-direction: column;

				.data_top {
					display: flex;
					padding: 24rpx 24rpx 0 24rpx;
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

					.data_title {
						color: #282828;
						font-size: 30rpx;
						font-weight: bold;
					}
				}

				.data_con {
					display: flex;
					justify-content: space-between;
					padding: 0 24rpx;
					padding-left: 100rpx;
					font-size: 24rpx;
					color: #656565;

					.data_type {
						color: #282828;
					}
				}

				.data_address {
					font-size: 24rpx;
					color: #656565;
					margin-top: 20rpx;
					margin-right: 20rpx;
					padding-left: 100rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.data_text {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					margin-top: 20rpx;
					border-top: 1px #e6e1e1 solid;
					padding: 20rpx 24rpx;
					padding-left: 100rpx;
					display: -webkit-flex;
					flex-direction: row;
					align-items: center;
					box-sizing: border-box;

					.texts {
						flex: 1;
						font-size: 28rpx;
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
</style>
