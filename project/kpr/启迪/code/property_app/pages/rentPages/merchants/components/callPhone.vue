<template>
	<view class="phone" @click="callTell">
		<view class="icon"></view>
		<view class="text">招商热线</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				data: {},
			};
		},
		props:{
			tell: {
			    type: String,
			    default: ''
			},
		},
		onLoad() {},
		methods: {
			callTell(){
				wx.makePhoneCall({
					phoneNumber: this.tell
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.phone {
		position: fixed;
		bottom: 100rpx;
		right: 25rpx;
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		background: linear-gradient(to right, #3093FF, #1B76FF);
		font-size: 24rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	
		.icon {
			background: url(../../static/rent/icon_phone.png) no-repeat center center;
			background-size: 100% 100%;
			width: 48rpx;
			height: 48rpx;
			margin-bottom: 12rpx;
		}
	}
</style>
