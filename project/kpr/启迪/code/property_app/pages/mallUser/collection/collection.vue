<template>
	<view class="content_mall">
		<view class="cell_v">
			<view class="cell" @click="$goPage(['/pages/mallUser/home/home'])">
				<image class="img_v" src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode="aspectFill"></image>
				<view class="right_v">
					<text class="name">永辉超市（企业天地店）</text>
					<view class="pf">
						<image src="../../../static/mall/home/pf.png" mode="aspectFill"></image>
						<text>4.6</text>
						<text class="xl">月售43</text>
					</view>
					<view class="ps">
						<view class="bqv">
							<text class="bq">配送到家</text>
							<text>起送 ¥20</text>
						</view>
						<text>2小时内 1.2km</text>
					</view>
					<view class="daz">
						<text class="one">50减5</text>
						<text>100减15</text>
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

			};
		}
	}
</script>

<style lang="less" scoped>
	.cell_v {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		.cell {
			padding: 15rpx;
			width: 696rpx;
			display: flex;
			align-content: flex-start;
			justify-content: flex-start;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 20rpx;
			.img_v {
				width: 204rpx;
				height: 210rpx;
				background: #EE1B24;
				border-radius: 16rpx;
			}

			.right_v {
				width: 435rpx;
				margin-left: 30rpx;
				display: flex;
				justify-content: flex-start;
				align-content: flex-start;
				flex-wrap: wrap;

				.name {
					width: 100%;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #282828;
					margin-top: 10rpx;
				}

				.pf {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					height: 24rpx;
					margin-top: 19rpx;

					image {
						width: 24rpx;
						height: 24rpx;
					}

					text {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFB200;
						margin-left: 5rpx;
					}

					.xl {
						color: #555555;
						margin-left: 30rpx;
					}
				}

				.ps {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 32rpx;
					margin-top: 19rpx;

					text {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #555555;
					}

					.bqv {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.bq {
							color: #FFFFFF;
							height: 32rpx;
							background: #FFB200;
							border-radius: 10px;
							padding: 0px 10rpx;
							margin-right: 20rpx;
						}
					}
				}

				.daz {
					height: 32rpx;
					border: 1rpx solid #F8B551;
					border-radius: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					text-align: center;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #555555;
					margin-top: 35rpx;

					text {
						margin: 0px 15rpx;
					}

					.one {
						position: relative;

						&::after {
							content: '';
							width: 1rpx;
							height: 13rpx;
							background: #F8B551;
							opacity: 0.5;
							position: absolute;
							top: 10rpx;
							right: -15rpx;
						}
					}
				}

			}
		}
	}
</style>
