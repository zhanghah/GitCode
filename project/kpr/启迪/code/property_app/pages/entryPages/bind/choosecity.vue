<template>
	<view class="page-choosecity">
    <search-box v-model="searchKey" placeholder="请输入城市名称"></search-box>

    <view class="block" v-if="showList.length > 0">
      <!-- <view class="title">C</view> -->
      <view class="links">
        <ui-link @click.native="cityChooseHandler(item)" :label="item.name" :arrow="false" v-for="item in showList" :key="item.code"></ui-link>
      </view>
    </view>

		<no-result v-else></no-result>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

  import api from '@/api';
  
  import SearchBox from '../components/search-box';

	export default {
		components: {
      SearchBox,
		},
		data() {
			return {
				searchKey: '',
				list: [],
				bindHome:false
			}
		},
		computed: {
			showList() {
				if (this.searchKey) {
					const reg = new RegExp(this.searchKey);

					return this.list.filter((item) => {
						return reg.test(item.name);
					})
				}

				return this.list;
			}
		},
		methods: {
			...mapMutations('user', {
				updateUser: 'UPDATE_USER',
			}),
			cityChooseHandler(item) {
				uni.navigateTo({
					 url: `/pages/entryPages/bind/choosecom?cid=${item.code}&bindHome=${this.bindHome}`,
				});
				console.log(this.bindHome)
			},
			async loadBmList() {
				const res = await api.resource.getBm({
					containsCommunity: 1,
					level: 2,
					propertyId: this.$config.propertyId,
				});

				if (res) {
					this.list = res.data;
				}
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '选择城市',
			});

			this.loadBmList();
		},
		mounted() {
		},
		onLoad(option) {
			console.log(option)
			if(JSON.stringify(option) !=='{}'){
				console.log("从新建房屋进来了")
				this.bindHome = option.bindHome
				return
			}
			this.bindHome = false
			
		},
		onUnload() {
		},
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
