<template>
	<view class="page">
		<view class="top">
			<view class="nav_box" v-for="(item,index) in tabs" :key="index">
				<view :class="['nav',{active:active==item.key}]" @tap="handActive(item.key)">{{item.label}}</view>
			</view>
		</view>

		<view class="activity_wrap" v-if="cardList.length>0">
			<scroll-view scroll-y="true" class="activity_scroll_list">
				<view class="list_item" v-for="(item,index) in cardList" :key="index">
					<view class="item_img">
						<image :src="`${imageView}${item.image}`" mode=""></image>
					</view>
					<view class="item_infos">
						<view class="infos_title">{{item.title}}</view>
						<view class="infos_time">活动截止时间：{{item.endTime|date('YYYY-MM-DD')}}</view>
						<view class="infos_btn" @click="activityJump(item.id,item.type)">去看看</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<no-result v-else></no-result>
	</view>
</template>
<script>
	import dayjs from 'dayjs'
	import {
		mapState
	} from 'vuex';
	import api from "@/api"
	export default {
		name: 'MyActivity',
		data() {
			return {
				size: 20,
				total: 0,
				current: 1,
				tabs: [
					{
						key: 'tp',
						label: '互动投票'
					},
					{
						key: 'sq',
						label: '社区活动'
					},
					{
						key: 'bm',
						label: '报名活动'
					},
				],
				cardList: [],
				timeDate: "",
				active: 'tp',
				//tab接口type切换
				typeDetail: 0,
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.cardList = []
			this.getVotingActivity()
		},
		// 上拉加载
		onReachBottom() {
			if (this.total > this.size * this.current) {
				this.current++;
				this.getVotingActivity()
			} else {
				uni.showToast({
					title: '已经全部加载'
				})
			}
		},
		mounted() {
			this.getVotingActivity()
		},
		computed: {
			...mapState(['imageView', 'user', 'community']),
			myhouse() {
				let list=[]
				uni.getStorageSync('my_house').forEach(item=>{
					list.push(item.buildingId)
				})
				return list
			}
		},

		methods: {
			// 获取资源
			async getVotingActivity() {
				try {
					const query={
						type: this.typeDetail,
						size: this.size,
						current: this.current,
						buildIds: this.myhouse.join(',')
					}
					console.log(query)
					let res = await api.homepage.getActivityZonePage(query)
					// 总条数
					this.total = res.data.total
					res.data.records.forEach(item => {
						this.cardList.push(item)
					})
				} catch (err) {

				} finally {
					uni.stopPullDownRefresh();
				}

			},
			handActive(e) {
				this.cardList = [];
				this.current = 1;
				if (e == "tp") {
					this.active = "tp"
					this.typeDetail = 0
				}
				if (e == "sq") {
					this.active = "sq"
					this.typeDetail = 1
				}
				if (e == "bm") {
					this.typeDetail = 2
					this.active = "bm"
				}
				this.getVotingActivity()
				this.curIndex = e;
			},
			activityJump(id, type) {
				if (type != 2) {
					//投票
					uni.navigateTo({
						url: `/pages/servicePages/communication/eventDetails?id=${id}&type=${type}`,
					});
				}
				if (type == 2) {
					//报名
					uni.navigateTo({
						url: `/pages/servicePages/communication/mjActivities?id=${id}&type=${type}`,
					});
				}

			},
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '小区交流',
			});
		},
	}
</script>
<style lang="less" scoped>
	.page {
		min-height: 100vh;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.top {
		position: fixed;
		top: var(--window-top);
		z-index: 99;
		width: 100%;
		height: 100rpx;
		display: flex;
		background-color: #FFFFFF;
		justify-content: space-around;
		align-items: center;

		.nav {
			padding-bottom: 12rpx;

			&.active {
				color: #802890;
				font-size: 30rpx;
				border-bottom: 2px solid #802890;

			}
		}
	}

	.activity_wrap {
		margin-top: 100rpx;
	}

	.box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 1000rpx;
		color: #999999;
	}

	.activity_scroll_list {
		width: 100%;
		padding: 24rpx 22rpx 20rpx;
		background-color: #f5f5f5;
		box-sizing: border-box;
	}

	.list_item {
		height: 475rpx;
		width: 100%;
		border-radius: 10rpx;
		background-color: #fff;
		margin-bottom: 24rpx;

		.item_img {
			width: 100%;
			height: 338rpx;

			image {
				width: 702rpx;
				height: 338rpx;
			}
		}

		.item_infos {
			position: relative;
			left: 0;
			top: 0;
			height: 137rpx;

			.infos_title {
				position: absolute;
				top: 24rpx;
				left: 23rpx;
				font-size: 34rpx;
				width: 500rpx;
				height: 40rpx;
				overflow: hidden;
				font-family: PingFang SC;
				font-weight: bold;
				color: #3F3A39;
			}

			.infos_time {
				position: absolute;
				bottom: 27rpx;
				left: 23rpx;
				max-height: 320rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}

			.infos_btn {
				position: absolute;
				bottom: 27rpx;
				right: 24rpx;
				width: 117rpx;
				height: 46rpx;
				border: 1rpx solid #F05050;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 4rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #F05050;
			}
		}
	}

	.load-box {
		// margin-top: 100rpx;
	}
</style>
