<template>
	<view class="page-com-detail">
		<view class="photo">
			<swiper class="swiper" :indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#000000" :autoplay="true">
				<swiper-item v-for="(item,i) in recommendList.fileList" :key="i">
					<view class="swiper-item" @click.stop="previewImage(recommendList.fileList)">
						<image style="width: 100%;height: 100%;" mode="scaleToFill" :src="`${imageView}${item.filePath}`"/>
					</view>
					<view class="num">{{i+1}}/{{recommendList.fileList.length}}</view>
				</swiper-item>
			</swiper>

		</view>
				<new-detail :recommendList="recommendList" v-if="status=='newHouse'"></new-detail>
				<second-house :recommendList="recommendList" v-if="status=='secondHouse'"></second-house>
				<rent-house :recommendList="recommendList" v-if="status=='rentHouse'"></rent-house>
				<community :recommendList="recommendList" v-if="status=='community'"></community>
				<deal-house :recommendList="recommendList" v-if="status=='dealHouse'"></deal-house>
		

		<view class="bar">
			<view class="fav active" @click="keepTab">
				<view class="icon" v-if="iconStatus"></view>
				<view class="icons" v-else></view>
				<view class="label">收藏</view>
			</view>

			<view class="btn-wrap" @click="call">
				<ui-button >联系TA</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import secondHouse from "../components/houceDetail/secondHouseDetail.vue"
	import rentHouse from "../components/houceDetail/rentHouseDetail.vue"
	import newDetail from "../components/houceDetail/newDetail.vue"
	import community from "../components/houceDetail/communityDetail.vue"
	import dealHouse from "../components/houceDetail/dealHouseDetail.vue"
	import api from "@/api"
	import {
		mapState,
		imageView,
		mapMutations
	} from 'vuex';

	export default {
		components: {newDetail,secondHouse,rentHouse,community,dealHouse},
		data() {
			return {
				detailId: "",
				recommendList:"",
				status:"",
				iconStatus:false,
				phoneCode:""
			};
		},
		computed: {
			...mapState(['user',"imageView"]),
		},
		onLoad(option) {
			console.log(option)
			this.detailId = option.id
			this.getInfo()
			uni.setNavigationBarTitle({
				title: '房源详情',
			});
		},
		methods: {
			// 获取资源
			async getInfo() {
				let params = {
					id:this.detailId,
				}
				let res = await api.service.getInfo(params)
				console.log(445, res)
				let roomType=res.data.houseResponse.roomType
				console.log(2,roomType)
				this.recommendList = res.data
				//处理居住类型
				this.roomType(res.data)
				this.status=res.data.infoType
				//电话号码获取
				this.phoneCode=res.data.contactPhone||res.data.records.contactPhone
				//收藏icon切换判断
				if(res.data.keepStatus=="1"){
					this.iconStatus=false
				}
				if(res.data.keepStatus=="2"){
					this.iconStatus=true
				}
				// this.recommendList=res.data.records
			},
			keepTab(){
				console.log(1,this.iconStatus)
				
				if(!this.iconStatus){
					console.log("收藏")
					this.setKeep()
				}else{
					console.log("取消收藏")
					this.cancelKeep()
				}
				this.iconStatus=!this.iconStatus
			},
			async setKeep() {
				let params = {
					id:this.user.id,
					// propertyId:"601f13f8fb674885903116445e2cbf00",
					linkIds:[this.detailId]
				}
				let res = await api.service.setKeep(params)
				console.log(333,res)
			},
			async cancelKeep() {
				let params = {
					id:this.user.id,
					linkIds:[this.detailId]
				}
				let res = await api.service.cancelKeep(params)
				console.log("取消收藏",res)
			},
			call(){
				uni.makePhoneCall({
				    phoneNumber:this.phoneCode
				});
			},
			toDetailPage() {
				uni.navigateTo({
					url: '../roomdetail/index',
				});
			},
			roomType(data){
				// roomTypeData
				var roomTypeData
				let datas=data.houseResponse.roomType||"没有"
				switch(datas){
					case "house":
						roomTypeData="住宅"
					  break
					case "villa":
						roomTypeData="别墅"
					   break 
					case "business":
						roomTypeData="商业"
					  break
					case "office":
						roomTypeData="写字楼"
					  break
					case "industry":
						roomTypeData="工业"
					  break
					case "highRise":
					    roomTypeData="高层"
					  break
					 default:
						roomTypeData=""
					return roomTypeData
				}
				this.recommendList.roomType=roomTypeData
			},
			
			// 预览图片
			previewImage(item) {
				let imgArr = [];
				item.forEach(res => {
					imgArr.push(`${this.imageView}${res.filePath}`);
				})
				uni.previewImage({
					urls: imgArr,
					current: imgArr
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.page-com-detail {
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
			padding: 0rpx 25rpx;
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

	// .info {
	// 	font-size: 28rpx;
	// 	color: #666666;
	// 	margin-bottom: 70rpx;

	// 	.info-title {
	// 		margin-bottom: 40rpx;
	// 	}

	// 	.row {
	// 		display: flex;
	// 		margin-bottom: 20rpx;
	// 	}

	// 	.col {
	// 		flex: 1;
	// 		display: flex;
	// 	}

	// 	.label {
	// 		color: #999;
	// 		width: 120rpx;
	// 		text-align: justify;
	// 		text-align-last: justify;
	// 		margin-right: 20rpx;
	// 	}

	// 	.value {
	// 		color: #333;
	// 	}
	// }

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
			.icons {
				width: 38rpx;
				height: 36rpx;
				background: url(../static/rent/icon_favs.png) no-repeat;
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
