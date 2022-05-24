<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			线上业主大会
		</nav-bar-new>
		<view class="conter">
			<view class="title">{{info.title}}</view>
			<view class="lable">
				<view class="lable_li" v-if="info.voteRangeType == 0">全部楼栋</view>
				<view class="lable_li" v-if="info.voteRangeType == 1" v-for="(item,index) in info.builds" :key="index">
					{{item}}
				</view>
			</view>
			<view class="time">
				<image src="/static/trade/online1.png" mode=""></image>
				投票结束时间 {{info.endTime}}
			</view>
			<view class="textcon">
				{{info.rsPropMeeting}}
			</view>

			<view class="vote">
				<view class="vote_title">
					管理措施<text>({{info.voteType == 0?'单选':'多选'}})</text>
				</view>
				<view class="radio">
					<view class="radio_ul" v-if="info.isVote == 0">
						<view :class="['label',{'cor':item.check}]" v-for="(item,index) in typeList" :key="index"
							@tap="typeChange(index)">
							<view class="vote_set">
								<image src="/static/trade/cheno.png" mode="" v-if="!item.check"></image>
								<image src="/static/trade/cheyes.png" mode="" v-else></image>
							</view>
							<view class="vote_name">
								{{item.name}}
							</view>
						</view>
					</view>

					<view class="radio_ul" v-if="info.isVote == 1">
						<view class="label" v-for="(item,index) in typeList" :key="index">
							<view class="vote_set">
								<image src="/static/trade/cheno.png" mode="" v-if="item.isChoice == 0"></image>
								<image src="/static/trade/cheout.png" mode="" v-if="item.isChoice == 1"></image>
							</view>
							<view class="vote_name">
								{{item.name}}
							</view>
							<view class="vote_num">
								{{item.num}}票
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="btngroup">
				<view class="agree" v-if="info.listType == 0 && info.isVote == 0" @tap="vote">确认投票</view>
				<view class="refuse" v-if="info.isVote == 1">您已投票</view>

				<view class="refuse" v-if="info.listType == 1 && info.isVote == 0">投票结束</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';

	export default {
		data() {
			return {
				typeList: [],
				id: '',
				info: {},
				timer: null
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.getDetails();
			}
		},
		methods: {
			typeChange(index) {
				if (this.info.voteType == 0) {
					// 单选
					this.typeList.forEach((item, key) => {
						if (index == key) {
							item.check = true;
						} else {
							item.check = false;
						}
					});
				} else {
					// 多选
					this.typeList[index].check = !this.typeList[index].check;
				}
			},
			// 获取详情
			async getDetails() {
				var param = {
					id: this.id,
				}
				const res = await api.trade.getVoteDetail(param)
				if (res) {
					this.info = res.data;
					this.typeList = [];
					res.data.detailVOS.forEach((item, index) => {
						var obj = {
							name: item.optionName,
							value: item.rsAssemblyVoteOptionsId,
							num: item.numberOfVotes,
							isChoice: item.isChoice,
							check: false,
						}
						this.typeList.push(obj);
					});
				}
			},
			// 投票
			vote() {
				var option = this.typeList.filter((m) => m.check);
				if (option.length == 0) {
					this.$toast('请选择选项');
					return false;
				}
				var param = {
					optionIds: option.map((m) => m.value),
				}
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(async () => {
					const res = await api.trade.lineVote(param)
					if (res) {
						this.$toast('投票成功');
						this.getDetails();
					}
				}, 1000)
			},
		}
	}
</script>

<style lang="less">
	.conter {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;

		.title {
			width: 100%;
			color: #282828;
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			line-height: 60rpx;
		}

		.lable {
			width: 100%;
			display: -webkit-flex;
			margin-bottom: 20rpx;

			.lable_li {
				color: #7F298E;
				font-size: 26rpx;
				background: rgba(127, 41, 142, 0.1);
				border-radius: 6rpx;
				padding: 6rpx 15rpx;
				margin-right: 10rpx;
				margin-bottom: 10rpx;
			}
		}

		.time {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			color: #C6AA6B;
			font-size: 26rpx;
			margin-bottom: 24rpx;

			image {
				width: 25rpx;
				height: 25rpx;
				margin-right: 10rpx;
			}
		}

		.textcon {
			width: 100%;
			white-space: normal;
			word-break: break-all;
			color: #656565;
			font-size: 28rpx;
			line-height: 50rpx;
			margin-bottom: 60rpx;
		}

		.btngroup {
			width: 100%;

			.agree {
				width: 100%;
				height: 88rpx;
				background: #7F298E;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				font-size: 32rpx;
				border-radius: 10rpx;
			}

			.refuse {
				width: 100%;
				height: 88rpx;
				background: #F5F5F5;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				color: #B5B5B5;
				font-size: 32rpx;
				border-radius: 10rpx;
			}
		}

		.vote {
			width: 100%;
			background: #F8F8F8;
			border-radius: 6rpx;
			padding: 28rpx 24rpx;
			box-sizing: border-box;
			margin-bottom: 60rpx;

			.vote_title {
				width: 100%;
				color: #333333;
				font-size: 30rpx;
				margin-bottom: 24rpx;

				text {
					color: #999999;
					font-size: 26rpx;
					margin-left: 2rpx;
				}
			}

			.radio {
				width: 100%;
				margin-bottom: 25rpx;

				.radio_ul {
					width: 100%;

					.label {
						width: 100%;
						margin-bottom: 24rpx;
						display: -webkit-flex;
						align-items: center;
						flex-direction: row;

						.vote_set {
							width: 30rpx;
							height: 30rpx;
							line-height: 0;
							margin-right: 15rpx;

							image {
								width: 30rpx;
								height: 30rpx;
							}
						}

						.vote_name {
							flex: 1;
							color: #999999;
							font-size: 28rpx;
							white-space: normal;
							word-break: break-all;
						}

						.vote_num {
							color: #C6AA6B;
							font-size: 28rpx;
						}

						radio {
							transform: scale(0.77);
						}
					}

					.cor {
						color: #7F298E;
					}
				}
			}
		}
	}
</style>
