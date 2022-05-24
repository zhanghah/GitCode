<template>
	<view class="floor-box">
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="scroll-item" v-for="(item,index) in roomList" :key="index" @click="unitGo(item)">{{item.floorNumber}}楼</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from "@/api"
	import { mapState } from 'vuex';
	
	export default {
		data() {
			return {
				roomList:""
			}
		},
		beforeMount() {
			
		},
		onLoad(option) {
			console.log(1231232122,option.id)
			this.getMyFloorPages(option.id)
			uni.setNavigationBarTitle({
					title:"选择楼层"
				});
		},
		computed:{
			...mapState(['user','community',"myHome"]),
		},
		methods: {
			unitGo(item){
				let floorMsg = {
						id:item.id,
						name:item.floorNumber
					}
					this.$store.commit('myHome/FLOOR_MSG',floorMsg);
					uni.navigateTo({
						url: `./room?id=${item.id}`,
					});
				},
			//获取住房类型
			async getMyFloorPages(id){
					  // console.log(222,this.myHome.comMsg)
					  let res = await api.my.getMyFloorPages({
						  propertyId:this.user.propertyId,
						  unitId:id
					  })
					  this.roomList=res.data
					  console.log(222330,res)
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
