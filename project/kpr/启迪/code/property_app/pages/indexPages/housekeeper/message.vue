<template>
	<view class="pages-housekeeper-message">
		<view class="content">
			<scroll-view scroll-y="true" id="scrollview">

				<view v-if="isOver" class="msg-over">没有更多消息了</view>
				<view v-for="(item,index) in messageList" :key="index">
					<view class="my-message" v-if="item.messageType==1">
						<view class="right">
							<view class="time">
								<text class="create-time">{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</text>
								<text class="name">我</text>
							</view>
							<view class="message">
								<text>
									{{item.message}}
								</text>
							</view>
						</view>
						<view class="avatar">
							<image class="img"
								:src="userInfo.headPortrait?`${imageView}${userInfo.headPortrait}`:require('../static/icon_zhjk_touxiang.png')"
								mode=""></image>
						</view>
					</view>

					<view class="housekeeper" v-if="item.messageType==2">
						<view class="avatar">
							<image class="img"
								:src="item.headPortrait?`${imageView}${item.headPortrait}`:require('../static/icon_zhjk_touxiang.png')"
								mode=""></image>
						</view>
						<view class="left">
							<view class="time">
								<text class="name">管家-{{item.name}}</text>
								<text class="create-time">{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</text>
							</view>
							<view class="message">
								<text>
									{{item.message}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 输入评论 -->
		<view class="input_box">
			<view class="tx" v-if="!isFocus">
				<image
					:src="userInfo.headPortrait?`${imageView}${userInfo.headPortrait}`:require('../static/icon_zhjk_touxiang.png')"
					mode=""></image>
			</view>
			<view class="input">
				<image src="../../servicePages/static/input.png" mode="" />
				<input type="text" v-model="value" :focus="isFocus" @focus="focus" @blur="blur" placeholder="请输入您的留言" />
			</view>
			<text class="send" type="default" @click="sendHandle" v-show="isFocus">发送</text>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				current: 1,
				size: 10,
				total: 0,
				isOver: false,
				userInfo: {},
				isFocus: false,
				value: '',
				ids: '',
				housekeeperName: '',
				messageList: [],
			}
		},
		computed: {
			...mapState(['user', 'imageView', 'community'])
		},
		methods: {
			//获取最新一条
			async getNewMessage() {
				const canshu = {
					current: 1,
					size: 1,
					roomId: this.ids.roomId
				}
				const res = await api.my.getMessageInfo(canshu);
				if (res) {
					this.total = res.data.total
					let messageData = res.data.records;
					messageData.forEach(item => {
						this.messageList.push(item)
					})
					this.jumpScroll()
				}
			},
			focus(e) {
				this.isFocus = true;
			},
			blur(e) {
				setTimeout(() => {
					this.value = '';
					this.isFocus = false
				}, 500)
			},
			async sendHandle() {
				const canshu = {
					buildingId: this.ids.buildingId,
					comId: this.community.id,
					floorId: this.ids.floorId,
					houseKeeperId: this.ids.houseKeeperId,
					message: this.value,
					messageType: 1,
					roomId: this.ids.roomId,
					unitId: this.ids.unitId,
					userId: this.user.userId,
				}
				const res = await api.my.getMessageAdd(canshu)
				if (res) {
					this.getNewMessage()
				}
				this.isFocus = false
			},
			// 获取留言板详情
			async getMessageInfo() {
				const canshu = {
					current: this.current,
					size: this.size,
					roomId: this.ids.roomId
				}
				const res = await api.my.getMessageInfo(canshu);
				if (res) {
					this.total = res.data.total
					let messageData = res.data.records;
					this.messageList.reverse()
					messageData.forEach(item => {
						this.messageList.push(item)
					})
					this.messageList.reverse()
				}
				if (this.current === 1) {
					this.jumpScroll()
				}
			},
			//滚动到指定位置
			jumpScroll() {
				this.$nextTick(function() {
					uni.pageScrollTo({
						scrollTop: 99999999,
						duration: 0
					});
				})
			},

			//获得用户信息
			getUserInfo() {
				this.userInfo = this.user;
			},
		},
		// 下拉加载更多
		onPullDownRefresh() {
			if (this.total > this.size * this.current) {
				this.current += 1
				this.getMessageInfo()
			} else {
				this.isOver = true
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 100);
		},
		mounted() {
			this.getMessageInfo();
			this.getUserInfo()
			this.jumpScroll()
		},
		onLoad(opt) {
			this.ids = opt;
			this.housekeeperName = opt.housekeeperName
		},
		onShow() {

		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '留言信息',
			});

		},
	}
</script>

<style lang="less" scoped>
	.pages-housekeeper-message {
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #F5F5F5;

		.content {
			padding: 0rpx 30rpx 0 30rpx;
			padding-bottom: 174rpx;

			.msg-over {
				text-align: center;
				padding-top: 14rpx;
			}

			.my-message {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				padding-top: 44rpx;

				.right {
					.time {
						display: flex;
						justify-content: flex-end;
						margin-bottom: 24rpx;

						.create-time {
							color: #666666;
							font-size: 20rpx;
						}

						.name {
							color: #282828;
							font-size: 24rpx;
							margin-left: 12rpx;
						}
					}

					.message {
						max-width: 470rpx;
						// max-height: 80rpx;
						background-color: #9646A5;
						word-break: break-all;
						overflow: hidden;
						font-size: 28rpx;
						font-weight: bold;
						color: #FFFFFF;
						padding: 25rpx 36rpx;
						border-radius: 25rpx;
						border-top-right-radius: 0;

						view {
							width: 100%;
						}
					}
				}

				.avatar {
					margin-left: 20rpx;

					.img {
						border-radius: 50%;
						width: 84rpx;
						height: 84rpx;
					}
				}
			}

			.housekeeper {
				display: flex;
				float: left;
				margin-top: 44rpx;

				.left {
					display: flex;
					flex-direction: column;

					.time {
						display: flex;
						justify-content: flex-start;
						margin-bottom: 24rpx;

						.create-time {
							color: #666666;
							font-size: 20rpx;
						}

						.name {
							color: #282828;
							font-size: 24rpx;
							margin-right: 12rpx;
						}
					}

					.message {
						max-width: 470rpx;
						// max-height: 80rpx;
						background-color: #FFFFFF;
						word-break: break-all;
						overflow: hidden;
						font-size: 28rpx;
						font-weight: bold;
						color: #4A4A4A;
						padding: 25rpx 36rpx;
						border-radius: 25rpx;
						border-top-left-radius: 0;

						view {
							width: 100%;
						}
					}
				}

				.avatar {
					margin-right: 20rpx;
					border-radius: 50%;

					.img {
						width: 84rpx;
						height: 94rpx;
					}
				}
			}
		}

		.input_box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 130rpx;
			background: #fff;
			padding: 0 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid #F5F5F5;

			.tx {
				width: 60rpx;
				height: 60rpx;
				background: #aaa;
				border-radius: 50%;

				image {
					border-radius: 50%;
				}
			}

			.input {
				width: 88%;
				height: 72rpx;
				background: #F5F5F5;
				border: 1px solid #E6E6E6;
				border-radius: 36rpx;
				display: flex;
				align-items: center;

				image {
					width: 24rpx;
					height: 22rpx;
					margin: 0 9rpx 0 34rpx;
				}

				input {
					font-size: 28rpx;
					width: 80%;
				}
			}

			.send {
				color: #1B76FF;
				font-size: 30rpx;
				font-weight: 500;
			}
		}
	}
</style>
