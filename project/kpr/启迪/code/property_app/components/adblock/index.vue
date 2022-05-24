<template>
	<swiper class="swiper" :indicator-dots="true" :autoplay="true" indicator-color="rgba(255, 255, 255, 0.9)"
		indicator-active-color="rgba(255, 255, 255, 0.4)">
		<swiper-item class="swiper-item" v-for="item in source" :key="item.id" @tap="adItemTapHandler(item, $event)">
			<image mode="scaleToFill" :src="`${imageView}${item.image}`" />
		</swiper-item>
	</swiper>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import module from '../../config/module.json';
	import api from '@/api';

	export default {
		name: 'AdBlock',
		components: {},
		props: {
			// 未传type的情况下将使用source作为数据源
			// 有type将主动拉取对应类型数据
			type: {
				type: String,
				default: '',
			},
			source: {
				type: Array,
				default () {
					return [];
				},
			}
		},
		computed: {
			...mapState([
				'imageView',
			]),
			myhouse(){
				return uni.getStorageSync('my_house')
			}
		},
		watch: {
			source(val) {
				this.list = val;
			},
		},
		data() {
			return {
				list: [],
			}
		},
		methods: {
			// redirectType	跳转方式 0：不跳转，1：链接，2：板块，3：商品，4：活动
			// activityType	类型0-投票,1-社区活动,2-报名活动
			adItemTapHandler(item) {
				if (item.redirectType == '0') {
					return
					// 不跳转
				} else if (item.redirectType == '1') {
					// 跳转链接
					uni.navigateTo({
						url: `/pages/webView/index?address=${item.address}`
					})
				}else if(item.redirectType=='2'){
					// 跳转方式为板块时，address类型0-首页,1-服务,2-发现
					const target = module.filter(m => m.code === item.address)[0];
					console.log(target)
					// 如果需要判断有无房屋,有房屋则跳转，无房屋则提示且禁止跳转
					if(target.checked){
						let myhouse= uni.getStorageSync('my_house')
						if(myhouse.length>0){
							let values=uni.getStorageSync('recently_used')
							// 如果缓存中最近使用数据为空
							if(!values){
								let recentlyUsed=[]
								recentlyUsed.push(target.name)
								uni.setStorageSync('recently_used',recentlyUsed)
							}else{
								// 如果缓存中不存在该菜单
								if(values.indexOf(target.name)==-1){
									// 如果缓存中小于4
									if(values.length<4){
										values.unshift(target.name);
										uni.setStorageSync('recently_used',values)
									}else{
										values.pop()
										values.unshift(target.name);
										uni.setStorageSync('recently_used',values)
									}
								}else{
									// 缓存中存在
									// 查找该菜单在数组中位置
									let index = values.indexOf(target.name);
									let first = values.splice(index , 1)[0];
									values.unshift(first);
									uni.setStorageSync('recently_used',values)
								}
							}
							uni.navigateTo({
								url: target.page,
								fail: (res) => {
									console.log(res);
									console.log(target);
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
							recentlyUsed.push(target.name)
							uni.setStorageSync('recently_used',recentlyUsed)
						}else{
							// 如果缓存中不存在该菜单
							if(values.indexOf(target.name)==-1){
								// 如果缓存中小于4
								if(values.length<4){
									values.unshift(target.name);
									uni.setStorageSync('recently_used',values)
								}else{
									values.pop()
									values.unshift(target.name);
									uni.setStorageSync('recently_used',values)
								}
							}else{
								// 缓存中存在
								// 查找该菜单在数组中位置
								let index = values.indexOf(target.name);
								let first = values.splice(index , 1)[0];
								values.unshift(first);
								uni.setStorageSync('recently_used',values)
							}
						}
						uni.navigateTo({
							url: target.page,
							fail: (res) => {
								console.log(res);
								console.log(target);
							},
						});
					}
				}else if(item.redirectType == '3'){
					// 跳转到商品
				}else if(item.redirectType == '4'){
					let values=uni.getStorageSync('recently_used')
					// 如果缓存中最近使用数据为空
					if(!values){
						let recentlyUsed=[]
						recentlyUsed.push("小区交流")
						uni.setStorageSync('recently_used',recentlyUsed)
					}else{
						// 如果缓存中不存在该菜单
						if(values.indexOf("小区交流")==-1){
							// 如果缓存中小于4
							if(values.length<4){
								values.unshift("小区交流");
								uni.setStorageSync('recently_used',values)
							}else{
								values.pop()
								values.unshift("小区交流");
								uni.setStorageSync('recently_used',values)
							}
						}else{
							// 缓存中存在
							// 查找该菜单在数组中位置
							let index = values.indexOf("小区交流");
							let first = values.splice(index , 1)[0];
							values.unshift(first);
							uni.setStorageSync('recently_used',values)
						}
					}
					// 如果跳转方式为活动，再去判断为什么活动
					if(item.activityType==2){
						// 报名
						uni.navigateTo({
							url:`../../pages/servicePages/communication/mjActivities?id=${item.relationId}&type=${item.activityType}`
						})
					}else{
						// 投票
						uni.navigateTo({
							url:`../../pages/servicePages/communication/eventDetails?id=${item.relationId}&type=${item.activityType}`
						})
					}
				}else{
					uni.navigateTo({
						url:'pages/index/index'
					})
				}

			},
			
		},
		beforeMount() {
		},
	}
</script>

<style scoped lang="less">
	.swiper {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
		overflow: hidden;
		background: #e7e7e7;
	}

	.swiper image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
</style>
