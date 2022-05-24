<template>
	<view class="myHome_box">
		<view class="content_box">
			<view class="yz_box box">
				<image class="img" src="../static/myHome/myHome_icon1.png" mode="" />
				<view class="msg">
					<view class="num">
						{{homeList.communityName}}{{homeList.buildingNumber}}栋{{homeList.unitNumber}}单元{{homeList.floorNumber}}-{{homeList.roomNumber}}
						<view class="label">{{homeList.type === '1'?'业主':homeList.type === '2'?'租户':'亲属'}}</view>
					</view>
					<view class="yz_msg">
						<image src="../static/myHome/myHome_icon2.png" mode="" />
						<view class="name">业主：{{homeList.proprietorName}} {{homeList.proprietorPhone}}</view>
					</view>
				</view>
				<view class="right_img">
					<image src="../static/myHome/icon_arrow.png" mode=""></image>
				</view>
			</view>
			<view class="ts">最多可上传人脸数量为3人</view>
		</view>
		<view class="upload_box">
			<view class="upload_list" v-if="faceList.length">
				<view class="list" v-for="(item,index) in faceList" :key='index'>
					<view class="name">{{item.userName}}&nbsp;&nbsp;{{item.phone}}</view>
					<view class="img">
						<image class="faceImg" :src="`${imageView}${item.faceImg}`"></image> 
						<view class="sh">
							<image src="../static/faceUpload/faceUpload_img3.png" mode="" />
							{{item.checkStatus === '0'?'未审核':item.checkStatus === '0'?'审核通过':'审核未通过'}}
						</view>
					</view>
				</view>
			</view>
			<view v-else class="noData">暂无人脸,请先添加</view>
		</view>
		
		<view class="addButton">
			<view @click="toAdd">添加人脸</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	export default {
		components: {},
		data() {
			return {
				faceList: [],
				current:1,
				size:10,
				homeList:{}
			}
		},
		computed: {
			...mapState([
				'community',
				'imageView'
			]),
		},
		methods: {
			toAdd() {
				console.log(this.homeList)
				uni.navigateTo({
					url: `/pages/userPages/faceUpload/add/index?pId=${this.homeList.proprietorId}&roomId=${this.homeList.roomId}`,
				});
			},
			//获取住房列表
			async getHomeList(){
				const _this = this;
				let canshu = {
					current:_this.current,
					size:_this.size,
					comId:_this.community.id,
				}
				await api.my.getMyHousingPages(canshu).then(res=>{
					if(res.status !== '0'){return};
					res.data.records.forEach(item=>{
						if(item.type === '1'){
							_this.homeList = item
						}
					})
				})
			},
			
			//获取人臉列表
			async getFaceList(){
				await api.my.getFaceList({proprietorId:this.homeList.proprietorId}).then(res=>{
					if(res.status !== '0'){return};
					this.faceList = res.data
				})
			},
			
			async initList(){
				await this.getHomeList()
				await this.getFaceList()
			}
		},
		onShow(){
			this.initList()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '人脸上传',
			});
		},
	}
</script>
<style lang="less" scoped>
	.myHome_box {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;
		overflow: hidden;

		.content_box {
			padding-top: 22rpx;
			background: #fff;

			.yz_box {
				width: 84%;
				padding: 25rpx 32rpx 29rpx 17rpx;
				background: #fff;
				display: flex;
				margin-bottom: 20rpx;
				border-radius: 8rpx;
				align-items: center;
				box-shadow: 0 0 10rpx #E6E6E6;
				margin: 0 auto;

				.img {
					width: 90rpx;
					height: 90rpx;
					margin-right: 23rpx;
				}

				.msg {
					width: 82%;

					.num {
						color: #303331;
						font-size: 36rpx;
						display: flex;
						align-items: center;

						.label {
							width: 72rpx;
							height: 30rpx;
							line-height: 30rpx;
							background: #1B76FF;
							border-radius: 15rpx;
							text-align: center;
							font-size: 24rpx;
							color: #fff;
							margin-left: 25rpx;
						}
					}

					.yz_msg {
						color: #79807A;
						font-size: 26rpx;
						display: flex;
						align-items: center;
						margin-top: 22rpx;

						image {
							width: 22rpx;
							height: 22rpx;
							margin-right: 8rpx;
						}
					}

					.member {
						display: flex;
						align-items: center;
						margin-top: 15rpx;

						image {
							width: 22rpx;
							height: 22rpx;
							margin-right: 8rpx;
						}

						.name {
							color: #79807A;
							font-size: 26rpx;
						}
					}
				}

				.right_img {
					margin-left: auto;

					image {
						width: 13rpx;
						height: 21rpx;
					}
				}
			}

			.ts {
				height: 80rpx;
				line-height: 80rpx;
				color: #F58311;
				font-size: 28rpx;
				padding-left: 32rpx;
			}
		}

		.upload_box {
			image {
				width: 92%;
				height: 600rpx;
				display: block;
			}
			.noData{
				text-align: center;
				font-size:26rpx;
				margin:100rpx 0 100rpx 0;
				color:#79807A;
			}
		}

		.upload_list {
			width: 92%;
			margin: 20rpx auto 0 auto;

			.list {
				padding: 0 20rpx 20rpx 20rpx;
				background: #FFFFFF;
				margin-bottom: 20rpx;

				.name {
					height: 99rpx;
					line-height: 99rpx;
					color: #333333;
					font-size: 36rpx;
				}

				.img {
					position: relative;
					width: 100%;
					height: 460rpx;
					background: #aaa;
					border-radius: 8rpx;
					.faceImg{
						position: absolute;
						top:0;
						left:0;
						width: 100%;
						height: 100%;
						z-index: 1;
						border-radius: 8rpx;
					}
					.sh {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						color: #FFFFFF;
						font-size: 36rpx;
						z-index: 10;
						image {
							display: block;
							width: 113rpx;
							height: 129rpx;
						}
					}
				}

			}
		}

		.addButton {
			width: 100%;

			view {
				width: 92%;
				height: 88rpx;
				line-height: 88rpx;
				background: linear-gradient(0deg, #1B76FF, #3093FF);
				box-shadow: 0px -1px 0px 0px #E0E0E0;
				border-radius: 44rpx;
				margin: 0 auto;
				text-align: center;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>
