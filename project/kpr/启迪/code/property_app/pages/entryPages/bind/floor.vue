<template>
	<view>
		<view class="page-floor" v-if="list.length">
			<view class="floor">
				<view v-for="(item,index) in list" :key="index" @click="toRoom(item)">{{item.floorNumber}} 楼层</view>
			</view>
		</view>
		<no-result v-else message="暂无楼层"></no-result>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				list: [],
				current: 1,
				size: 20,
				total: 0,
			}
		},
		computed: {
			...mapState(['user', 'myHome'])
		},
		methods: {
			//获取单元列表
			getList(Id) {
				try {
					let canshu = {
						current: this.current,
						size: this.size,
						unitId: this.myHome.unitMsg.id
					}
					api.my.getMyFloorPages(canshu).then(res => {
						if (res.status !== '0') {
							return
						};
						this.total = res.data.total
						res.data.records.forEach(item => {
							this.list.push(item)
						})
					})
				} catch (e) {
					//TODO handle the exception
				} finally {
					uni.stopPullDownRefresh()
				}
			},

			//跳转房号
			toRoom(item) {
				let floorMsg = {
					id: item.id,
					name: item.floorNumber
				}
				this.$store.commit('myHome/FLOOR_MSG', floorMsg);
				uni.navigateTo({
					url: '/pages/entryPages/bind/room',
				});
			}

		},
		// 下拉刷新
		onPullDownRefresh() {
			this.list = []
			this.getList()
		},
		// 上拉加载
		onReachBottom() {
			if (this.total > this.size * this.current) {
				this.current++;
				this.getList()
			} else {
				uni.showToast({
					title: '已经全部加载'
				})
			}
		},
		mounted() {
			this.getList()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '选择楼层',
			});
		},
		onUnload() {}
	}
</script>

<style scoped>
	.page-floor {
		min-height: 100vh;
		background: #F5F5F5;
	}

	.floor {
		background: #fff;
		margin-top: 19rpx;
	}

	.floor view {
		width: 90%;
		height: 99rpx;
		line-height: 99rpx;
		border-bottom: 1px solid #E6E6E6;
		margin: 0 auto;
		padding: 0 7rpx;
		font-size: 34rpx;
		color: #303331;
	}

	.floor view:last-child {
		border-bottom: none;
	}
</style>
