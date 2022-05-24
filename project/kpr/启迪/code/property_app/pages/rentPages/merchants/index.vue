<template>
	<view class="page-merchant-index">
		<view v-if="list.length">
			<view class="block" v-for="(item,index) in list" :key="index" @tap="toDetailPage(item.id)">
				<view>
					<view class="image">
						<!-- <image src="" mode="" /> -->
						<image :src="`${imageView}${item.image}`"></image>
					</view>

					<view class="title">
						{{item.name}}
					</view>
				</view>
			</view>
			<!-- <view class="load-box" v-if="list.length!=0">
				<u-loadmore :icon-type="iconType" :status="status" />
			</view> -->
		</view>
		<no-result v-else></no-result>

		<call-phone :tell="phone"></call-phone>
	</view>
</template>

<script>
	import api from '@/api';
	import callPhone from './components/callPhone.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		components: {
			callPhone
		},
		data() {
			return {
				canshu: {
					current: 1,
					size: 20,
					total: ''
				},
				list: [],
				phone: '',
				status: '',
				iconType: 'flower',
			};
		},
		computed: {
			...mapState(['user', 'imageView']),
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '招商中心',
			});
			this.getList()
			this.getPhone()
		},
		methods: {
			toDetailPage(id) {
				uni.navigateTo({
					url: `./detail?id=${id}&phone=${this.phone}`,
				});
			},

			getList() {
				try {
					api.lifejf.getZsPage(this.canshu).then(res => {
						if (res.status !== '0') {
							return
						};
						this.list = res.data.records
						console.log(res.data)
						let {
							total,
							size,
							current
						} = res.data
						this.canshu.size = size;
						this.canshu.current = current
						this.total = total

					})
				} catch (err) {
					//
				} finally {
					uni.stopPullDownRefresh();
				}

			},
			getPhone() {
				api.lifejf.getPhone({
					propertyId:this.user.propertyId
				}).then(res => {
					if (res.status !== '0') {
						return
					};
					console.log(res)
					this.phone = res.data.phone
				})
			},
			// 上拉加载
			loadMore(i) {
				if (this.total > this.canshu.size * this.canshu.current) {
					console.log('加载中')
					this.canshu.current++;
					this.status = 'loading';
					setTimeout(() => {
						this.status = 'nomore';
						this.getList()
					}, 800)
				} else {
					this.status = 'nomore'
				}
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.list = []
			this.getList()
		},
	}
</script>

<style scoped lang="less">
	.page-merchant-index {
		min-height: 100vh;
		padding: 25rpx;
		background-color: #F5F5F5;
		box-sizing: border-box;
	}

	.block {
		background-color: #FFFFFF;
		border-radius: 15rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.image {
		width: 100%;
		height: 320rpx;
		background-color: #eee;

		image {
			width: 100%;
		}
	}

	.title {
		padding: 30rpx 25rpx;
		font-size: 32rpx;
		color: #333333;
		font-weight: bold;
	}
</style>
