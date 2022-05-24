<template>
	<view class="">
		<view class="base block">
		<view class="title">{{recommendList.community.name}}</view>
		
		<view class="price">
			<view class="col col1">
				<view class="label">参考价格(均价)</view>
				<view class="number">{{recommendList.houseResponse.price+".0元/平"}}<view class="ext"></view>
				</view>
			</view>
			<view class="col" >
				<view class="label">在售房源</view>
				<view class="number">{{recommendList.community.countHouseSecond}}套</view>
			</view>
			<view class="col">
				<view class="label">在租房源</view>
				<view class="number">{{recommendList.community.countHouseRent}}套</view>
			</view>
			
		</view>
		<view class="info">
			<view class="info-title">房屋信息</view>
		
			<view class="row">
				<view class="col">
					<view class="label">建造年代:</view>
					<view class="value">{{recommendList.houseResponse.buildingYear}}年</view>
				</view>
				<view class="col">
					<view class="label">占地面积:</view>
					<view class="value">{{recommendList.houseResponse.coverArea}}㎡</view>
				</view>
			</view>
			<view class="row">
				<view class="col">
					<view class="label">建筑类型:</view>
					<view class="value">{{recommendList.roomType}}</view>
				</view>
				<view class="col">
					<view class="label">物业名称:</view>
					<view class="value">{{recommendList.community.propertyName}}</view>
				</view>
			</view>
			<view class="row">
				<view class="col">
					<view class="label">绿化率:</view>
					<view class="value">{{recommendList.houseResponse.greenRate+".0"}}</view>
				</view>
				<view class="col">
					<view class="label">容积率:</view>
					<view class="value">{{recommendList.houseResponse.volumetricRate+".0"}}</view>
				</view>
			</view>
			<view class="row">
				<view class="col">
					<view class="label">详细地址:</view>
					<view class="value">{{recommendList.community.vname}}</view>
				</view>
			</view>
		</view>
		
	
		
		</view>
		<view class="desc block">
			<view class="title">
				房源描述
			</view>
			<view class="content">
				{{recommendList.rentSaleCommunity.remark}}
			</view>
			<view class="">
				<before-map :loctionDu="loctionDu"></before-map>
			</view>
		</view>
		
		<view class="room-block">
			<view class="title-warp">
				<view class="title">小区二手房</view>
				<view class="more">
					查看更多{{SecondList.length}}套二手房
				</view>
			</view>
		
			<view class="list">
				<view :class="['item', { last: i === SecondList.length }]" v-for="(item,index) in SecondList" :key="index"  @click="toDetailPage(item.id)">
					<view class="image">
						<image mode="aspectFill" :src="`${imageView}${item.fileList[0].filePath}`"/>
					</view>
		
					<view class="content">
						<view class="top">
							<view class="name">
								{{item.title}}
							</view>
							<view class="desc">
								{{item.community.name}} | {{item.houseResponse.buildingArea}}㎡
							</view>
						</view>
						<view class="price">
							{{item.houseResponse.avgPrice}} <view class="unit">元/平</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="room-block">
			<view class="title-warp">
				<view class="title">租房</view>
				<view class="more">
					查看更多{{RentList.length}}套二手房
				</view>
			</view>
		
			<view class="list">
				<view :class="['item', { last: index === RentList.length }]" v-for="item in RentList" :key="index" @click="toDetailPage(item.id)">
					<view class="image">
						<image mode="aspectFill" :src="`${imageView}${item.fileList[0].filePath}`"/>
					</view>
		
					<view class="content">
						<view class="top">
							<view class="name">
								{{item.title}}
							</view>
							<view class="desc">
								{{item.community.name}} | {{item.houseResponse.buildingArea}}㎡
							</view>
						</view>
						<view class="price">
							{{item.houseResponse.avgPrice}} <view class="unit">元/平</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import beforeMap from "../map/beforeMap.vue"
	import api from "@/api"
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
				return{}
			}
		  }
		},
		data() {
			return {
				RentList:[],
				SecondList:[],
				detailId: "",
				vname:'',
				// recommendList:""
			};
		},
		computed: {
			loctionDu(){
				let log=this.recommendList.community.location
				return log
			},
			...mapState(['user','community',"imageView","search"]),
		},
		onLoad(option) {
			this.detailId = option.id
			this.getInfo()
			uni.setNavigationBarTitle({
				title: '房源详情',
			});
		},
		beforeMount() {
			this.houseSecondList()
			this.houseRentList()
		},
		methods: {
			//二手房列表
			async houseSecondList(){
				console.log(999,this.search)
				let params={
					comId:this.search.searchComId,
					infoType:"secondHouse",
					pageParam:{"current":1,"size":10},
					propertyId:this.$config.propertyId,
					}
				let res = await api.service.rentGetpage(params)
				this.SecondList=res.data.records
			},
			//租房列表
			async houseRentList(){
				let params={
					comId:this.search.searchComId,
					infoType:"rentHouse",
					pageParam:{"current":1,"size":10},
					propertyId:this.$config.propertyId,
					}
				let res = await api.service.rentGetpage(params)
				console.log(442,res)
				this.RentList=res.data.records
			},
			toDetailPage(id) {
				// uni.navigateTo({
				// 	url: '../roomdetail/index',
				// });
				uni.navigateTo({
					url: `../comdetail/index?id=${id}`,
				});
			},
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
				flex: 2;
				color: #999999;
				font-size: 28rpx;
			}
	
			.col1 {
				flex: 3;
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
	.room-block {
		padding: 25rpx;
	
		border-bottom: 20rpx solid #F5F5F5;
	
		.title-warp {
			display: flex;
			justify-content: space-between;
			color: #333333;
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
	
		.title {
			font-weight: bold;
		}
	
		.more {
			color: #999999;
			font-size: 28rpx;
		}
	}
	.list {
		.item {
			padding: 30rpx 0;
			border-bottom: 1rpx solid #E6E6E6;
			display: flex;
	
			&.last {
				border-bottom: none;
			}
	
			.image {
				width: 200rpx;
				height: 200rpx;
				background: #e7e7e7;
				flex-shrink: 0;
				flex-grow: 0;
				margin-right: 26rpx;
			}
	
			.content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				color: #333333;
				font-size: 34rpx;
	
				.desc {
					margin-top: 22rpx;
					font-size: 28rpx;
					color: #999999;
				}
	
				.price {
					color: #FB9200;
					font-size: 32rpx;
					font-weight: bold;
	
					display: flex;
					align-items: flex-end;
	
					.unit {
						font-size: 24rpx;
					}
				}
			}
		}
	}

	
</style>
