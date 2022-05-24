.<template>
	<view class="page-index">
		<template v-if="isNetWork">
			<view class="top-bar wrapper">
				<community></community>
			</view>

			<!-- 首页广告位 -->
			<view class="wrapper">
				<home-ad :source="adList"></home-ad>
			</view>

			<!-- 功能列表 -->
			<view class="feature-list wrapper">
				<mallfeatures></mallfeatures>
			</view>
			<view class="dividing"></view>

			<!-- 社区公告 -->
			<announcement :source="noticeList" @click.native="toNewsPage"></announcement>

			<view class="dividing"></view>

			<!-- 小区交流 -->
			<template>
				<activity :source="activityList"></activity>
				<view class="dividing"></view>
			</template>
			<view class="cell_v">
				<view class="navs">
					<text v-for="(item,index) in navLists" :key='index'  @click="cshua(index)"
						:class="isNavs==index?'act':''">{{item}}</text>
				</view>
				<view class="" v-for="(item,index) in navLists" :key='index' v-if="isNavs==index">
					<u-waterfall v-model="findListDate" ref="uWaterfall">
						<template v-slot:left="{leftList}">
							<view
								@click="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': item.id}})"
								class="cell" v-for="(item, index) in leftList" :key="index">
								<u-lazy-load threshold="-450" border-radius="15"
									:image="item.goodsResourceDtos?item.goodsResourceDtos[0].fileVisitUrl:''" img-mode='aspectFill'
									height="350" :index="index">
								</u-lazy-load>
								<view class="title">
									{{item.goodsName}}
								</view>
								<view class="tag-owner">
									<text>¥ <text>{{$uniPopup.numFilter(item.goodsSalePrice)}}</text> </text>
									<text class="yuanj">¥{{$uniPopup.numFilter(item.goodsPrice)}}</text>
								</view>
								<view class="moban" v-if="item.goodsStatus==3">
									<text>已下架</text>
								</view>
								<view class="moban" v-if="item.goodsStatus==4">
									<text>缺货</text>
								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view
								@click="$goPage(['/pages/mallUser/home/goodsDetails/goodsDetails'],function fun() {return {'id': item.id}})"
								class="cell" v-for="(item, index) in rightList" :key="index">
								<u-lazy-load threshold="-450" border-radius="15"
									:image="item.goodsResourceDtos?item.goodsResourceDtos[0].fileVisitUrl:''" img-mode='aspectFill'
									height="350" :index="index">X
								</u-lazy-load>
								<view class="title">
									{{item.goodsName}}
								</view>
								<view class="tag-owner">
									<text>¥ <text>{{$uniPopup.numFilter(item.goodsSalePrice)}}</text> </text>
									<text class="yuanj">¥{{$uniPopup.numFilter(item.goodsPrice)}}</text>
								</view>
								<view class="moban" v-if="item.goodsStatus==3">
									<text>已下架</text>
								</view>
								<view class="moban" v-if="item.goodsStatus==4">
									<text>缺货</text>
								</view>
							</view>
						</template>
					</u-waterfall>
				</view>
				<u-loadmore  :status="loadStatus" @loadmore="findListDate_list">
				</u-loadmore>
			</view>
			<u-modal v-model="show" content="当前小区无房屋暂时无法访问"></u-modal>
		</template>

		<template v-else>
			<view class="network">
				<image src="@/static/index/network_type.png" mode=""></image>
				<view class="text">
					<view>
						网络不给力,
					</view>
					<view class="retry" @tap="retry">
						点击重试
					</view>
				</view>
			</view>
		</template>
		
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import api from '@/api';


	import Community from './components/community';
	import HomeAd from './components/homeAd';
	import Mallfeatures from './components/mallfeatures';
	import Announcement from './components/announcement';
	import Activity from './components/activity';
	import goods from '../../api/mallUser/goods.js';
	export default {
		components: {
			Community,
			HomeAd,
			Mallfeatures,
			Announcement,
			Activity,
		},
		data() {
			return {
				isNetWork: false,
				adList: [],
				noticeList: [],
				activityList: [],
				loading: false,
				show: false,
				isNavs: 0,
				navLists: ['配送到家','销售量高', '点评高分'],
				pageDate: {
					pageNumber: 1,
					rowNumber: 10,
				},
				findListDate: [],
				mallShop_list_date:[],
				loadStatus: 'loadmore',
			}
		},
		computed: {
			...mapState(['user', 'community', 'myHome']),
		},
		onLoad() {
			this.cshua(0)
		},
		onReachBottom() {
			this.findListDate_list()
		},
		methods: {
			// 跳转公告
			toNewsPage() {
				uni.navigateTo({
					url: '../indexPages/news/index'
				});
			},
			async loadData() {
				this.loading = true;

				try {
					// 社区公告
					const resNotice = await api.homepage.getCommunityNotice({
						comId: this.community.id,
						current: 1,
						size: 5
					});
					if (resNotice) {
						let newTime= Date.parse(new Date())
						resNotice.data.records.reverse().forEach(item=>{
							if(item.dueDate-newTime>0){
								this.noticeList.push(item)
							}
						})
					}
					// 小区交流
					const resActivity = await api.homepage.getHomePage({
						size: 5
					})
					if (resActivity) {
						this.activityList = resActivity.data;
					}
				} catch (error) {
					console.log(error)
				} finally {
					this.loading = false;
					uni.stopPullDownRefresh();
				}
			},
			
			// 获取首页轮播广告
			async getHomeAd(){
				const res=await api.homepage.getHomeAd({
					size:5,
					type:0
				})
				if(res){
					this.adList=res.data
				}
				console.log(this.adList)
			},

			// 获取我的住房分页列表,默认将第一个房屋信息添加到状态管理
			async getHousePages() {
				const query = {
					checkStatus: 1,
					current: 1,
					size: 10
				}
				const res = await api.my.getMyHousingPages(query)
				if (res.status !== '0') {
					return
				};
				uni.setStorageSync('my_house',res.data.records)
				let val = res.data.records[0]
				if (!this.myHome.HouseMsg) {
					this.$store.commit('myHome/HOUSE_MSG', val)
				}
			},
			// 点击重试
			retry(){
				this.getNetwork();
				if(!this.isNetWork){
					uni.showToast({
						icon:'none',
						title:'网络连接不可用，请检查网络'
					})
				}
			},
			// 检测是否连接网络
			getNetwork() {
				uni.getNetworkType({
					success: (res)=>{
						if (res.networkType == 'none') {
							this.isNetWork = false //无网
						} else {
							this.isNetWork = true //有网
						}
					}
				});
			},
		
			cshua(index){
				this.isNavs = index
				this.loadStatus = 'loadmore';
				this.pageDate.pageNumber = 1
				this.findListDate=[]
				this.findListDate_list()
			},
			/**
			 * 商品列表
			 */
			findListDate_list() {
				var that = this
				if(that.loadStatus == 'nomore' || that.loadStatus == 'loading'){
					return
				}
				that.loadStatus = 'loading';
				var pageDateSoures = that.pageDate
				pageDateSoures['extendStatus']=Number(that.isNavs + 1)
				goods.findList(pageDateSoures).then(res => {
					var date_list = res.data && res.data.list ? res.data.list : []
					setTimeout(function() {
						that.findListDate = that.findListDate.concat(date_list)
						if (date_list.length<10) {
							that.loadStatus = 'nomore';
						}else{
							that.pageDate.pageNumber ++
							that.loadStatus = 'loadmore';
						}
						console.log(that.findListDate)
					},500);
				})
			}
		},
		onShow() {
			this.getNetwork()
			this.getHomeAd()
			this.getHousePages();
			this.loadData(0);
		},
		mounted() {
		},
		beforeMount() {
		},
		onPullDownRefresh() {
			this.loadData();
			this.getNetwork();
		},
	}
</script>

<style lang="less" scoped>
	.wrapper {
		padding: 0 24rpx;
	}

	.top-bar {
		margin: 40rpx;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.feature-list {
		padding: 15rpx 0;
	}

	.dividing {
		height: 20rpx;
		background: #F5F5F5;
	}

	uni-modal__bd {
		font-size: 66rpx !important;
	}
	
	.network{
		display: flex;
		flex-direction: column;
		align-items: center;
			margin-top: 189rpx;
		
		image{
			width: 374rpx;
			height: 348rpx;
		}
		
		.text{
			width: 100%;
			display: flex;
			justify-content: center;
			color: #666666;
			font-size: 32rpx;
			
			.retry{
				margin-left: 10rpx;
				color: #F05050;
				border-bottom: 2rpx #FAB6B6 solid;
			}
		}
	}

	.shangc{
		position: fixed;
		background: ;
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		right: 20rpx;
		bottom: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,0.3);
		box-shadow: 0.5px 0.5px 10px rgb(0 0 0 / 10%);
		image{
			width: 40rpx;
			height: 40rpx;
		}
	}
	
	.cell_v {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		padding: 17rpx;
		padding-bottom: 100rpx;
	
		.navs {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0rpx 30rpx;
			margin-bottom: 30rpx;
	
			text {
				width: 150rpx;
				height: 56rpx;
				background: #EEEEEE;
				border-radius: 28rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #555555;
				line-height: 56rpx;
				text-align: center;
			}
	
			.act {
				background: #802890;
				color: #FFFFFF;
			}
		}
	
		.u-waterfall {
			width: 100%;
		}
	
		.u-load-more-wrap {
			width: 100%;
		}
	
		.cell {
		 	width: 338rpx;
			margin: 9rpx;
			background: #FFFFFF;
			border-radius: 15rpx;
			position: relative;
			.title {
				width: 100%;
				padding: 0rpx 18rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				margin-top: 12rpx;
				color: #282828;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
	
			.tag-owner {
				width: 100%;
				padding: 0rpx 18rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
				text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF884D;
	
					text {
						font-size: 36rpx;
					}
				}
	
				.yuanj {
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					font-size: 24rpx;
					margin-left: 10rpx;
					text-decoration: line-through;
				}
				
				
			}
		
			.moban{
				width: 100%;
				height: 100%;
				background: rgba(255,255,255,0.6);
				position: absolute;
				left: 0rpx;
				top: 0rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					background: rgba(0,0,0,0.4);
					padding: 2rpx 20rpx;
					border-radius: 20rpx;
				}
			}
		}
	}
</style>
