<template>
	<view class="page-example">
		<view class="components">
			
			<ui-image-upload 
				target="java"
				@stateChange="stateChangeHandler"
				:params="{type: 12}"
				@success="uploadSuccessHandler"
			>
				<ui-button>上传图片到Java服务器</ui-button>
			</ui-image-upload>
			<view class="line"></view>
			<ui-image-upload 
				target="php"
				@stateChange="stateChangeHandler"
				:params="{type: 12}"
				@success="uploadSuccessHandler"
			>
				<ui-button>上传图片到PHP服务器</ui-button>
			</ui-image-upload>
		</view>

    <view class="code">
			<view>params 用于添加携带的参数</view>

			<view>@success 监听上传成功事件</view>

			<view>@stateChange 监听上传状态变化事件 waiting  pending  error  done</view>
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
			stateChangeHandler() {},
			uploadSuccessHandler() {},
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
	.line {
		height: 30rpx;
	}
	.nav-wrap {
		background: #222;
	}
</style>
