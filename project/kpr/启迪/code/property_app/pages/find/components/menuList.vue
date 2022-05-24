<template>
	<view class="find-menu">
		<view class="menu-box" v-for="(item,index) in menuList" :key="index">
			<view class="menu-item">
				<image class="menu-item-img" src="../../../static/find/icon_bmxx.png" mode=""></image>
				<view class="menu-item-text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	export default {
		data() {
			return {
				menuList:[
					{text:"灵丽园"},
					{text:"灵丽园"},
					{text:"灵丽园"},
					{text:"灵丽园"},
					{text:"灵丽园"},
					{text:"灵丽园"},
					{text:"灵丽园"},
				]
			}
		},
		beforeMount() {
			this.getpages()
		},
		methods: {
			async getpages(){
				let res=await api.find.getPage({
				})
				console.log(3,res)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.find-menu{
		background-color: #FFFFFF;
		width: 750rpx;
		height:322rpx;
		padding-bottom: 32rpx;
		display: flex;
		flex-wrap: wrap;
		.menu-box{
			width: 187rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.menu-item{
				width: 104rpx;
				height: 120rpx;
				.menu-item-img{
					width: 104rpx;
					height: 104rpx;
				}
				.menu-item-text{
					height: 23rpx;
					font-size: 24rpx;
					width: 104rpx;
					text-align: center;
					font-weight: 500;
					color: #020204;
					font-family: PingFang SC;
				}
			}
		}
	}

</style>
