<template>
	<view class="content">
		<nav-bar :home="false" fontColor="#333333" :titleCenter="false" :backState="2000" :shadow="false"
			bgColor="#ffffff">
			首页
			<view slot="right">
				<picker @change="bindPickerChange" mode="selector" :value="arrayIndex" :range="communityList" :range-key="'name'">
					<view class="uni-input">
						<view class="qh">
							{{arrayname }}
							<image src="/static/index/bottom.png" mode=""></image>
						</view>
					</view>
				</picker>
			</view>
		</nav-bar>
		<!-- <view style="padding: 30rpx 0;" @tap="sdk">
			ios原生sdk测试入口
		</view>
		<view style="padding: 30rpx 0;" @tap="sdk_a">
			安卓原生sdk测试入口
		</view> -->
		<view class="abstract">
			<view class="abstract_title">摘要数据</view>
			<view class="top">
				<view class="top_left">
					<view class="real_img">
						<image src="/static/index/home9.png" mode=""></image>
					</view>
					<view class="real_con">
						<view class="con_num">{{sumTotal}}<text>人</text></view>
						<view class="con_name">实住人口</view>
					</view>
				</view>
				<view class="top_right">
					<view class="gender">
						男性 <text class="text_one">{{manTotal}}</text> 人
					</view>
					<view class="gender">
						女性 <text class="text_two">{{womanTotal}}</text> 人
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="bottom_li">
					<view class="real_img">
						<image src="/static/index/home6.png" mode=""></image>
					</view>
					<view class="real_con">
						<view class="con_num">3891 <text>次</text></view>
						<view class="con_name">今日车辆<text>入</text>场</view>
					</view>
				</view>
				<view class="bottom_li">
					<view class="real_img">
						<image src="/static/index/home7.png" mode=""></image>
					</view>
					<view class="real_con">
						<view class="con_num">3891 <text>次</text></view>
						<view class="con_name">今日车辆<text>出</text>场</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="menu">
			<view class="menu_li" @tap="community">
				<image src="/static/index/home1.png" mode="widthFix"></image>
				<text>小区概况</text>
			</view>
			<view class="menu_li" @tap="administer">
				<image src="/static/index/home2.png" mode="widthFix"></image>
				<text>综治信息</text>
			</view>
			<view class="menu_li" @tap="firecontrol">
				<image src="/static/index/home3.png" mode="widthFix"></image>
				<text>消防安全</text>
			</view>
			<view class="menu_li" @tap="statistics">
				<image src="/static/index/home4.png" mode="widthFix"></image>
				<text>数据统计</text>
			</view>
			<view class="menu_li" @tap="warning">
				<image src="/static/index/home5.png" mode="widthFix"></image>
				<text>智能预警</text>
			</view>
		</view>
		
		<view class="notice" v-if="alarmTotalList.length > 0">
			<image src="/static/index/home10.png"></image>
			<view class="notice_wrap">
				<view class="notice_txt">
					<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration"
						:circular="true" :vertical="true">
						<swiper-item v-for="(item, index) in alarmTotalList" :key="index" @tap="earlywarn(item.id)">
							<view class="swiper-item uni-bg-red">{{item.alarmTitle}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<view class="release">
			<view class="release_title">
				<view class="release_name">信息发布</view>
				<view class="release_more" @tap="inform">
					查看更多
					<image src="/static/index/home8.png" mode=""></image>
				</view>
			</view>
			<view class="release_ul">
				<view class="release_li" v-for="(item,index) in informList" :key="index" @tap="informDetails(item)">
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
				<view class="nothing" v-if="informList == 0">
					<image src="/static/index/nothing.png" mode=""></image>
					暂无信息
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import api from '@/api';
	
	export default {
		data() {
			return {
				arrayIndex: 0,
				arrayname: '',
				sumTotal:'',//实住人口总数统计
				manTotal:'',//实住人口男性
				womanTotal:'',//实住人口女性
				alarmTotalList: [],
				autoplay: true,
				interval: 2000,
				duration: 500,
				list:['1','1','1'],
				informList: [],
			}
		},
		onLoad() {

		},
		beforeMount() {
			if(this.communityList.length > 0) {
			this.arrayname = this.communityList[0]?.name ?? ''
			}
			this.getinformList();
			this.getRealLive();
			this.getAlarmTotalList()
		},
		computed:{
			...mapState('user',['communityList'])
		},
		methods: {
			...mapMutations('user', {
				updateCommunity: 'UPDATE_COMMUNITY',
			}),
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.arrayIndex = e.target.value;
				this.arrayname = this.communityList[this.arrayIndex].name;
				this.updateCommunity(this.communityList[this.arrayIndex].id);
				this.getRealLive()
			},
			// sdk
			sdk() {
				uni.navigateTo({
					url: '/pages/indexpages/sdk'
				})
			},
			// sdk
			sdk_a() {
				uni.navigateTo({
					url: '/pages/indexpages/sdka'
				})
			},
			// 统计
			statistics() {
				uni.navigateTo({
					url: '/pages/indexpages/statistics'
				})
			},
			// 小区概况
			community() {
				uni.navigateTo({
					url: '/pages/indexpages/community'
				})
			},
			// 消防安全
			firecontrol() {
				uni.navigateTo({
					url: '/pages/indexpages/firecontrol'
				})
			},
			// 综治信息
			administer() {
				uni.navigateTo({
					url: '/pages/indexpages/administer'
				})
			},
			// 智能预警
			warning() {
				uni.navigateTo({
					url: '/pages/indexpages/warning'
				})
			},
			// 预警详情
			earlywarn(id) {
				uni.navigateTo({
					url: `/pages/indexpages/warning_details_fire?id=${id}`
				})
			},
			// 信息发布详情
			informDetails(item) {
				uni.navigateTo({
					url: `/pages/informpages/details?id=${item.id}`
				})
			},
			// 发布信息
			inform() {
				this.$emit('selecePage');
			},
			// 信息发布列表
			async getinformList() {
				const res = await api.inform.getHomePage({});
				if (res) {
					this.informList = res.data;
				}
			},
			// 实住人口
			async getRealLive(){
				const res=await api.inform.getRealLive()
				if(res){
					this.sumTotal=res.data.sumTotal
					this.manTotal=res.data.reaLiveSexVoList[0].sexTotal
					this.womanTotal=res.data.reaLiveSexVoList[1].sexTotal
				}
			},
			// 消防预警
			async getAlarmTotalList(){
				const res=await api.inform.getAlarmTotalList({
					currentPage:1,
					pageSize:10
				})
				if(res){
					this.alarmTotalList=res.data.records
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #F5F5F5;
	}

	.content {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.qh {
		display: flex;
		align-items: center;
		color: #727677;
		font-size: 28rpx;
		margin-right: 30rpx;
	}

	.qh image {
		width: 14rpx;
		height: 8rpx;
		margin-left: 10rpx;
	}

	.abstract {
		width: 100%;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 24rpx;

		.abstract_title {
			width: 100%;
			padding: 24rpx 24rpx 0 24rpx;
			box-sizing: border-box;
			color: #282828;
			font-size: 32rpx;
			font-weight: bold;
		}

		.top {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #EEEEEE;
			display: -webkit-flex;
			align-items: center;
			justify-content: space-between;

			.top_left {
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;

				.real_img {
					width: 90rpx;
					height: 90rpx;
					line-height: 0;
					margin-right: 16rpx;

					image {
						width: 90rpx;
						height: 90rpx;
					}
				}

				.real_con {
					.con_num {
						color: #282828;
						font-size: 36rpx;
						font-weight: bold;

						text {
							font-size: 22rpx;
							color: #999999;
							font-weight: 500;
							margin-left: 2rpx;
						}
					}

					.con_name {
						color: #656565;
						font-size: 24rpx;
					}
				}
			}

			.top_right {
				.gender {
					color: #656565;
					font-size: 24rpx;

					.text_one {
						color: #C6AA6B;
						font-size: 32rpx;
						font-weight: bold;
						margin: 0 4rpx;
					}

					.text_two {
						color: #7F298E;
						font-size: 32rpx;
						font-weight: bold;
						margin: 0 4rpx;
					}
				}

				.gender:last-child {
					margin-top: 10rpx;
				}
			}
		}

		.bottom {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			display: -webkit-flex;
			flex-direction: row;

			.bottom_li {
				flex: 1;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;

				.real_img {
					width: 90rpx;
					height: 90rpx;
					line-height: 0;
					margin-right: 16rpx;

					image {
						width: 90rpx;
						height: 90rpx;
					}
				}

				.real_con {
					.con_num {
						color: #282828;
						font-size: 36rpx;
						font-weight: bold;

						text {
							font-size: 22rpx;
							color: #999999;
							font-weight: 500;
							margin-left: 2rpx;
						}
					}

					.con_name {
						color: #656565;
						font-size: 24rpx;
					}
				}
			}

			.bottom_li:last-child {
				justify-content: flex-end;
				border-left: 1px solid #EEEEEE;
			}
		}
	}

	.menu {
		width: 100%;
		padding: 28rpx 24rpx 22rpx 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 24rpx;
		display: -webkit-flex;
		justify-content: space-between;

		.menu_li {
			display: -webkit-flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			image {
				width: 50rpx;
			}

			text {
				color: #727677;
				font-size: 24rpx;
				margin-top: 19rpx;
			}
		}
	}

	.warning {
		width: 100%;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 24rpx;
	}

	.notice {
		width: 100%;
		padding: 20rpx 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 24rpx;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
		image {
			width: 55rpx;
			height: 57rpx;
		}
		.notice_wrap {
			padding-left: 35rpx;
			flex: 1;
			display: flex;
			height: 70rpx;
			align-items: center;
			justify-content: space-between;
			.notice_txt {
				width: 100%;
				font-size: 24rpx;
				font-weight: 500;
				color: #656565;
				height: 70rpx;
				overflow: hidden;
				.swiper {
					height: 70rpx;
					.swiper-item {
						height: 70rpx;
						line-height: 70rpx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
	.release {
		width: 100%;
		padding: 24rpx;
		padding-bottom: 0;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		.release_title {
			width: 100%;
			display: -webkit-flex;
			justify-content: space-between;
			.release_name {
				color: #282828;
				font-size: 32rpx;
				font-weight: bold;
			}
			.release_more {
				display: -webkit-flex;
				align-items: center;
				color: #999999;
				font-size: 22rpx;
				image {
					width: 18rpx;
					height: 18rpx;
					margin-left: 8rpx;
				}
			}
		}
		.release_ul {
			.release_li {
				width: 100%;
				padding: 30rpx 0;
				border-bottom: 1px solid #EEEEEE;
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
			.nothing {
				padding: 40rpx 0;
			}
		}
	}
</style>
