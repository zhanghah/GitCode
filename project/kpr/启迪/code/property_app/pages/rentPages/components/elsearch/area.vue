<template>
	<view class="el-search-area">
		<view class="col col1">
			<scroll-view scroll-y="true" style="height: 500rpx;">
				<view class="item" :class="{active:cityIndex==index}" v-for="(item,index) in city" :key="index" @click="cityChange(item.code,index)">
					{{item.name}}
				</view>
			</scroll-view>
		</view>

		<view class="col col2">
			<scroll-view scroll-y="true" style="height: 500rpx;">
				<view class="item" :class="{active:countyIndex==index}" v-for="(item,index) in county" :key="index" @click="countyChange(item.code,index)">
					{{item.name}}
				</view>
			</scroll-view>

		</view>

		<view class="col last">
			<scroll-view scroll-y="true" style="height: 500rpx;">
				<view class="item" v-for="(item,index) in streets" :key="index" @click="streetChange(item.code,index)">
					{{item.name}}
					<view :class="{icon:streetIndex===index}"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import api from "@/api"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				cityIndex: null,
				cityCode: '',
				countyIndex: null,
				countyCode: '',
				streetIndex: null,
				streetCode: '',
				city: [],
				county: [],
				streets: [],
				qucode: "",
			}
		},
		computed:{
			...mapState(['search'])
		},
		props: {
			info: {
				type: Object,
				default () {
					return {};
				},
			},
		},
		mounted() {
			this.getCity();
			this.getCounty();
			this.getStreet();
		},
		methods: {
			
			// 获取市级
			async getCity() {
				const res = await api.resource.getBm({
					containsCommunity: 1,
					level: 2,
					propertyId: this.$config.propertyId,
				});
				this.city = res.data;
				this.cityCode = res.data[0].code
				let ctcode=this.search.cityCode
				res.data.forEach((item,index)=>{
					if(ctcode==item.code){
						this.cityIndex=index
					}
				})
				// this.$store.commit('search/CITY_CODE',this.cityCode)
			},
			// 获取区级
			async getCounty() {
				const res = await api.resource.getBm({
					containsCommunity: 1,
					level: 3,
					parentCode: this.cityCode,
					propertyId: this.$config.propertyId,
				});
				this.county = res.data
				this.countyCode = res.data[0].code;
				let cotycode=this.search.countyCode;
				res.data.forEach((item,index)=>{
					if(cotycode==item.code){
						this.countyIndex=index
					}
				})
				// this.$store.commit('search/COUNTY_CODE',this.countyCode)
			},
			// 获取街道
			async getStreet() {
				const res = await api.resource.getBm({
					containsCommunity: 1,
					level: 4,
					parentCode: this.countyCode,
					propertyId: this.$config.propertyId,
				});
				this.streets = res.data;
				this.streetCode=res.data[0].code;
				let str=this.search.streetCode
				res.data.forEach((item,index)=>{
					if(str==item.code){
						this.streetIndex=index
					}
				})
				// this.$store.commit('search/STREET_CODE',this.streetCode)
			},

			// 选择市
			cityChange(code, index) {
				if (index == this.streetIndex) {
					this.cityIndex = null
					this.cityCode = ''
				} else {
					this.cityIndex = index
					this.cityCode = code
					this.$store.commit('search/CITY_CODE',code)
				}

				this.getCounty()
			},
			// 选择区县
			countyChange(code, index) {
				if (index == this.streetIndex) {
					this.countyIndex = null
					this.countyCode = ''
				} else {
					this.countyIndex = index
					this.countyCode = code;
					this.$store.commit('search/COUNTY_CODE',code)
				}

				this.getStreet()
			},
			// 选择街道
			streetChange(code, index) {
				if (index == this.streetIndex) {
					this.streetIndex = null
					this.streetCode = ''
				} else {
					this.streetIndex = index;
					this.streetCode = code
					this.$store.commit('search/STREET_CODE',code)
				}
			},
		},
		
		beforeMount() {
		},
	}
</script>

<style scoped lang="less">
	.el-search-area {
		display: flex;

		.col {
			width: 25%;
			font-size: 28rpx;
			color: #333333;

			.item {
				padding: 25rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				&.active {
					background-color: #E6E6E6;
				}
			}

			&.col2 {
				background-color: #F5F5F5;
			}

			&.last {
				flex: 1;

				.icon {
					width: 38rpx;
					height: 25rpx;
					background: url(../../static/rent/icon_check.png) no-repeat center center;
					background-size: 100% 100%;

					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				.item .active {
					background-color: transparent;
					color: #1B76FF;

					.icon {
						display: block;
					}
				}
			}
		}
	}
</style>
