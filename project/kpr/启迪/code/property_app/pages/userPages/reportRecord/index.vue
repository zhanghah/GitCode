<template>
	<view class="reportRecord_box">
		<view class="tabs">
			<scroll-view scroll-x class="scroll-h">
				<block v-for="(item,index) in tabBars" :key="index">
					<view class="uni-tab-item" :class="{'uni-tab-item-title-active' :active==index}"
						@tap="handActive(index)">
						<view class="uni-tab-item-title" :class="active==index?'uni-tab-item-title-active':''">
							<text>{{item.title}}</text>
							<!-- <text class="num" v-if="item.num>0">{{item.num}}</text> -->
						</view>
					</view>
				</block>
			</scroll-view>
		</view>

		<view class="content_box">
			<swiper class="limitp-hg" :current="active" @change="intervalChange">
				<swiper-item v-for="(item,index) in tabBars" :key="index">
					<scroll-view class="scroll-view_H" scroll-y="true" @scrolltolower="loadMore(active)">
						<view class="content">
							<index-com :list='list'></index-com>
						</view>
						<view class="load-box" v-if="list.length!=0">
							<u-loadmore :icon-type="iconType" :status="status" />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	import {
		showToast
	} from '@/utils/utils.js'
	import indexCom from './components/indexCom.vue'
	export default {
		components: {
			indexCom
		},
		data() {
			return {
				active: 0,
				currentIndex:1,
				current: 1,
				size: 10,
				total: '',
				list: [],
				noData: '暂无数据~',
				nav: {},
				status: '',
				iconType: 'flower',
				tabBars: [
					{
						status:1,
						title:'待审核',
					},
					{
						status:2,
						title:'待指派',
					},
					{
						status:3,
						title:'已指派',
					},
					{
						status:4,
						title:'处理中',
					},
					{
						status:5,
						title:'审核不通过',
					},
					{
						status:6,
						title:'关闭',
					},
					{
						status:7,
						title:'待评价',
					},
					{
						status:8,
						title:'完成',
					},
					{
						status:9,
						title:'上报',
					},
				],
			}
		},
		computed: {
			...mapState(['user', 'imageView', 'community']),
		},
		methods: {
			handActive(i) {
				if (this.active == i) {
					return
				}
				console.log(i)
				this.active = i;
				this.currentIndex=i+1
			},
			intervalChange(e) {
				console.log(e)
				this.active = e.detail.current;
				this.currentIndex=e.detail.current+1
				this.list = [];
				this.current = 1;
				this.getList();
			},

			//获取栏目
			// async getNav() {
			// 	let canshu = {
			// 		ceResidentialQuartersId: this.community.id
			// 	}
			// 	await api.my.getCount(canshu).then(res => {
			// 		console.log(res)
			// 		if (res.code !== 'success') return;
			// 		// this.tabBars=res.data
			// 		this.tabBars.forEach((item,index)=>{
			// 			res.data.forEach((v)=>{
			// 				if(item.title==v.eventStatus){
			// 					this.tabBars[index].num=v.num
			// 				}
			// 			})
			// 		})

			// 	})
			// },

			//获取列表
			async getList() {
				try {
					let canshu = {
						ceResidentialQuartersId:this.community.id,
						// dataSource:4,
						eventStatus:this.currentIndex,
						pageNumber:this.current,
						rowNumber:this.size,
						sysUserId:this.user.userId,
					}
					await api.my.getMyEventList(canshu).then(res => {
						if (res.code !== 'success') return;
						console.log(res.data)
						let {
							totalRow
						} = res.data
						this.total = totalRow;
						this.list = this.list.concat(res.data.list)
					})
				} catch (err) {
					//
					console.log(err)
				} finally {
					uni.stopPullDownRefresh();
				}
			},
			
			// 默认小区
			async defaultResidentialQuarters(){
				const res=await api.community.defaultResidentialQuarters({
					residentialQuartersId:this.community.id,
					userId:this.user.userId
				})
				console.log(res)
			},
			
			// 上拉加载
			loadMore(i) {
				if (this.total > this.size * this.current) {
					console.log('加载中')
					this.current++;
					this.status = 'loading';
					setTimeout(() => {
						this.status = 'nomore';
						this.getList(this.active)
					}, 800)
				} else {
					this.status = 'nomore'
				}
			},

		},

		// 下拉刷新
		onPullDownRefresh() {
			this.list = []
			this.getList(this.active)
		},
		mounted() {
			// this.getNav();
			this.getList();
			this.defaultResidentialQuarters()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '报事记录',
			});
		},
	}
</script>
<style lang="less" scoped>
	
	.tabs {
		position: fixed;
		left: 0;
		top: var(-window-top);
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		height: 100rpx;
		z-index: 99;
	}

	.scroll-h {
		width: 750rpx;
		height: 80rpx;
		flex-direction: row;
		white-space: nowrap;

	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 34upx;
		padding-right: 34upx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30upx;
		height: 80upx;
		line-height: 80upx;
		flex-wrap: nowrap;
		white-space: nowrap;

		.num {
			margin-left: 10rpx;
		}
	}

	.uni-tab-item-title-active {
		color: #9933FF;
		border-bottom: 4rpx #9933FF solid;

	}


	.content_box {
		width: 100%;
		height: 100vh;
		padding-top: 100rpx;
	}

	.limitp-hg {
		width: 100%;
		height: 100%;

		.scroll-view_H {
			height: 100%;
			width: 100%;
		}
	}

	.reportRecord_box {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;

		.nav_box {
			width: 100%;
			height: 100rpx;
			display: flex;
			color: #616661;
			font-size: 28rpx;
			justify-content: space-around;
			align-items: center;
			background: #fff;

			.nav {
				width: 50%;
				padding-bottom: 12rpx;

				.num {
					display: inline;
					color: #303331;
					font-size: 30rpx;
					margin-left: 5rpx;
				}

				&.active {
					color: #A94ABA;
					font-size: 30rpx;
					border-bottom: 2px solid #A94ABA;

					.num {
						color: #A94ABA;
						font-size: 30rpx;
					}
				}
			}
		}

		.content {
			// padding-top: 100rpx;
			padding-bottom: 20rpx;
		}
	}
</style>
