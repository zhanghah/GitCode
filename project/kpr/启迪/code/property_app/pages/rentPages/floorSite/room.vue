<template>
	<view class="floor-box">
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="scroll-item" v-for="(item,index) in roomList" :key="index" @click="unitGo(item)">{{item.roomNumber}}号房</view>
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
			console.log(12312321,option.id)
			this.getMyRoomPages(option.id)
			uni.setNavigationBarTitle({
					title:"选择房号"
				});
		},
		computed:{
			...mapState(['user','community',"myHome"]),
		},
		methods: {
			unitGo(item){
				let RoomMsg = {
					id:item.id,
					name:item.roomNumber
				}
				this.$store.commit('myHome/ROOM_MSG',RoomMsg);
				uni.navigateBack({
					delta: 4
				})
			},
			//获取住房类型
			async getMyRoomPages(id){
					  let res = await api.my.getMyRoomPages({
						  propertyId:this.user.propertyId,
						  floorId:id
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
