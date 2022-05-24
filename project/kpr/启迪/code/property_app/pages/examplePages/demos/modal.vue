<template>
	<view class="page-example">
		<view class="components">
			<ui-button @tap="visible = true">显示弹窗</ui-button>
			<ui-modal v-model="visible" @close="closeHandler">
				<view v-for="i in 100" :key="i">这个是内容{{i}}</view>
			</ui-modal>
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
				visible: false,
			}
		},
		computed: {
			...mapState([
				'community',
				'user',
			]),
		},
		methods: {
			closeHandler() {}
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
