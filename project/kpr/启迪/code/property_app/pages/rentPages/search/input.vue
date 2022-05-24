<template>
	<view :class="['page-rent-input', { lock }]">
		<view class="search-wrap">
			<view class="search-box">
				<view class="dropdown" style="width: 150rpx;"  >
					<u-dropdown  >
						<u-dropdown-item   v-model="value1" :title="value2" :options="options"  @change="dropdown"	></u-dropdown-item>
					</u-dropdown>
					<!-- <view class="label">新房</view> -->
					<!-- <view class="arrow"></view> -->
				</view>
				<view class="line"></view>
				<view class="icon"></view>
				<view class="text">
					<input type="text" v-model="inputValue" placeholder="请输入小区名称">
				</view>

				<!-- <view class="dropdown-menu">
          <view class="menu-arrow arrow-gray"></view>
          <view class="menu-arrow arrow-white"></view>

          <view class="item active">
            新房
          </view>
          <view class="item">
            二手房
          </view>
          <view class="item">
            租房
          </view>
          <view class="item">
            已成交
          </view>
          <view class="item">
            小区
          </view>
        </view> -->
			</view>
			<view class="clear" @click="suchfeld">
				搜索
			</view>
		</view>

		<view class="search-history">
			<view class="title">
				<view class="label">历史搜索</view>
				<view class="del" @click="deleteIcon"></view>
			</view>

			<view class="list">
				<view class="item" v-for="(item,index) in historyNew" :key="index"  @click="historyItem(i)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		components: {},
		data() {
			return {
				historyNew:[],
				ausgewahlte:"新房",
				inputValue:"",
				value1:"新房",
				value2:"新房",
				//默认新房搜索
				typeRent:"newHouse",
				options: [{
						label: '新房',
						// value: "新房",
						value: "newHouse",
					},
					{
						label: '二手房',
						value: "secondHouse",
						// value: "二手房",
					},
					{
						label: '租房',
						value: "rentHouse",
						// value: "租房",
					},
					{
						label: '已成交',
						value: "dealHouse",
						// value: "已成交",
					},
					{
						label: '小区',
						value: "community",
						// value: "小区",
					}
				],
				lock: false,
			};
		},
		computed: {
			...mapState(['user','search']),
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '搜索',
			});
		},
	
		onShow() {
			//历史搜索LIst 数据更新
			this.historyNew=this.search.historischList
		},
		methods: {
			...mapMutations("search",{
				SearchHistory:"historischLists",
				searchBox:"searchBoxDatas"
			}),
			deleteIcon(){
				let _this=this
				uni.showModal({
					title:"您确定要清空记录吗",
					success(res) {
						console.log(res)
						if(res.confirm){
							_this.historyNew=[]
							_this.SearchHistory("")
						}
					}
				})
			},
			suchfeld(){
				if(this.inputValue){
					//历史记录List
					this.historyNew.push(this.inputValue)
					//去重
					let RemoveList =Array.from(new Set(this.historyNew))
					//历史搜索item保存到vuex
					this.SearchHistory(RemoveList)
				}
				//搜索框的内容
				this.searchBox(this.inputValue)
				
				
				uni.navigateTo({
					//show 是判断是否从本页面到达的搜索页面!"仅此而已"
					url: `../search/index?type=${this.typeRent}&name=${this.value2}&show=${true}`,
				})
				
			},
			// changeInput(e){
			// 	console.log(e.detail.value)
			// },
			dropdown(e){
				let vulues=this.options.filter(t=>t.value==e)
				this.value2=vulues[0].label
				this.typeRent=e
			},
			historyItem(item){
				this.searchBox(item)
				uni.navigateTo({
					//show 是判断是否从本页面到达的搜索页面
					url: `../search/index?type=${this.typeRent}&name=${this.value2}&show=${true}`,
				})
			}
		}
	}
</script>
<style lang="scss">

</style>
<style scoped lang="less">
	.page-rent-input {
		min-height: 100vh;
		box-sizing: border-box;
		padding: 25rpx;

		&.lock {
			height: 100vh;
			overflow: hidden;
		}
	}

	.search-wrap {
		display: flex;
		align-items: center;
	}

	.clear {
		font-size: 32rpx;
		color: #333333;
		flex-grow: 0;
		flex-shrink: 0;
		padding: 0 10rpx 0 40rpx;
		height: 100%;
	}

	.search-box {
		flex: 1;
		height: 99rpx;
		background: #FFFFFF;
		border: 1rpx solid #F5F5F5;
		box-shadow: 0rpx 5rpx 16rpx 0rpx #E6E6E6;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		// padding: 0 25rpx;
		box-sizing: border-box;
		color: #333333;
		font-size: 32rpx;
		position: relative;

		.text {
			flex: 1;
		}

		input {
			color: #808080;
			width: 100%;
		}

		.dropdown {
			display: flex;
			align-items: center;
			flex-grow: 0;
			flex-shrink: 0;
		}

		.dropdown-menu {
			position: absolute;
			left: 0;
			top: calc(100% + 30rpx);
			color: #333333;
			font-size: 32rpx;
			background-color: #FFFFFF;
			border: 1rpx solid #E6E6E6;
			width: 240rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 15rpx #E6E6E6;

			.menu-arrow {
				width: 0;
				height: 0;
				border-width: 16rpx;
				border-style: solid;
				border-color: transparent;

				position: absolute;
				top: -32rpx;
				left: 30%;
				z-index: 9;

				&.arrow-gray {
					border-bottom-color: #E6E6E6;
				}

				&.arrow-white {
					top: -30rpx;
					border-bottom-color: #FFFFFF;
				}

				/* #ifdef MP-WEIXIN */
				top: -29rpx;

				&.arrow-white {
					top: -27rpx;
					border-bottom-color: #FFFFFF;
				}

				/* #endif */
			}

			.item {
				padding: 23rpx 0;
				text-align: center;

				&.active {
					color: #FFB734;
				}
			}
		}

		.line {
			width: 2rpx;
			height: 36rpx;
			background: url(../static/rent/icon_search_arrow.png) no-repeat;
			background-size: 100% 100%;
			margin: 0 36rpx 0 22rpx;
			flex-grow: 0;
			flex-shrink: 0;
		}

		.icon {
			width: 34rpx;
			height: 34rpx;
			background: url(../static/icon_search.png) no-repeat;
			background-size: 100% 100%;
			margin-right: 30rpx;
			flex-grow: 0;
			flex-shrink: 0;
		}

		.arrow {
			width: 16rpx;
			height: 8rpx;
			background: url(../static/rent/icon_search_arrow.png) no-repeat;
			background-size: 100% 100%;
			margin-left: 17rpx;
		}
	}

	.search-history {
		margin-top: 55rpx;
		color: #333333;
		font-size: 32rpx;

		.title {
			display: flex;
			justify-content: space-between;
		}

		.del {
			width: 34rpx;
			height: 32rpx;
			background: url(../static/rent/icon_delete.png) no-repeat;
			background-size: 100% 100%;
		}

		.list {
			padding: 40rpx 0;
			display: flex;
			flex-wrap: wrap;
			margin: -10rpx;

			.item {
				height: 60rpx;
				background: #F5F4F2;
				border-radius: 8rpx;
				font-size: 28rpx;
				padding: 0 25rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #666666;
				margin: 10rpx;
			}
		}
	}
</style>
