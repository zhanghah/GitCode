<template>
	<view class="news-list">
		<view class="title">
			<scroll-view :scroll-x="true" :scroll-y="false" class="scroller">
				<view class="scroll-content">
					<view class="item" v-for="(item,index) in activityList" :key="index" :class="{active: index ===  current}" @click="getNum(index,item.id,item.name)">
						<view class="name">{{item.name}}</view>
						<view class="border"></view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="main-list" v-for="(item,index) in communityList" :key="index" @click="detailGo(item.id)">
			<view class="item">
				<view class="information">
					<view class="school-name">{{item.title}}</view>
					<view class="address">
						<p class="time">{{item.createTime|date('YYYY-MM-DD HH:mm')}}</p>
						<p class="tips">{{typeName}}</p>
					</view>
				</view>
				<view class="image-wrap">
					<image mode="aspectFill" :src="`${imageView}${item.image}`" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import mainList from './components/mainList.vue';
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				current: 0,
				communityList: "",
				typeName:"",
				activityList: [{
						id: 1,
						title: '全部话题',
					},
					{
						id: 2,
						title: '重庆时事',
					},
					{
						id: 3,
						title: '热门资讯',
					},
					{
						id: 4,
						title: '交通服务',
					},
					{
						id: 5,
						title: '气象万千',
					},
					{
						id: 6,
						title: '全部话题',
					},
				],
				cardType: "88091dd8212e4a3ca60d54b31f0425ef"
			}
		},
		computed: { ...mapState(['user', 'community', 'imageView'])
		},
		created() {
			this.getNewsByTitle()
			// this.getNewsTypeList()
		},
		mounted() {
			setTimeout(()=>{
				this.getCommunity()
			},200)
		},
		methods: {

			async getCommunity() {
				console.log(9999, this.community.id)
				let res = await api.find.community({
					propertyId: this.user.propertyId,
					comId: this.community.id,
					type: this.cardType
				})
				this.communityList = res.data.records
				console.log(1111, res)
			},
			async getNewsByTitle() {
				let res = await api.find.getNewsByTitle({
					propertyId: this.user.propertyId,
					comId: this.community.id,
					// type:"0"
				})
				console.log(2222, res)
				this.activityList = res.data
				this.typeName=res.data[0].name
				this.cardType = res.data[0].id
			},
			detailGo(id) {
				uni.navigateTo({
					url: `./details?id=${id}`
				})
			},

			getNum(index, id,name) {
				console.log(222,id)
				this.current = index;
				this.cardType = id
				this.typeName=name
				this.getCommunity()
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '社区新闻',
			});
		},
	}
</script>

<style scoped lang="less">
	.news-list {
		background: #f9f9f9;
		padding-top: 100rpx;
		font-family: 'PingFang-SC-Bold';
		position: relative;
		height: 100vh;
		box-sizing: border-box;
	}

	.school-name {
		height: 115rpx;
		overflow: hidden;
	}

	.title {
		width: 100%;
		padding: 24rpx;
		background: #fff;
		position: fixed;
		top: 0;
		z-index: 99;
	}

	.scroll-content {
		display: flex;
	}

	.scroll-content .item .name {
		width: 120rpx;
		margin-right: 56rpx;
		font-size: 30rpx;
		text-align: center;
		color: #9E9E9E;

	}

	.scroll-content .active .name {
		color: #1B76FF;
	}

	.active .border {
		width: 60rpx;
		margin-left: 30rpx;
		margin-top: 4rpx;
		border-bottom: 6rpx solid #1B76FF;
		border-radius: 20rpx;
	}

	.main-list {
		padding: 24rpx;
	}

	.main-list .item {
		display: flex;
		flex-direction: row;
		background: white;
		padding: 29rpx;
		border-radius: 15rpx;
		margin-bottom: 24rpx;
		box-shadow: 0px 3px 3px #ccc;
	}

	.information {
		flex: 1;
		margin-right: 24rpx;
		font-size: 28rpx;
		color: #020204;
	}

	.information .address {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 24rpx;
	}

	.information .address .time {
		font-size: 24rpx;
		color: #9E9E9E;
	}

	.information .address .tips {
		font-size: 24rpx;
		color: #1B76FF;
		font-weight: 500;
	}

	.image-wrap {
		width: 200rpx;
		height: 160rpx;
	}
</style>
