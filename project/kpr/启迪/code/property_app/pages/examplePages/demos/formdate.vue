<template>
	<view class="page-example">
		<view class="components">
			<ui-form-date
				label="日期"
				placeholder="请选择"
				@change="changeHandler"
				required
			></ui-form-date>
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
			}
		},
		computed: {
			...mapState([
				'community',
				'user',
			]),
		},
		methods: {
			changeHandler() {},
		},
		onLoad() {
			
		},
		onUnload() {
		}
	}
</script>

<style scoped>
	.page-example {
		padding-bottom: 110rpx;
	}
	.nav-wrap {
		background: #222;
	}
</style>
