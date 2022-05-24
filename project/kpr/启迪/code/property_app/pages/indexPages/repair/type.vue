<template>
	<view class="pages-repair-type">
		<view class="content">
			<view class="navbar">
				<view v-for="(item, index) in menu" :key="index" @tap="handMenuIndex(index)"
					:class="{ active: menuIndex == index }">
					<text :class="{ active: menuIndex == index }">{{ item.typeName }}</text>
				</view>
			</view>
			<!-- private -->
			<view class="childMenu">
				<view v-for="(item, index) in list" :key="index" class="contentBox" @tap="handSubscript(item)">
					<view class="title">
						{{ item.typeName }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex'
	export default {

		data() {
			return {
				menu: [],
				menuIndex: 0,
				list: [],
			};
		},
		computed: {
			...mapState(['community'])
		},
		methods: {
			// 父级事件
			async getParentMenu(index) {
				const res = await api.maintain.getMaintainType({
					ceResidentialQuartersId: this.community.id
				})
				this.menu = res.data
				console.log(res)
			},

			// 子级事件
			async getChildren(index) {
				let query = {}
				if (this.menu.length) {
					if (this.menuIndex == 0) {
						query = {
							ceResidentialQuartersId: this.community.id,
							parentId: this.menu[0].id,
						}
					} else {
						query = {
							ceResidentialQuartersId: this.community.id,
							parentId: this.menu[index].id,
						}
					}
					const res = await api.maintain.getChildrenType(query)
					if (res.code != 'success') {
						return
					};
					this.list = res.data
					console.log(this.list)
				}
			},

			handMenuIndex(index) {
				this.menuIndex = index
				this.getChildren(index)
			},
			// 返回上一页面
			handSubscript(item) {
				let parentId;
				let data = {
					childrenId: item.id,
					parentId: item.parentId,
					typeName: item.typeName
				};
				uni.$emit('typeName', data)
				uni.navigateBack({
					delta: 1
				})
			},
		},
		async beforeMount() {
			uni.setNavigationBarTitle({
				title: "选择报事报修类型",
			});
			await this.getParentMenu();
			await this.getChildren()
		},
	};
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.pages-repair-type {
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}

	.content {
		min-height: 100vh;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;

		.navbar {
			width: 200rpx;
			background-color: #fff;
			min-height: 100vh;
			margin-right: 20rpx;
			box-sizing: border-box;

			view {
				padding: 45rpx 0rpx;
				text-align: center;
				font-size: 32rpx;

				text {
					display: block;
					width: 100%;
				}

				&.active {
					background-color: #802890;

					text {
						color: #FFFFFF;
					}
				}
			}
		}

		.childMenu {
			padding-top: 20rpx;
			// width: 503rpx;
			flex: 1;

			.contentBox {
				background-color: #fff;
				font-size: 32rpx;
				color: #333333;

				.child,
				.title {
					line-height: 108rpx;
				}

				.title {
					padding-left: 32rpx;
					padding-right: 32rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #e8e8e8;

					image {
						width: 12rpx;
						height: 24rpx;

						&.active {
							width: 24rpx;
							height: 12rpx;
						}
					}
				}

				.childBox {
					.child {
						border-bottom: 1rpx solid #e8e8e8;
						padding-left: 71rpx;
						background-color: #fafafa;
					}

					view:last-child {
						border-bottom: none;
					}
				}
			}
		}
	}
</style>
