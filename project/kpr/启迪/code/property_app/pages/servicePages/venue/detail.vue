<template>
	<view class="page-venue-detail">
		<view class="top-img">
			<swiper class="swiper" :indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#802890"
				:autoplay="true">
				<swiper-item v-for="(item,index) in detailData.pictures" :key="index">
					<view class="swiper-item">
						<image style="width: 100%;height:100%;" mode="scaleToFill"
							:src="`${imageView}${item.picture}`" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="venue-info">
			<view class="venue-name">
				{{detailData.name}}
			</view>
			<view class="type">
				{{detailData.type}}
			</view>
			<view class="open-time">
				开放时间：{{detailData.openTime}}
			</view>
		</view>
		<view class="res-record">
			<view class="title">
				预定记录
			</view>
			<template v-if="detailData.venueOrderList!=undefined && detailData.venueOrderList.length>0">
				<view class="records-detail" v-for="(item,index) in detailData.venueOrderList" :key="index">
					{{item.contacts}}预定了{{item.time}}使用场馆
				</view>
			</template>
			<view class="no-records" v-else>
				暂无场馆预定记录
			</view>
		</view>
		<view class="introduce">
			<view>
				场馆介绍
			</view>
			<view class="cont">
				<rich-text :nodes="detailData.detail"></rich-text>
			</view>
		</view>
		<view class="footer">
			<view class="service" @tap="handPhone">
				<image src="../../../static/index/icon-phone.png" mode=""></image>
				<view>
					联系客服
				</view>
			</view>
			<view class="btn" @tap="toReserve">
				确认预约
			</view>
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
				id: '',
				detailData: {}, //详情数据
			}
		},
		computed: {
			...mapState(['user', 'imageView'])
		},
		methods: {
			handPhone() {
				uni.showActionSheet({
					itemList: [`客服：${this.detailData.phone}`, '拨打'],
					success: (res) => {
						if (res.tapIndex == 1) {
							uni.makePhoneCall({
								phoneNumber: this.detailData.phone
							});
						}
					},
				});
			},
			toReserve() {
				uni.navigateTo({
					url: `./reserve?venueId=${this.detailData.id}`
				})
			},

			// 获取场馆管理详情
			async getVenueInfo() {
				const res = await api.service.getAllById({
					id: this.id
				})
				if (res.status != '0') {
					return
				};
				this.detailData = res.data
				console.log(this.detailData)
			},

		},
		mounted() {
			this.getVenueInfo()
		},
		onLoad(opt) {
			this.id = opt.id
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '详情',
			});
		},
	}
</script>

<style lang="less" scoped>
	.page-venue-detail {
		min-height: 100vh;
		background-color: #F5F5F5;
		overflow: hidden;
	}

	.top-img {
		width: 100%;
		height: 426rpx;

		.swiper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			height: 100%;
			background-color: #e7e7e7;
		}
	}

	.venue-info {
		width: 100%;
		color: #333333;
		padding: 37rpx 27rpx;
		background-color: #FFFFFF;

		.venue-name {
			font-size: 38rpx;
			font-weight: bold;

		}

		.type {
			color: #999999;
			font-size: 28rpx;
			margin: 25rpx 0;
		}

		.open-time {
			font-size: 24rpx;
		}
	}

	.res-record {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 30rpx;

		.no-records {
			margin-top: 25rpx;
		}

		.title {
			color: #333333;
			font-size: 30rpx;
			font-weight: bold;
		}

		.records-detail {
			margin-top: 24rpx;
		}
	}

	.reserve-record {
		width: 100%;
		color: #333333;
		padding: 30rpx;
		margin-top: 20rpx;
		font-size: 30rpx;
		font-weight: bold;
		background-color: #FFFFFF;

		.record {
			font-size: 26rpx;
			font-weight: 500;
			line-height: 60rpx;
		}
	}

	.introduce {
		width: 100%;
		color: #333333;
		padding: 30rpx;
		margin-top: 20rpx;
		font-size: 30rpx;
		font-weight: bold;
		background-color: #FFFFFF;

		.cont {
			margin-top: 30rpx;
			overflow: hidden;
			font-size: 26rpx;
			font-weight: 500;
			line-height: 48rpx;
		}

		.img {
			width: 690rpx;
			height: 289rpx;
			margin-top: 30rpx;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 15rpx 30rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;

		.service {
			width: 20%;
			color: #333333;
			font-size: 20rpx;
			margin-right: 43rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 35rpx;
				height: 35rpx;
			}
		}

		.btn {
			width: 100%;
			height: 95rpx;
			border-radius: 50rpx;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 57rpx;
			box-sizing: border-box;
			background: #802890;
			color: #FFFFFF;

		}
	}
</style>
