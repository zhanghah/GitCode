<template>
	<view>
		<nav-bar :home="false" ref="navBar" fontColor="#333333" :backState="2000" :shadow="false" bgColor="#ffffff">
			信息发布
		</nav-bar>
		<scroll-view scroll-y="true" :scroll-top="scrollTop" :style="{ height: scrollH - headH + 'px' }" @scrolltolower="lower">
			<view class="conter">
				<view class="class">
					<view class="class_li" v-for="(item,index) in typeList" :key="index" @tap="classification(item.id,item.name)">
						<view class="class_img">
							<image :src="item.img" mode=""></image>
							<view class="sign" v-if="item.isRead == 0"></view>
						</view>
						<view class="class_name">{{item.name}}</view>
					</view>
				</view>
				
				<view class="release_ul">
					<view class="release_li" v-for="(item,index) in list" :key="index" @tap="details(item)">
						<view class="release_data">
							<view class="data_name">
								{{item.titleName}}
							</view>
							<view class="data_labela">
								{{item.typeName}}
							</view>
						</view>
						<view class="release_con">
							{{item.content}}
						</view>
						<view class="release_time">{{item.addTime}}</view>
					</view>
					<view class="nothing" v-if="list.length == 0">
						<image src="/static/trade/nothing.png" mode=""></image>
						暂无信息
					</view>
					<uni-load-more :status="loadStatus" v-if="list.length > 0"></uni-load-more>
				</view>
				
				<view class="release" :style="{ bottom: headH + 10 + 'px' }">
					<view class="submit_btn" @tap="release">我要发布</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api';
	
	export default {
		props:{
			headH: {
				type: [String, Number],
				default: function() {
					return 0;
				}
			},
		},
		data() {
			return {
				scrollTop: -1,
				typeList: [
					{name:'政务信息',id:1,img:'/static/inform/info1.png',isRead:1},
					{name:'管理小区信息',id:2,img:'/static/inform/info2.png',isRead:1},
					{name:'我的添加',id:3,img:'/static/inform/info3.png',isRead:1},
				],
				list:[],
				page: 1,
				size: 10,
				loadStatus: 'more',
				scrollH: 0,
			}
		},
		beforeMount() {
			this.refresh();
			var _this = this;
			this.$nextTick(function() {
				_this.initFn();
			})
		},
		onLoad() {
			
		},
		methods: {
			refresh() {
				this.page = 1;
				this.getList();
				this.ReadStatus();
			},
			initFn() {
				var _this = this;
				uni.getSystemInfo({
					success: function(res) {
						var body = res.screenHeight;
						let info = uni.createSelectorQuery().in(_this.$refs.navBar).select(".header_fixed");
						info.boundingClientRect(function(data) {
							_this.scrollH = body - data.height;
						}).exec();
					}
				});
			},
			// 详情
			details(item) {
				this.scrollTop = -1;
				uni.navigateTo({
					url:`/pages/informpages/details?id=${item.id}`
				})
			},
			// 类型
			classification(type,name) {
				this.scrollTop = -1;
				uni.navigateTo({
					url:`/pages/informpages/list?type=${type}&name=${name}`
				})
			},
			// 发布
			release() {
				this.scrollTop = -1;
				uni.navigateTo({
					url:'/pages/informpages/add'
				})
			},
			// 列表
			async getList() {
				var entity = {
					type: 0,
					current: this.page,
					size: this.size,
				}
				const res = await api.inform.getHomePageSeeMore(entity)
				if (res) {
					if (this.page == 1) {
						this.list = res.data.records;
						this.loadStatus = 'noMore';
					} else {
						if (res.data.records.length != 0) {
							this.list = this.list.concat(res.data.records);
						    this.loadStatus = 'more';
						} else {
						    this.loadStatus = 'noMore';
						}
					}
				}
			},
			// 读的情况
			async ReadStatus() {
				const res = await api.inform.getReadStatus({})
				if (res) {
					this.typeList.forEach((item,index) => {
						res.data.forEach((element,key) =>{
							if(item.id == element.type) {
								item.isRead = element.isRead;
							}
						});
					});
				}
			},
			lower: function(e) {
				this.page++;
				this.getList();
			}
		}
	}
</script>

<style lang="less">
page {
	background: #f5f5f5;
}
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.class {
		width: 100%;
		margin-bottom: 20rpx;
		border-radius: 6rpx;
		background: #FFFFFF;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 24rpx 34rpx;
		box-sizing: border-box;
		.class_li {
			display: -webkit-flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.class_img {
				width: 90rpx;
				height: 90rpx;
				position: relative;
				line-height: 0;
				image {
					width: 90rpx;
					height: 90rpx;
				}
				.sign {
					width: 13rpx;
					height: 13rpx;
					border-radius: 50%;
					background: #F05050;
					position: absolute;
					right: 0;
					top: 0;
				}
			}
			.class_name {
				color: #282828;
				font-size: 28rpx;
				margin-top: 17rpx;
			}
		}
	}
	.release_ul {
		width: 100%;
		padding-bottom: 150rpx;
		.release_li {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			border-radius: 6rpx;
			margin-bottom: 20rpx;
			background: #FFFFFF;
			.release_data {
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 10rpx;
				.data_name {
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					color: #0F1312;
					font-size: 28rpx;
					font-weight: bold;
				}
				.data_labela {
					flex-shrink: 0;
					color: #C6AA6B;
					font-size: 22rpx;
					background: rgba(198, 170, 107, 0.1);
					border-radius: 6rpx;
					padding: 6rpx 15rpx;
					margin-left: 10rpx;
				}
				.data_labelb {
					flex-shrink: 0;
					color: #7F298E;
					font-size: 22rpx;
					background: rgba(127, 41, 142, 0.1);
					border-radius: 6rpx;
					padding: 6rpx 15rpx;
					margin-left: 10rpx;
				}
			}
			.release_con {
				width: 100%;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				font-size: 24rpx;
				color: #727677;
				margin-bottom: 10rpx;
			}
			.release_time {
				width: 100%;
				color: #C6C8C7;
				font-size: 20rpx;
			}
		}
		.release_li:last-child {
			border-bottom: none;
		}
	}
	.release {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 120rpx;
	}
}
</style>
