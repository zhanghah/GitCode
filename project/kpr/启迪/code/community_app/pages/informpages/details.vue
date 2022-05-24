<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			信息详情
		</nav-bar>
		<view class="conter">
			<view class="details">
				<view class="details_top">
					{{info.titleName}}
				</view>
				<view class="details_post">
					<view class="label_a">{{info.typeName}}</view>
				</view>
				<view class="details_time">
					{{info.addTime}}
				</view>
				<view class="details_range">
					<view class="range_name">发布范围：</view>
					<view class="range_con">
						<text v-for="(item,index) in info.pushRanges" :key="index">{{item}}</text>
					</view>
				</view>
				<view class="richtext">
					<!-- <rich-text :nodes="strings"></rich-text> -->
					{{info.content}}
				</view>
				<view class="img">
					<image :src="`${imageView}${item}`" v-for="(item,index) in info.files" :key="index" @tap="privewImg(`${imageView}${item}`,info.files)" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	
	export default {
		data() {
			return {
				info: {},
				id: '',
			}
		},
		computed: {
			...mapState(['user','imageView']),
		},
		onLoad(options) {
			if(options.id) {
				this.id = options.id;
				this.getDetails();
			}
		},
		methods: {
			// 获取详情
			async getDetails() {
				var param = {
					id:this.id,
				}
				const res = await api.inform.informationDetails(param)
				if (res) {
					this.info = res.data;
				}
			},
			// 预览图片
			privewImg(url,urls) {
				var urlse = [];
				urls.forEach((item,index) =>{
					urlse.push(this.imageView+item);
				});
				uni.previewImage({
					current: url,
					urls: urlse,
				});
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
	.details {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		.details_top {
			width: 100%;
			margin-bottom: 30rpx;
			color: #000000;
			font-size: 32rpx;
			font-weight: bold;
		}
		.details_post {
			width: 100%;
			display: -webkit-flex;
			.label_a {
				color: #C6AA6B;
				font-size: 24rpx;
				background: rgba(198, 170, 107, 0.1);
				border-radius: 6rpx;
				padding: 6rpx 20rpx;
			}
			.label_b {
				color: #7F298E;
				font-size: 24rpx;
				background: rgba(127, 41, 142, 0.1);
				border-radius: 6rpx;
				padding: 6rpx 20rpx;
			}
		}
		.details_time {
			width: 100%;
			font-size: 26rpx;
			color: #999999;
			margin-top: 20rpx;
		}
		.details_range {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			margin-top: 20rpx;
			.range_name {
				font-size: 24rpx;
				color: #666666;
				margin-right: 10rpx;
			}
			.range_con {
				flex: 1;
				display: -webkit-flex;
				flex-wrap: wrap;
				text {
					font-size: 24rpx;
					color: #666666;
					margin-right: 30rpx;
					margin-bottom: 15rpx;
				}
			}
		}
		.richtext {
			width: 100%;
			margin-top: 30rpx;
			font-size: 26rpx;
			line-height: 50rpx;
			color: #656565;
			white-space:normal;
			word-break:break-all;
		}
		.img {
			width: 100%;
			image {
				width: 100%;
			}
		}
	}
}
</style>
