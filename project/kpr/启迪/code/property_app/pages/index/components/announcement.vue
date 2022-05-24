<template>
	<view class="announcement">
		<view class="icon"></view>
		<!-- <view class="content">{{first.title}}</view> -->
		<swiper class="content" vertical="true" autoplay="true" circular="true" interval="3000">
			<swiper-item v-for="(item, index) in source" :key="index">
				{{item.title}}
			</swiper-item>
		</swiper>
		<view class="arrow"></view>
	</view>
</template>

<script>
	export default {
		name: 'Announcement',
		components: {},
		props: {
			source: {
				type: Array,
				default () {
					return [];
				},
			},
		},
		computed: {
			first() {
				if (this.source.length > 0) {
					return this.source[0];
					console.log(this.source)
				}

				return {};
			},
		},
		data() {
			return {}
		},
		onLoad() {},
		methods: {}
	}
</script>

<style scoped>
	.announcement {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #3F3A39;
		padding: 30rpx 24rpx;
	}

	.announcement .icon {
		width: 137rpx;
		height: 32rpx;
		background: url(@/static/index/announcement.png) no-repeat;
		background-size: 100% 100%;
		margin-right: 27rpx;
		flex-grow: 0;
		flex-shrink: 0;
	}

	.announcement .content {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 27rpx;
		line-height: 27rpx;
		font-size: 28rpx;
	}

	.announcement .arrow {
		background: url(@/static/index/icon_arrow_right.png) no-repeat;
		background-size: 100% 100%;
		width: 30rpx;
		height: 30rpx;
		flex-grow: 0;
		flex-shrink: 0;
	}
</style>
