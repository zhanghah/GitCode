<template>
	<view class="page-passwd">
		<view class="title">
			设置密码
		</view>

		<view class="passwd-input">
			<ui-input
				type="password"
				placeholder="请输入6-12位的字符密码"
			>
				<view class="icon" slot="icon"></view>
			</ui-input>
		</view>

		<ui-strength></ui-strength>
	
		<view class="passwd-confirm">
			<ui-input
				type="password"
				placeholder="请确认密码"
			>
				<view class="icon" slot="icon"></view>
			</ui-input>
		</view>

		<view class="btn-wrap">
			<ui-button>确认</ui-button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
			}
		},
		methods: {
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '设置密码',
			});
		},
	}
</script>

<style scoped lang="less">
	.page-passwd {
    min-height: 100vh;
		padding: 90rpx 80rpx;
		color: #424242;
		box-sizing: border-box;
	}

	.title {
		font-size: 44rpx;
		margin-bottom: 80rpx;
	}

	.passwd-confirm {
		margin-top: 30rpx;
	}

	.icon {
		width: 29rpx;
		height: 35rpx;
		background: url(../static/login/icon_lock.png) no-repeat;
		background-size: 100% 100%;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.btn-wrap {
		margin-top: 96rpx;
	}

	
</style>
