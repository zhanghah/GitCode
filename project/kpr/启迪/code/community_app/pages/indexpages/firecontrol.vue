<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :titleCenter="false" :backState="1000" :shadow="false" bgColor="#ffffff">
			消防安全
			<view slot="right">
				<picker @change="bindPickerChange" :value="arrayIndex" :range="array" :range-key="'name'">
					<view class="uni-input">
						<view class="qh">
							{{arrayname}}
							<image src="/static/index/bottom.png" mode=""></image>
						</view>
					</view>
				</picker>
			</view>
		</nav-bar>
		<view class="conter">
			<view class="inform">
				<view class="inform_title">
					<image src="../../static/index/icon4.png" mode="widthFix"></image>
					消防设施
				</view>
				<view class="table">
					<view class="table_li">
						<view class="li_img">
							<image src="https://img2.baidu.com/it/u=2138901005,3037462530&fm=26&fmt=auto" mode="heightFix"></image>
						</view>
						<view class="li_data">
							<view class="data_li">
								<view class="data_name">名称</view>
								<view class="data_con">灭火器</view>
							</view>
							<view class="data_li">
								<view class="data_name">数量</view>
								<view class="data_con">127</view>
							</view>
						</view>
					</view>
					<view class="table_li">
						<view class="li_img">
							<image src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00485-4082.jpg" mode="heightFix"></image>
						</view>
						<view class="li_data">
							<view class="data_li">
								<view class="data_name">名称</view>
								<view class="data_con">防烟防毒面具</view>
							</view>
							<view class="data_li">
								<view class="data_name">数量</view>
								<view class="data_con">230</view>
							</view>
						</view>
					</view>
					<view class="table_li">
						<view class="li_img">
							<image src="https://img0.baidu.com/it/u=1351785321,1434727816&fm=26&fmt=auto" mode="heightFix"></image>
						</view>
						<view class="li_data">
							<view class="data_li">
								<view class="data_name">名称</view>
								<view class="data_con">消防水带</view>
							</view>
							<view class="data_li">
								<view class="data_name">数量</view>
								<view class="data_con">21</view>
							</view>
						</view>
					</view>
					<view class="table_li">
						<view class="li_img">
							<image src="https://img1.baidu.com/it/u=1596141342,942176107&fm=26&fmt=auto" mode="heightFix"></image>
						</view>
						<view class="li_data">
							<view class="data_li">
								<view class="data_name">名称</view>
								<view class="data_con">触电式指示牌</view>
							</view>
							<view class="data_li">
								<view class="data_name">数量</view>
								<view class="data_con">119</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="inform">
				<view class="inform_title">
					<image src="../../static/index/icon4.png" mode="widthFix"></image>
					感应器设备
				</view>
				<view class="table">
					<view class="table_li">
						<view class="li_img">
							<image src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00735-473.jpg" mode="heightFix"></image>
						</view>
						<view class="li_data">
							<view class="data_li">
								<view class="data_name">名称</view>
								<view class="data_con">烟感报警器</view>
							</view>
							<view class="data_li">
								<view class="data_name">数量</view>
								<view class="data_con">127</view>
							</view>
						</view>
					</view>
					<view class="table_li">
						<view class="li_img">
							<image src="https://img2.baidu.com/it/u=708976205,4110180376&fm=26&fmt=auto" mode="heightFix"></image>
						</view>
						<view class="li_data">
							<view class="data_li">
								<view class="data_name">名称</view>
								<view class="data_con">水位液压探测器</view>
							</view>
							<view class="data_li">
								<view class="data_name">数量</view>
								<view class="data_con">230</view>
							</view>
						</view>
					</view>
					<view class="table_li">
						<view class="li_img">
							<image src="https://img0.baidu.com/it/u=1833410875,3288490761&fm=26&fmt=auto" mode="heightFix"></image>
						</view>
						<view class="li_data">
							<view class="data_li">
								<view class="data_name">名称</view>
								<view class="data_con">可燃气体探测器</view>
							</view>
							<view class="data_li">
								<view class="data_name">数量</view>
								<view class="data_con">21</view>
							</view>
						</view>
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
				array: [{
					name: '幸福五社小区',
					value: '0',
				}],
				arrayIndex: 0,
				arrayname: '幸福五社小区',
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				if (this.arrayIndex != e.target.value) {
					this.arrayIndex = e.target.value;
				} else {
					this.arrayIndex = e.target.value;
				}
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}
	.qh {
		display: flex;
		align-items: center;
		color: #727677;
		font-size: 28rpx;
		margin-right: 30rpx;
	}
	
	.qh image {
		width: 14rpx;
		height: 8rpx;
		margin-left: 10rpx;
	}
	.conter {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;

		.inform {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 6rpx;
			margin-bottom: 24rpx;

			.inform_title {
				width: 100%;
				padding-bottom: 24rpx;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;

				image {
					width: 26rpx;
					margin-right: 10rpx;
					color: #282828;
					font-size: 30rpx;
				}
			}

			.table {
				border: 1px solid #EEEEEE;

				.table_li {
					width: 100%;
					display: -webkit-flex;
					flex-direction: row;
					align-items: center;
					border-bottom: 1px solid #EEEEEE;
					.li_img {
						width: 200rpx;
						height: 160rpx;
						padding: 20rpx 30rpx;
						box-sizing: border-box;
						line-height: 0;
						display: -webkit-flex;
						justify-content: center;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.li_data {
						flex: 1;
						border-left: 1px solid #EEEEEE;
						.data_li {
							width: 100%;
							display: -webkit-flex;
							flex-direction: row;
							align-items: center;
							border-bottom: 1px solid #EEEEEE;
							.data_name {
								width: 150rpx;
								text-align: center;
								padding: 24rpx 0;
								color: #999999;
								font-size: 26rpx;
							}
							.data_con {
								flex: 1;
								border-left: 1px solid #eeeeee;
								padding: 24rpx 24rpx;
								color: #656565;
								font-size: 26rpx;
							}
						}
						.data_li:last-child {
							border-bottom: none;
						}
					}
				}

				.table_li:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
