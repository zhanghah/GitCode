<template>
	<view class="page-example">
		<view class="components">
			<ui-form-picker
				label="选择器"
				placeholder="请选择"
				:range="[{ label: 'selectval1', key: '1' }, { label: 'selectval2', key: '2' }]"
				@change="changeHandler"
				:required="true"
			></ui-form-picker>
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
			changeHandler() {}
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
