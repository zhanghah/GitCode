<template>
	<view class="page-property-pay">
		<view class="dividing"></view>

		<view class="contianer">
			<view class="title">{{userInfo.userName}}业主，您好！</view>

			<view class="entry-wrap">
				<view class="item wy" @tap="toWyjf">
					<view class="icon"></view>
					<view class="text">物业缴费</view>
				</view>

				<view class="item sf">
					<view class="icon"></view>
					<view class="text">水费</view>
				</view>

				<view class="item df">
					<view class="icon"></view>
					<view class="text">电费</view>
				</view>

				<view class="item yc">
					<view class="icon"></view>
					<view class="text">燃气费</view>
				</view>
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
		components: {},
		data() {
			return {
				userInfo: {},
				houseList: []
			}
		},
		computed: {
			...mapState(['user', 'community'])
		},
		methods: {
			//获取住房列表
			getHomeList() {
				// const _this = this;
				// let canshu = {
				// 	id: uni.getStorageSync("HOUSE_MSG").roomId
				// }
				// api.my.getInfo(canshu).then(res => {
				// 	if (res.status !== '0') {
				// 		return
				// 	};
				// 	_this.userInfo = res.data
				// 	console.log(res)
				// })
			},
			async toWyjf() {
				uni.navigateTo({
					url: "/pages/indexPages/choosehome/index?isWyjf=true",
				});
			},
			// 获取个人信息
			getUserInfo(){
				this.userInfo=this.user
			},
		},
		onShow() {
			this.getHomeList();
			this.getUserInfo()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '生活缴费',
			});
		},
	}
</script>

<style scoped lang="less">
	.dividing {
		height: 20rpx;
		background: #F5F5F5;
	}

	.contianer {
		padding: 25rpx;
	}

	.entry-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.item {
		width: 670rpx;
		height: 160rpx;
		border-radius: 10rpx;
		overflow: hidden;
		padding: 0 40rpx;
		box-sizing: border-box;

		display: flex;
		align-items: center;
		color: #FFFFFF;
		font-size: 36rpx;
		margin-bottom: 30rpx;

		&:active {
			transform: scale(0.98);
		}

		.icon {
			width: 72rpx;
			height: 72rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: center center;
			margin-right: 40rpx;
		}

		&.wy {
			background: url(../static/property/bg_wy.png) no-repeat;
			background-size: 100% 100%;

			.icon {
				background-image: url(../static/property/icon_wy.png);
			}
		}

		&.sf {
			background: linear-gradient(to right, #EDB430, #FED881);

			.icon {
				background-image: url(../static/property/icon_sf.png);
			}
		}

		&.df {
			background: linear-gradient(to right, #F76161, #F86E78);

			.icon {
				background-image: url(../static/property/icon_df.png);
			}
		}

		&.yc {
			background: linear-gradient(to right, #20CE8B, #78F2B1);

			.icon {
				background-image: url(../static/property/icon_qf.png);
			}
		}
	}

	.title {
		font-size: 36rpx;
		color: #020204;
		margin-bottom: 35rpx;
	}
</style>
