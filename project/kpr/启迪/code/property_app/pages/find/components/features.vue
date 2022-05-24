<template>
	<view class="features">
		<view class="big row">
			<view class="item" @click="toPages(item)" v-for="(item,index) in source" :key="index">
				<view class="icon-wrap">
					<image :src="item.iconBig"></image>
				</view>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'Features',
		components: {},
		props: {
			source: {
				type: Array,
				default () {
					return [];
				},
			},
		},
		data() {
			return {}
		},
		computed: {
			...mapState(['imageView']),
		},
		onLoad() {},
		methods: {
			toPages(item){
				// 如果存在权限限制
				if(item.checked){
					let myhouse= uni.getStorageSync('my_house')
					if(myhouse.length){
						let values=uni.getStorageSync('recently_used')
						// 如果缓存中最近使用数据为空
						if(!values){
							let recentlyUsed=[]
							recentlyUsed.push(item.name)
							uni.setStorageSync('recently_used',recentlyUsed)
						}else{
							console.log(values.indexOf(item.name))
							// 如果缓存中不存在该菜单
							if(values.indexOf(item.name)==-1){
								// 如果缓存中小于4
								if(values.length<4){
									values.unshift(item.name);
									uni.setStorageSync('recently_used',values)
									console.log(values)
								}else{
									values.pop()
									values.unshift(item.name);
									uni.setStorageSync('recently_used',values)
									console.log(values)
								}
							}else{
								// 缓存中存在
								// 查找该菜单在数组中位置
								let index = values.indexOf(item.name);
								let first = values.splice(index , 1)[0];
								values.unshift(first);
								uni.setStorageSync('recently_used',values)
							}
						}
						uni.navigateTo({
							url: item.url,
							fail: (res) => {
								console.log(res);
								console.log(item);
							},
						});
					}else{
						uni.showToast({
							icon:'none',
							title:'请先绑定房屋'
						})
					}
				}else{
					let values=uni.getStorageSync('recently_used')
					// 如果缓存中最近使用数据为空
					if(!values){
						let recentlyUsed=[]
						recentlyUsed.push(item.name)
						uni.setStorageSync('recently_used',recentlyUsed)
					}else{
						console.log(values.indexOf(item.name))
						// 如果缓存中不存在该菜单
						if(values.indexOf(item.name)==-1){
							// 如果缓存中小于4
							if(values.length<4){
								values.unshift(item.name);
								uni.setStorageSync('recently_used',values)
								console.log(values)
							}else{
								values.pop()
								values.unshift(item.name);
								uni.setStorageSync('recently_used',values)
								console.log(values)
							}
						}else{
							// 缓存中存在
							// 查找该菜单在数组中位置
							let index = values.indexOf(item.name);
							let first = values.splice(index , 1)[0];
							values.unshift(first);
							uni.setStorageSync('recently_used',values)
						}
					}
					uni.navigateTo({
						url: item.url,
						fail: (res) => {
							console.log(res);
						},
					});
				}
			},
		}
	}
</script>

<style scoped>
	.row {
		display: flex;
		flex-wrap: wrap;
		margin: 25rpx 0;
	}

	.row .item {
		width: 20%;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.big .item {
		width: 25%;
		margin-bottom: 25rpx;
	}

	.icon-wrap {
		background: rgba(0, 0, 0, 0);
		margin-bottom: 6rpx;
	}

	.item image {
		width: 100%;
		height: 100%;
	}

	.big .icon-wrap {
		width: 104rpx;
		height: 104rpx;
	}
</style>
