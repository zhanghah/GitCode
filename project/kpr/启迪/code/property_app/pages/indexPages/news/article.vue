<template>
	<view class="page-news-article">
		<view class="content" v-if="detailList">
			<view class="title">{{detailList.title}}</view>
			<view class="time">{{detailList.createTime|date('YYYY-MM-DD HH:mm:ss')}}</view>
			<view class="label">
				<u-parse :html="detailList.content"></u-parse>
			</view>
			<view class="img" v-if="detailList.platform == 1">
				<!-- <image :src="`${imageView}${detailList.filePath}`" mode="widthFix"></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/api"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				detailList: {},
			}
		},
		computed: {
			...mapState(['user','imageView']),
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '消息详情',
			});
		},
		onLoad(option) {
			this.getNoticeInfo(option.id)
		},
		methods: {
			async getNoticeInfo(id) {
				let res = await api.homepage.getNoticeInfo({
					id:id
				})
				console.log(res)
				this.detailList = res.data
			},
		}
	}
</script>

<style lang="less" scoped>
	.age-news-article {
		min-height: 100vh;
		box-sizing: border-box;
	}

	.content {
		padding: 30rpx;

		.title {
			font-size: 32prx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #020204;
		}

		.time {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #9e9e9e;
			padding: 18rpx 0rpx 39rpx;
		}

		.label {
			width: 100%;
		}
		.img {
			width: 100%;
			image {
				width: 100%;
			}
		}
	}
</style>
