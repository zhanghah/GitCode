<template>
	<view>
		<view class="page-floor" v-if="list.length">
			<view class="floor">
				<template>
					<view v-for="(item,index) in list" :key="index" @click="backBindHome(item)">{{item.name}}</view>
				</template>
			</view>
		</view>
		<no-result v-else message="暂无单元"></no-result>
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
				buildingId: '',
				buildingName: '',
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
						buildingId: this.myHome.buildingMsg.id
					}
					api.my.getMyUnitPages(canshu).then(res => {
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
				}finally{
					uni.stopPullDownRefresh()
				}

			},

			//返回绑定房屋
			backBindHome(item) {
				let unitMsg = {
					id: item.id,
					name: item.name
				}
				this.$store.commit('myHome/UNIT_MSG', unitMsg);
				uni.navigateBack({
					delta: 2
				})
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
				title: '选择单元',
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
