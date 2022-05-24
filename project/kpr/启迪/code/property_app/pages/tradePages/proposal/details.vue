<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			物业建议详情
		</nav-bar-new>
		<view class="conter">
			<view class="info">
				<view class="info_img">
					<image src="/static/trade/apply2.png" mode=""></image>
				</view>
				<view class="info_con">
					<view class="con_name">{{info.createBy}}</view>
					<view class="con_post">{{info.createTime}}</view>
				</view>
			</view>
			<view class="title">{{info.title}}</view>
			<view class="textcon">
				{{info.content}}
			</view>
		</view>
		<view class="ash"></view>
		<view class="reply">
			<view class="reply_title">物业回复</view>
			<view class="reply_time">{{info.replyTime}}</view>
			<view class="reply_con" v-if="info.replyState == 1">
				{{info.replyContent}}
			</view>
			<view class="nothing" v-if="info.replyState == 0">
				<image src="/static/trade/nothing.png" mode=""></image>
				暂无回复，请耐心等待哦~
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	
	export default {
		data() {
			return {
				id: '',
				info: {},
			}
		},
		onLoad(options) {
			if(options.id) {
				this.id = options.id;
				this.getDetails();
			}
		},
		methods: {
			// 获取详情
			async getDetails() {
				var param = {
					id:this.id,
				}
				const res = await api.trade.proposeDetails(param)
				if (res) {
					this.info = res.data;
				}
			},
		}
	}
</script>

<style lang="less">
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.info {
		width: 100%;
		display: -webkit-flex;
		flex-direction: row;
		margin-bottom: 30rpx;
		.info_img {
			width: 80rpx;
			height: 80rpx;
			line-height: 0;
			margin-right: 16rpx;
			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
		.info_con {
			flex: 1;
			.con_name {
				width: 100%;
				color: #282828;
				font-size: 28rpx;
				font-weight: bold;
				margin-bottom: 2rpx;
			}
			.con_post {
				width: 100%;
				color: #999999;
				font-size: 20rpx;
			}
		}
		.info_active {
			display: -webkit-flex;
			align-items: center;
			margin-left: 20rpx;
			.active_a {
				background: rgba(127, 41, 142, 0.1);
				border-radius: 30rpx;
				color: #7F298E;
				font-size: 26rpx;
				padding: 10rpx 20rpx;
			}
			.active_b {
				background: #F5F5F5;
				border-radius: 30rpx;
				color: #B5B5B5;
				font-size: 26rpx;
				padding: 10rpx 20rpx;
			}
		}
	}
	.title {
		width: 100%;
		color: #282828;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		line-height: 60rpx;
	}
	.time {
		width: 100%;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
		color: #999999;
		font-size: 26rpx;
		margin-bottom: 42rpx;
		image {
			width: 25rpx;
			height: 25rpx;
			margin-right: 10rpx;
		}
	}
	.textcon {
		width: 100%;
		white-space:normal;
		word-break:break-all;
		color: #656565;
		font-size: 28rpx;
		line-height: 50rpx;
		padding-bottom: 15rpx;
	}
}
.ash {
		width: 100%;
		height: 20rpx;
		background: #F5F5F5;
	}
	.reply {
		padding: 24rpx;
		box-sizing: border-box;
		.reply_title {
			width: 100%;
			color: #282828;
			font-size: 28rpx;
			font-weight: bold;
		}
		.reply_time {
			width: 100%;
			color: #999999;
			font-size: 20rpx;
		}
		.reply_con {
			color: #656565;
			font-size: 28rpx;
			line-height: 50rpx;
			padding-top: 30rpx;
		}
		.nothing {
			padding: 40rpx 0;
		}
	}
</style>
