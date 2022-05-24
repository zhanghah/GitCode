<template>
	<view class="">
		<view class="base block">
		<view class="title">{{recommendList.title}}</view>
		
		<view class="price">
			<view class="col col1">
				<view class="label">参考价格（均价）</view>
				<view class="number">{{recommendList.houseResponse.price}}<view class="ext">元/平</view>
				</view>
			</view>
			<view class="col">
				<view class="label">建面</view>
				<view class="number">{{recommendList.houseResponse.buildingArea}}㎡</view>
			</view>
			<!-- <view class="col">
				<view class="label">在租房源</view>
				<view class="number">13套</view>
			</view> -->
		</view>
		<view class="info">
			<view class="info-title">房屋信息</view>
		
			<view class="row">
				<view class="col">
					<view class="label">类型:</view>
					<view class="value">{{recommendList.roomType}}</view>
				</view>
				<view class="col">
					<view class="label">户型</view>
					<view class="value">{{recommendList.houseNew.houseTypeName||""}}</view>
				</view>
			</view>
			<view class="row">
				<view class="col">
					<view class="label">区域:</view>
					<view class="value">{{vname}}</view>
				</view>
				<view class="col">
					<view class="label">开盘:</view>
					<view class="value">{{recommendList.houseNew.openTime |date('YYYY-MM-DD')}}</view>
				</view>
			</view>
		</view>
		</view>
		<view class="desc block">
			<view class="title">
				房源描述
			</view>
			<view class="content">
				{{recommendList.houseNew.remark}}
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
		components: {beforeMap},
		props: {
		  recommendList: {
		    type: Object,
		    default(){
				return {}
			}
		  }
		},
		data() {
			return {
				detailId: "",
				vname:''
			};
		},
		computed: {
			loctionDu(){
				let log=this.recommendList.community.location
				return log
			},
			...mapState(['user']),
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '房源详情',
			});
		},
		methods: {
			// 截取区域末尾
			subStr(){
				let str=this.recommendList.community.vname
				this.vname=str.substring(str.lastIndexOf(',')+1)
			}
		},
		mounted() {
			this.subStr()
		}
	}
</script>

<style scoped lang="less">
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
				flex: 1;
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
