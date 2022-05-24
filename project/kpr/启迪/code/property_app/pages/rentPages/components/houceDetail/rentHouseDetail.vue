<template>
	<view class="">
		<view class="base block">
			<view class="title">{{recommendList.title}}</view>

			<view class="price">
				<view class="col col1">
					<!-- <view class="label">售价</view> -->
					<view class="number">{{recommendList.houseResponse.avgPrice.toFixed(1)}}元{{recommendList.houseResponse.rentTime=='1'?"年":"月"}}
						<view class="ext"></view>
						<text class="deposit">{{cash}}</text>
					</view>
				</view>
			</view>

			<view class="info">
				<view class="info-title">房屋信息</view>

				<view class="row">
					<view class="col">
						<view class="label">房型:</view>
						<view class="value">{{recommendList.houseRent.houseTypeName}}</view>
					</view>
					<view class="col">
						<view class="label">面积:</view>
						<view class="value">{{recommendList.houseRent.buildingArea}}㎡</view>
					</view>
				</view>
				<view class="row">
					<view class="col">
						<view class="label">楼层:</view>
						<view class="value">{{recommendList.houseResponse.floorNumber+"/"+recommendList.houseResponse.floorCount}}层</view>
					</view>
					<view class="col">
						<view class="label">朝向:</view>
						<view class="value">{{recommendList.houseResponse.orientations}}</view>
					</view>
				</view>
				<view class="row">
					<view class="col">
						<view class="label">区域:</view>
						<view class="value">{{vname}}</view>
					</view>
					<view class="col">
						<view class="label">押金方式:</view>
						<view class="value">{{cash}}</view>
					</view>
				</view>
				<view class="row">
					<view class="col">
						<view class="label">出租类型:</view>
						<view class="value">{{recommendList.houseResponse.rentType=='1'?"整租":"合租"}}</view>
					</view>
					<view class="col">
						<view class="label">租期:</view>
						<view class="value">{{recommendList.houseResponse.rentTime=='1'?"年租":"月租"}}</view>
					</view>
				</view>
			</view>

			<view class="info">
				<view class="">配套设施</view>

				<view class="facility">
					<view class="facility-box">
						<view class="facility-item" v-for="(item,index) in recommendList.facilitiesList" :key="index">
							<image src="../../static/zhsqs.png" mode="" class="facility-img"></image>
							<text class="facility-text">{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="desc block">
			<view class="title">
				房源描述
			</view>
			<view class="content">
				{{recommendList.houseRent.remark}}
			</view>
			<view class="">
				<before-map :loctionDu="loctionDu"></before-map>
			</view>
		</view>
	</view>

</template>

<script>
	import api from "@/api"
	import beforeMap from "../map/beforeMap.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		components: {
			beforeMap
		},
		props: {
			recommendList: {
				type: Object,
				default(){
					return{}
				}
			}
		},
		data() {
			return {
				detailId: "",
				vname:'',
			};
		},
		computed: {
			cash() {
				let splitData = this.recommendList.houseRent.depositType.split(",")
				let cashs = "押" + splitData[0] + "付" + splitData[1]
				return cashs
			},
			loctionDu() {
				let log = this.recommendList.community.location
				return log
			},
			...mapState(['user']),

		},
		onLoad(option) {
			this.detailId = option.id
			this.getInfo()
			uni.setNavigationBarTitle({
				title: '房源详情',
			});
		},
		methods: {
			// 截取区域末尾
			subStr(){
				let str=this.recommendList.community.vname
				this.vname=str.substring(str.lastIndexOf(',')+1)
			},
		},
		mounted() {
			this.subStr()
		}
	}
</script>

<style scoped lang="less">
	.facility {
		width: 750rpx;

		.facility-box {
			width: 750rpx;
			display: flex;
			flex-wrap: wrap;

			.facility-item {
				width: 140rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;
				display: flex;
				align-items: center;

				.facility-img {
					width: 40rpx;
					height: 17rpx;
				}

				.facility-text {
					color: #333333;
					margin-left: 10rpx;
				}

			}
		}
	}

	.label-text {
		color: #333333;
	}

	.block {
		padding: 25rpx;
		border-bottom: 20rpx solid #F5F5F5;
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

			.tag {
				height: 36rpx;
				border: 1rpx solid #E6E6E6;
				font-size: 24rpx;
				color: #999999;
				padding: 0 14rpx;
				margin: 0 10rpx;
			}

			.col {
				flex: 2;
				color: #999999;
				font-size: 28rpx;
			}

			.col1 {
				flex: 2;
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
				.deposit{
					font-size: 26rpx;
					color: #999999; 
					margin-left: 10rpx;
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
			width: 120rpx;
			text-align: justify;
			text-align-last: justify;
			margin-right: 20rpx;
		}

		.value {
			color: #333;
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
</style>
