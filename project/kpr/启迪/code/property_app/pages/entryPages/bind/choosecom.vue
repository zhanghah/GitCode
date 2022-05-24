<template>
	<view class="page-choosecom">
		<search-box v-model="searchKey" placeholder="请输入小区名称"></search-box>

		<view class="block" v-if="showList.length > 0">
			<view class="links">
				<ui-link @click.native="comChooseHandler(item)" :label="item.name" :arrow="false"
					v-for="item in showList" :key="item.id"></ui-link>
			</view>
		</view>

		<no-result v-else></no-result>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import api from '@/api';

	import SearchBox from '../components/search-box';

	export default {
		components: {
			SearchBox,
		},
		data() {
			return {
				searchKey: '',
				cityId: '',
				list: [],
				bindHome: false
			}
		},
		computed: {
			showList() {
				if (this.searchKey) {
					console.log(this.searchKey)
					const reg = new RegExp(this.searchKey);

					return this.list.filter((item) => {
						return reg.test(item.name);
					})
				}

				return this.list;
			},
			...mapState(['community','user'])
		},
		methods: {
			...mapMutations({
				updateCurrentCommunity: 'UPDATE_CURRENT_COMMUNITY',
			}),
			comChooseHandler(item) {
				console.log(this.bindHome)
				// this.defaultResidentialQuarters(item.id)
				if (this.bindHome=='1') { //判断是否从绑定房屋进来的  false不是，ture是
					this.updateCurrentCommunity(item);
					uni.redirectTo({
						url: '/pages/index/index',
					});
					return
				}else if(this.bindHome=='2'){
					let comMsg = {
						id: item.id,
						name: item.name
					}
					this.$store.commit('myHome/COM_MSG', comMsg);
					uni.navigateBack({
						delta: 1
					})
				}else{
					this.updateCurrentCommunity(item);
					uni.navigateBack({
						delta: 1
					})
				}
			},
			async loadComList() {
				const res = await api.community.getList();
				console.log(res)
				if (res) {
					this.list = res.data.records;
				}

			},
			// 默认小区
			async defaultResidentialQuarters(id){
				const res=await api.community.defaultResidentialQuarters({
					residentialQuartersId:id,
					userId:this.user.userId
				})
			}
		},
		onLoad(options) {
			console.log(options.bindHome);
			if(options.cid) {
				this.cityId = options.cid;
			}
			if (options.bindHome) {
				this.bindHome = options.bindHome
			}
		},

		beforeMount() {
			uni.setNavigationBarTitle({
				title: '选择小区',
			});

			this.loadComList();
		},
		onUnload() {
			console.log("fdsa")
		}
	}
</script>

<style scoped lang="less">
	.block {
		.title {
			background-color: #F5F5F5;
			padding: 24rpx 40rpx;
			color: #999999;
			font-size: 28rpx;
		}
	}
</style>
