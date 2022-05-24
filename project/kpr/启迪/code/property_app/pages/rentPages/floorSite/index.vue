<template>
	<view class="floor-box">
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="scroll-item" v-for="(item,index) in floorList" :key="index" @click="unitGo(item)">{{item.buildingNumber}}栋</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from "@/api"
	import { mapState } from 'vuex';
	
	export default {
		data() {
			return {
				floorList:""
			}
		},
		beforeMount() {
			this.getMyBuildingPages()
		},
		onLoad() {
			console.log(12312321)
			uni.setNavigationBarTitle({
					title:"选择楼栋"
				});
		},
		computed:{
			...mapState(['user','community',"myHome"]),
		},
		methods: {
			unitGo(item){
				console.log(item)
				let buildingMsg = {
					id:item.id,
					name:item.buildingNumber
				}
				this.$store.commit('myHome/BUILDING_MSG',buildingMsg);
				uni.navigateTo({
					url:'./unit'
				})
			},
			//获取住房类型
			async getMyBuildingPages(){
					  console.log(222,this.myHome.comMsg)
					  let res = await api.my.getMyBuildingPages({
						  comId:this.myHome.comMsg.id
					  })
					  this.floorList=res.data
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
