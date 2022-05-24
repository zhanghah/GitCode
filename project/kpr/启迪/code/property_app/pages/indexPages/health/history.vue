<template>
	<view class="pages-history">
		<view class="top">
			<view class="tips">
				个人健康数据
			</view>
		</view>
		<view class="content">
			<view class="ui_link"  @tap="detailHandel">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_01.png" mode="">
					</image>
					<view class="label">身高</view>
					<view class="indicators">180<span class="unit">cm</span></view>
				</view>
				<view class="right">
					<view class="link-ext">3月2日</view>
					<view class="arrow"></view>
				</view>
			</view>
			
			<view class="ui_link">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_02.png" mode="">
					</image>
					<view class="label">体重</view>
					<view class="indicators">70<span class="unit">公斤</span></view>
				</view>
				<view class="right">
					<view class="link-ext">3月2日</view>
					<view class="arrow"></view>
				</view>
			</view>
			
			<view class="ui_link">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_05.png" mode="">
					</image>
					<view class="label">腰围</view>
					<view class="indicators">60<span class="unit">cm</span></view>
				</view>
				<view class="right">
					<view class="link-ext">3月2日</view>
					<view class="arrow"></view>
				</view>
			</view>
			
			<view class="ui_link">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_03.png" mode="">
					</image>
					<view class="label">身高体重指数(BMI)</view>
					<view class="indicators">20.75<span class="unit"></span></view>
				</view>
				<view class="right">
					<view class="link-ext">3月2日</view>
					<view class="arrow"></view>
				</view>
			</view>
			
			<view class="ui_link">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_04.png" mode="">
					</image>
					<view class="label">体脂率</view>
					<view class="indicators">25<span class="unit">%</span></view>
				</view>
				<view class="right">
					<view class="link-ext">3月2日</view>
					<view class="arrow"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods:{
			detailHandel(){
				uni.navigateTo({
					url:"./historyDetail"
				})
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '历史健康数据',
			});
		}
	}
</script>

<style lang="less" scoped>
	.pages-history {
		padding: 0 24rpx;
		height: 100vh;
		background-color: #F5F5F5;

		.top {
			padding: 29rpx 0;
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;

		}

		.content {

			.ui_link {
				width: 100%;
				height: 150rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 20rpx;

				.ui_icon {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.image {
						margin-left: 24rpx;
					}

					.label {
						font-size: 30rpx;
						color: #333333;
						margin-left: 11rpx;
					}

					.indicators {
						font-size: 40rpx;
						color: #333333;
						margin-left: 65rpx;
						
						.unit{
							font-size: 30rpx;
							margin-left: 10rpx;
						}
					}
				}


				.right {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.link-ext {
						font-size: 30rpx;
						color: #333333;
					}

					.arrow {
						width: 13rpx;
						height: 23rpx;
						margin: 0 28rpx;
						flex-shrink: 0;
						flex-grow: 0;
						background: url(@/static/components/icon_link_arrow.png) no-repeat;
						background-size: 100% 100%;
					}
				}

			}
		}
	}
</style>
