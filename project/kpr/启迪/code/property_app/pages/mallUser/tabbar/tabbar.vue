<template>
	<view class="content_mall">
		
		<view class="mallTabbar">
			<view :class="content==index?'cell act':'cell'" v-for="(item,index) in list" :key='index'
				@click="content=index">
				<image :src="content==index?item.icon_tab:item.icon" mode="aspectFit"></image>
				<text v-if="content!=index">{{item.text}}</text>
			</view>
		</view>
		<view class="homeView" :style="{'padding-top':top ,'height': 'calc(100vh - '+top+')'}"  v-if="content==0">
			<mallHome :content.sync='content'></mallHome>
		</view>
		<view class="mallMenu" :style="{'padding-top':top ,'height': 'calc(100vh - '+top+')'}" v-if="content==1">
			<mallMenu ></mallMenu>
		</view>
		<view class="mallOrder" :style="{'padding-top':top}" v-if="content==3">
			<mallOrder></mallOrder>
		</view>
		<view class="mallMy" :style="{'padding-top':top,'height': 'calc(100vh - '+top+')'}" v-if="content==4">
			<mallMy  :content.sync='content' ></mallMy>
		</view>
		<view class="shopping_v" v-if="content==0"  @click="$goPage(['/pages/mallUser/shoppingCart/shoppingCart'])">
			<image src="../../../static/mall/home/gwc.png" mode=""></image>
		</view>
		
	</view>
</template>
<script>
	import uniIcons from "../../../components/uni-icons/uni-icons.vue";
	import uswiper from "../../../components/uni-icons/uni-icons.vue";
	import mallHome from "./mallHome.vue";
	import mallMenu from "./mallMenu.vue";
	import mallOrder from "./mallOrder.vue";
	import mallMy from "./mallMy.vue";
	import store from '../../../store/index.js';
	import user from '../../..//api/mallUser/user.js'
	export default {
		components: {
			uniIcons,
			mallMenu,
			mallHome,
			mallOrder,
			mallMy
		},
		data() {
			return {
				top: uni.getSystemInfoSync().statusBarHeight + 'px',
				getLocation: null,
				content: -1,
				list: [{
						icon: '../../../static/mall/tabbar/home@3x.png',
						icon_tab: '../../../static/mall/tabbar/home_icon@3x.png',
						text: '首页'
					},
					{
						icon: '../../../static/mall/tabbar/fl.png',
						icon_tab: '../../../static/mall/tabbar/fl_icon.png',
						text: '分类'
					},
					{
						icon: '../../../static/mall/tabbar/xx.png',
						icon_tab: '../../../static/mall/tabbar/xx_icon.png',
						text: '消息'
					},
					{
						icon: '../../../static/mall/tabbar/order.png',
						icon_tab: '../../../static/mall/tabbar/order_icon.png',
						text: '订单'
					},
					{
						icon: '../../../static/mall/tabbar/my.png',
						icon_tab: '../../../static/mall/tabbar/my_icon.png',
						text: '我的'
					}
				],
			}
		},
		onLoad(option) {
			user.usernameAndId({
				id: store.state.user.userId,
				loginSourceType: 4,
				username: store.state.user.phone,
			}).then(res => {
				if(option.content){
					this.content =option.content
					return
				}
				this.content =0
			}).catch(res => {
				console.log(res)
			});
		},
		onShow() {
			var that = this
			if(that.content == 3){
				that.content = -1
				setTimeout(function() {
					that.content = 3
				}, 500);
			}
		},
		methods: {
			chooseLocation() {
				var that = this
				uni.chooseLocation({
					success: function(res) {
						that.getLocation = res.name
					}
				});
			},
		}
	}
</script>

<style scoped lang="less">
	.mallTabbar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		background: #FFFFFF;
		height: 97rpx;
		z-index: 999;

		.cell {
			width: 20%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			text {
				text-align: center;
				width: 100%;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #656565;
				margin-top: 4rpx;
			}
		}

		.act {
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
				padding: 11rpx;
				background: linear-gradient(0deg, #802890 0%, #7928C5 100%);
				border-radius: 50%;
			}
		}
	}
	.homeView,
	.mallOrder,
	.mallMy,
	.mallMenu {
		background:#F5F5F5 url(../../../static/mall/tabbar/tuoyan.png)top center no-repeat;
		background-size: 100% 360rpx;
		width: 100%;
	}
	.mallOrder{
		height: calc(100vh - 98rpx);
	}
	

	.shopping_v {
		width: 91rpx;
		height: 91rpx;
		position: fixed;
		right: 30rpx;
		bottom: 300rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}
	
</style>
