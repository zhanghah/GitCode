<template>
	<view class="news-details">
		<view class="title">
			<h3>{{detailList.title}}</h3>
			<view class="title-item">
				<text class="title-item-time">{{detailList.createTime|date('YYYY-MM-DD')}}</text>
			</view>
		</view>
		<image mode="aspectFill" :src="`${imageView}${detailList.image}`"/>
		<view class="content">
			<u-parse :html="detailList.details"></u-parse>
		</view>

	</view>
</template>

<script>
	// import mainList from './components/mainList.vue';
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			// mainList,
		},
		data() {
			return {
				detailList:"",
				current: 0,
			}
		},
		onLoad(option) {
			console.log(222, option)
			this.getNewsGetInfo(option.id)
		},
		computed: { 
			...mapState(['user', 'community', 'imageView'])
		},
		methods: {
			async getNewsGetInfo(id) {
				let res = await api.find.getNewsGetInfo({
					id,
					propertyId: this.user.propertyId,
				})
				console.log(1, res)
				this.detailList=res.data
			},

			getNum(index) {
				this.current = index;
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '新闻详情',
			});
		},
	}
</script>

<style scoped lang="less">
	.title-item{
		display: flex;
		justify-content: space-between;
		.title-item-time{
			color: #9E9E9E;
			font-size: 24rpx;
			line-height: 25rpx;
		}
	}
	.news-details {
		background: white;
		font-family: 'PingFang-SC-Bold';
		height: 100vh;
		padding: 0 28rpx;
		overflow: auto;
	}

	.title h3 {
		font-size: 36rpx;
		margin: 36rpx 0;
	}

	.title p {
		font-size: 24pxrpx;
		color: #9E9E9E;
		margin: 36rpx 0;

		text {
			margin-left: 50rpx;
		}
	}

	.content {
		color: #7A7A7C;
		font-size: 30rpx;
	}

	image {
		width: 100%;
		height: 460rpx;
		margin: 30rpx 0;
	}
</style>
