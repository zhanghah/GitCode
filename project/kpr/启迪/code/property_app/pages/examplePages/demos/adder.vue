<template>
	<view class="page-example">
		<view class="components">
			<ui-adder v-model="number"></ui-adder>
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
				number: 1,
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
