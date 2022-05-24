<template>
	<view class="page-rent-detail">
    <view class="photo">
			<swiper class="swiper" 
				:indicator-dots="true"
				indicator-color="#FFFFFF"
				indicator-active-color="#000000"
				:autoplay="true"
			>
				<swiper-item>
					<view class="swiper-item">
						<image src="#" mode="" />
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">C</view>
				</swiper-item>
			</swiper>

			<view class="num">2/4</view>
		</view>

		<view class="base block">
			<view class="title">金辉城春上南滨</view>

			<view class="price">
				<view class="col">
					<view class="label">参考价格（均价）</view>
					<view class="number">52,965<view class="ext">元/平</view></view>
				</view>
				<view class="col">
					<view class="label">建面</view>
					<view class="number">89-138㎡</view>
				</view>
			</view>

			<!-- 月租使用 -->
			<view class="price">
				<view class="money">1,500 <view class="ext">元/月</view></view>

				<view class="tag">押一付三</view>
			</view>

			<view class="info room-info">
				<view class="info-title">房屋信息</view>

				<view class="row">
					<view class="col">
						<view class="label">类 型:</view>
						<view class="value">{{recommendList.roomType}}</view>
					</view>
					<view class="col">
						<view class="label">区 域:</view>
						<view class="value">重庆南岸区</view>
					</view>
				</view>
				<view class="row">
					<view class="col">
						<view class="label">户 型:</view>
						<view class="value">2/3/4居</view>
					</view>
					<view class="col">
						<view class="label">开 盘:</view>
						<view class="value">2018.09.03</view>
					</view>
				</view>
			</view>

			<view class="info facility">
				<view class="info-title">配套设施</view>

				<view class="item-wrap">
					<view class="item tv have">
						<view class="icon"></view>
						<view class="label">电视</view>
					</view>

					<view class="item sofa have">
						<view class="icon"></view>
						<view class="label">沙发</view>
					</view>

					<view class="item yg">
						<view class="icon"></view>
						<view class="label">衣柜</view>
					</view>

					<view class="item rsq have">
						<view class="icon"></view>
						<view class="label">热水器</view>
					</view>

					<view class="item wbl have">
						<view class="icon"></view>
						<view class="label">微波炉</view>
					</view>

					<view class="item bed have">
						<view class="icon"></view>
						<view class="label">床</view>
					</view>

					<view class="item xyj have">
						<view class="icon"></view>
						<view class="label">洗衣机</view>
					</view>

					<view class="item kt have">
						<view class="icon"></view>
						<view class="label">空调</view>
					</view>

					<view class="item zz">
						<view class="icon"></view>
						<view class="label">桌子</view>
					</view>

					<view class="item nq have">
						<view class="icon"></view>
						<view class="label">暖气</view>
					</view>

					<view class="item kd have">
						<view class="icon"></view>
						<view class="label">宽带</view>
					</view>

					<view class="item bx have">
						<view class="icon"></view>
						<view class="label">冰箱</view>
					</view>
				</view>
			</view>
		</view>

		<view class="desc block">
			<view class="title">
				房源描述
			</view>
			<view class="content">
				房源内容
				房源内容房源内容房源内容房源内容房源内容房源内容房源内容房源内容房源内容
				房源内容
				房源内容
				房源内容
				房源内容
				房源内容
				房源内容
				房源内容
				房源内容
			</view>
		</view>

		<view class="bar">
			<view class="fav active">
				<view class="icon"></view>
				<view class="label">收藏</view>
			</view>

			<view class="btn-wrap">
				<ui-button>联系TA</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	export default {
		components: {
		},
		data() {
			return {
			};
		},
		computed: {
			...mapState(['user']),
		},
		onLoad() {
      uni.setNavigationBarTitle({
				title: '房源详情',
			});
		},
		methods: {
		}
	}
</script>

<style scoped lang="less">
	.page-rent-detail {
    min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 110rpx;
	}
	.block {
		padding: 25rpx;
		border-bottom: 20rpx solid #F5F5F5;
	}
	.photo {
		width: 100%;
		height: 750rpx;
		position: relative;

		.num {
			position: absolute;
			bottom: 25rpx;
			right: 25rpx;
			background-color: rgba(0, 0, 0, 0.5);
			padding: 5rpx 25rpx;
			color: #FFFFFF;
			font-size: 20rpx;
			height: 30rpx;
			border-radius: 30rpx;
		}

		.swiper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			height: 100%;
			background-color: #e7e7e7;
		}
	}

	.base {
		.title {
			font-size: 36rpx;
			color: #333333;
			font-weight: bold;
			padding: 20rpx 0;
		}

		.price {
			display: flex;
			margin-top: 30rpx;
			margin-bottom: 70rpx;
			align-items: center;
			.money {
				color: #FFA345;
				font-size: 32rpx;
				display: flex;
				align-items: flex-end;

				.ext {
					font-size: 28rpx;
				}
			}

			.tag {
				height: 36rpx;
				border: 1rpx solid #E6E6E6;
				font-size: 24rpx;
				color: #999999;
				padding: 0 14rpx;
				margin: 0 10rpx;
			}
			.col {
				flex: 1;
				color: #999999;
				font-size: 28rpx;
			}

			.number {
				margin-top: 20rpx;
				color: #FFA345;
				font-size: 36rpx;
				display: flex;
				align-items: flex-end;

				.ext {
					font-size: 28rpx;
				}
			}
		}
	}

	.info {
		font-size: 28rpx;
		color: #666666;
		margin-bottom: 70rpx;

		.info-title {
			margin-bottom: 40rpx;
		}

		.row {
			display: flex;
			margin-bottom: 20rpx;
		}
		.col {
			flex: 1;
			display: flex;
		}

		.label {
			color: #999;
			
		}
		.value {
			color: #333;
		}
	}
	
	.room-info {
		.label {
			width: 120rpx;
			text-align: justify;
			text-align-last: justify;
			margin-right: 20rpx;
		}
	}
	
	.facility {
		margin-bottom: 0;
		.label {
			color: #999999;
			text-decoration:line-through; 
		}

		.item-wrap {
			display: flex;
			flex-wrap: wrap;
		}

		.item {
			width: 25%;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			
			.icon {
				width: 48rpx;
				height: 48rpx;
				background-repeat: no-repeat;
				background-position: center center;
				background-size: 100% 100%;
				margin-right: 20rpx;
			}

			&.tv {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_ltv.png);
				}
			}

			&.sofa {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lsofa.png);
				}
			}

			&.yg {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lyg.png);
				}
			}

			&.rsq {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lrsq.png);
				}
			}

			&.wbl {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lwbl.png);
				}
			}

			&.bed {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lbed.png);
				}
			}

			&.xyj {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lxyj.png);
				}
			}

			&.kt {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lkt.png);
				}
			}

			&.zz {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lzz.png);
				}
			}

			&.nq {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lnq.png);
				}
			}

			&.kd {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lkd.png);
				}
			}

			&.bx {
				.icon {
					background-image: url(../static/rent/facility/icon_zszx_lbx.png);
				}
			}

			&.have {
				.label {
					color: #0B1B37;
					text-decoration: none;
				}

				&.tv {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_tv.png);
					}
				}

				&.sofa {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_sofa.png);
					}
				}

				&.yg {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_yg.png);
					}
				}

				&.rsq {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_rsq.png);
					}
				}

				&.wbl {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_wbl.png);
					}
				}

				&.bed {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_bed.png);
					}
				}

				&.xyj {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_xyj.png);
					}
				}

				&.kt {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_kt.png);
					}
				}

				&.zz {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_zz.png);
					}
				}

				&.nq {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_nq.png);
					}
				}

				&.kd {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_kd.png);
					}
				}

				&.bx {
					.icon {
						background-image: url(../static/rent/facility/icon_zszx_bx.png);
					}
				}
			}
		}
	}

	.desc {
		.title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 40rpx;
		}

		.content {
			color: #666666;
			font-size: 28rpx;
		}
	}

	.bar {
		padding: 0 25rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 110rpx;
		border-top: 1rpx solid #F5F5F5;

		.fav {
			color: #333333;
			font-size: 30rpx;
			padding: 0 20rpx;
			margin-right: 30rpx;
			display: flex;

			.icon {
				width: 38rpx;
				height: 36rpx;
				background: url(../static/rent/icon_fav.png) no-repeat;
				background-size: 100% 100%;
				margin-right: 15rpx;
			}

			&.active {
				.icon {
					background-image: url(../static/rent/icon_fav_active.png);
				}
			}
		}

		.btn-wrap {
			flex: 1;
		}
	}
</style>

