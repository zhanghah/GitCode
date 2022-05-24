<template>
	<view class="el-search-sort">
		<view class="col last">
			<view class="item" :class="{active:className==index}" v-for="(item,index) in dataList" :key="index" @click="sortGo(item,index)">
				{{item.name}}
				<view class="icon"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	export default {
		data() {
			return {
				className: 0,
				dataList: [{
						name: "综合排序",
						id: "",
						params: "",
						type: false
					},
					{
						name: "最新发布",
						id: "createTime",
						params: "desc",
						type: false
					},
					{
						name: "价格（从低到高）",
						id: "price",
						params: "asc",
						type: false
					},
					{
						name: "价格（从高到低）",
						id: "price",
						params: "desc",
						type: false
					},
					{
						name: "面积（从大到小）",
						id: "buildingArea",
						params: "desc",
						type: false
					},
					{
						name: "面积（从小到大）",
						id: "buildingArea",
						params: "asc",
						type: false
					}
				]
			}
		},
		computed:{
			...mapState({
				classTab:state=>state.search.className,
			}),
			...mapState(['search'])
		},
		created() {
			this.className=this.classTab
		},
		props: {
			info: {
				type: Object,
				default () {
					return {

					};
				},
			},
		},
		methods: {
			...mapMutations('search', {
				//固定选择项的index
				classfn: 'CLASS_NAME',
				sortType:"SORT_TYPE"
			}),
			sortGo(item,index) {
				item.type=true
				this.className=index
				//点击的时候关闭选择弹框
				uni.$emit("switchStatus",false)
				//触发接口请求
				//固定选择项
				this.classfn(index)
				//数据处理
				let arr = this.dataList.filter(t=>t.type)
				let obj={
					sortType:arr[0].params,
					sortColumn:arr[0].id
				}
				this.sortType(obj)
				uni.$emit("stratFn")
			}
		},
		beforeMount() {},
	}
</script>

<style scoped lang="less">
	.el-search-sort {
		display: flex;

		.col {
			width: 220rpx;
			font-size: 28rpx;
			color: #333333;

			.item {
				padding: 25rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				box-sizing: border-box;

				&.active {
					background-color: #E6E6E6;
				}
			}

			&.col1 {
				background-color: #F5F5F5;
			}

			&.last {
				flex: 1;

				.icon {
					width: 38rpx;
					height: 25rpx;
					background: url(../../static/rent/icon_check.png) no-repeat center center;
					background-size: 100% 100%;

					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					display: none;
				}

				.item.active {
					background-color: transparent;
					color: #1B76FF;

					.icon {
						display: block;
					}
				}
			}
		}
	}
</style>
