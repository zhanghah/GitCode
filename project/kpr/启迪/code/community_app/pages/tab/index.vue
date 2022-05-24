<template>
	<view class="tabPage" :style="{ paddingBottom: headH + 'px' }">
		<home ref="home" @selecePage="selecePage" v-if="checkname == '首页'"></home>
		<inform ref="inform" :headH="headH" v-if="checkname == '信息发布'"></inform>
		<my ref="my" v-if="checkname == '我的'"></my>
		<view class="uni-tabbar">
			<template
				v-for="(item,index) in tabbar"
			>
				<view class="uni-tabbar__item" 
					:key="index"
					:class="{'set': item.text == checkname}"
					@tap="changeTab(index)" v-if="item.shows"
				>
					<view class="icon">
						<image :src="item.text == checkname?item.selectedIconPath:item.iconPath" mode=""></image>
					</view>
					<!-- 上面使用的是字体图标，解决切换页面的时候图标会闪的效果，毕竟每切换一个页面都会闪一下不太好看，可以切换使用下面的图片方式 -->
					<view class="uni-tabbar__label" :class="{'active': item.text == checkname}">
						{{item.text}}
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import home from '@/pages/indexpages/index';
	import inform from '@/pages/informpages/index';
	import my from '@/pages/mypages/index';
	export default {
		components: {
			home,
			inform,
			my
		},
		data() {
			return {
				headH:50,
				checkname:'首页',
				tabbar: [{
					"pagePath": "/pages/indexpages/index",
					"iconPath": "../../static/tab/tab1.png",
					"selectedIconPath": "../../static/tab/tab2.png",
					"text": "首页",
					show: true,
					shows: true,
				},{
					"pagePath": "/pages/informpages/index",
					"iconPath": "../../static/tab/tab3.png",
					"selectedIconPath": "../../static/tab/tab4.png",
					"text": "信息发布",
					show: false,
					shows: true,
				}, {
					"pagePath": "/pages/mypages/index",
					"iconPath": "../../static/tab/tab5.png",
					"selectedIconPath": "../../static/tab/tab6.png",
					"text": "我的",
					show: false,
					shows: true,
				}],
			};
		},
		onLoad() {
			let _this = this;
			this.$nextTick(function() {
				setTimeout(() => {
					_this.initFn();
				},500);
			})
		},
		onShow() {
			var _this = this; 
			//返回到信息发布时重新加载
			if(this.checkname == '信息发布'){
				this.$nextTick(function(){
					_this.$refs.inform.scrollTop = 0;
					_this.$refs.inform.refresh();
				})
			}
		},
		methods: {
			initFn() {
				var _this = this;
				uni.getSystemInfo({
					success: function(res) {
						var body = res.screenHeight;
						let info = uni.createSelectorQuery().in(_this).select('.uni-tabbar');
						info.boundingClientRect(function(data) {
							_this.headH = data.height;
						}).exec();
					}
				});
			},
			changeTab(index) {
				var _this = this;
				this.checkname = this.tabbar[index].text;
			},
			selecePage() {
				var _this = this;
				this.checkname = '信息发布';
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f5f5f5;
	}
	.tabPage {
		// padding-bottom: 98rpx;
	}
	[nvue] uni-scroll-view,
	[nvue] uni-swiper-item,
	[nvue] uni-view {
		flex-direction: unset;
	}

	[nvue-dir-column] uni-swiper-item,
	[nvue-dir-column] uni-view {
		flex-direction: unset;
	}

	.uni-tabbar {
		position: fixed;
		bottom: 0;
		z-index: 999;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 98rpx;
		// box-sizing: border-box;
		// border-top: solid 1upx #EDEDED;
		background-color: #fff;
		// box-shadow: 0px 1rpx 0px 0px rgba(237, 237, 237, 1);
		box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.05);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;

		.uni-tabbar__item {
			display: block;
			width: 130rpx;
			height: 80rpx;
			line-height: 24rpx;
			font-size: 22rpx;
			text-align: center;
			display: -webkit-flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.set {
			
			background: rgba(127, 41, 142, 0.05);
			border-radius: 40rpx;
		}

		.uni-tabbar__icon {
			height: 42upx;
			line-height: 42upx;
			text-align: center;
		}

		.icon {
			display: inline-block;
			margin-bottom: 6rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.uni-tabbar__label {
			font-size: 22rpx;
			color: #282828;
			&.active {
				color: #7F298E;
			}
		}
	}
</style>
