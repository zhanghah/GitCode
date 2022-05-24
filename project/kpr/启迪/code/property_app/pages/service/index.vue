<template>
	<view class="page-service">
		<!-- <view class="wrapper">
			<home-ad :source="adList"></home-ad>
		</view> -->

		<view v-for="(item, index) in usedList" :key="index">
			<view class="block" v-if="item.viewMouldList.length">
				<view class="title">
					<view class="line"></view>
					<view class="text">{{item.groupName}}</view>
				</view>

				<view class="container">
					<view class="item" v-for="mould in item.viewMouldList" :key="mould.id"
						@click="$utils.moduleRedirect(mould)">
						<view :class="['icon-wrap', { noimage: !mould.iconSmall }]">
							<image v-if="mould.iconSmall" :src="`${mould.iconSmall}`"></image>
						</view>
						<view class="name">{{mould.name}}</view>
					</view>
				</view>
			</view>
		</view>

		<block v-for="(item, index) in list" :key="index">
			<view class="block">
				<view class="title">
					<view class="line"></view>
					<view class="text">{{item.groupName}}</view>
				</view>

				<view class="container">
					<view class="item" v-for="mould in item.viewMouldList" :key="mould.id"
						@click="$utils.moduleRedirect(mould)">
						<view :class="['icon-wrap', { noimage: !mould.iconSmall }]">
							<image v-if="mould.iconSmall" :src="`${mould.iconSmall}`"></image>
						</view>
						<view class="name">{{mould.name}}</view>
					</view>
				</view>
			</view>
		</block>
		<tab-bar :setting="tabBar"></tab-bar>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	import api from '@/api';
	import HomeAd from '../index/components/homeAd.vue';

	export default {
		components: {
			HomeAd
		},
		data() {
			return {
				adList: [],
				usedList: [{
					groupName: '最近使用',
					viewMouldList: []
				}],
				list: [
					{
						groupName: '物业服务',
						viewMouldList: [{
								code: "1",
								groupType: "baseProperty",
								iconSmall: "../../static/service/shjf.png",
								id: "1",
								name: "生活缴费",
								checked: true
							},
							{
								code: "11",
								groupType: "baseProperty",
								iconSmall: "../../static/service/gjfw.png",
								id: "11",
								name: "管家服务",
								checked: true
							},
							{
								code: "3",
								groupType: "baseProperty",
								iconSmall: "../../static/service/bsbx.png",
								id: "3",
								name: "报事报修",
								checked: true
							},
							{
								code: "4",
								groupType: "baseProperty",
								iconSmall: "../../static/service/tsjy.png",
								id: "4",
								name: "投诉建议",
								checked: true
							},
							// {
							// 	code: "15",
							// 	groupType: "baseProperty",
							// 	iconSmall: "../../static/service/zxsq.png",
							// 	id: "15",
							// 	name: "装修申请",
							// checked:true
							// },
							{
								code: "5",
								groupType: "baseProperty",
								iconSmall: "../../static/service/tstd.png",
								id: "5",
								name: "通水通电",
								checked: true
							},
							{
								code: "16",
								groupType: "baseProperty",
								iconSmall: "../../static/service/dsbg.png",
								id: "16",
								name: "待收包裹",
								checked: true
							},
							{
								code: "13",
								groupType: "baseProperty",
								iconSmall: "../../static/service/fktx2.png",
								id: "13",
								name: "访客通行",
								checked: true
							},
							{
								code: "2",
								groupType: "baseProperty",
								iconSmall: "../../static/service/tcjf.png",
								id: "2",
								name: "停车缴费",
								checked: true
							},
							{
								code: "7",
								groupType: "baseProperty",
								iconSmall: "../../static/service/ywh.png",
								id: "7",
								name: "业委会",
								checked: true
							},
						]
					},
					{
						groupName: '发现',
						viewMouldList: [{
								code: "8",
								groupType: "baseProperty",
								iconSmall: "../../static/service/sqyd.png",
								id: "8",
								name: "社区运动",
								checked: false
							},
							{
								code: "6",
								groupType: "baseProperty",
								iconSmall: "../../static/service/cgyd.png",
								id: "6",
								name: "场馆预定",
								checked: false
							},
							{
								code: "10",
								groupType: "baseProperty",
								iconSmall: "../../static/service/xqjl.png",
								id: "10",
								name: "小区交流",
								checked: false
							},
							{
								code: "12",
								groupType: "baseProperty",
								iconSmall: "../../static/service/zhjk.png",
								id: "12",
								name: "智慧健康",
								checked: false
							},
						]
					},
					{
						groupName: '智慧应用',
						viewMouldList: [{
								code: "14",
								groupType: "baseProperty",
								iconSmall: "../../static/service/zhjj.png",
								id: "14",
								name: "智慧家居",
								checked: true
							},
							{
								code: "9",
								groupType: "baseProperty",
								iconSmall: "../../static/service/cyga.png",
								id: "9",
								name: "成员关爱",
								checked: false
							},
						]
					},
				],
				tabBar:{
					color: "#7A7A7C",
					selectedColor: "#1B76FF",
					list: [{
							"pagePath": "/pages/index/index",
							"iconPath": "../../static/tabbar/icon_home.png",
							"selectedIconPath": "../../static/tabbar/icon_home_active.png",
							"text": "首页"
						},
						{
							"pagePath": "/pages/service/index",
							"iconPath": "../../static/tabbar/icon_service.png",
							"selectedIconPath": "../../static/tabbar/icon_service_active.png",
							"text": "服务"
						},
						{
							"pagePath": "/pages/access/index",
							"iconPath": "../../static/tabbar/icon_door.png",
							"selectedIconPath": "../../static/tabbar/icon_door.png",
							"text": "门禁"
						},
						{
							"pagePath": "/pages/find/index",
							"iconPath": "../../static/tabbar/icon_find.png",
							"selectedIconPath": "../../static/tabbar/icon_find_active.png",
							"text": "发现"
						},
						{
							"pagePath": "/pages/user/index",
							"iconPath": "../../static/tabbar/icon_user.png",
							"selectedIconPath": "../../static/tabbar/icon_user_active.png",
							"text": "我的"
						}
					]
				},
			}
		},
		computed: {
			...mapState(['community', 'imageView']),
		},
		methods: {
			// 获取轮播广告
			async getHomeAd() {
				const res = await api.homepage.getHomeAd({
					size: 5,
					type: 1
				})
				console.log(res)
				if (res) {
					this.adList = res.data
				}
			},
			// 获取最近使用
			getUsed(){
				let recentlyUsed=uni.getStorageSync('recently_used');
				console.log(recentlyUsed)
				// 如果缓存存在菜单
				this.usedList[0].viewMouldList=[];
				if(recentlyUsed.length>0){
					let arr=[];
					this.list.forEach(item=>{
						item.viewMouldList.forEach(val=>{
							arr.push(val)
						})
					});
					recentlyUsed.forEach(item=>{
						arr.forEach(val=>{
							if(item==val.name){
								this.usedList[0].viewMouldList.push(val)
							}
						})
					})
					console.log(this.usedList)
				}
			}
		},
		beforeMount() {
			this.getHomeAd();
		},
		onShow() {
			this.getUsed()
		}
	}
</script>

<style lang="less" scoped>
	.wrapper {
		padding: 0 24rpx;
	}

	.banner {
		width: 100%;
		height: 360rpx;
		padding: 0 24rpx;
		position: relative;

		.swiper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			height: 360rpx;
			background-color: #e7e7e7;
		}
	}

	.block {
		padding: 25rpx 25rpx 0 25rpx;
	}

	.container {
		display: flex;
		flex-wrap: wrap;
	}

	.item {
		width: 20%;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #6B6564;
		margin-bottom: 40rpx;
	}

	.item .icon-wrap {
		background: rgba(0, 0, 0, 0);
		margin-bottom: 12rpx;
		width: 60rpx;
		height: 60rpx;

		&.noimage {
			background: rgba(0, 0, 0, 0.1);
			border-radius: 8rpx;
		}
	}

	.item image {
		width: 100%;
		height: 100%;
	}

	.title {
		display: flex;
		align-items: center;

		color: #020204;
		font-size: 34rpx;
		font-weight: bold;
		margin-bottom: 30rpx;

		.line {
			width: 8rpx;
			height: 34rpx;
			/* background: url(../static/icon_line.png) no-repeat;
				background-size: 100% 100%; */
			margin-right: 20rpx;
		}
	}

	.dividing {
		height: 20rpx;
		background: #F5F5F5;
	}
</style>
