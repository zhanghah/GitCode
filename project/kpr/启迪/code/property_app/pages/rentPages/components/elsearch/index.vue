<template>
	<view class="el-search">
		<view class="tab-bar">
			<view class="col" :class="cityCode || countyCode ||streetCode ?'active' :''" @click="checkHandler('area')">
				区域
				<view class="arrow"></view>
			</view>
			<view class="col" :class="houseTypeId.length?'active':''" @click="checkHandler('house')">
				户型
				<view class="arrow"></view>
			</view>
			<view class="col" :class="price.length?'active':''" @click="checkHandler('price')">
				价格
				<view class="arrow"></view>
			</view>
			<view class="col" :class="area.length || roomType.length ?'active': ''" @click="checkHandler('filter')">
				筛选
				<view class="arrow"></view>
			</view>
			<view class="col last"  @click="checkHandler('sort')">
				<view :class="sortTypeObj?'active_sort':'sort'"></view>
			</view>
		</view>

		<view class="tab-content" v-if="current">
			<view class="wrap">
				<el-area v-if="current === 'area'"></el-area>
				<el-house v-if="current === 'house'"></el-house>
				<el-price v-if="current === 'price'"></el-price>
				<el-filter v-if="current === 'filter'"></el-filter>
				<el-sort v-if="current === 'sort'" @stratFn="examines"></el-sort>
			</view>

			<view class="btn-wrap" v-if="statusSwitch">
				<view class="reset" @click="resetHandler">
					<view class="icon"></view>
					<view class="label">
						重置
					</view>
				</view>
				<view class="show-btn" @click="examines">
					<ui-button>查看房源</ui-button>
				</view>
			</view>
		</view>

		<view class="overlay" @click="closePop" v-if="current"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import ElArea from './area';
	import ElHouse from './house';
	import ElPrice from './price';
	import ElFilter from './filter';
	import ElSort from './sort';
	import api from "@/api"

	export default {
		components: {
			ElArea,
			ElHouse,
			ElPrice,
			ElFilter,
			ElSort
		},
		data() {
			return {
				current: '',
				areaData: {},//区域
				houseData: {},//户型
				priceData: {},//价格
				filterData: {},//筛选
				sortData: {},//排序
				//是否显示查看房源
				statusSwitch: true
			}
		},
		created() {
			uni.$on("switchStatus", item => {
				this.current = '';
			})
		},
		props: {
			value: {
				type: Object,
				default () {
					return {};
				},
			},
		},
		computed: {
			...mapState({
				houseTypeId: state => state.search.houseTypeId,
				price: state => state.search.price,
				area: state => state.search.area,
				roomType: state => state.search.roomType,
				sortTypeObj: state => state.search.sortType,
				searchComId: state => state.search.searchComId,
				cityCode: state => state.search.cityCode,
				countyCode: state => state.search.countyCode,
				streetCode: state => state.search.streetCode,
				searchbox: state => state.search.searchBoxData,
			})
		},
		watch:{
			
		},
		methods: {
			// 查看房源
			examines() {

				let searchData = {
					cityId: this.cityCode || null,
					countyId: this.countyCode || null,
					regionId: this.streetCode || null,
					houseTypeIds: this.houseTypeId || null,
					price: this.price || null,
					area: this.area || null,
					roomTypes: this.roomType || null,
					sortColumn: this.sortTypeObj.sortColumn || null,
					sortType: this.sortTypeObj.sortType || null
				}
				this.$emit('getHouseSX', searchData)
				this.closePop();
			},
			// 重置按钮
			resetHandler() {
				this.$emit('resetHandler');
				this.closePop()
			},
			// 点击打开筛选面板
			checkHandler(type) {
				this.current = type;
				if (type == "sort") {
					this.statusSwitch = false
				} else {
					this.statusSwitch = true
				}
			},
			// 关闭面板
			closePop() {
				this.current = '';
			},
		},
		mounted() {
			uni.$on("stratFn", item => {
				this.examines()
			})
		},
	}
</script>

<style scoped lang="less">
	.el-search {
		position: relative;
	}

	.overlay {
		background: rgba(0, 0, 0, 0.4);
		height: 100vh;
		width: 100vw;
		position: absolute;
		left: -25rpx;
	}

	.tab-bar {
		display: flex;
		margin: 0 -25rpx;
		padding: 0 25rpx;
		font-size: 28rpx;
		color: #333333;
		border-bottom: 1rpx solid #E6E6E6;

		.col {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 35rpx 20rpx;
			box-sizing: border-box;

			&.active {
				color: #1B76FF;

				.arrow {
					background-image: url(../../static/rent/icon_arrow_bottom_active.png);
				}
			}
		}

		.last {
			flex-shrink: 0;
			flex-grow: 0;
		}

		.arrow {
			width: 12rpx;
			height: 7rpx;
			background: url(../../static/rent/icon_arrow_bottom.png) no-repeat;
			background-size: 100% 100%;
			margin-left: 20rpx;
		}

		.sort {
			width: 36rpx;
			height: 36rpx;
			background: url(../../static/rent/icon_sort.png) no-repeat;
			background-size: 100% 100%;
			
		}
		.active_sort {
			width: 36rpx;
			height: 36rpx;
			background: url(../../static/rent/icon_sort_active.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.tab-content {
		width: calc(100% + 50rpx);
		margin: 0 -25rpx;
		padding-bottom: 5rpx;
		position: absolute;
		z-index: 999;
		left: 0;
		background-color: #FFFFFF;
		box-shadow: 0rpx 10rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.btn-wrap {
		display: flex;
		padding: 25rpx;

		.reset {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 0 30rpx;
			margin-right: 40rpx;
			color: #082846;
			font-size: 24rpx;

			.icon {
				width: 48rpx;
				height: 48rpx;
				background: url(../../static/rent/icon_reset.png) no-repeat;
				background-size: 100% 100%;
				margin-bottom: 10rpx;
			}
		}

		.show-btn {
			flex: 1;
		}
	}
</style>
