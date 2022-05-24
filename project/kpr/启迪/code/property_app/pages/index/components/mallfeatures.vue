<template>
	<view class="features">
		<view class="big ">
			<view class="item" v-for="item in mall" :key="item.id">
				<view class="icon-wrap"@click="$goPage(['/pages/mallUser/tabbar/tabbar'])">
					<image :src="item.iconBig"></image>
				</view>
				<view class="name">{{item.name}}</view>
			</view>
			<view class="item" v-for="item in bigList" :key="item.id">
				<view class="icon-wrap" @click="$utils.moduleRedirect(item)">
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
		computed: {
			...mapState(['imageView']),
		},
		data() {
			return {
				mall:[
					{
						code: "25",
						groupType: "baseProperty",
						iconBig: require("../../../static/mall/sqsc@3x.png"),
						name: "社区商场",
						checked:true,
						id: "25",
					}
				],
				bigList:[
					{
						code: "2",
						groupType: "lifeService",
						iconBig: require("../../../static/mall/tcjf@3x.png"),
						name: "停车缴费",
						checked:true
					},
					{
						code: "6",
						groupType: "baseProperty",
						iconBig: require("../../../static/mall/cgyd@3x.png"),
						name: "场馆预定",
						checked:true,
						id: "6",
					},
				],
			}
		},
		methods: {
			navTo(url) {
				console.log(url)
				uni.switchTab({
					url: '/pages/service/index'
				})
			}
		},
	}
</script>

<style scoped lang="less">
	.big {
		width: 100%;
		padding: 24rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		.item{
			width: calc(100%/3);
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			.icon-wrap{
				width:120rpx ;
				height: 120rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.name{
				width: 100%;
				text-align: center;
				font-size: 24rpx;
				line-height: 25rpx;
				height: 25rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #555555;
				margin-top: 20rpx;
			}
		}
	}

	
</style>
