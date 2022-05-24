<template>
	<view :class="['search', `search-${align}`]">
		<view class="icon"></view>
		<view class="label">搜索商品</view>
	</view>
</template>

<script>
	export default {
    name: 'Search',
		components: {
		},
		props: {
			align: {
				type: String,
				default: 'center',
			},
		},
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style scoped lang="less">
  .search {
		height: 64rpx;
		background: #F1F1F1;
		border-radius: 32rpx;
		display: flex;
		padding: 0 25rpx;
		
		align-items: center;

		&.search-center {
			justify-content: center;
		}

		&.search-left {
			justify-content: left;
		}
	}

	.icon {
		width: 28rpx;
		height: 28rpx;
		background: url(@/static/service/icon_search.png) no-repeat;
		background-size: 100% 100%;
		margin-right: 20rpx;
	}
	.label {
		color: #999999;
		font-size: 26rpx;	
	}
</style>
