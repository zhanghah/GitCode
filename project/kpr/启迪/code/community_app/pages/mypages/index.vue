<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :backState="2000" :shadow="false" bgColor="#ffffff">
			个人中心
		</nav-bar>
		<view>
			<view class="conter">
				<view class="top" @tap="inform">
					<view class="top_img">
						<image :src="`${imageView}${user.headPortrait}`" mode="" v-if="user.headPortrait"></image>
						<image src="/static/my/my6.png" mode="" v-else></image>
					</view>
					<view class="top_con">
						<view class="con_name">{{user.userName}}</view>
						<view class="con_id">{{user.employeeId}}</view>
					</view>
					<view class="top_right">
						个人信息
						<image src="/static/inform/add2.png" mode=""></image>
					</view>
				</view>
				<view class="phone">
					<view class="phone_name">我的手机号</view>
					<view class="phone_num">{{user.phone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</view>
				</view>
				<view class="item">
					<view class="item_img">
						<image src="/static/my/my3.png" mode="widthFix"></image>
					</view>
					<view class="item_con">
						我的部门
					</view>
					<view class="item_right">
						{{user.departName}}
					</view>
				</view>
				<view class="item">
					<view class="item_img">
						<image src="/static/my/my4.png" mode="widthFix"></image>
					</view>
					<view class="item_con">
						我的职务
					</view>
					<view class="item_right">
						{{user.positionName}}
					</view>
				</view>
			</view>
			<view class="interval"></view>
			<view class="conter padding">
				<view class="item" @tap="password">
					<view class="item_img">
						<image src="/static/my/my5.png" mode="widthFix"></image>
					</view>
					<view class="item_con">
						修改密码
					</view>
					<view class="item_right">
						<image src="/static/components/icon_link_arrow.png" mode=""></image>
					</view>
				</view>
				<view class="item" @tap="about">
					<view class="item_img">
						<image src="/static/my/my1.png" mode="widthFix"></image>
					</view>
					<view class="item_con">
						关于我们
					</view>
					<view class="item_right">
						<image src="/static/components/icon_link_arrow.png" mode=""></image>
					</view>
				</view>
				<view class="item">
					<view class="item_img">
						<image src="/static/my/my2.png" mode="widthFix"></image>
					</view>
					<view class="item_con">
						联系我们
					</view>
					<view class="item_right">
						023-81715141
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
			}
		},
		computed:{
			...mapState(['user','imageView'])
		},
		methods: {
			// 个人信息
			inform() {
				uni.navigateTo({
					url:'/pages/mypages/inform'
				})
			},
			// 修改密码
			password() {
				uni.navigateTo({
					url:'/pages/mypages/password'
				})
			},
			// 关于我们
			about() {
				uni.navigateTo({
					url:'/pages/mypages/about'
				})
			},
		},
		beforeMount() {}
	}
</script>

<style lang="less">
.conter {
	width: 100%;
	padding: 24rpx;
	padding-bottom: 0;
	box-sizing: border-box;
	background: #FFFFFF;
	.top {
		width: 100%;
		padding: 0 10rpx;
		box-sizing: border-box;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
		.top_img {
			width: 110rpx;
			height: 110rpx;
			line-height: 0;
			margin-right: 25rpx;
			image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
			}
		}
		.top_con {
			flex: 1;
			.con_name {
				width: 100%;
				color: #282828;
				font-size: 44rpx;
				font-weight: bold;
			}
			.con_id {
				width: 100%;
				color: #999999;
				font-size: 26rpx;
				margin-top: 12rpx;
			}
		}
		.top_right {
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;
			color: #DCDCDC;
			font-size: 24rpx;
			image {
				width: 8rpx;
				height: 16rpx;
				margin-left: 12rpx;
			}
		}
	}
	.phone {
		width: 100%;
		padding: 0 44rpx;
		box-sizing: border-box;
		height: 100rpx;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
		border-radius: 6rpx;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 34rpx;
		margin-bottom: 20rpx;
		.phone_name {
			color: #282828;
			font-size: 32rpx;
		}
		.phone_num {
			color: #656565;
			font-size: 32rpx;
		}
	}
	.item {
		width: 100%;
		padding: 24rpx 20rpx;
		box-sizing: border-box;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
		.item_img {
			width: 32rpx;
			margin-right: 30rpx;
			display: -webkit-flex;
			align-items: center;
			image {
				width: 32rpx;
			}
		}
		.item_con {
			flex: 1;
			font-size: 30rpx;
			color: #333333;
		}
		.item_right {
			color: #AAAAAA;
			font-size: 30rpx;
			image {
				width: 10rpx;
				height: 18rpx;
			}
		}
	}
}
.interval {
	width: 100%;
	height: 20rpx;
	background: #F5F5F5;
}
.padding {
	padding-top: 0;
}
</style>
