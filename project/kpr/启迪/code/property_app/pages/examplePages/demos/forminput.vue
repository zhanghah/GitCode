<template>
	<view class="page-example">
		<view class="components">
			<ui-form-input
				label="姓名"
				placeholder="请输入姓名"
				v-model="name"
				required
				size="large"
			></ui-form-input>

			<ui-form-input
				label="面积"
				placeholder="请输入面积"
				v-model="name"
				required
			>
				<view slot="ext">㎡</view>
			</ui-form-input>

			<ui-form-input
				label="期望每月租金"
				placeholder="请输入姓名"
				v-model="name"
				required
			>
				<view slot="ext">万元</view>
			</ui-form-input>
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
				name: '',
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
