<template>
	<view class="reportRecord_box">
		<view class="nav_box">
			<view :class="['nav',{active:active==0}]" @tap="handActive(0)">全部<view class="num" v-if="allData">
					{{allData.counts}}
				</view>
			</view>
			<view :class="['nav',{active:active==1}]" @tap="handActive(1)">待受理<view class="num" v-if="acceptData">
					{{acceptData.counts}}
				</view>
			</view>
			<view :class="['nav',{active:active==2}]" @tap="handActive(2)">正在跟进<view class="num" v-if="processData">
					{{processData.counts}}
				</view>
			</view>
			<view :class="['nav',{active:active==3}]" @tap="handActive(3)">待回访<view class="num" v-if="backData">
					{{backData.counts}}
				</view>
			</view>
			<view :class="['nav',{active:active==4}]" @tap="handActive(4)">已完成<view class="num" v-if="completeData">
					{{completeData.counts}}
				</view>
			</view>
		</view>
		<view class="content_box">
			<swiper class="limitp-hg" :current="active" @change="intervalChange">
				<swiper-item>
					<scroll-view class="scroll-view_H" scroll-y="true" @scrolltolower="loadMore(active)">
						<view class="content">
							<index-com :list='list'></index-com>
						</view>
						<view class="load-box" v-if="list.length!=0">
							<u-loadmore :icon-type="iconType" :status="loadingType" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="scroll-view_H" scroll-y="true" @scrolltolower="loadMore(active)">
						<view class="content">
							<index-com :list='list'></index-com>
						</view>
						<view class="load-box" v-if="list.length!=0">
							<u-loadmore :icon-type="iconType" :status="loadingType" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="scroll-view_H" scroll-y="true" @scrolltolower="loadMore(active)">
						<view class="content">
							<index-com :list='list'></index-com>
						</view>
						<view class="load-box" v-if="list.length!=0">
							<u-loadmore :icon-type="iconType" :status="loadingType" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="scroll-view_H" scroll-y="true" @scrolltolower="loadMore(active)">
						<view class="content">
							<index-com :list='list'></index-com>
						</view>
						<view class="load-box" v-if="list.length!=0">
							<u-loadmore :icon-type="iconType" :status="loadingType" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="scroll-view_H" scroll-y="true" @scrolltolower="loadMore(active)">
						<view class="content">
							<index-com :list='list'></index-com>
						</view>
						<view class="load-box" v-if="list.length!=0">
							<u-loadmore :icon-type="iconType" :status="loadingType" />
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
				status: '',
				current: 1,
				size: 10,
				list: [],
				total: '',
				loadingType: '',
				noData: '暂无数据~',
				navList: [],
				iconType: 'flower',
				allData: '', //全部数据的栏目数量
				acceptData: '', //待受理的栏目数量
				processData: '', //处理中的栏目数量
				backData: '', //待回访的栏目数量
				completeData: '', //已完成的栏目数量
			}
		},
		computed: {
			...mapState(['user', 'imageView']),
		},
		methods: {
			handActive(i) {
				if (this.active == i) {
					return
				}
				this.active = i;
			},
			intervalChange(e) {
				this.active = e.detail.current;
				this.list = [];
				this.current = 1;
				this.getList();
			},

			//获取栏目
			async getNav() {
				await api.my.getComplaintCount({}).then(res => {
					if (res.status !== '0') return;
					let data = res.data
					for (let val in data) {
						if (data[val].keyVal == '-1') {
							this.allData = data[val]
						} else if (data[val].keyVal == '0') {
							this.acceptData = data[val]
						} else if (data[val].keyVal == '1') {
							this.processData = data[val]
						} else if (data[val].keyVal == '2') {
							this.backData = data[val]
						} else {
							this.completeData = data[val]
						}
					}
				})
			},

			//获取列表数据
			async getList() {
				try {
					let canshu = {
						current: this.current,
						size: this.size,
					}
					if(this.active==0){
						this.status=''
					}else if(this.active==1){
						this.status='0'
					}else if(this.active==2){
						this.status='1'
					}else if(this.active==3){
						this.status='2'
					}else{
						this.status='3'
					}
					if (this.status) {
						let obj={}
						obj.status=this.status
						Object.assign(canshu,obj)
					}
					console.log(canshu)
					await api.my.getComplaintPage(canshu).then(res => {
						if (res.status !== '0') return;
						let {
							total,
							current
						} = res.data
						this.total = total;
						this.current = current
						this.list = this.list.concat(res.data.records)
					})
				} catch (err) {
					//
				} finally {
					uni.stopPullDownRefresh();
				}
			},
			// 上拉加载
			loadMore() {
				if (this.total > this.size * this.current) {
					console.log('加载中')
					this.current++;
					this.loadingType = 'loading';
					setTimeout(() => {
						this.loadingType = 'nomore';
						this.getList()
					}, 800)
				} else {
					this.loadingType = 'nomore'
				}
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.list = []
			this.getList()
		},
		mounted() {
			this.getNav()
			this.getList()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '投诉记录',
			});
		},
	}
</script>
<style lang="less" scoped>
	


	.reportRecord_box {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;

		.nav_box {
			position: fixed;
			left: 0;
			top: var(-window-top);
			z-index: 99;
			width: 100%;
			height: 100rpx;
			display: flex;
			color: #616661;
			font-size: 28rpx;
			justify-content: space-around;
			align-items: center;
			background-color: #FFFFFF;

			.nav {
				padding-bottom: 12rpx;

				.num {
					display: inline;
					color: #303331;
					font-size: 30rpx;
					margin-left: 10rpx;
				}

				&.active {
					color: #802890;
					font-size: 30rpx;
					border-bottom: 2px solid #802890;

					.num {
						color: #802890;
						font-size: 30rpx;
					}
				}
			}
		}

		
		.content_box {
			width: 100%;
			height: 100vh;
			padding-top: 100rpx;
		
			.limitp-hg {
				width: 100%;
				height: 100%;

				.scroll-view_H {
					height: 100%;
					width: 100%;
				}

				.content {
					padding-bottom: 20rpx
				}
			}
		}
	}
</style>
