<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			搜索
		</nav-bar>
		<view class="conter">
			<view class="serch_ul">
				<view class="serch">
					<image src="../../static/index/serch.png" mode=""></image>
					<input type="text" v-model="text" @confirm="serchcon" :placeholder="active == 1?'请输入姓名':'请输入车牌号'" />
				</view>
				<view class="cancel" @tap="cancel">
					取消
				</view>
			</view>
			<!-- 搜索历史 -->
			<view class="history" v-if="!text">
				<view class="history_title">
					<text>搜索历史</text>
					<image src="/static/index/delete.png" mode=""></image>
				</view>
				<view class="history_ul">
					<view class="history_li" v-for="(item,index) in historyList" :key="index"
						@tap="handelHistory(item.name)">{{item.name}}</view>
				</view>
			</view>
			<!-- 列表 -->
			<view class="data">
				<view class="list" v-if="active == 1">
					<view class="list_li" v-if="list">
						<view class="list_left">
							<view class="list_car">{{list.name}}</view>
							<view class="list_time">
								<image v-if="list.name" src="/static/index/icon8.png" mode=""></image>
								<view v-if="list.identityType=='1'">
									业主
								</view>
								<view v-if="list.identityType=='2'">
									租客
								</view>
								<view v-if="list.identityType=='3'">
									亲属
								</view>
							</view>
						</view>
						<view class="list_right">
							{{list.phone}}
							<image v-if="list.name" src="/static/index/icon7.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="list" v-if="active == 2">
					<view class="list_li" v-for="(item,index) in list" :key="index">
						<view class="list_left">
							<view class="list_car">渝A108166</view>
							<view class="list_time">
								<image src="/static/index/time.png" mode=""></image>
								2021.02.12 11:23:56
							</view>
						</view>
						<view class="list_right">
							入场
							<image src="/static/index/icon5.png" mode=""></image>
							<!-- <image src="/static/index/icon6.png" mode=""></image> -->
						</view>
					</view>
				</view>
				<view class="nothing" v-if="list && !list.name">
					<image src="/static/index/nothing.png" mode=""></image>
					暂无更多信息
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api'
	export default {
		data() {
			return {
				active: '',
				text: '',
				list: '',
				historyList: []
			}
		},
		onLoad(options) {
			if (options.active) {
				this.active = options.active;
			}
		},
		watch: {
			text() {
				if (!this.text) {
					return this.list = ''
				}
			}
		},
		methods: {
			// 取消
			cancel() {
				uni.navigateBack();
			},
			// 搜索
			async serchcon() {
				console.log(this.text);
				const res = await api.inform.realLiveInfoVo({
					name: this.text
				})
				console.log(res)
				if (res) {
					this.list = res.data
				}
			},
			handelHistory(val) {
				if (this.active == '1') {
					this.text = val
					this.serchcon()
				}
			},
			async getHistory() {
				const res = await api.inform.realLiveInfoVoList()
				if (res) {
					res.data=res.data.reverse()
					var result = [];
					var obj = {};
					for (var i = 0; i < res.data.length; i++) {
						if (!obj[res.data[i].name]) {
							result.push(res.data[i]);
							obj[res.data[i].name] = true;
						}
					}
					this.historyList = result.slice(0, 6)
				}

			},
		},
		beforeMount() {
			if (this.active == '1') {
				this.getHistory()
			}
		}
	}
</script>

<style lang="less">
	.conter {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;

		.serch_ul {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 50rpx;

			.serch {
				flex: 1;
				height: 68rpx;
				padding: 0 28rpx;
				background: #F5F5F5;
				border-radius: 50rpx;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;

				image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}

				input {
					flex: 1;
					border: none;
					outline: none;
					font-size: 26rpx;
				}
			}

			.cancel {
				color: #333333;
				font-size: 30rpx;
				margin-left: 30rpx;
			}
		}

		.history {
			width: 100%;

			.history_title {
				width: 100%;
				display: -webkit-flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;

				text {
					color: #333333;
					font-size: 30rpx;
					font-weight: bold;
				}

				image {
					width: 22rpx;
					height: 24rpx;
				}
			}

			.history_ul {
				width: 100%;
				display: -webkit-flex;
				flex-direction: row;
				flex-wrap: wrap;

				.history_li {
					width: 150rpx;
					background: #F6F6F6;
					border-radius: 50rpx;
					padding: 20rpx 20rpx;
					font-size: 26rpx;
					color: #999999;
					text-align: center;
					margin-right: 20rpx;
					margin-bottom: 24rpx;
				}
			}
		}

		.data {
			.list {
				width: 100%;
				padding: 0 24rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 6rpx;

				.list_li {
					width: 100%;
					padding: 24rpx 0;
					display: -webkit-flex;
					flex-direction: row;
					justify-content: space-between;
					border-bottom: 1px solid #EEEEEE;

					.list_left {
						.list_car {
							color: #282828;
							font-size: 30rpx;
							font-weight: bold;
						}

						.list_time {
							display: -webkit-flex;
							flex-direction: row;
							align-items: center;
							color: #AAAAAA;
							font-size: 22rpx;
							margin-top: 6rpx;

							image {
								width: 24rpx;
								height: 24rpx;
								margin-right: 4rpx;
							}
						}
					}

					.list_right {
						display: -webkit-flex;
						flex-direction: row;
						align-items: center;
						color: #656565;
						font-size: 28rpx;

						image {
							width: 48rpx;
							height: 48rpx;
							margin-left: 20rpx;
						}
					}
				}

				.list_li:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
