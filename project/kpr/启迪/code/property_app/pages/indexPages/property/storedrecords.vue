<template>
	<view class="page-property-storedrecords">
		<view class="ul_box" v-if="list.length">
			<view class="ul_li" v-for="(item,index) in list" :key="index">
				<view class="moth">10月</view>
				<view class="content">
					<image class="img" src="../static/property/icon_home.png"></image>
					<view class="info">
						<view class="subtitle">
							壹江郡15栋12-6
							<text>949.50元</text>
						</view>
						<view class="pd">2020年9月-2020年12月住宅物业费</view>
						<view>2018-10-20 15:32</view>
					</view>
				</view>
			</view>
		</view>
		<no-result v-else></no-result>
	</view>
</template>

<script>
	import api from '@/api';
	export default {
		data(){
			return{
				list:[]
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '预存记录',
			});
		},
		methods:{
			getList(id){
				api.lifejf.getListPre({roomId:id}).then(res=>{
					if(res.status !== '0'){return};
					this.list = res.data
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.getList(option.roomId)
		}
	}
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.page-property-storedrecords {
		min-height: 100vh;
		padding-bottom: 108rpx;
		box-sizing: border-box;
		background-color: #F5F5F5;
	}

	.ul_li {
		box-shadow: 0px -1px 0px 0px #E0E0E0;

		.moth {
			font-size: 28rpx;
			color: #666666;
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 32rpx;
		}

		.content {
			padding: 32rpx 30rpx;
			display: flex;
			background-color: #fff;

			.img {
				width: 48rpx;
				height: 48rpx;
				margin-right: 22rpx;
			}

			.info {
				flex: 1;
				font-size: 28rpx;
				font-weight: 500;
				color: #79807A;

				.pd {
					padding: 19rpx 0rpx 25rpx 0rpx;
				}

				.subtitle {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #303331;
					font-size: 32rpx;

					text {
						font-size: 36rpx;
						font-weight: bold;
						color: #333333;
					}
				}
			}
		}
	}
</style>
