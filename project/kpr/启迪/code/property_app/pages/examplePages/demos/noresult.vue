<template>
	<view class="page-example">
		<view class="components">
			<no-result message="message"></no-result>
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
