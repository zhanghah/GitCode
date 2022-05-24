<template>
	<view>
		<nav-bar-new ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			大修基金
		</nav-bar-new>
		<view class="conter">
			<view class="setTime">
				<view class="setTime_name">选择时间</view>
				<view class="setTime_select">
					<picker class="pink_li" mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<text v-if="date != '请选择'">截止</text> {{date}}
						<image src="/static/trade/online2.png" mode=""></image>
					</picker>
				</view>
			</view>
			<!-- 列表 -->
			<view class="list_ul">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="list_time">{{item.month}}</view>
					<view class="list_data">
						<view class="list_li" v-for="(m,indexs) in item.overhaulFundAppChildListVOS" :key="indexs" @tap="details(m.id)">
							<view class="list_con">
								<view class="list_name">{{m.title}}</view>
								<view class="list_money">使用¥{{m.money}}</view>
							</view>
							<view class="list_right">
								<image src="/static/trade/online3.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="nothing" v-if="list.length == 0">
					<image src="/static/trade/nothing.png" mode=""></image>
					暂无信息
				</view>
				<!-- <uni-load-more :status="loadStatus" v-if="list.length > 0"></uni-load-more> -->
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	
	export default {
		data() {
			return {
				date:'请选择',
				list:[],
				page: 1,
				size: 10,
				loadStatus: 'more',
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(){
			this.getList();
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			},
			bindDateChange(e) {
				this.date = e.detail.value;
				this.page = 1;
				this.getList();
			},
			// 列表
			async getList() {
				var entity = {
					// current: this.page,
					month: this.date == '请选择'?'':this.date,
					// size: this.size,
				}
				const res = await api.trade.getFund(entity)
				if (res) {
					this.list = res.data;
					// if (this.page == 1) {
					// 	this.list = res.data.records;
					// 	this.loadStatus = 'noMore';
					// } else {
					// 	if (res.data.records.length != 0) {
					// 		this.list = this.list.concat(res.data.records);
					// 	    this.loadStatus = 'more';
					// 	} else {
					// 	    this.loadStatus = 'noMore';
					// 	}
					// }
				}
			},
			// 详情
			details(id) {
				uni.navigateTo({
					url:`/pages/tradePages/overhaul/details?id=${id}`
				})
			},
		},
		onReachBottom() {
		    // this.page++;
		    // this.getList();
		}
	}
</script>

<style lang="less">
.conter {
	width: 100%;
	.setTime {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		display: -webkit-flex;
		flex-direction: row;
		.setTime_name {
			color: #000000;
			font-size: 28rpx;
		}
		.setTime_select {
			flex: 1;
			.pink_li {
				width: 100%;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				color: #999999;
				font-size: 28rpx;
				text {
					color: #999999;
					font-size: 28rpx;
				}
				image {
					width: 26rpx;
					height: 22rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
	.list_ul {
		width: 100%;
		.list {
			width: 100%;
			.list_time {
				width: 100%;
				background:#F5F5F5;
				color: #999999;
				font-size: 26rpx;
				padding: 12rpx 30rpx;
				box-sizing: border-box;
			}
			.list_data {
				width: 100%;
				padding: 0 30rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				.list_li {
					width: 100%;
					padding: 30rpx 0;
					display: -webkit-flex;
					align-items: center;
					flex: 1;
					border-bottom: 1px solid #EEEEEE;
					.list_con {
						flex: 1;
						.list_name {
							width: 100%;
							color: #333333;
							font-size: 30rpx;
							font-weight: bold;
						}
						.list_money {
							width: 100%;
							color: #C6AA6B;
							font-size: 28rpx;
							margin-top: 20rpx;
						}
					}
					.list_right {
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
				.list_li:last-child {
					border-bottom: none;
				}
			}
		}
	}
}
</style>
