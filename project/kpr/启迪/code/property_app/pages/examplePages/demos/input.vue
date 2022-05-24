<template>
	<view class="page-example">
		<view class="components">
			<ui-input placeholder="这是一个输入框"></ui-input>

			<ui-input placeholder="这是一个输入框" :clearable="true"></ui-input>

			<ui-input placeholder="这是一个密码输入框" type="password"></ui-input>
			

			<ui-input placeholder="这是一个输入框">
				<view class="icon" slot="icon"></view>
			</ui-input>

			<ui-input placeholder="这是一个输入框">
				<view class="pre" slot="pre">+86</view>
			</ui-input>

			<ui-input placeholder="这是一个输入框">
				<view slot="ext" class="get-code">获取验证码</view>
			</ui-input>

			<ui-input placeholder="这是一个输入框" clearable>
				<view slot="ext" class="get-code">获取验证码</view>
			</ui-input>
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
		padding: 20rpx;
		padding-bottom: 110rpx;
	}
	.icon {
		width: 29rpx;
		height: 35rpx;
		background: url(@/pages/entryPages/static/login/icon_lock.png) no-repeat;
		background-size: 100% 100%;
		flex-shrink: 0;
		flex-grow: 0;
	}
	.nav-wrap {
		background: #222;
	}
</style>
