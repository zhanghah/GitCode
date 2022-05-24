<template>
	<view class="features">
		<view class="big row">
			<view class="item" v-for="item in bigList" :key="item.id">
				<view class="icon-wrap" @click="$utils.moduleRedirect(item)">
					<image :src="item.iconBig"></image>
					<!-- <p>{{item.iconBig}}</p> -->
				</view>
				<view class="name">{{item.name}}</view>
			</view>
		</view>

		<view class="small row" v-if="smallList.length > 0">
			<view class="item" v-for="(item,index) in smallList" :key="index" @click="$utils.moduleRedirect(item)">
				<view class="icon-wrap">
					<image :src="`${item.iconSmall}`"></image>
				</view>
				<view class="name">{{item.name}}</view>
			</view>

			<view class="item" @click="navTo">
				<view class="icon-wrap">
					<image src="@/static/index/btn_shouye_13.png"></image>
				</view>
				<view class="name">全部服务</view>
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
		computed: {
			...mapState(['imageView']),
			// bigList() {
			// 	return console.log([...this.source].splice(0, 4));
			// },
			// smallList() {
			// 	if (this.source.length > 4) {
			// 		return [...this.source].splice(4, 4);
			// 	}
			// 	return [];
			// },
		},
		data() {
			return {
				bigList:[
					{
						code: "1",
						groupType: "lifeService",
						iconBig: require("../../../static/index/icon_property.png"),
						name: "生活缴费",
						checked:true
					},
					{
						code: "2",
						groupType: "lifeService",
						iconBig: require("../../../static/index/icon_parking.png"),
						name: "停车缴费",
						checked:true
					},
					{
						code: "3",
						groupType: "lifeService",
						iconBig: require("../../../static/index/icon_repair.png"),
						name: "报事报修",
						checked:true
					},
					{
						code: "4",
						groupType: "lifeService",
						iconBig: require("../../../static/index/icon_suggest.png") ,
						name: "投诉建议",
						checked:true
					},
				],
				smallList:[
					{
						code: "13",
						groupType: "lifeService",
						iconSmall: require("../../../static/index/btn_shouye_09.png"),
						name: "访客通行",
						checked:true
					},
					{
						code: "12",
						groupType: "lifeService",
						iconSmall: require("../../../static/index/btn_shouye_10.png"),
						name: "智慧健康",
						checked:false
					},
					{
						code: "9",
						groupType: "lifeService",
						iconSmall: require("../../../static/index/btn_shouye_11.png"),
						name: "成员关爱",
						checked:false
					},
					{
						code: "14",
						groupType: "lifeService",
						iconSmall: require("../../../static/index/btn_shouye_12.png"),
						name: "智慧家居",
						checked:true
					},
				]
			}
		},
		methods: {
			navTo(url) {
				console.log(url)
				uni.redirectTo({
					url: '/pages/service/index'
				})
			}
		},
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

	.big {
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	.small {
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.big .item {
		width: 25%;
	}

	.small .item {
		padding: 25rpx 0;
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

	.small .icon-wrap {
		width: 50rpx;
		height: 50rpx;
	}
</style>
