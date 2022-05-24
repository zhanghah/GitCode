<template>
	<view class="page-venue-index">
		<template v-if="list.length">
			<view class="content" v-for="(item,index) in list" :key="index" @tap="toVenueDetail(item.id)">
				<view class="home-info">
					<view class="home-name">
						工单编号：{{item.orderNumber}}
					</view>
					<view class="status-shz" v-if="item.orderStatus==1">
						待处理
					</view>
					<view class="status-success" v-if="item.orderStatus==2">
						预约成功
					</view>
					<view class="status-fail" v-if="item.orderStatus==3">
						预约失败
					</view>
				</view>
				<view class="create-time">
					{{item.createTime |date('YYYY-MM-DD HH:mm:ss')}}
				</view>
				<view class="venue-name">
					场馆名称：{{item.name}}
				</view>
				<view class="name">
					<text class="tit">联系人:</text>
					<text class="txt">{{item.contacts}}</text>
					<text class="txt">{{item.phone}}</text>
				</view>

				<view class="yuyue-time">
					<text>预约开通时间：</text>
					<text class="time">{{item.time}}</text>
				</view>
			</view>
		</template>
		<no-result v-else message="暂无场馆预约记录~"></no-result>
	</view>
</template>

<script>
	import api from '@/api'
	export default {
		data() {
			return {
				current: 1,
				size: 10,
				total:0,
				list: [],
			}
		},
		methods: {
			toVenueDetail(id) {
				uni.navigateTo({
					url: `xq/index?id=${id}`
				})
			},
			// 获取场馆预约记录
			async getVenueRecord() {
				try{
					const query = {
						current: this.current,
						size: this.size
					}
					const res = await api.my.venueRecord(query)
					if(res){
						this.total = res.data.total
						res.data.records.forEach(item => {
							this.list.push(item)
						})
					}
				}catch(e){
					//TODO handle the exception
				}finally{
					uni.stopPullDownRefresh()
				}
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.list = []
			this.getVenueRecord()
		},
		// 上拉加载
		onReachBottom() {
			if (this.total > this.size * this.current) {
				this.current++;
				this.getVenueRecord()
			} else {
				uni.showToast({
					title: '已经全部加载'
				})
			}
		},
		mounted() {
			this.getVenueRecord()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '场馆预约记录'
			})
		}
	}
</script>

<style lang="less" scoped>
	.page-venue-index {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
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

		.venue-name {
			color: #999999;
			margin-bottom: 20rpx;
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
