<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			申请详情
		</nav-bar-new>
		<view class="conter">
			<view class="info">
				<view class="info_img">
					<image src="/static/trade/apply2.png" mode=""></image>
				</view>
				<view class="info_con">
					<view class="con_name">{{info.sponsor?info.sponsor:'暂无'}}</view>
					<view class="con_post">{{info.build}}</view>
				</view>
				<view class="info_active">
					<view :class="info.conveneStatus == 0?'active_a':'active_b'">{{info.conveneStatus == 0?'投票中':info.conveneStatus == 1?'投票结束':'已过期'}}</view>
				</view>
			</view>
			<view class="title">{{info.name}}</view>
			<view class="time">
				<image src="/static/trade/apply3.png" mode=""></image>
				发起时间 {{info.time}}
			</view>
			<view class="textcon">
				{{info.content}}
			</view>
			
			<view class="data_than">
				<view class="than_title">
					<view class="than_refuse">
						<text class="text_a">{{info.disAgree}}</text><text class="text_b">票</text>拒绝
					</view>
					<view class="than_agree">
						同意<text class="text_a">{{info.agree}}</text><text class="text_b">票</text>
					</view>
				</view>
				<view class="billie">
					<view class="speed" :style="{width:info.billie+'%'}">
						<view class="speed_img">
							<image src="/static/trade/home11.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="btngroup">
				<view class="stay" v-if="info.conveneStatus == 0 && info.isVote == 0">
					<view class="stay_yes" @tap="vote(0)">同意召开</view>
					<view class="stay_no" @tap="vote(1)">拒绝召开</view>
				</view>
				<view class="agree" v-if="info.isVote == 1 && info.type == 0">您已同意召开</view>
				<view class="refuse" v-if="info.isVote == 1 && info.type == 1">您已拒绝召开</view>
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
				const res = await api.trade.meetingDetails(param)
				if (res) {
					this.info = res.data;
					this.info.billie = parseInt((this.info.disAgree / (this.info.disAgree + this.info.agree)) * 100);
				}
			},
			// 投票
			async vote(type) {
				var param = {
					rsPropMeetingId:this.id,
					type: type,
				}
				const res = await api.trade.addVote(param)
				if (res) {
					setTimeout(() => {
						this.$toast(res.msg);
					},200);
					setTimeout(() => {
						this.getDetails();
					},1800);
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
		margin-bottom: 60rpx;
	}
	.data_than {
		width: 100%;
		background: #F8F8F8;
		border-radius: 10rpx;
		padding: 30rpx 24rpx 50rpx 24rpx;
		box-sizing: border-box;
		margin-bottom: 70rpx;
		.than_title {
			width: 100%;
			display: -webkit-flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.than_refuse {
				color: #282828;
				font-size: 24rpx;
				.text_a {
					color: #C6AA6B;
					font-size: 36rpx;
					font-weight: bold;
				}
				.text_b {
					color: #C6AA6B;
					font-size: 22rpx;
					font-weight: bold;
					margin-right: 15rpx;
				}
			}
			.than_agree {
				color: #282828;
				font-size: 24rpx;
				.text_a {
					color: #7F298E;
					font-size: 36rpx;
					font-weight: bold;
					margin-left: 15rpx;
				}
				.text_b {
					color: #7F298E;
					font-size: 22rpx;
					font-weight: bold;
				}
			}
		}
		.billie {
			width: 100%;
			height: 10rpx;
			border-radius: 8rpx;
			background: #7F298E;
			position: relative;
			.speed {
				height: 10rpx;
				border-radius: 8rpx;
				background: #C6AA6B;
				position: absolute;
				.speed_img {
					width: 40rpx;
					height: 40rpx;
					line-height: 0;
					position: absolute;
					top: -15rpx;
					right: -20rpx;
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
	.btngroup {
		width: 100%;
		.stay {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			.stay_yes {
				flex: 1;
				height: 88rpx;
				background: #7F298E;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				font-size: 32rpx;
				border-radius: 10rpx;
				margin-right: 22rpx;
			}
			.stay_no {
				flex: 1;
				height: 88rpx;
				background: #C6AA6B;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				font-size: 32rpx;
				border-radius: 10rpx;
			}
		}
		.agree {
			width: 100%;
			height: 88rpx;
			background: rgba(127, 41, 142, 0.1);
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			color: #7F298E;
			font-size: 32rpx;
			border-radius: 10rpx;
		}
		.refuse {
			width: 100%;
			height: 88rpx;
			background: rgba(198, 170, 107, 0.1);
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			color: #C6AA6B;
			font-size: 32rpx;
			border-radius: 10rpx;
		}
	}
}
</style>
