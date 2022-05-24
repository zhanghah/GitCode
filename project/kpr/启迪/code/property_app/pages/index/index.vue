.<template>
	<view class="page-index">
		<template v-if="isNetWork">
			<view class="top-bar wrapper">
				<community></community>
			</view>

			<!-- 首页广告位 -->
			<view class="wrapper">
				<home-ad :source="adList"></home-ad>
			</view>

			<!-- 功能列表 -->
			<view class="feature-list wrapper">
				<features></features>
			</view>

			<!-- 社区公告 -->
			<announcement :source="noticeList" @click.native="toNewsPage"></announcement>

			<view class="dividing"></view>

			<!-- 小区交流 -->
			<template>
				<activity :source="activityList"></activity>

				<view class="dividing"></view>
			</template>

			<u-modal v-model="show" content="当前小区无房屋暂时无法访问"></u-modal>
		</template>

		<template v-else>
			<view class="network">
				<image src="@/static/index/network_type.png" mode=""></image>
				<view class="text">
					<view>
						网络不给力,
					</view>
					<view class="retry" @tap="retry">
						点击重试
					</view>
				</view>
			</view>
		</template>
		<tab-bar :setting="tabBar"></tab-bar>
		<view class="shangc" @click="$goPage(['/pages/index/mallIndex'])">
			<image src="../../static/mall/tabbar/shangc.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import api from '@/api';


	import Community from './components/community';
	import HomeAd from './components/homeAd';
	import Features from './components/features';
	import Announcement from './components/announcement';
	import Activity from './components/activity';

	export default {
		components: {
			Community,
			HomeAd,
			Features,
			Announcement,
			Activity,
		},
		data() {
			return {
				isNetWork: false,
				adList: [],
				noticeList: [],
				activityList: [],
				loading: false,
				show: false,
				jyJPush: [],
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
			...mapState(['user', 'community', 'myHome']),
		},
		onLoad() {},
		methods: {
			// 跳转公告
			toNewsPage() {
				uni.navigateTo({
					url: '../indexPages/news/index'
				});
			},
			async loadData() {
				this.loading = true;

				try {
					// 社区公告
					const resNotice = await api.homepage.getCommunityNotice({
						comId: this.community.id,
						current: 1,
						size: 5
					});
					if (resNotice) {
						let newTime = Date.parse(new Date())
						resNotice.data.records.reverse().forEach(item => {
							if (item.dueDate - newTime > 0) {
								this.noticeList.push(item)
							}
						})
					}
					// 小区交流
					const resActivity = await api.homepage.getHomePage({
						size: 5
					})
					if (resActivity) {
						this.activityList = resActivity.data;
					}
				} catch (error) {
					console.log(error)
				} finally {
					this.loading = false;
					uni.stopPullDownRefresh();
				}
			},

			// 获取首页轮播广告
			async getHomeAd() {
				const res = await api.homepage.getHomeAd({
					size: 5,
					type: 0
				})
				if (res) {
					this.adList = res.data
				}
			},

			// 获取我的住房分页列表,默认将第一个房屋信息添加到状态管理
			async getHousePages() {
				const query = {
					checkStatus: 1,
					current: 1,
					size: 10
				}
				const res = await api.my.getMyHousingPages(query)
				if (res.status !== '0') {
					return
				};
				console.log(res.data)
				uni.setStorageSync('my_house', res.data.records)
				let val = res.data.records[0]
				if (!this.myHome.HouseMsg) {
					this.$store.commit('myHome/HOUSE_MSG', val)
				}
			},
			// 点击重试
			retry() {
				this.getNetwork();
				if (!this.isNetWork) {
					uni.showToast({
						icon: 'none',
						title: '网络连接不可用，请检查网络'
					})
				}
			},
			// 检测是否连接网络
			getNetwork() {
				uni.getNetworkType({
					success: (res) => {
						if (res.networkType == 'none') {
							this.isNetWork = false //无网
						} else {
							this.isNetWork = true //有网
						}
					}
				});
			},

		},
		onShow() {
			this.getNetwork()
			this.getHomeAd()
			this.getHousePages();
			this.loadData();
		},
		mounted() {},
		beforeMount() {},
		onPullDownRefresh() {
			this.loadData();
			this.getNetwork();
		},
		onReady() {
			const jyJPush = uni.requireNativePlugin('JY-JPush');
			// 安卓初始化
			jyJPush.android_init(res => {
				console.log(res)
			})
			//
			jyJPush.setJYJPushAlias({
				userAlias: 'testAlias'
			}, result => {
				//  设置成功或者失败，都会通过这个result回调返回数据；数据格式保持极光返回的安卓/iOS数据一致
				//  注：若没有返回任何数据，考虑是否初始化完成
				console.log(result);
			});
			jyJPush.addJYJPushReceiveNotificationListener(result => {
				//  监听成功后，若收到推送，会在result返回对应的数据；数据格式保持极光返回的安卓/iOS数据一致
				console.log(result);

			});
			jyJPush.addJYJPushReceiveOpenNotificationListener(result => {
				//  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
				console.log(result);
			});
		}
	}
</script>

<style lang="less" scoped>
	.wrapper {
		padding: 0 24rpx;
	}

	.top-bar {
		margin: 40rpx;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.feature-list {
		padding: 15rpx 0;
	}

	.dividing {
		height: 20rpx;
		background: #F5F5F5;
	}

	uni-modal__bd {
		font-size: 66rpx !important;
	}

	.network {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 189rpx;

		image {
			width: 374rpx;
			height: 348rpx;
		}

		.text {
			width: 100%;
			display: flex;
			justify-content: center;
			color: #666666;
			font-size: 32rpx;

			.retry {
				margin-left: 10rpx;
				color: #F05050;
				border-bottom: 2rpx #FAB6B6 solid;
			}
		}
	}

	.shangc{
		position: fixed;
		background: ;
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		right: 20rpx;
		bottom: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,0.3);
		box-shadow: 0.5px 0.5px 10px rgb(0 0 0 / 10%);
		image{
			width: 40rpx;
			height: 40rpx;
		}
	}
</style>
