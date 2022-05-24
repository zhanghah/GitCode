<template>
	<view class="floor-box">
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="scroll-item" v-for="(item,index) in unitList" :key="index" @click="unitGo(item)">{{item.unitNumber}}单元</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from "@/api"
	import { mapState } from 'vuex';
	
	export default {
		data() {
			return {
				unitList:""
			}
		},
		beforeMount() {
			// this.getMyBuildingPages()
		},
		onLoad(option) {
			this.getMyBuildingPages()
			uni.setNavigationBarTitle({
					title:"选择单元"
				});
		},
		computed:{
			...mapState(['user','community',"myHome"]),
		},
		methods: {
			unitGo(item){
				let unitMsg = {
					id:item.id,
					name:item.unitNumber
				}
				this.$store.commit('myHome/UNIT_MSG',unitMsg);
				uni.navigateTo({
					url:`./floor?id=${item.id}`
				})
				console.log(item)
			},
			//获取单元
			async getMyBuildingPages(){
					  let res = await api.my.getMyUnitPages({
						  propertyId:this.user.propertyId,
						  buildingId:this.myHome.buildingMsg.id
					  })
					  this.unitList=res.data
			},
			
		}
	}
</script>

<style lang="scss">
	.floor-box{
		padding-left: 30rpx;
		border-top: solid 20rpx #f5f5f5;
		.scroll-box{
			height: 100vh;
			.scroll-item{
				padding-left: 5rpx;
				color: #333;
				font-weight: 500;
				height: 100rpx;
				border-bottom: solid 1rpx #e6e6e6;
				line-height: 100rpx;
			}
		}
		
	}

</style>
