<template>
	<view class="event-details">
		<view class="title">
			<view class="title-h3">{{detailList.title}}</view>
			<view class="title-p">活动发布时间:<text class="title-span">{{detailList.createTime|date('YYYY-MM-DD')}}</text>
			</view>
		</view>
		<!-- <image :src="`${imageView}${detailList.image}`" mode=""></image> -->
		<view class="content">
			<u-parse :html="detailList.content" class="rich-text"></u-parse>
		</view>
		<view class="box">
			<view>活 动 地 址 :{{detailList.address}}</view>
			<view>报名截止时间:{{detailList.joinEndTime | date('YYYY-MM-DD')}}</view>
			<view>活动开始时间:{{detailList.startTime | date('YYYY-MM-DD')}}</view>
			<view>活动结束时间:{{detailList.endTime | date('YYYY-MM-DD')}}</view>
			<view>参与人数:{{detailList.participants}}</view>
		</view>
		<!-- 未开始 -->
		<view v-if="detailList.onendStatus==0">
			<view class="registered">
				活动未开始
			</view>
		</view>
		<!-- 已报名 -->
		<view v-if="detailList.onendStatus==1">
			<view class="registered" v-if="detailList.join">
				已报名
			</view>
			<template v-else>
				<view class="signUp" @click="baoming">
					报名
				</view>
				<view class="model" v-if="visibility">
					<view class="signInform">
						<view class="sign">立即报名</view>
						<view class="box">
							<view>姓名:</view><input type="text" v-model="inputName" placeholder="请输入姓名">
						</view>
						<view class="box">
							<view>手机号:</view><input type="text" v-model="inputPhone" placeholder="请输入手机号">
						</view>
						<view class="box">
							<view>参加人数:</view><input type="text" v-model="inputNumber" placeholder="请输入参加人数">
						</view>
						<view class="signUp" @tap="signUps">立即报名</view>
						<view class="close" @click="close">
							<image src="../../userPages/static/btn_ljbm.png"></image>
						</view>
					</view>
				</view>
			</template>
		</view>
		<!-- 已结束 -->
		<view v-if="detailList.onendStatus==2">
			<view class="registered">
				活动已截止
			</view>
		</view>

	</view>
</template>

<script>
	import api from '@/api';
	import dayjs from 'dayjs';
	import {
		showToast
	} from '@/utils/utils.js';
	import {
		mapState
	} from 'vuex';


	export default {
		components: {
			// mainList,
		},
		data() {
			return {
				inputName: "",
				inputPhone: "",
				inputNumber: "",
				current: 0,
				visibility: false,
				detailList: {},
			}
		},

		onLoad(option) {
			this.getDetailList(option.id, option.type)
			this.typeDetail = option.type
		},
		computed: {
			...mapState(['imageView', "user", "community","myHome"]),
		},
		methods: {
			async getDetailList(id, type) {
				let res = await api.homepage.getActivityZoneInfo({
					id,
					type
				})
				this.detailList = res.data;
			},

			baoming() {
				this.visibility = true
			},
			//弹窗报名
			async signUps() {
				let params = {
					activitiesId: this.detailList.id,
					actualPeople: this.inputNumber,
					name: this.inputName,
					phone: this.inputPhone,
					userId: this.user.userId
				}
				// console.log(params)
				var reg = /^1[3456789]\d{9}$/; //电话正则
				if (!this.inputName) {
					showToast('请输入姓名')
					return
				};
				if (!this.inputPhone) {
					showToast('请输入手机号码')
					return
				};
				if (!reg.test(this.inputPhone)) {
					showToast('请输入有效的手机号码');
					return
				};
				if (!this.inputName) {
					showToast('请输入参加人数')
					return
				};
				let res = await api.homepage.postAddVoting(params)
				if (res) {
					this.visibility = false
					uni.showToast({
						duration: 1000,
						title: "报名成功"
					})
					this.getDetailList()
				}
			},
			close() {
				this.visibility = false
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '活动详情',
			});
		},
	}
</script>

<style scoped lang="less">
	.stanch {
		height: 100rpx;
	}

	.event-details {
		background: white;
		font-family: 'PingFang-SC-Bold';
		height: 100vh;
		padding: 0 28rpx;
		overflow: auto;
	}

	.title {
		margin: 20rpx 0;
		line-height: 60rpx;
	}

	.title .title-h3 {
		font-size: 36rpx;
		color: #3F3A39;
		font-weight: bold;
	}

	.title .title-p {
		font-size: 26rpx;
		margin-top: 30rpx;
		color: #999999;

		text {
			margin-left: 20rpx;
		}
	}

	image {
		width: 100%;
		height: 444rpx;
		margin-bottom: 20rpx;
	}

	.content {
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		line-height: r48px;
	}

	.box {
		margin-top: 30rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		line-height: 60rpx;
	}

	.signUp {
		margin-top: 30rpx;
		line-height: 88rpx;
		background-color: #802890;
		border-radius: 44rpx;
		text-align: center;
		color: #fff;
	}

	.registered {
		width: 703rpx;
		height: 88rpx;
		border-radius: 44rpx;
		background-color: #C3C3C3;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
		font-weight: 500;
		line-height: 88rpx;
		margin-top: 100rpx;
		padding-bottom: 50rpx;
	}

	.model {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: #00000070;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.signInform {
		width: 80%;
		background: #fff;
		border-radius: 10rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		padding: 0 40rpx;
		padding-bottom: 50rpx;
		box-sizing: border-box;

		.sign {
			width: 100%;
			line-height: 100rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			color: #3F3A39;
		}

		.box {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #f1f1f1;
		}

		.close {
			position: absolute;
			bottom: calc(20% - 35rpx);
			left: calc(50% - 35rpx);
			width: 70rpx;
			height: 70rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
