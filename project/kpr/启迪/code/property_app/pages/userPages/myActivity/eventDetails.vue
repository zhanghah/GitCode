<template>
	<view class="event-details">
		<view class="title">
			<view class="title-tit">{{detailList.title}}</view>
			<u-parse :html="detailList.content" :lazy-load="true"></u-parse>
			<text>活动发布时间:</text><text style="margin-left: 10rpx;">{{detailList.createTime|date('YYYY-MM-DD')}}</text>
		</view>
		<view class="title-img">
			<!-- <image :src="`${imageView}${detailList.image}`" mode=""></image> -->
		</view>
		<!-- 投票活动 -->
		<view class="" v-if="typeDetail==0">
			<view class="rule">
				<h5>投票规则：</h5>
				<p>1.每个微信仅能投票一次</p>
				<p>2.投票截止时间:{{detailList.endTime|date('YYYY-MM-DD HH:mm:ss')}}</p>
				<p>严禁刷票,一经发现将取消资格</p>
			</view>
			<!-- 活动未开始 -->
			<view v-if="onendStatus==0">
				<view class="hove-vote">活动未开始</view>
			</view>
			<!-- 活动进行中 -->
			<view v-if="onendStatus==1">
				<!-- 已投票 -->
				<view class="votedList" v-if="switchTab">
					<view class="item" v-bind:class="{ voteActive: isActive }" v-for="(item,index) in detailList.optionList" :key="index">
						<p>{{item.optionContent}}</p>
						<view class="Mask">
							<image src="../static/activity/icon_hd_yixuan.png"></image>
						</view>
					</view>
					<view class="hove-vote">已投票</view>
				</view>
				<!-- 未投票 -->
				<view class="votingList" v-else>
					<radio-group @change="radioChange" v-if="detailList.votingType==1">
						<label class="flex-label" v-for="(item, index) in detailList.optionList" :key="index">
							<view>
								<radio :value="item.optionContent" />
							</view>
							<view class="label-box">{{item.optionContent}}</view>
						</label>
					</radio-group>
					<checkbox-group @change="checkboxChange" v-else>
						<label class="flex-label" v-for="(item, index) in detailList.optionList" :key="index">
							<checkbox color="#007AFF" :value="item.optionContent" />
							<view class="label-box">{{item.optionContent}}</view>
						</label>
					</checkbox-group>

					<view class="vote" @click="voteBtn">立即投票</view>
				</view>
			</view>
			<!-- 活动已截止 -->
			<view v-if="onendStatus==2">
				<view class="hove-vote">活动已截止</view>


			</view>


		</view>
	</view>
</template>

<script>
	// import mainList from './components/mainList.vue';
	import api from '@/api';
	import dayjs from 'dayjs'
	import {
		mapState
	} from 'vuex';


	export default {
		components: {
			// mainList,
		},
		data() {
			return {
				optionContent: "",
				current: 0,
				active: false,
				isActive: true,
				detailList: "",
				votingId: "",
				typeDetail: "",
				switchTab: "", //是否投票
				onendStatus: "", //活动状态
			}
		},
		computed: {
			...mapState(['imageView', "user"]),
		},
		onLoad(option) {
			this.getDetailList(option.id, option.type)
			this.typeDetail = option.type
		},
		methods: {
			// 获取资源
			async getDetailList(id, type) {
				let res = await api.find.ActivityDetail({
					id,
					type
				})
				this.detailList = res.data
				this.votingId = res.data.optionList[0].votingId
				//是否投票Tab
				this.switchTab = res.data.join
				this.onendStatus = res.data.onendStatus
				console.log(110, this.detailList)
			},
			getNum(index) {
				this.current = index;
			},
			//复选框changge
			checkboxChange(e) {
				console.log(8, e)
				this.optionContent = e.detail.value
			},
			// 单选框
			radioChange(e) {
				this.optionContent = e.detail.value;
				console.log(this.optionContent)
			},
			//投票按钮
			async voteBtn() {
				let optionId = this.optionContent.join(',')
				let res = await api.find.voSubmit({
					userId: this.user.id,
					votingId: this.votingId,
					optionId: optionId,
				})
				if (res.data) {
					uni.showToast({
						duration: 1000,
						title: res.msg
					})
					this.getDetailList()
				}
			},

		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '活动详情',
			});
		},
	}
</script>

<style scoped lang="less">
	.hove-vote {
		width: 703rpx;
		height: 88rpx;
		border-radius: 44rpx;
		background-color: #C3C3C3;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
		font-weight: 500;
		line-height: 88rpx;
	}

	.title-tit {
		font-size: 36rpx;
		font-weight: bold;
		height: 80rpx;
	}

	.label-box {
		width: 637rpx;
		height: 74rpx;
		border: solid 1rpx #999;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flex-label {
		margin: 20rpx 0;
		display: flex;
		align-items: center;
	}

	.event-details {
		background: white;
		font-family: 'PingFang-SC-Bold';
		height: 100vh;
		padding: 0 28rpx;
		overflow: auto;
	}

	.title {
		// margin: 20rpx 0;
	}

	.title view {
		font-size: 36rpx;
		color: #3F3A39;
	}

	.title text {
		font-size: 26rpx;
		margin-top: 30rpx;
		line-height: 60rpx;
		color: #999999;
	}

	image {
		width: 100%;
		height: 444rpx;
		margin-bottom: 20rpx;
	}

	.rule {
		margin: 30rpx 0;
	}

	.rule h5 {
		font-size: 30rpx;
		color: #3F3A39;
	}

	.rule p {
		font-size: 30rpx;
		margin: 10rpx 0;
		color: #999999;
	}

	.votingList {
		width: 100%;
		padding: 20rpx 0;

		.item {
			margin: 20rpx 0;
			display: flex;
			flex-direction: row;
			align-content: center;
			justify-content: center;

			.radio {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			p {
				flex: 1;
				padding: 20rpx;
				margin-left: 20rpx;
				border-radius: 5rpx;
				border: 1px solid #d0d0d0;
				color: #3F3A39;
			}
		}

		.vote {
			width: 100%;
			margin: 52rpx 0;
			line-height: 88rpx;
			border-radius: 44rpx;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
			background: linear-gradient(-50deg, #3093FF, #1B76FF);
		}
	}

	.votedList {
		width: 100%;
		padding: 20rpx 0;

		.item {
			width: 100%;
			height: 90rpx;
			margin: 20rpx 0;
			align-content: center;
			justify-content: center;
			position: relative;

			p {
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx;
				border-radius: 15rpx;
				border: 1px solid #d0d0d0;
				color: #3F3A39;
				position: absolute;
				z-index: 5;
			}

			.Mask {
				position: absolute;
				left: 0;
				width: 60%;
				height: 80rpx;
				// border-radius: 18rpx;
				border-top-left-radius: 20rpx;
				border-bottom-left-radius: 18rpx;
				background: #D9D9D9;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding-right: 20rpx;
				box-sizing: border-box;

				image {
					width: 40rpx;
					height: 28rpx;
					margin: 0;
				}
			}
		}

		.active p {
			color: #fff;
		}

		.active .Mask {
			background: #1B76FF;
		}

		.vote {
			width: 100%;
			margin: 52rpx 0;
			line-height: 88rpx;
			border-radius: 44rpx;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
			background: linear-gradient(-50deg, #3093FF, #1B76FF);
		}
	}

	.votedList>.voteActive {
		.Mask {
			background: #1B76FF;
		}

		p {
			color: #fff;
		}
	}

	.rich-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #3F3A39;
		line-height: 60rpx;
	}

	.title-img {
		width: 702rpx;
		height: 444rpx;

		.title-img image {
			width: 702rpx;
			height: 444rpx;
		}
	}
</style>
