<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			公示信息
		</nav-bar-new>
		<view class="top" :style="{ top: headH + 'px' }">
			<view class="serch_ul">
				<view class="serch">
					<image src="/static/trade/serch.png" mode=""></image>
					<input type="text" v-model="text" @confirm="serchcon" placeholder="请输入" />
				</view>
				<view class="cancel" @tap="cancel">
					取消
				</view>
			</view>
			<view class="tab">
				<view class="span" :class="active == index ? 'spaned' : ''" v-for="(item,index) in tab" :key="index" @tap="tabClick(index)">{{item.name}}</view>
			</view>
		</view>
		<view class="conter">
			<view class="list">
				<view class="release_li" v-for="(item,index) in list" :key="index" @tap="details(item)">
					<view class="release_left">
						<view class="release_data">
							{{item.title}}
						</view>
						<view class="release_time">
							<view class="time_right">
								{{item.time}}
							</view>
						</view>
					</view>
					<view class="release_right">
						<image src="/static/trade/online3.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="nothing" v-if="list.length == 0">
				<image src="/static/trade/nothing.png" mode=""></image>
				暂无信息
			</view>
			<uni-load-more :status="loadStatus" v-if="list.length > 0"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import api from '@/api';
	
	export default {
		data() {
			return {
				text: '',
				list:[],
				tab: [{type:1,name:'议事公示'}],
				active: 0,
				headH:'',
				page: 1,
				loadStatus: 'more',
			}
		},
		onShow(){
			let _this = this;
			this.page = 1;
			this.getType();
			this.getList();
			this.$nextTick(function() {
				_this.initFn()
			})
		},
		methods: {
			initFn() {
				var _this = this;
				uni.getSystemInfo({
					success: function(res) {
						var body = res.screenHeight;
						let info = uni.createSelectorQuery().in(_this.$refs.navBar).select(".header_fixed");
						info.boundingClientRect(function(data) {
							_this.headH = data.height;
						}).exec();
					}
				});
			},
			// 切换类型
			tabClick(index) {
				this.active = index;
				this.list = [];
				this.page = 1;
				this.getList();
			},
			// 搜索
			serchcon() {
				this.page = 1;
				this.getList();
			},
			// 取消搜索
			cancel() {
				this.text = '';
				this.page = 1;
				this.getList();
			},
			// 列表
			async getList() {
				var entity = {
					current:this.page,
					name: this.text,
					size:10,
				}
				var res;
				if(this.tab[this.active].type == 1) {
					res = await api.trade.getPublicityDis(entity)
				}else{
					entity.publicityTypeId = this.tab[this.active].typeid
					res = await api.trade.getPublicity(entity)
				}
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
			// 类型
			async getType() {
				const res = await api.trade.publicTypeName({})
				if (res) {
					this.tab = [{type:1,name:'议事公示'}];
					if(res.data.length > 0) {
						res.data.forEach((item,index) => {
							var obj = {
								type:2,
								name:item.publicityTitle,
								typeid:item.id,
							}
							this.tab.push(obj);
						});
					}
				}
			},
			// 详情
			details(item) {
				uni.navigateTo({
					url: `/pages/tradePages/publicity/details?id=${item.id}&type=${this.tab[this.active].type}`
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
	.top {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.serch_ul {
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			background: #FFFFFF;
			.serch {
				flex: 1;
				height: 68rpx;
				padding: 0 28rpx;
				background: #F5F5F5;
				border-radius: 50rpx;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
				image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}
				input {
					flex: 1;
					border: none;
					outline: none;
					font-size: 26rpx;
				}
			}
			.cancel {
				color: #333333;
				font-size: 30rpx;
				margin-left: 30rpx;
			}
		}
		.tab {
			overflow-x: auto;
			overflow-y: hidden;
			background: #ffffff;
			white-space: nowrap;
			.span {
				display: inline-block;
				text-align: center;
				position: relative;
				color: #999999;
				font-size: 28rpx;
				margin: 0 24rpx;
				padding: 35rpx 0 20rpx 0;
				text {
					display: block;
					margin-top: 20rpx;
				}
			}
			.spaned {
				color: #282828;
				font-size: 32rpx;
				&::before {
					content: '';
					position: absolute;
					width: 100%;
					height: 6rpx;
					background: #282828;
					margin: auto;
					left: 0px;
					right: 0px;
					bottom: 0px;
				}
			}
		}
	}
	.conter {
		padding: 24rpx;
		box-sizing: border-box;
		padding-top: 190rpx;
		.list {
			width: 100%;
			.release_li {
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
				background: #FFFFFF;
				margin-bottom: 24rpx;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
				.release_left {
					flex: 1;
					.release_data {
						width: 100%;
						margin-bottom: 16rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						color: #656565;
						font-size: 28rpx;
						font-weight: bold;
					}
					.release_time {
						width: 100%;
						display: -webkit-flex;
						justify-content: space-between;
						.time_right {
							color: #999999;
							font-size: 20rpx;
						}
					}
				}
				.release_right {
					width: 12rpx;
					height: 22rpx;
					line-height: 0;
					margin-left: 30rpx;
					image {
						width: 12rpx;
						height: 22rpx;
					}
				}
			}
		}
	}
</style>
