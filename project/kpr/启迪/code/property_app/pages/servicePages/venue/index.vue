<template>
	<view class="page-venue-index">
		<view class="content" v-if="venueData.length">
			<view class="venue" @tap="toDetail(item.id)" v-for="(item,index) in venueData" :key="index">
				<view class="venue-img">
					<image :src="`${imageView}${item.pictures}`" mode=""></image>
				</view>
				<view class="venue-info">
					<view class="venue-name">
						{{item.name}}
					</view>
					<view class="type">
						{{item.type}}
					</view>
					<view class="open-time">
						开放时间：{{item.openTime}}
					</view>
				</view>
			</view>
		</view>
		<no-result></no-result>
	</view>
</template>

<script>
	import api from '@/api';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				current: 1,
				size: 10,
				venueData: []
			}
		},
		computed:{
			...mapState(['user','imageView'])
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: `./detail?id=${id}`
				})
			},
			// 获取场馆分页列表数据
			async getVenueData() {
				const res = await api.service.getVenuePage({
					current: this.current,
					size: this.size
				})
				if (res.status != '0') {
					return
				};
				this.venueData = res.data.records
				console.log(this.venueData)
			},
		},
		mounted() {
			this.getVenueData()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '场馆预定',
			});
		},
	}
</script>

<style lang="less" scoped>
	.page-venue-index {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}

	.content {
		width: 100%;
		height: calc(100vh - 20rpx);
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 30rpx;

		.venue {
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1rpx #E6E6E6 solid;

			.venue-img {
				width: 200rpx;
				height: 200rpx;
			}

			.venue-info {
				color: #333333;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;

				.venue-name {
					font-size: 38rpx;
					font-weight: bold;

				}

				.type {
					color: #999999;
					font-size: 28rpx;
					margin: 25rpx 0;
				}

				.open-time {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
