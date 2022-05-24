<template>
	<view class="content_mall">
		<mallSearch></mallSearch>
		<view class="nav">
			<text @click="isNav=index,oneTap(item.id,index)" :class="isNav==index?'act':''" v-for="(item,index) in dateSourse">{{item.name}}</text>
		</view>
		<view class="u-menu-wrap"  v-if="dateSourse">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in dateSourse[isNav].content" :key="index" class="u-tab-item"
					:class="current==index ? 'u-tab-item-active' : ''" :data-current="index"
					@tap.stop="swichMenu(item,index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in dateSourse[isNav].content" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item">
							<view class="item-container" v-if="item.content.length!=0">
								<view class="thumb-box" v-for="(item1, index1) in item.content" :key="index1" @click="$goPage(['/pages/mallUser/search/searchXQ/searchXQ'],function fun() {return {'mallShopsClassificationId': item1.id}})">
									<u-image class="item-menu-image" width="120rpx" height="120rpx" border-radius='12'
										:src="item1.logoImageUrl">
										<view slot="error" style="font-size: 24rpx;">加载失败</view>
									</u-image>
									<view class="item-menu-name">{{item1.name}}</view>
								</view>
							</view>
							<no-result message="" v-else style="margin-top: 200rpx;"></no-result>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
		<view class="u-menu-wrap u-menu-wraps" v-else>
			<no-result message=""  style="margin-top: 200rpx;"></no-result>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../../components/uni-icons/uni-icons.vue";
	import goods from '../../../api/mallUser/goods.js';
	import mallSearch from "../../../components/mallSearch/mallSearch.vue";
	export default {
		data() {
			return {
				top: uni.getSystemInfoSync().statusBarHeight + 'px',
				isNav:0,
				
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				
				getLocation:null,
				totalRow: {
					pageNumber: 1,
					rowNumber: 20,
					status: 'loadmore'
				},
				
				dateSourse:null
			}
		},
		mounted() {
			this.mallShopsClassification(0,0,0)
		},
		methods: {
			oneTap(parentId,index){
				console.log(parentId,index)
				if(this.dateSourse[index].content.length!=0){
					return
				}
				this.current=0
				this.mallShopsClassification(1,parentId,index)
			},
			twoTap(parentId,index){
				
			},
			/**
			 * 查询店铺分类列表
			 */
			mallShopsClassification(type,parentId,index){
				var that = this
				var dateSoure = {
					pageNumber: that.totalRow.pageNumber,
					rowNumber: that.totalRow.rowNumber,
					parentId:parentId
				}
				goods.mallShopsClassification(dateSoure).then(res => {
					var date_list = res.data && res.data.list ? res.data.list : [];
					if(date_list.length==0){
						return
					}
					if(type==0){
						for (var j = 0; j < date_list.length; j++) {
							date_list[j]['content'] = []
						}
						that.dateSourse=date_list
						that.mallShopsClassification(1,date_list[0].id,0)
					}else if(type==1){
						for (var j = 0; j < date_list.length; j++) {
							date_list[j]['content'] = []
						}
						that.dateSourse[index].content=date_list
						that.mallShopsClassification(2,date_list[0].id,0)
					}else{
						that.dateSourse[that.isNav].content[index].content=date_list
					}
					
				})
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			chooseLocation() {
				var that = this
				uni.chooseLocation({
					success: function(res) {
						that.getLocation = res.name
					}
				});
			},
			// 点击左边的栏目切换
			async swichMenu(item,index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
				if(item.content.length!=0){
					return
				}
				this.mallShopsClassification(2,item.id,index)
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content_mall {
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background:transparent ;
		min-height: auto;
	}
	.nav{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 98rpx;
		background: #F5F5F5;
		margin-top: 20rpx;
		text{
			width: 40%;
			text-align: center;
			height: 98rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #555555;
			line-height: 98rpx;
		}
		.act{
			position: relative;
			font-weight: bold;
			color: #802890;
			&::after{
				content: '';
				width: 50rpx;
				height: 6rpx;
				background: linear-gradient(90deg, #802890 0%, #7928C5 100%);
				border-radius: 3rpx;
				position: absolute;
				bottom: 0rpx;
				left: calc(50% - 25rpx);
			}
		}
	}
	.u-menu-wrap {
		height: calc(100% - 118rpx);
		background: #FFFFFF;
		display: flex;
		overflow: hidden;
		position: relative;
		.u-tab-view {
			width: 180rpx;
			height: 100%;
			background: #F5F5F5;
			.u-tab-item {
				height: 104rpx;
				background: #F5F5F5;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: 28rpx;
				color: #555555;
				padding: 0px 27rpx;
			}

			.u-tab-item-active {
				position: relative;
				background: #fff;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #802890;
			}

			.u-tab-item-active::before {
				content: "";
				position: absolute;
				top: -20rpx;
				right: 0;
				width: 20rpx;
				height: 20rpx;
				background-image: radial-gradient(circle at 0% 0%, transparent 0%, transparent 20rpx, #fff 20rpx, #fff 100%);
			}

			.u-tab-item-active::after {
				content: "";
				position: absolute;
				bottom: -20rpx;
				right: 0;
				width: 20rpx;
				height: 20rpx;
				transform: rotate(-90deg);
				background-image: radial-gradient(circle at 0% 0%, transparent 0%, transparent 20rpx, #fff 20rpx, #fff 100%);
			}
		}

		.right-box {
			background: #FFFFFF;

			.page-view {
				padding: 0rpx !important;
				background: #FFFFFF;

				.class-item {
					margin-bottom: 30rpx;
					background-color: #fff;

					.item-container {
						display: flex;
						flex-wrap: wrap;

						.thumb-box {
							width: calc(100%/3);
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							margin-top: 30rpx;

							.item-menu-image {
								width: 120rpx;
								height: 120rpx;
							}

							.item-menu-name {
								font-weight: normal;
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #555555;
								margin-top: 15rpx;
							}
						}
					}
				}
			}
		}

	}
	.u-menu-wraps{
		justify-content: center;
	}
</style>
