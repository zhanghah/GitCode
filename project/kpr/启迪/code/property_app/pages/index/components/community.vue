<template>
	<view class="community-change" @tap="changeHandler">
		<view class="mark"></view>
		<view class="name">{{community.name}}</view>
		<view class="arrow"></view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {
		name: 'Community',
		components: {},
		data() {
			return {
			}
		},
		computed: {
			...mapState([
				'community',
			]),
		},
		onLoad() {},
		methods: {
			changeHandler() {
				uni.navigateTo({
					url: `/pages/entryPages/bind/choosecom`,
				});
			},
		}
	}
</script>

<style scoped>
	.community-change {
		font-size: 30rpx;
		color: #020204;
		display: inline-flex;
		align-items: center;
		justify-content: center;

	}

	.mark {
		width: 26rpx;
		height: 32rpx;
		background: url(@/static/index/icon_mark.png) no-repeat;
		background-size: 100% 100%;
	}

	.name {
		padding: 0 14rpx;
	}

	.arrow {
		width: 24rpx;
		height: 16rpx;
		background: url(@/static/index/icon_arrow.png) no-repeat;
		background-size: 100% 100%;
	}
</style>
