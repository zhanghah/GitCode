<template>
	<view class="indexCom_box">
		<view class="content_box" v-if="list.length">
			<view class="box" v-for="(item,index) in list" :key="index">
				<view class="cli" @tap="toXq(item.id)">
					<view class="home">
						<view class="home_name">
							工牌编号：{{item.id}}
						</view>
						<view class="state_zp" v-if="item.eventStatus==1">待审核</view>
						<view class="state_wtg " v-else-if="item.eventStatus==2">待指派</view>
						<view class="state_cz" v-else-if="item.eventStatus==3">已指派</view>
						<view class="state_cz" v-else-if="item.eventStatus==4">处理中</view>
						<view class="state_cz" v-else-if="item.eventStatus==5">审核不通过</view>
						<view class="state_cz" v-else-if="item.eventStatus==6">关闭</view>
						<view class="state_cz" v-else-if="item.eventStatus==7">待评价</view>
						<view class="state_cz" v-else-if="item.eventStatus==8">完成</view>
						<view class="state_czz" v-else>上报</view>
					</view>
					<view class="tiem">{{item.createTime}}</view>
					
					<view class="type">
						类型：<view v-if="item.woEventParentText || item.woEventTypeText">{{item.woEventParentText}}-{{item.woEventTypeText}}</view>
					</view>
					<view class="text">
						内容：<view>{{item.description}}</view>
					</view>
				</view>

				<view class="imgList" v-if="item.eventImageList.length">
					<image :src="`${imageView}${v}`" mode="" v-for="(v,i) in item.fileList" :key="i" @click="clickImg(item.fileList)"></image>
				</view>
				<view class="button" v-if="item.eventStatus==7">
					<view class="btn">工单评价</view>
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
					url: '/pages/userPages/reportRecord/xq/index?id=' + val,
				});
			},
			clickImg(v) {
				let viewImg = [];
				v.forEach(item => {
					viewImg.push(this.imageView + item)
				})
				wx.previewImage({
					urls: viewImg, 
					current: 0, // 当前显示图片的http链接，默认是第一个
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.indexCom_box {
		width: 100%;
		height: 100%;

		.content_box {
			width: 92%;
			margin: auto;


			.box {
				padding: 36rpx 25rpx 21rpx 23rpx;
				background: #fff;
				margin-top: 24rpx;
				border-radius: 16rpx;

				.home {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #020204;
					font-size: 32rpx;
					margin-bottom: 15rpx;

					.state_zp {
						color: #FF884D;
					}

					.state_wtg {
						color: #F05050;
					}

					.state_cz {
						color: #F8C344;
					}

					.state_czz {
						color: #FF884D;
					}
				}

				.tiem {
					color: #AAAAAA;
					font-size: 24rpx;
					margin-bottom: 33rpx;
				}

				.text,.type {
					color: #9B9B9B;
					font-size: 28rpx;
					line-height: 44rpx;

					view {
						display: inline;
						color: #020204;
						white-space: pre-line;
					}
				}

				.imgList {
					width: 100%;
					overflow: hidden;
					margin-top: 28rpx;

					image {
						width: 136rpx;
						height: 136rpx;
						border-radius: 14rpx;
						background: #aaa;
						margin-right: 29rpx;
						margin-bottom: 21rpx;
					}
				}
			}
		}
	}
	.button{
		display: flex;
		justify-content: flex-end;
		margin-top: 20rpx;

		.btn{
			width: 160rpx;
			height: 64rpx;
			border: 1rpx solid #C762D9;
			color: #A94ABA;
			font-size: 30rpx;
			line-height: 64rpx;
			text-align: center;
			border-radius: 32rpx;
		}
	}
</style>
