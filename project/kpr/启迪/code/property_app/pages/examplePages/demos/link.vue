<template>
	<view class="page-example">
		<view class="components">
			<ui-link label="Link"></ui-link>

			<ui-link label="Link small" size="small"></ui-link>

			<ui-link label="Link large" size="large"></ui-link>

			<ui-link label="Link not arrow" :arrow="false"></ui-link>

			<ui-link label="Link not border" :border="false"></ui-link>
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
