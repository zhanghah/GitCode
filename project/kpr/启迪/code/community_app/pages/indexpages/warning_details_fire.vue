<template>
	<view>
		<nav-bar ref="navBar" :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			智能预警详情
		</nav-bar>
		<view class="conter">
			<view class="details">
				<view class="details_top">
					{{info.alarmTitle}}
					<view class="label">{{info.typeName}}</view>
				</view>
				<view class="details_post">
					<image src="/static/index/icon13.png" mode=""></image>
					<text>位置</text>
					{{info.seat}}
				</view>
				<view class="details_time">
					<image src="/static/index/icon12.png" mode=""></image>
					时间 {{info.createTime}}
				</view>
				<view class="richtext">
					<rich-text :nodes="info.alarmInfo"></rich-text>
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
				detailId:'',
				strings: '<div style="text-align:center;"><img style="width:100%;height:100%" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstc-new.8531.cn%2Fassets%2F20190515%2F1557909630810_5cdbd07ec8cf0b5c44fff3ed.jpeg&refer=http%3A%2F%2Fstc-new.8531.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636424345&t=b35bba4eecad996b8e19098ed4391563"/></div>',
				info:{}
			}
		},
		methods: {
			// 火灾预警详情
			async getAlarmDetail(){
				const res=await api.inform.getAlarmDetail({id:this.detailId})
				if(res){
					this.info=res.data
				}
			}
		},
		beforeMount() {
			this.getAlarmDetail()
		},
		onLoad(opt) {
			this.detailId=opt.id
		}
	}
</script>

<style lang="less">
page {
	background: #F5F5F5;
}
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.details {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		.details_top {
			width: 100%;
			margin-bottom: 40rpx;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			color: #282828;
			font-size: 36rpx;
			font-weight: bold;
			.label {
				color: #FF894F;
				font-size: 22rpx;
				background: rgba(255, 137, 79, 0.1);
				border-radius: 80rpx;
				padding: 6rpx 20rpx;
				margin-left: 26rpx;
			}
		}
		.details_post {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			font-size: 26rpx;
			color: #656565;
			margin-bottom: 20rpx;
			image {
				width: 24rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
			text {
				color:999;
				margin-right: 10rpx;
			}
		}
		.details_time {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			font-size: 26rpx;
			color: #999999;
			margin-bottom: 17rpx;
			image {
				width: 25rpx;
				height: 25rpx;
				margin-right: 10rpx;
			}
		}
		.richtext {
			width: 100%;
		}
	}
}
</style>
