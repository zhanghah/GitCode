<template>
	<view class="linliquan_list">
		<view class="list_wrap" v-if="msg.length">
			
			<view class="list_item" v-for="(item,index) in msg" :key="index">
				<view class="item_top">
					<view class="top_icon">
						<!-- <image src="" /> -->
					</view>
					<view class="top_infos">
						<view class="infos_name">雾与晨的杂货店</view>
						<view class="infos_time">2019-12-15</view>
					</view>
					<view class="top_btn" @click="onReply">回复</view>
				</view>
				<view class="item_center">
					<view class="center_label">
						<view class="label_item"></view>
						<view class="label_praise">
							<image src="../../static/invitation/praise.png" class="praise_img" />
							<view class="praise_number">+1</view>
						</view>
						<view class="label_item_comment">@柳叶飞刀：<view class="label_text">评论内容评论内容</view>
						</view>
					</view>
					<view class="center_infos">
						<view class="infos_img">
							<!-- <image src="" /> -->
						</view>
						<view class="infos_title">
							<view class="infos_title_name">
								@混变更哈#宠物专区#每日新闻特 约上线每日新闻特约上线 约上线每日新闻特约上线
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<no-result v-else message='暂无数据'></no-result>
		
		<view class="mask" v-if="visible">
			<view class="mask_wrap" @click.stop="onCancle"></view>
			<view class="mask_content" :style="{bottom: inputBottom+'rpx'}">
				<view class="mask_top">
					<view class="cancle" @click="onCancle">取消</view>
					<view class="label">回复</view>
					<view class="release-wrap">
						<view class="release">发布</view>
					</view>
				</view>
				<view class="mask_infos">
					<textarea placeholder="请输入" :maxlength="-1" :show-confirm-bar="false" :adjust-position="false"
						:fixed="true" @focus="focusTextarea" @blur="blurTextarea"
						@keyboardheightchange="keyboardHandle">
          </textarea>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	export default {
		name: 'LinLiQuan',
		data() {
			return {
				visible: false,
				inputBottom: 0,
				current:1,
				size:10,
				msg:[]
			}
		},
		methods: {
			onReply() {
				this.visible = true;
			},
			onCancle() {
				this.visible = false;
				this.inputBottom = 0;
			},
			focusTextarea(e) {
				this.inputBottom = e.detail.height * 2;
			},
			blurTextarea(e) {
				this.inputBottom = 0;
			},
			// 键盘高度发生变化
			keyboardHandle(e) {
				this.inputBottom = e.detail.height * 2;
			},
			
			//消息列表
			getList(){
				let canshu = {
					current:this.current,
					size:this.size,
					type :'1'
				}
				api.my.getmessage(canshu).then(res=>{
					if(res.status === '0'){
						this.msg = res.data.records
					}
				})
			}
		},
		onShow(){
			this.getList()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '邻里圈互动',
			});
		},
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.linliquan_list {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding: 30rpx 24rpx;
	}

	.list_wrap {
		.list_item {
			width: 100%;
			border-radius: 20rpx;
			background-color: #fff;
			margin-bottom: 24rpx;
			padding: 30rpx 30rpx 34rpx;

			.item_top {
				height: 80rpx;
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 26rpx;

				.top_icon {
					width: 80rpx;
					height: 80rpx;
					flex-shrink: 0;
					margin-right: 20rpx;
					border-radius: 50%;
					background-color: skyblue;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.top_infos {
					flex: 1;
					display: flex;
					flex-direction: column;
					padding: 9rpx 0;

					.infos_name {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #7A7A7C;
						// margin-bottom: 16rpx;
					}

					.infos_time {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9E9E9E;
					}
				}

				.top_btn {
					width: 120rpx;
					height: 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 2rpx solid #1B76FF;
					border-radius: 10rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #1B76FF;
				}
			}

			.item_center {
				.center_label {
					margin-bottom: 38rpx;

					.label_item {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #020204;
						line-height: 40rpx;
					}

					.label_praise {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.praise_img {
							width: 29rpx;
							height: 29rpx;
							margin-right: 12rpx;
						}

						.praise_number {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FC9F1D;
						}
					}

					.label_item_comment {
						padding-top: 28rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #020204;
						display: flex;

						.label_text {
							font-family: PingFang-SC-Medium;
							font-weight: 500;
						}
					}
				}

				.center_infos {
					height: 134rpx;
					display: flex;
					border-radius: 10rpx;
					overflow: hidden;

					.infos_img {
						width: 134rpx;
						height: 100%;
						background-color: skyblue;
						flex-shrink: 0;
					}

					.infos_title {
						height: 100%;
						background-color: #f5f5f5;
						padding: 29rpx 32rpx 29rpx 23rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9E9E9E;

						.infos_title_name {
							width: 100%;
							height: 100%;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
				}
			}
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		.mask_wrap {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.mask_content {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 280rpx;
			padding: 0 34rpx;
			background-color: #fff;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;

			.mask_top {
				width: 100%;
				height: 92rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.cancle {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #7A7A7C;
				}

				.label {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #020204;
				}

				.release-wrap {
					width: 105rpx;
					height: 52rpx;
					padding: 5rpx;
					border-image: linear-gradient(0deg, #1B76FF, #3093FF) 10 10;
					background: linear-gradient(0deg, #1B76FF 0%, #3093FF 100%);
					border-radius: 10rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #1B76FF;

					.release {
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 5rpx;
						background: #fff;
					}
				}
			}

			.mask_infos {
				width: 100%;
				height: 160rpx;
				padding: 18rpx;
				background: #F6F6F6;
				border-radius: 8rpx;

				textarea {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
