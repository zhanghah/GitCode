<template>
	<view class="indexCom_box">
		<view class="content_box" v-if="list.length">
			<view class="box" v-for="(item,index) in list" :key="index">
				<view class="cli" @click="toXq(item.id)">
					<view class="home">
						<view class="attribute">
							<view class="type">
								投诉类型：{{item.complaintType}}
							</view>
							<view class="department">
								部门：{{item.complaintDept}}
							</view>
						</view>
						<view class="state_sl" v-if="item.checkStatus==0">待受理</view>
						<view class="state_gj" v-else-if="item.checkStatus==1">正在跟进</view>
						<view class="state_hf" v-else-if="item.checkStatus==2">待回访</view>
						<view class="state_wc" v-else>已完成</view>
					</view>
					<view class="tiem">{{item.createTime |date('YYYY-MM-DD HH:mm')}}</view>
					<view class="text">
						{{item.content}}
					</view>
				</view>

				<view class="imgList">
					<image :src="`${imageView}${v.filePath}`" mode="" v-for="(v,i) in item.fileList" :key="i" @click="clickImg(v)"></image>
				</view>
			</view>
		</view>
		<no-result v-else :message='noData'></no-result>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return [];
				},
			},
		},
		data() {
			return {
				noData: '暂无数据~',
			}
		},
		computed: {
			...mapState(['imageView']),
		},
		methods: {
			//跳转详情
			toXq(val) {
				uni.navigateTo({
					url: '/pages/userPages/complaint/xq/index?id=' + val,
				});
			},
			clickImg(v) {
				let viewImg = [];
				viewImg.push(this.imageView + v.filePath)
				wx.previewImage({
					urls: viewImg,
					current: 0, // 当前显示图片的http链接，默认是第一个
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.indexCom_box {
		width: 100%;
		height: 100%;

		.content_box {
			width: 92%;
			margin: 0 auto;

			.box {
				padding: 36rpx 25rpx 21rpx 23rpx;
				background: #fff;
				margin-top: 24rpx;
				border-radius: 16rpx;

				.home {
					color: #020204;
					font-size: 32rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 15rpx;
					
					.attribute{
						display: flex;
						.type{
							margin-right: 40rpx;
						}
					}

					.state_sl {
						color: #F05050;
					}

					.state_gj {
						color: #F8C344;
					}
					.state_hf {
						color: #FF884D;
					}
					.state_wc {
						color: #666666;
					}
				}

				.tiem {
					color: #AAAAAA;
					font-size: 24rpx;
					margin-bottom: 33rpx;
				}

				.text {
					font-size: 28rpx;
					color: #020204;
					margin-bottom: 30rpx;
					white-space: pre-line;
					line-height: 44rpx;
				}

				.imgList {
					width: 100%;
					overflow: hidden;
					// display: flex;
					// flex-wrap: wrap;

					image {
						width: 136rpx;
						height: 136rpx;
						border-radius: 8rpx;
						background: #aaa;
						margin-left: 20rpx;
						margin-bottom: 21rpx;

					}
				}
			}
		}
	}
</style>
