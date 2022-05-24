<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			{{name}}
		</nav-bar>
		<view class="conter">
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
			</view>
			<view class="nothing" v-if="list.length == 0">
				<image src="/static/index/nothing.png" mode=""></image>
				暂无信息
			</view>
			<uni-load-more :status="loadStatus" v-if="list.length > 0"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	
	export default {
		data() {
			return {
				list:[],
				page: 1,
				size: 10,
				loadStatus: 'more',
				name: '',
				type: '',
			}
		},
		onLoad(options) {
			if(options.type) {
				this.name = options.name;
				this.type = options.type;
				this.page = 1;
				this.getList();
			}
		},
		methods: {
			// 列表
			async getList() {
				var entity = {
					type: this.type,
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
			// 详情
			details(item) {
				uni.navigateTo({
					url:`/pages/informpages/details?id=${item.id}`
				})
			},
		},
		onReachBottom() {
		    this.page++;
		    this.getList();
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
	.release_ul {
		width: 100%;
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
}
</style>
