<template>
	<view class="page-shuidian-index">
		<view class="tab">
			<view :class="{ active: active == 0 }" @click="handelTab('WATER')">
				通水
			</view>
			<view :class="{ active: active == 1 }" @click="handelTab('ELECTRICITY')">
				通电
			</view>
		</view>
		<template v-if="dataList.length>0">
			<view class="content" v-for="(item,index) in dataList" :key="index"
				@tap="toShuiDetail(item.id,applicationType)">
				<view class="home-info">
					<view class="home-name">
						房屋：{{item.roomName}}
					</view>
					<view class="status-shz" v-if="item.applicationStatus==1">
						审核中
					</view>
					<view class="status-success" v-if="item.applicationStatus==2">
						审核通过
					</view>
					<view class="status-fail" v-if="item.applicationStatus==3">
						审核失败
					</view>
				</view>
				<view class="create-time">
					{{item.createTime | date('YYYY-MM-DD HH:mm')}}
				</view>
				<view class="name">
					<text class="tit">联系人:</text>
					<text class="txt">{{item.name}}</text>
					<text class="txt">{{item.phone}}</text>
				</view>

				<view class="yuyue-time">
					<text>预约开通时间：</text>
					<text class="time">{{item.startTime}}</text>
				</view>
			</view>
		</template>
		<no-result v-else></no-result>
	</view>
</template>

<script>
	import api from '@/api';
	export default {
		data() {
			return {
				active: 0,
				applicationType: 'WATER',
				current: 1,
				size: 10,
				total:0,
				dataList: [],
			}
		},
		methods: {
			handelTab(val) {
				console.log(val)
				if (val == 'WATER') {
					this.active = 0;
					this.applicationType = 'WATER';
					this.dataList = [];
					this.getRcord()
				} else {
					this.active = 1;
					this.applicationType = 'ELECTRICITY';
					this.dataList = [];
					this.getRcord()
				}
			},

			// 详情
			toShuiDetail(val, type) {
				uni.navigateTo({
					url: `xq/shui?id=${val}&type=${type}`
				})
			},
			// 获取通水通电记录
			async getRcord() {
				try {
					const query = {
						applicationType: this.applicationType,
						current: this.current,
						size: this.size
					};
					const res = await api.my.waterAndElectricityRecord(query);
					if (res.status != '0') {
						return
					};
					this.total = res.data.total
					res.data.records.forEach(item => {
						this.dataList.push(item)
					})
				} catch (err) {
					// 
				} finally {
					uni.stopPullDownRefresh();
				}

			},

		},
		// 下拉刷新
		onPullDownRefresh() {
			this.dataList = []
			this.getRcord()
		},
		// 上拉加载
		onReachBottom() {
			if (this.total > this.size * this.current) {
				this.current++;
				this.getRcord()
			} else {
				uni.showToast({
					title: '已经全部加载'
				})
			}
		},
		mounted() {
			this.getRcord()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '通水通电记录'
			})
		}
	}
</script>

<style lang="less" scoped>
	.page-shuidian-index {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}

	.tab {
		color: #333333;
		font-size: 26rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		margin: 15rpx 30rpx;

		view {
			margin-right: 40rpx;
		}

		.active {
			color: #802890;
			font-size: 36rpx;
		}
	}

	.content {
		margin: 20rpx 28rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
		border-radius: 10rpx;

		.home-info {
			display: flex;
			justify-content: space-between;

			.home-name {
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				color: #333333;
				font-size: 30rpx;
				font-weight: bold;
			}

			.status-shz {
				flex-shrink: 0;
				color: #FF884D;
				font-size: 28rpx;
			}

			.status-success {
				flex-shrink: 0;
				color: #333333;
				font-size: 28rpx;
			}

			.status-fail {
				flex-shrink: 0;
				color: #F05050;
				font-size: 28rpx;
			}
		}

		.create-time {
			color: #999999;
			font-size: 24rpx;
			margin: 20rpx 0;
		}

		.describe {
			color: #333333;
			font-size: 28rpx;

			text {
				color: #999999;
				line-height: 48rpx;
			}
		}

		.name {
			color: #999999;
			font-size: 28rpx;
			margin-bottom: 20rpx;

			.tit {
				margin-right: 10rpx;
			}

			.txt {
				margin-right: 20rpx;
				color: #333333;
			}
		}

		.yuyue-time {
			color: #999999;
			font-size: 28rpx;

			text {
				margin-right: 10rpx;

			}

			.time {
				color: #333333;
			}
		}
	}
</style>
