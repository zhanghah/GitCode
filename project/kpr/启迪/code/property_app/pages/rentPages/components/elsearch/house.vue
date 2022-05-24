<template>
	<view class="el-search-house">
		<view class="btn" :class="{active:item.type}" v-for="(item,index) in dataList" :key="index" @click="dataLists(item,index)">
			{{item.name}}
		</view>

	</view>
</template>

<script>
	import api from '@/api'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				className: false,
				arr: [],
				dataList: []
			}
		},
		computed:{
			...mapState(['search','user'])
		},
		props: {},
		created() {
			uni.$on("chongzhi",item=>{
				this.houseTypeId("")
				this.dataList.forEach((item,index)=>{
					this.dataList[index].type=false	
				})
			})
			
		},
		methods: {
			...mapMutations('search', {
				houseTypeId: 'HOUSE_TYPE',
			}),
			dataLists(item) {
				console.log(item)
				item.type = !item.type;
				let newArr = []
				let arr = this.dataList.filter(t => t.type)
				arr.forEach(item => {
					newArr.push(item.id)
				})
				this.houseTypeId(newArr)
			},
			// 回显
			getHouseType(){
				let houseTypeList=[];
				houseTypeList= this.search.houseTypeId;
				if(houseTypeList.length>0){
					this.dataList.forEach(item=>{
						houseTypeList.forEach(val=>{
							if(item.id==val){
								item.type=true
							}
						})
					})
				}
			},
			//获取户型所有数据
			async getHouseTypeList(){
				const res=await api.resource.getHouseTypeList({
					propertyId:this.user.propertyId
				});
				if(res.status!='0'){return}
				res.data.forEach(item=>{
					item.type=false
				})
				this.dataList=res.data
				this.getHouseType()
			}
		},
		
		beforeMount() {
			this.getHouseTypeList()
		},
	}
</script>

<style scoped lang="less">
	.el-search-house {
		padding: 25rpx 15rpx;
		display: flex;
		flex-wrap: wrap;

		.btn {
			width: 160rpx;
			height: 80rpx;
			background-color: #F5F4F2;
			border-radius: 8rpx;
			margin: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #666666;
			font-size: 28rpx;

			&.active {
				background-color: #DFECFF;
				color: #1B76FF;
				font-weight: bold;
			}
		}
	}
</style>
