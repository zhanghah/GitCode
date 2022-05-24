<template>
	<view>
		<nav-bar ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			<picker @change="bindPickerChange" :value="arrayIndex" :range="array" :range-key="'name'">
				<view class="uni-input">
					<view class="qh">
						{{arrayname}}
						<image src="/static/index/bottom2.png" mode=""></image>
					</view>
				</view>
			</picker>
			<view slot="right" @tap="serch">
				<view class="serch">
					<image src="/static/index/serch.png" mode=""></image>
				</view>
			</view>
		</nav-bar>
		<view class="tabul" :style="{ top: headH + 'px' }">
			<view class="tab">
				<view class="span" :class="active == 1 ? 'spaned' : ''" @tap="tabClick(1)">实住人口</view>
				<view class="span" :class="active == 2 ? 'spaned' : ''" @tap="tabClick(2)">车辆信息</view>
			</view>
			<view class="setTime" v-if="active == 2">
				<picker class="pink_li" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="time">
						<view class="time_pink">
							{{date}}
							<image src="/static/index/bottom3.png" mode=""></image>
						</view>
					</view>
				</picker>
			</view>
		</view>
		<view class="conter">
			<!-- 列表 -->
			<view class="list" v-if="active == 1">
				<view class="list_li" v-for="(item,index) in realLiveList" :key="index">
					<view class="list_left">
						<view class="list_car">{{item.name}}</view>
						<view class="list_time">
							<image src="/static/index/icon8.png" mode=""></image>
							<text v-if="item.identityType=='1'">业主</text>
							<text v-if="item.identityType=='2'">租客</text>
							<text v-if="item.identityType=='3'">亲属</text>
						</view>
					</view>
					<view class="list_right">
						{{item.phone}}
						<image src="/static/index/icon7.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="list" v-if="active == 2">
				<view class="list_li" v-for="(item,index) in list" :key="index">
					<view class="list_left">
						<view class="list_car">渝A108166</view>
						<view class="list_time">
							<image src="/static/index/time.png" mode=""></image>
							2021.02.12 11:23:56
						</view>
					</view>
					<view class="list_right">
						入场
						<image src="/static/index/icon5.png" mode=""></image>
						<!-- <image src="/static/index/icon6.png" mode=""></image> -->
					</view>
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
				current:1,
				size:10,
				realLiveList:[],
				list:['1','1'],
				array: [{
					name: '幸福五社小区',
					value: '0',
				}],
				arrayIndex: 0,
				arrayname: '幸福五社小区',
				active: 1,
				headH:'',
				page: 1,
				loadStatus: 'more',
				date:'请选择',
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
		onShow(){
			let _this = this;
			this.$nextTick(function() {
				_this.initFn()
			})
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
				return `${year}-${month}-${day}`;
			},
			bindDateChange(e) {
				this.date = e.detail.value;
			},
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				if (this.arrayIndex != e.target.value) {
					this.arrayIndex = e.target.value;
				} else {
					this.arrayIndex = e.target.value;
				}
			},
			tabClick(index) {
				this.active = index;
			},
			// 实际人口
			async getRealLiveList() {
				const query={
					currentPage:this.current,
					pageSize:this.size
				}
				const res=await api.inform.getRealLiveList(query)
				if(res){
					// this.realLiveList=res.data.records
					if (this.current == 1) {
						this.realLiveList = res.data.records;
						this.loadStatus = 'noMore';
					} else {
						if (res.data.records.length != 0) {
							this.realLiveList = this.realLiveList.concat(res.data.records);
						    this.loadStatus = 'more';
						} else {
						    this.loadStatus = 'noMore';
						}
					}
				}
			},
			// 搜索
			serch() {
				uni.navigateTo({
					url:`/pages/indexpages/search?active=${this.active}`
				})
			},
		},
		onReachBottom() {
		    this.current++;
			this.getRealLiveList()
		},
		beforeMount() {
			this.getRealLiveList()
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}
	.qh {
		display: flex;
		align-items: center;
		color: rgb(51, 51, 51);
		font-size: 32rpx;
	}
	.qh image {
		width: 20rpx;
		height: 11rpx;
		margin-left: 20rpx;
	}
	.serch {
		padding-right: 34rpx;
		line-height: 0;
		image {
			width: 30rpx;
			height: 31rpx;
		}
	}
	.tabul {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		background: #fff;
		align-items: center;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.tab {
			width: 400rpx;
			display: flex;
			justify-content: space-between;
			background: #fff;
			align-items: center;
			.span {
				// flex: auto;
				// text-align: center;
				position: relative;
				color: #999999;
				font-size: 32rpx;
				height: 102rpx;
				line-height: 102rpx;
			}
		
			.spaned {
				color: #282828;
		
				&::before {
					content: '';
					position: absolute;
					width: 90%;
					height: 6rpx;
					background: #282828;
					margin: auto;
					border-radius: 6rpx;
					left: 0px;
					right: 0px;
					bottom: 0px;
				}
			}
		}
		.setTime {
			flex: 1;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
			.time {
				.time_name {
					font-size: 28rpx;
					color: #000000;
				}
				.time_pink {
					display: -webkit-flex;
					flex-direction: row;
					align-items: center;
					font-size: 26rpx;
					color: #282828;
					image {
						width: 12rpx;
						height: 7rpx;
						margin-left: 12rpx;
					}
				}
			}
		}
	}
	.conter {
		padding: 24rpx;
		box-sizing: border-box;
		padding-top: 126rpx;
		.list {
			width: 100%;
			padding: 0 24rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 6rpx;
			.list_li {
				width: 100%;
				padding: 24rpx 0;
				display: -webkit-flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1px solid #EEEEEE;
				.list_left {
					.list_car {
						color: #282828;
						font-size: 30rpx;
						font-weight: bold;
					}
					.list_time {
						display: -webkit-flex;
						flex-direction: row;
						align-items: center;
						color: #AAAAAA;
						font-size: 22rpx;
						margin-top: 6rpx;
						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 4rpx;
						}
					}
				}
				.list_right {
					display: -webkit-flex;
					flex-direction: row;
					align-items: center;
					color: #656565;
					font-size: 28rpx;
					image {
						width: 48rpx;
						height: 48rpx;
						margin-left: 20rpx;
					}
				}
			}
			.list_li:last-child {
				border-bottom: none;
			}
		}
	}
</style>
