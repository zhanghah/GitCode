<template>
	<view class="page-example">
		<view class="components">
			<ui-checkbox></ui-checkbox>

			<ui-checkbox v-model="checked"></ui-checkbox>

			<ui-checkbox disabled></ui-checkbox>
			<view class="label">
				选择框
			</view>
		</view>

    <view class="code">
			
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
				checked: true,
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
	.nav-wrap {
		background: #222;
	}
</style>
