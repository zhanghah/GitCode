<template>
	<view class="page-example">
		<view class="components home-ad">
			<ad-block type="1"></ad-block>
		</view>

    <view class="code">
			<view>// 未传type的情况下将使用source作为数据源</view>

			<view>// 有type将主动拉取对应类型数据</view>
    </view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		components: {
		},
		data() {
			return {
			}
		},
		computed: {
			...mapState([
				'community',
				'user',
			]),
		},
		methods: {
     
		},
		onLoad() {
			
		},
		onUnload() {
		}
	}
</script>

<style scoped>
	.page-example {
		padding: 20rpx;
		padding-bottom: 110rpx;
	}
	.home-ad {
		width: 100%;
		height: 340rpx;
  }
	.nav-wrap {
		background: #222;
	}
</style>
