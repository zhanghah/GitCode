<template>
	<view class="page-sport-index">
		<view class="name">
			<view>
				{{userInfo.userName}}
			</view>
			<view class="ranking" @tap="toVenue">
				今天还未开始运动，暂无排名 >
			</view>
		</view>
		<view class="content">
			<view class="info" v-for="(item,index) in dataList" :key="index">
				<view class="medal">
					<image :src="item.medal" mode=""></image>
				</view>
				<view class="user-info">
					<view class="avatar">
						<image :src="item.avatar" mode=""></image>
						<view>
							{{item.name}}
						</view>
					</view>
					<view class="steps">
						{{item.steps}}步
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				dataList:[
					{
						medal:'../static/icon_medal1.png',
						avatar:'../../indexPages/static/icon_zhjk_touxiang.png',
						name:'王小山',
						steps:1452
					},
					{
						medal:'../static/icon_medal2.png',
						avatar:'../../indexPages/static/icon_zhjk_touxiang.png',
						name:'张小杰',
						steps:1052
					},
					{
						medal:'../static/icon_medal3.png',
						avatar:'../../indexPages/static/icon_zhjk_touxiang.png',
						name:'杨子悦',
						steps:852
					},
				],
				userInfo:{}
			}
		},
		computed:{
			...mapState(['user'])
		},
		methods:{
			toVenue(){
				uni.navigateTo({
					url:"../venue/index"
				})
			},
			// 获取个人信息
			getUserInfo(){
				this.userInfo=this.user
			},
		},
		mounted() {
			this.dataList.forEach(item=>{
				if(null!=item.name&&item.name!=undefined){
					if(item.name.length==2){
						item.name=item.name.substring(0,1)+'*' //截取name 字符串截取第一个字符，
					}else if(item.name.length==3){
						item.name=item.name.substring(0,1)+'*'+ item.name.substring(2,3) //截取第一个和第三个字符
					}else if(item.name.length>3){
						item.name=item.name.substring(0,1)+'*'+'*'+ item.name.substring(3,item.name.length) //截取name 字符串截取第一个字符，
					}else{
						item.name=''
					}
				}
			})
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '社区运动',
			});
			this.getUserInfo()
		},
	}
</script>

<style lang="less" scoped>
	.page-sport-index {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}

	.name {
		width: 100%;
		color: #020204;
		font-size: 36rpx;
		font-weight: bold;
		padding: 30rpx;
		margin-top: 20rpx;
		line-height: 48rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx #E3E3E3 solid;

		.ranking {
			color: #666666;
			font-size: 24rpx;
			font-weight: normal;
		}
	}

	.content {
		width: 100%;
		padding: 0 30rpx;
		background-color: #FFFFFF;

		.info {
			width: 100%;
			padding-top: 30rpx;
			display: flex;
			align-items: center;

			.medal {
				width: 57rpx;
				height: 72rpx;
				margin-bottom: 25rpx;
			}

			.user-info {
				width: 100%;
				color: #333333;
				font-size: 28rpx;
				padding-bottom: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx #E3E3E3 solid;

				.avatar {
					margin-left: 20rpx;
					display: flex;
					align-items: center;

					image {
						width: 71rpx;
						height: 71rpx;
						margin-right: 44rpx;
					}
				}
			}

		}
	}
</style>
