<template>
	<view class="page-membercare-index">
		<view class="content">
			<view class="mybracelet">
				我的手环
			</view>
			<view v-for="(item,index) in list" :key="index">
				<view class="content-box" @tap="toDetail(item)">
					<view class="bracelet-info">
						<view class="bracelet-name">
							{{item.title}}
						</view>
						<view class="status-success" v-if="item.status==0">
							连接成功
						</view>
						<view class="status-fail" v-if="item.status==1">
							连接失败
						</view>
					</view>
					<view class="right">
						<view class="status-success" v-if="item.status==0 && item.notice==0">
							正常
						</view>
						<view class="notice-num" v-if="item.status==0 && item.notice==1">
							1
						</view>
						<view class="status-fail" v-if="item.status==1">
							离线
						</view>
						<image src="../../indexPages/static/icon_arrow.png" mode=""></image>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						title: '小米手环4NFC版',
						status: 0,
						notice: 1,
						id: 1
					},
					{
						title: '小米手环4NFC版',
						status: 0,
						notice: 0,
						id: 2
					},
					{
						title: '小米手环4NFC版',
						status: 1,
						notice: 0,
						id: 3
					},
				]
			}
		},
		methods:{
			toDetail(val){
				console.log(val)
				uni.navigateTo({
					url:`../bracelet/index?item=${val}`
				})
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '成员关爱'
			})
		}
	}
</script>

<style lang="less" scoped>
	.page-membercare-index {
		min-height: 100vh;
		background-color: #F5F5F5;
		overflow: hidden;
	}

	.content {
		padding: 46rpx 30rpx;

		.mybracelet {
			color: #282828;
			font-size: 40rpx;
			font-weight: bold;
			padding-bottom: 30rpx;
		}

		.content-box {
			// width: 100%;
			padding: 30rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			border-radius: 4rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.bracelet-info {
				flex-shrink: 0;
				font-size: 35rpx;

				.bracelet-name {
					color: #282828;
					margin-bottom: 25rpx;
				}

				.status-success {
					color: #80C269;
				}

				.status-fail {
					color: #F05050;
				}
			}

			.right {
				flex-shrink: 0;
				display: flex;
				align-items: center;
				
				.status-success {
					color: #282828;
				}
				
				.status-fail {
					color: #F05050;
				}
				
				.notice-num{
					min-width: 35rpx;
					min-height: 35rpx;
					background-color: #F05050;
					color: #FFFFFF;
					text-align: center;
					border-radius: 50%;
				}

				image {
					margin-left: 23rpx;
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
	}
</style>
