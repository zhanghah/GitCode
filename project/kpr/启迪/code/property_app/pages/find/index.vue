<template>
	<view class="page-find">
		<view class="container box">
			<!-- 头部图片 -->
			<view class="wrapper">
				<home-ad :source="adList"></home-ad>
			</view>

			<!-- 功能入口 -->
			<features :source="viewMouldList"></features>
		</view>
		<!-- 金刚区菜单列表 -->
		<!-- <view class="">
			<menulist></menulist>
		</view> -->
		<view class="container other">
			<!-- <post v-if="post.id" :source="post"></post> -->

			<activity v-if="activityList.length>0" :source="activityList"></activity>

			<!-- <building v-if="convenience.id" :source="convenience"></building> -->
		</view>
		<!-- 附近设施 -->
		<view>
			<!-- <nearby></nearby> -->
		</view>
		<tab-bar :setting="tabBar"></tab-bar>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/api';
	import HomeAd from '../index/components/homeAd.vue';
	import menulist from './components/menuList';
	import nearby from './components/nearby';
	import Features from './components/features';
	import Post from './components/post';
	import Activity from './components/activity';
	import Building from './components/building';

	export default {
		components: {
			HomeAd,
			Features,
			Post,
			Activity,
			Building,
			menulist,
			nearby
		},
		data() {
			return {
				adList: [],
				viewMouldList: [
					{
					code: "1",
					groupType: "find",
					iconBig: require("../../static/find/icon_llq.png"),
					name: "社区运动",
					url:"/pages/servicePages/sport/index",
					checked: false
					}, 
					{
					code: "2",
					groupType: "find",
					iconBig: require("../../static/find/icon_zhjk.png"),
					name: "智慧健康",
					url:"/pages/indexPages/health/index",
					checked: false
					}, 
					{
					code: "3",
					groupType: "find",
					iconBig: require("../../static/find/icon_cgyd.png"),
					name: "场馆预定",
					url:"/pages/servicePages/venue/index",
					checked: false
					}, 
					{
					code: "4",
					groupType: "find",
					iconBig: require("../../static/find/icon_xqjl.png"),
					name: "小区交流",
					url:"/pages/servicePages/communication/index",
					checked: false
					}, 
				],
				post: {},
				convenience: {},
				activityList: [],
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
			...mapState(['community']),
		},

		methods: {
			// 加载活动推荐(5条)
			async loadData() {
				try {
					const res = await api.find.getMainPage({
						size: 5
					})
					console.log(res)
					if (res) {
						this.activityList = res.data
					}
				} catch (error) {
					//
				} finally {
					uni.stopPullDownRefresh();

				}
			},
			// 获取轮播广告
			async getHomeAd() {
				// const res = await api.homepage.getHomeAd({
				// 	size: 5,
				// 	type: 2
				// })
				const res = await api.find.getMainPage({
					size: 2
				})
				console.log(res)
				if (res) {
					this.adList = res.data
				}
			},
		},
		onShow() {
			this.loadData();
			this.getHomeAd()
			console.log(1111)
		},
		onPullDownRefresh() {
			this.loadData();
		},
	}
</script>

<style scoped lang="less">
	.page-find {
		background: #f5f5f5;
		min-height: 100vh;
	}

	.container {
		padding: 20rpx;
	}

	.box {
		background: #FFFFFF;
	}

	.other {
		padding-top: 0;
	}
</style>
