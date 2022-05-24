<template>
	<view class="page-suggest-success">
		<view class="content">
			<view class="suc-img">
				<image src="../static/property/icon_success.png" mode=""></image>
			</view>
			<view class="suc-text">
				提交成功！
			</view>
			<view class="suc-time">
				<view>
					提交时间：
				</view>
				<view class="time">
					{{timestamp |date('YYYY-MM-DD HH:mm:ss')}}
				</view>
			</view>
		</view>
		
		<view class="btn">
			<view @click="back">
				<ui-button type="transparent">返回</ui-button>
			</view>
			<view @click="toRecord">
				<ui-button>查看记录</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:'',
				timestamp:'',
			}
		},
		
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			getNewTime(){
				this.timestamp = Date.parse(new Date())
			},
			toRecord(){
				// 根据上一页传入的type，进行跳转（报事记录，投诉记录）
				if(this.type=='repair'){
					console.log(125)
					uni.navigateTo({
						url:"../../userPages/reportRecord/index"
					})
				}else{
					uni.navigateTo({
						url:"../../userPages/complaint/index"
					})
				}
			},
		},
		mounted() {
			this.getNewTime()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '提交成功',
			});
		},
		onLoad(opt) {
			this.type=opt.type;
		}
	}
</script>

<style lang="less" scoped>
	.page-suggest-success{
		overflow: hidden;
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
		
		.content{
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 519rpx;
			padding: 0 33rpx;
			border-bottom: 1rpx #E0E0E0 solid;
			
			.suc-img{
				width: 136rpx;
				height: 136rpx;
				margin-top: 57rpx;
			}
			
			.suc-text{
				color: #333333;
				font-size: 36rpx;
				margin-top: 33rpx;
			}
			
			.suc-time{
				display: flex;
				margin-top: 19rpx;
				color: #808080;
				font-size: 32rpx;
				
				.time{
					color: #333333;
				}
			}
		}
		
		.btn{
		  display: flex;
		  justify-content: space-between;
		  padding: 0rpx 30rpx;
		  padding-top: 76rpx;

		  view{
		    width: 320rpx;
		    height: 100rpx;
		  }
		}
	}
</style>
