<template>
	<view class="page-example">
		<view class="components">
			<ui-strength v-model="pwd1"></ui-strength>

			<ui-strength v-model="pwd2"></ui-strength>

			<ui-strength v-model="pwd3"></ui-strength>
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
				pwd1: '123',
				pwd2: '123ABC',
				pwd3: '123ABC~~',
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
