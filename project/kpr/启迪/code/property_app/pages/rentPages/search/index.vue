<template>
	<view :class="['page-search-index', { lock }]">
		<view class="search-box">
			<view class="icon"></view>
			<!-- <view class="text">请输入小区名称</view> -->
			<input type="text" style="width: 480rpx;" value="" v-model="inputName" placeholder="请输入小区名称" />
			<text @click="searchGo">搜索</text>
		</view>
		<view class="el-search-wrap">
			<el-search @resetHandler="reset" @getHouseSX="getHouseSX" :propsData="recommendList" @cityId="cityId"></el-search>
		</view>

		<view class="tip">
			为您推荐{{recommendList.length}}个新房房源
		</view>
		<view class="list">
			<view :class="['item', { last: index === recommendList.length }]" v-for="(item,index) in recommendList" :key="index" @click="toDetailPage(item.id)">
				<view class="image">
					<!-- <image></image> -->
					<image mode="aspectFill" :src="`${imageView}${item.fileList[0].filePath}`" />
				</view>

				<view class="info">
					<view class="top">
						<view class="name">
							{{item.title||item.community.propertyName}}
						</view>
						<view class="desc" v-if="infoType=='newHouse'">
							{{item.community.name}} | 建面{{item.houseResponse.buildingArea}}㎡
						</view>
						<view class="desc" v-if="infoType=='secondHouse'">
							{{item.community.name}} | {{item.houseSecond.houseTypeName}} | {{item.houseSecond.buildingArea}}㎡ | {{item.houseSecond.orientations}}
						</view>
						<view class="desc" v-if="infoType=='community'">
							<view>{{item.community.address}}</view>
							<view >在售{{item.community.countHouseSecond}}套&nbsp; 在租{{item.community.countHouseRent}}套</view>
						</view>
						<view class="desc" v-if="infoType=='rentHouse'">
							{{item.community.name}} | {{item.houseRent.houseTypeName}} | {{item.houseRent.buildingArea}}㎡ | {{item.houseRent.orientations}}
						</view>
						<view class="desc" v-if="infoType=='dealHouse'">
							{{item.community.name}} | {{item.houseDeal.houseTypeName}} | {{item.houseDeal.buildingArea}}㎡ | {{item.houseDeal.orientations}}
						</view>
					</view>
					<view class="price">
						<view class="unit" v-if="infoType=='newHouse'">{{item.houseNew.price}}元/平</view>
						<view class="unit" v-if="infoType=='secondHouse'">
							<text class="unit">{{(item.houseSecond.price/10000)}}万元</text>
							<text class="avg_price">{{item.houseSecond.avgPrice}}元/平</text>
						</view>
						<view class="unit" v-if="infoType=='community'">{{item.houseResponse.price}}元/平</view>
						<view class="unit" v-if="infoType=='rentHouse'">
							<text>{{item.houseRent.price}}</text>
							<text>元/{{item.houseRent.rentTime=='1'?'年':'月'}}</text>
						</view>
						<text class="unit" v-if="infoType=='dealHouse'">{{item.houseDeal.price}}元</text>
						<text class="avg_price" v-if="infoType=='dealHouse'">{{item.houseDeal.avgPrice}}元/平</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import api from "@/api"
	import ElSearch from '../components/elsearch';

	export default {
		components: {
			ElSearch
		},
		data() {
			return {
				loadingShow: false,
				current:1,
				size: 20,
				total:0,
				inputName: "",
				recommendList: [],
				searchData:{},
				infoType:'',
				lock: false,
			};
		},
		mounted() {
			this.getPageHouse();
			this.clearSearch()
		},
		computed: {
			...mapState(['user', "imageView", "community", 'search']),
			
		},
		onLoad(opt) {
			this.infoType=opt.type
		},

		methods: {
			// 进入看房列表加载完成前清空store中相关数据
			clearSearch(){
				let obj=this.search;
				for(let key in obj){
					obj[key]=''
				}
			},
			toDetailPage(id) {
				console.log(id)
				uni.navigateTo({
					url: `../comdetail/index?id=${id}`,
				});
			},
			// 初次加载
			async getPageHouse() {
				try{
					this.recommendList=[]
					const params={
						infoStatus: 1,
						infoType: this.infoType,
						pageParam: {
							current: this.current,
							size: this.size
						},
						propertyId: this.user.propertyId
					}
					Object.assign(params, this.searchData);
					if(this.infoType=="newHouse"){
						const res =await api.service.getPageHouseNew(params)
						res.data.records.forEach(item=>{
							this.recommendList.push(item);
						});
						this.total=res.data.total;
						this.current=res.data.current;
					}else if(this.infoType=="secondHouse"){
						const res =await api.service.getPageHouseSecond(params)
						res.data.records.forEach(item=>{
							this.recommendList.push(item);
						});
						this.total=res.data.total;
						this.current=res.data.current;
					}else if(this.infoType=="community"){
						const res =await api.service.getPageCommunity(params)
						res.data.records.forEach(item=>{
							this.recommendList.push(item);
						});
						this.total=res.data.total;
						this.current=res.data.current;
					}else if(this.infoType=="rentHouse"){
						const res =await api.service.getPageHouseRent(params)
						res.data.records.forEach(item=>{
							this.recommendList.push(item);
						});
						this.total=res.data.total;
						this.current=res.data.current;
					}else {
						const res =await api.service.getPageHouseDeal(params)
						res.data.records.forEach(item=>{
							this.recommendList.push(item);
						});
						this.total=res.data.total;
						this.current=res.data.current;
					}
				}catch(err){
					//
				}finally{
					uni.stopPullDownRefresh();
				}
				
			},
			
			// 上拉加载
			loadMore(i) {
				if (this.total > this.size * this.current) {
					this.current++;
						this.getPageHouse()
				} else {
					uni.showToast({
						title:'已经全部加载'
					})
				}
			},
			
			
			// 重置
			reset(){
				this.inputName='';
				let obj=this.search;
				for(let key in obj){
					obj[key]=''
				}
				this.searchData={}
				this.getPageHouse();
			},
			// 查看房源
			getHouseSX(e){
				this.searchData=e;
				this.getPageHouse()
			},
			// 模糊查询搜索房屋
			searchGo() {
				this.searchData.name=this.inputName
				this.getPageHouse()
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.recommendList = []
			this.getPageHouse()
		},
		onReachBottom(){
			this.loadMore()
		},
	}
</script>

<style scoped lang="less">
	.page-search-index {
		min-height: 100vh;
		box-sizing: border-box;
		padding: 25rpx;

		&.lock {
			height: 100vh;
			overflow: hidden;
		}
	}

	.search-box {
		height: 99rpx;
		background: #FFFFFF;
		border: 1rpx solid #F5F5F5;
		box-shadow: 0rpx 5rpx 16rpx 0rpx #E6E6E6;
		border-radius: 8rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 25rpx;
		box-sizing: border-box;
		color: #808080;
		font-size: 32rpx;
		margin-bottom: 10rpx;

		.icon {
			width: 34rpx;
			height: 34rpx;
			background: url(../static/icon_search.png) no-repeat;
			background-size: 100% 100%;
			// margin-right: 30rpx;
		}
	}

	.el-search-wrap {}

	.tip {
		color: #999999;
		font-size: 26rpx;
		text-align: center;
		margin-top: 30rpx;
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
					.avg_price{
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
