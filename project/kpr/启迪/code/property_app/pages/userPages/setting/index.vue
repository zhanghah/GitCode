<template>
	<view class="page-setting">
		<view class="content">
			<view class="links">
				<!-- <ui-link label="意见反馈" @click.native="goToFeedbackPage"></ui-link> -->

				<ui-link label="清除缓存" @click.native="clearStorage">
					<view slot="ext" class="link-ext">{{(currentSize/1024).toFixed(2)}}MB</view>
				</ui-link>

				<ui-link label="关于我们" @click.native="goToAboutusPage"></ui-link>
			</view>

			<view class="btn-wrap">
				<ui-button @click.native="logoutHandler">退出登录</ui-button>
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
				title: '设置',
				name: '',
				currentSize: '', //缓存大小
				storageSize: ''
			}
		},
		computed: {
			...mapState(['user']),
		},
		onLoad() {},
		methods: {
			...mapMutations({
				clearCommunityCache: 'CLEAR_COMMUNITY_CACHE',
			}),
			...mapMutations('user', {
				clearUser: 'CLEAR_USER',
			}),
			...mapMutations({
				clearHouse: 'CLEAR_HOUSE_CACHE',
			}),
			goToAboutusPage() {
				uni.navigateTo({
					url: '/pages/userPages/setting/aboutus/index'
				});
			},
			getStorage() {
				const res = uni.getStorageInfoSync();
				this.currentSize = res.currentSize
			},
			// clearStorage() {
			// 	uni.clearStorageSync();
			// },
			logoutHandler() {
				uni.showModal({
					title: '提示',
					content: '确认退出登录',
					success: (res) => {
						if (res.confirm) {
							// 清除登录缓存
							this.clearUser();
							this.clearCommunityCache();
							// 清除历史浏览记录
							uni.removeStorage({
								key: 'recently_used',
								key: 'my_house'
							})

							uni.reLaunch({
								url: '/pages/entryPages/login/pwd',
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 计算缓存
			getStorageSize() {
				let that = this;
				uni.getStorageInfo({
					success(res) {
						console.log(res.keys);
						//console.log(res.limitSize);
						let size = res.currentSize;
						if (size < 1024) {
							that.storageSize = size + ' B';
						} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
							that.storageSize = Math.floor(size / 1024 * 100) / 100 + ' KB';
						} else if (size / 1024 / 1024 >= 1) {
							that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + ' M';
						}
						console.log(this.storageSize)
					}
				})
			},
			// 清除缓存
			clearStorage() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定清除缓存吗?',
					confirmText: '立即清除',
					success(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							//重新获取并显示清除后的缓存大小
							that.getStorageSize();
							uni.showToast({
								title: '清除成功'
							})
						}
					}
				})
			}
		},
		onShow() {
			this.getStorage()
			this.getStorageSize()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '设置',
			});
		},
	}
</script>

<style scoped lang="less">
	.page-setting {
		min-height: 100vh;
		padding-top: 25rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}

	.btn-wrap {
		padding: 60rpx 30rpx;
	}

	.link-ext {
		color: #666666;
		font-size: 28rpx;
	}
</style>
