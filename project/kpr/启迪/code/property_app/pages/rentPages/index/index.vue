<template>
	<view class="page-rent-index">
		<view class="search-box" @tap="toSearchIndexPage">
			<view class="icon"></view>
			<view class="text">搜索</view>
		</view>

		<view class="features">
			<view class="col" @click="HouseNew(item.type,item.name)" v-for="(item,index) in auslesenList" :key="index">
				<view class="icon xf">
					<image :src="item.image"></image>
				</view>
				<view class="label">{{item.name}}</view>
			</view>
		</view>

		<view class="house-source">
			<view class="left">
				<view class="label">
					房源数据
				</view>

				<view class="com" @click="selectPlot">
					{{housingListOne.name}}
				</view>
			</view>

			<view class="right">
				<view class="col">
					<view class="number">
						{{housingListOne.countHouseNew}}
					</view>
					<view class="label">
						新房
					</view>
				</view>

				<view class="col">
					<view class="number">
						{{housingListOne.countHouseSecond}}
					</view>
					<view class="label">
						二手房
					</view>
				</view>

				<view class="col">
					<view class="number">
						{{housingListOne.countHouseRent}}
					</view>
					<view class="label">
						租房
					</view>
				</view>

				<view class="col">
					<view class="number">
						{{housingListOne.countHouseDeal}}
					</view>
					<view class="label">
						已成交
					</view>
				</view>
			</view>
		</view>

		<view class="house-list">
			<view class="house-top">
				<view class="label">
					推荐房源
				</view>

				<view class="type">
					<ui-tabs :dataList="tabList" initKey="xf" @change="handChangeTabs"></ui-tabs>
				</view>
			</view>

			<view class="list">
				<view v-if="recommendList.length=='0'" class="noData">
					无数据请切换类型或小区
				</view>
				<view :class="['item', { last: index === recommendList.length }]" v-for="(item,index) in recommendList" :key="index"
				 @click="toDetailPage(item.id)">

					<view class="image">
						<image mode="aspectFill" :src="`${imageView}${item.fileList[0].filePath}`" />
					</view>

					<view class="info">
						<view class="top">
							<view class="name">
								{{item.title}}
							</view>
							<view class="desc" v-if="infoTypeParams=='newHouse'">
								{{item.community.name}} | 建面{{item.houseResponse.buildingArea}}㎡
							</view>
							<view class="desc" v-if="infoTypeParams=='secondHouse'">
								{{item.community.name}} | {{item.houseSecond.houseTypeName}} | {{item.houseSecond.buildingArea}}㎡ |
								{{item.houseSecond.orientations}}
							</view>
							<view class="desc" v-if="infoTypeParams=='rentHouse'">
								{{item.community.name}} | {{item.houseRent.houseTypeName}} | {{item.houseRent.buildingArea}}㎡ |
								{{item.houseRent.orientations}}
							</view>
						</view>
						<view class="price">

							<view class="unit" v-if="infoTypeParams=='newHouse'">{{item.houseNew.price}}元/平</view>
							<view class="unit" v-if="infoTypeParams=='secondHouse'">
								<text>{{(item.houseSecond.price/10000)}}万元</text>
								<text class="avg_price">{{item.houseSecond.avgPrice}}元/平</text>
							</view>
							<view class="unit" v-if="infoTypeParams=='rentHouse'">
								<text>{{item.houseRent.price}}</text>
								<text>元/{{item.houseRent.rentTime=='1'?'年':'月'}}</text>
							</view>
						</view>
					</view>

				</view>

				<!-- //底部 loding  -->
				<view class="loading-box" v-if="loadingShow">
					<u-loading :show="loadingShow" mode="flower" size="40"></u-loading>
					加载中···
				</view>
			</view>

		</view>

		<tab-bar :setting="tabBar"></tab-bar>
		<!-- 小区选择弹框x选择 -->
		<view class="">
			<template>
				<u-popup v-model="show" mode="bottom" border-radius="50" class="popup-box">
					<view class="" style="text-align:center;line-height: 90rpx;">
						请选择小区
					</view>
					<scroll-view scroll-y="true" class="scroll-box">
						<view class="scroll-item" v-for="(item,index) in housingList" :key="index" @click="SelectCell(item.id)">{{item.name}}</view>
					</scroll-view>
					<view class="quxiao" @click="quxiao">
						取消
					</view>
				</u-popup>
			</template>
		</view>

		<u-picker mode="selector" v-model="show" :default-selector='[0]' :range="housingList" range-key="name" @confirm="handelOk"
		 @cancel="cancel"></u-picker>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import api from "@/api"

	import iconWt from '../static/tabbar/icon_wt.png';
	import iconWta from '../static/tabbar/icon_wt_active.png';
	import iconZs from '../static/tabbar/icon_zs.png';
	import iconZsa from '../static/tabbar/icon_zs_active.png';

	export default {
		components: {},
		data() {
			return {
				housingList: [],
				current: 1,
				total: 0,
				size: 10,
				loadingShow: false,
				show: false,
				//小区ID
				cellId: "",
				recommendList: [],
				infoTypeParams: "newHouse",
				//单调筛选数据
				housingListOne: "",
				tabList: [{
						label: '新房',
						key: 'xf',
					},
					{
						label: '二手房',
						key: 'esf',
					},
					{
						label: '租房',
						key: 'zf',
					},
				],
				auslesenList: [{
						image: "../static/rent/icon_xf.png",
						name: "新房",
						type: "newHouse"
					},
					{
						image: "../static/rent/icon_esf.png",
						name: "二手房",
						type: "secondHouse"
					},
					{
						image: "../static/rent/icon_xq.png",
						name: "小区",
						type: "community"
					},
					{
						image: "../static/rent/icon_zf.png",
						name: "租房",
						type: "rentHouse"
					},
					{
						image: "../static/rent/icon_ycj.png",
						name: "已成交",
						type: "dealHouse"
					},
				],
				tabBar: {
					color: "#7A7A7C",
					selectedColor: "#1B76FF",
					list: [{
							pagePath: "/pages/rentPages/index/index",
							iconPath: iconZs,
							selectedIconPath: iconZsa,
							text: "租售"
						},
						{
							pagePath: "/pages/rentPages/entrust/index",
							iconPath: iconWt,
							selectedIconPath: iconWta,
							text: "委托"
						},
					],
				},
			};
		},
		// 上拉加载
		onReachBottom() {
			if (this.total > this.size * this.current) {
				this.current++;
				this.rentGetpage()
			} else {
				uni.showToast({
					title: '已经全部加载'
				})
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.recommendList = []
			this.rentGetpage()
		},
		computed: {
			...mapState(['user', 'community', "imageView"]),

		},
		mounted() {
			this.listStatistic();
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '租售中心',
			});
		},
		methods: {
			...mapMutations("search", {
				searchComIds: "searchComIds"
			}),

			cancel() {
				this.show = false
			},
			handelOk(id) {
				this.cellId = id
				console.log(3331, this.housingList)
				let newData = this.housingList.filter(t => t.id == id)
				this.housingListOne = newData[0]
				this.searchComIds(this.housingListOne.id)
				this.show = false
				this.rentGetpage()
			},
			//选择小区
			SelectCell(id) {},
			// 头部跳转房源
			HouseNew(type, name) {
				uni.navigateTo({
					url: `../search/index?type=${type}&name=${name}`,
				})
			},
			// 统计租售数量接口
			async listStatistic() {
				let res = await api.service.listStatistic({})
				this.housingList = res.data
				this.housingListOne = res.data[0]
				this.cellId = res.data[0].id
				this.searchComIds(res.data[0].id)
				this.rentGetpage()
			},
			// 推荐房源的分页列表
			async rentGetpage() {
				try {
					let params = {
						comId: this.community.id,
						infoStatus: 1,
						infoType: this.infoTypeParams,
						pageParam: {
							current: this.current,
							size: this.size
						},
					}
					let res = await api.service.rentGetpage(params)
					this.recommendList = res.data.records
					this.total = res.data.total
				} catch (err) {
					//
				} finally {
					uni.stopPullDownRefresh();
				}

			},
			// 切换推荐房源的tab
			handChangeTabs(e) {
				console.log(e)
				switch (e) {
					case "xf":
						console.log("新房")
						this.infoTypeParams = "newHouse"
						this.rentGetpage()
						break
					case "esf":
						this.infoTypeParams = "secondHouse"
						this.rentGetpage()
						console.log("二手房")
						break
					case "zf":
						this.infoTypeParams = "rentHouse"
						this.rentGetpage()
						console.log("租房")
						break
				}
			},
			toDetailPage(id) {
				console.log(id)
				uni.navigateTo({
					url: `../comdetail/index?id=${id}`,
				});
			},
			toSearchIndexPage() {
				uni.navigateTo({
					url: '../search/input',
				});
			},
			//选择小区
			selectPlot() {
				this.show = true

			}
		}
	}
</script>

<style scoped lang="less">
	.noData {
		text-align: center;
		margin-top: 200rpx;
		font-size: 34rpx;
		color: #999;
	}

	.quxiao {
		text-align: center;
		line-height: 80rpx;
		height: 105rpx;
		border-top: solid 25rpx #F5F5F5;
	}

	.scroll-box {
		max-height: 310rpx;
		width: 750rpx;
		text-align: center;
	}

	.scroll-item {
		width: 750rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #333;
		font-size: 30rpx;
		font-weight: 500;
	}

	.popup-box {
		width: 750rpx;
	}

	.page-rent-index {
		min-height: 100vh;
		box-sizing: border-box;
		padding: 25rpx;
		padding-bottom: 110rpx;
	}

	.search-box {
		height: 99rpx;
		background: #FFFFFF;
		border: 1rpx solid #F5F5F5;
		box-shadow: 0rpx 5rpx 16rpx 0rpx #E6E6E6;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		padding: 0 25rpx;
		box-sizing: border-box;
		color: #808080;
		font-size: 32rpx;
		margin-bottom: 50rpx;

		.icon {
			width: 34rpx;
			height: 34rpx;
			background: url(../static/icon_search.png) no-repeat;
			background-size: 100% 100%;
			margin-right: 30rpx;
		}
	}

	.features {
		margin-bottom: 60rpx;
		display: flex;
		justify-content: space-between;

		.col {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.icon {
			width: 110rpx;
			height: 110rpx;
			overflow: hidden;
			border-radius: 50%;
			margin-bottom: 25rpx;
			font-size: 30rpx;
			color: #666666;
		}
	}

	.house-source {
		display: flex;
		margin-bottom: 30rpx;

		.left {
			width: 220rpx;
			overflow: hidden;
			flex-shrink: 0;
			flex-grow: 0;

			.label {
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 18rpx;
			}

			.com {
				font-size: 30rpx;
				color: #1B76FF;
				padding-left: 30rpx;
				background: url(../static/rent/icon_com.png) no-repeat left center;
				background-size: 22rpx 26rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}

		.right {
			flex: 1;
			display: flex;
			justify-content: space-between;

			.col {
				flex: 1;
				text-align: center;
			}

			.number {
				font-size: 36rpx;
				font-weight: bold;
				color: #FB9200;
				margin-bottom: 14rpx;
			}

			.label {
				font-size: 24rpx;
				color: #666666;
			}
		}
	}

	.house-top {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.label {
			font-size: 34rpx;
			color: #333333;
			font-weight: bold;
		}

		.type {
			width: 400rpx;
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

			.info {
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
						font-size: 32rpx;
					}

					.avg_price {
						color: #666666;
						margin-left: 9rpx;
						font-size: 30rpx;
						font-style: PingFang-SC-Medium;
						font-weight: 500;
					}
				}
			}
		}
	}

	.loading-box {
		// style="text-align: center;height: 80rpx;" 
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: 500;
	}
</style>
