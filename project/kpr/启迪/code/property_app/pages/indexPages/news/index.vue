<template>
	<view class="page-news-index">
		<template v-if="noticeList.length>0">
			<view class="list" v-for="(item,index) in noticeList" :key="index">
				<view class="info">
					<view class="title">{{item.title}}</view>
					<view class="time">{{item.createTime|date('YYYY-MM-DD HH:mm:ss')}}</view>
					<view class="text">
						{{item.briefIntroduction}}
					</view>
				</view>
				<view class="btn" @click="detailsGo(item.id)">
					<ui-link label="点击查看详情" :border="false"></ui-link>
				</view>
			</view>
		</template>
		<no-result v-else></no-result>
	</view>
</template>


<script>
	import {
		mapState
	} from 'vuex';
	import api from "@/api"
	export default {
		data() {
			return {
				noticeList: [],
				current:1,
				size:20,
				total:0,
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '社区公告',
			});
			this.getNotices()
		},
		computed: {
			...mapState(['user', 'community'])
		},
		methods: {
			async getNotices() {
				try {
					let res = await api.homepage.getCommunityNotice({
						comId: this.community.id,
						current: this.current,
						size: this.size
					})
					this.total=res.data.total
					let newTime= Date.parse(new Date())
					res.data.records.forEach(item=>{
						if(item.dueDate-newTime>0){
							this.noticeList.push(item)
						}
					})
				} catch (err) {

				} finally {
					uni.stopPullDownRefresh();
				}
			},
			detailsGo(id) {
				uni.navigateTo({
					url: `/pages/indexPages/news/article?id=${id}`
				})
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.noticeList=[]
			this.getNotices()
		},
		// 上拉加载
		onReachBottom() {
			if (this.total > this.size * this.current) {
				this.current++;
				this.getNotices()
			} else {
				uni.showToast({
					title: '已经全部加载'
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	view,
	text {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.page-news-index {
		min-height: 100vh;
		// padding-bottom: 108rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;

		.list:nth-child(n+1) {
			padding-bottom: 0rpx;
		}
	}

	.list {
		padding: 30rpx 24rpx;

		.info {
			border-radius: 12rpx 12rpx 0rpx 0rpx;
			background-color: #fff;
			padding: 30rpx 23rpx;
			color: #7A7A7C;
			font-size: 28rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid rgba(239, 237, 236, 1);

			.title {
				font-size: 30rpx;
				color: #020204;
			}

			.time {
				font-size: 24rpx;
				color: #9E9E9E;
				padding: 14rpx 0rpx 28rpx 0rpx;
			}

			.text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.btn {
				border-radius: 0rpx 0rpx 12rpx 12rpx;
			}
		}
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
	}
	
</style>
