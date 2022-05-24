<template>
	<view class="ui-tab-bar">
		<view @click="navTo(item)" :class="['col', { active: item.pagePath === currentRoute }]"
			v-for="(item, index) in setting.list" :key="index">
			<view :class="['icon', { useBg: !item.iconPath }]">
				<image :src="item.pagePath === currentRoute ? item.selectedIconPath : item.iconPath"></image>
			</view>
			<view class="label">
				{{item.text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TabBar',
		components: {},
		props: {
			setting: Object,
			default () {
				return {
					list: [],
				};
			},
		},
		data() {
			return {
				currentRoute: '',
			}
		},
		computed: {
			myhouse() {
				return uni.getStorageSync('my_house')
			}
		},
		beforeMount() {
			const pages = getCurrentPages();

			const current = pages[pages.length - 1];

			this.currentRoute = `/${current.route}`
		},
		methods: {
			navTo(item) {
				if (this.currentRoute === item.pagePath) {
					return;
				}
				if(item.pagePath=='/pages/access/index'){
					if(this.myhouse.length<=0){
						this.$toast('请先绑定房屋')
						return
					}else{
						uni.redirectTo({
							url: item.pagePath,
						});
					}
				}else{
					uni.redirectTo({
						url: item.pagePath,
					});
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.ui-tab-bar {
		border-top: 1rpx solid #E6E6E6;
		background: #FFFFFF;
		height: 110rpx;
		box-sizing: border-box;
		display: flex;
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;

		.col {
			flex: 1;

			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			color: #333333;

			&.active {
				color: #802890;
			}

			font-size: 24rpx;

			.icon {
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 3rpx;

				&.useBg {
					background: #e7e7e7;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
