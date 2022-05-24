<template>
	<view class="page-renovation-index">
		<template v-if="list.length>0">
			<view class="content" v-for="(item,index) in list" :key="index" @tap="toDetail(item.id)">
				<view class="home-info">
					<view class="home-name">
						{{item.roomName}}
					</view>
					<view class="status-shz" v-if="item.applicationStatus==1">
						待审核
					</view>
					<view class="status-success" v-if="item.applicationStatus==2">
						审批通过
					</view>
					<view class="status-fail" v-if="item.applicationStatus==3">
						审批未通过
					</view>
				</view>
				<view class="create-time">
					{{item.createTime | date('YYYY-MM-DD HH:mm')}}
				</view>
				<view class="describe">
					装修申请描述：
					<text>{{item.des}}</text>
				</view>
			</view>
		</template>
		<no-result v-else></no-result>
	</view>
</template>

<script>
	import api from '@/api';
	export default{
		data(){
			return{
				list:[],
			}
		},
		methods:{
			toDetail(id){
				console.log(id)
				uni.navigateTo({
					url:`xq/index?id=${id}`
				})
			},
			// 加载数据
			async getData(){
				try{
					const query={
						current:1,
						size:20
					};
					const res=await api.my.decorationRecord(query);
					if(res.status!='0'){return}
					this.list=res.data.records
				}catch(err){
					
				}
			},
		},
		mounted() {
			this.getData()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title:'装修申请记录'
			})
		}
	}
</script>

<style lang="less" scoped>
	.page-renovation-index{
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}
	
	.content{
		margin: 20rpx 28rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
		border-radius: 10rpx;
		
		.home-info{
			display: flex;
			justify-content: space-between;
			
			.home-name{
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				color: #333333;
				font-size: 30rpx;
				font-weight: bold;
			}
			
			.status-shz{
				flex-shrink: 0;
				color: #FF884D;
				font-size: 28rpx;
			}
			
			.status-success{
				flex-shrink: 0;
				color: #333333;
				font-size: 28rpx;
			}
			
			.status-fail{
				flex-shrink: 0;
				color: #F05050;
				font-size: 28rpx;
			}
		}
		
		.create-time{
			color: #999999;
			font-size: 24rpx;
			margin: 20rpx 0;
		}
		
		.describe{
			color: #333333;
			font-size: 28rpx;
			
			text{
				color: #999999;
				line-height: 48rpx;
			}
		}
	}
</style>
