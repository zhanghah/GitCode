<template>
	<view class="points_wrap">
		<view class="top">
			<nav-bar :title="title">
				<template slot="option"> </template>
			</nav-bar>
			<view class="top_content">
				<view>可用积分</view>
				<view class="tips">{{pointsInfo.points}}</view>
				<view>累计积分 {{pointsInfo.totalPoints}}</view>
			</view>
		</view>
		<view class="content">
			<view class="content_wrap">
				<view class="wrap_title">积分明细</view>
				<scroll-view scroll-y="true" class="scroll_list" @scrolltolower="getMore">
					<view class="wrap_infos">
						<template v-if="pointsList">
							<view class="infos_item" v-for="(item,index) in pointsList" :key="index">
								<view class="item_left">
									<view class="item_left_label" v-if="item.pointsType=='1'">签到积分</view>
									<view class="item_left_label" v-if="item.pointsType=='2'">注册积分</view>
									<view class="item_left_label" v-if="item.pointsType=='3'">消费积分</view>
									<view class="item_left_label" v-if="item.pointsType=='4'">评价积分</view>
									<view class="item_left_label" v-if="item.pointsType=='5'">活动积分</view>
									<view class="item_left_time">{{item.createTime}}</view>
								</view>
								<view class="item_right">+{{item.availablePoints}}</view>
							</view>
						</template>

						<no-result v-else :message='noData'></no-result>
					</view>
				</scroll-view>

			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/api';
	export default {
		name: 'MyPoints',
		data() {
			return {
				title: '我的积分',
				dataList: '',
				noData: '还没有相关数据哦~',
				rowNumber:9,
				pageNumber:1,
				total:0,
				pointsInfo:{},
				pointsList:[],
			}
		},
		computed:{
			...mapState(['user'])
		},
		methods:{
			// 获取用户积分
			async getUserPoints() {
				try{
					const res= await api.my.getUserPoints({phoneNumber:this.user.phone})
					if(res.data){
						this.pointsInfo=res.data
					}
				}catch(err){
					
				}
			},
			// 获取用户积分明细表
			async getPointsList() {
				try{
					const query={
						rowNumber:this.rowNumber,
						pageNumber:this.pageNumber,
						mobilePhoneNumber:this.user.phone
					}
					const res= await api.my.getPointsList(query)
					if(res.data){
						res.data.list.forEach(item=>{
							this.pointsList.push(item)
						})
						this.total=res.data.totalRow
					}
				}catch(err){
					
				}
			},
			// 加载更多
			getMore() {
				console.log(124)
				if (this.total > this.rowNumber * this.pageNumber) {
					this.pageNumber++;
					this.getPointsList()
				} else {
					uni.showToast({
						title: '已经全部加载'
					})
				}
			},
		},
		beforeMount(){
			this.getUserPoints();
			this.getPointsList()
		}
	}
</script>
<style lang="less" scoped>
	.scroll_list{
		height: 756rpx;
	}
	view {
		box-sizing: border-box;
	}

	.points_wrap {
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}

	.top {
		width: 100%;
		// height: 493rpx;
		background: url(http://static.kupurui.cn/comapp/points/rectangle.png) no-repeat;
		background-size: 100% 100%;

		.top_content {
			padding-top: 30rpx;
			padding-bottom: 140rpx;
			font-size: 26rpx;
			font-weight: bold;
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.tips {
				font-size: 72rpx;
				padding: 29rpx 0 65rpx;
			}
		}
	}

	.content {
		padding: 0 22rpx;
		// height: 865rpx;
		margin-top: -60rpx;

		.content_wrap {
			width: 100%;
			height: 100%;
			background-color: #fff;
			border-radius: 16rpx;
			padding: 0 10rpx;

			.wrap_title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #666666;
				padding: 26rpx 18rpx;
				border-bottom: 1rpx solid #EFEFEF;
			}

			.wrap_infos {
				.infos_item {
					height: 134rpx;
					padding: 29rpx 18rpx 30rpx;
					border-bottom: 1rpx solid #EFEFEF;
					display: flex;
					justify-content: space-between;

					.item_left {
						flex: 1;
						display: flex;
						flex-direction: column;

						.item_left_label {
							display: flex;
							justify-content: flex-start;
							font-size: 34rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #222222;
							margin-bottom: 10rpx;
						}

						.item_left_time {
							display: flex;
							justify-content: flex-start;
							font-size: 25rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #888888;
						}
					}

					.item_right {
						flex-shrink: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 40rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FD9B00;
					}
				}
			}

			.wrap_noInfo {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #888888;
			}
		}
	}
</style>
