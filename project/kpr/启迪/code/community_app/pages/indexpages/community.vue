<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			小区概况
		</nav-bar>
		<view class="conter">
			<view class="inform">
				<view class="inform_title">
					<image src="../../static/index/icon1.png" mode="widthFix"></image>
					基本信息
				</view>
				<view class="table">
					<view class="table_li">
						<view class="li_name">小区名称</view>
						<view class="li_con">{{info.name}}</view>
					</view>
					<view class="table_li">
						<view class="li_name">所属地区</view>
						<view class="li_con">{{info.address}}</view>
					</view>
					<view class="table_li">
						<view class="li_name">详细地址</view>
						<view class="li_con">{{info.address}}</view>
					</view>
					<view class="table_li">
						<view class="li_name">成立时间</view>
						<view class="li_con">{{info.buildTime}}</view>
					</view>
					<view class="table_li">
						<view class="li_name bold">小区面积</view>
					</view>
					<view class="table_li">
						<view class="li_name">签约面积</view>
						<view class="li_con">{{info.contractArea}}m²</view>
					</view>
					<view class="table_li">
						<view class="li_name">建筑面积</view>
						<view class="li_con">{{info.buildingArea}}m²</view>
					</view>
					<view class="table_li">
						<view class="li_name">占地面积</view>
						<view class="li_con">{{info.coverArea}}m²</view>
					</view>
					<view class="table_li">
						<view class="li_name">绿化面积</view>
						<view class="li_con">{{info.greenArea}}m²</view>
					</view>
					<view class="table_li">
						<view class="li_name bold">内部情况</view>
					</view>
					<view class="table_li">
						<view class="li_name">住户数</view>
						<view class="li_con">{{info.householdsCount}}户</view>
					</view>
					<view class="table_li">
						<view class="li_name">容积率</view>
						<view class="li_con">{{info.volumetricRate}}%</view>
					</view>
					<view class="table_li">
						<view class="li_name">楼栋数</view>
						<view class="li_con">{{info.buildingCount}}栋</view>
					</view>
					<view class="table_li">
						<view class="li_name">物业电话</view>
						<view class="li_con">{{info.phone}}</view>
					</view>
					<view class="table_li">
						<view class="li_name">住宅类型</view>
						<view class="li_con">{{info.businessType}}</view>
					</view>
				</view>
			</view>

			<view class="details">
				<view class="inform_title">
					<image src="../../static/index/icon2.png" mode="widthFix"></image>
					详情介绍
				</view>
				<view class="richtext">
					<rich-text :nodes="strings"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api'
	export default {
		data() {
			return {
				info:'',
				strings: '<div style="text-align:center;"><img style="width:100%;height:100%" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20190515s%2F460%2Fw790h470%2F20190515%2F67fe-hwzkfpu3963435.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636424377&t=8df445b19aa1f2f144ac820ca06a784b"/></div>',
			}
		},
		methods: {
			// 获取小区信息
			async getCommunityInfo() {
				const res = await api.community.getCommunityInfo()
				if(res){
					this.info=res.data
				}
			}
		},
		onShow() {
			this.getCommunityInfo()
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

		.inform {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 6rpx;
			margin-bottom: 24rpx;

			.inform_title {
				width: 100%;
				padding-bottom: 24rpx;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;

				image {
					width: 28rpx;
					margin-right: 7rpx;
					color: #282828;
					font-size: 30rpx;
				}
			}

			.table {
				border: 1px solid #EEEEEE;

				.table_li {
					width: 100%;
					display: -webkit-flex;
					flex-direction: row;
					align-items: center;
					border-bottom: 1px solid #EEEEEE;

					.li_name {
						width: 200rpx;
						text-align: center;
						padding: 20rpx 0;
						color: #999999;
						font-size: 26rpx;
					}

					.bold {
						color: #656565;
						font-weight: bold;
					}

					.li_con {
						flex: 1;
						border-left: 1px solid #eeeeee;
						padding: 20rpx 24rpx;
						color: #656565;
						font-size: 26rpx;
					}
				}

				.table_li:last-child {
					border-bottom: none;
				}
			}
		}
	}

	.details {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 24rpx;

		.inform_title {
			width: 100%;
			padding-bottom: 24rpx;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 28rpx;
				margin-right: 7rpx;
				color: #282828;
				font-size: 30rpx;
			}
		}

		.richtext {
			width: 100%;
		}
	}
</style>
