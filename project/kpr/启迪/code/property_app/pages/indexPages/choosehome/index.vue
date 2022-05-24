<template>
	<view class="page-choosehome-index">
		<template v-if="homeList.length>0">
			<view class="centent-box" @click="toWyjf(item)" v-for="(item,index) in homeList" :key="index">
				<view class="icon-home">
					<image src="../static/property/icon_home.png" mode=""></image>
				</view>
				<view class="home-info">
					<view class="top">
						<text class="home-name">{{item.floorName}}</text>
						<text :class="item.type=='1'?'yezhu':(item.type=='2'?'zuke':'qinshu')">{{item.type=='1'?'业主':(item.type=='2'?'租户':'亲属')}}</text>
					</view>
					<view class="yz_msg">
						<image src="../static/property/icon_user.png" mode="" />
						<view class="name">
							<view>
								业主：{{item.proprietorName}}
							</view>
							<view>
								{{item.proprietorPhone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}
							</view>
							<view>业态:普通住宅</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<no-result :message="msg" v-else></no-result>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				isWyjf: '', //判断是否从物业缴费页面进入
				homeList: [], //房屋分页列表
				msg:'暂无相关房屋'
			}
		},
		computed: {
			...mapState(['user', 'community'])
		},
		methods: {
			toWyjf(val) {
				if(this.isWyjf){
					uni.navigateTo({
						url:'../property/payment'
					})
				}else{
					uni.$emit('changeHome', val)
					uni.navigateBack({
						delta:1
					})
				}
			},
			async getHousePages() {
				// 获取我的住房分页列表
				const query = {
					checkStatus: 1,
					current: 1,
					size: 10
				}
				const res = await api.my.getMyHousingPages(query)
				if (res.status !== '0') {
					return
				};
				console.log(res)
				let data = res.data.records;
				data.forEach(item => {
					let floorName = item.communityName + item.buildingNumber + '栋' + item.unitNumber + '-' +
						item.floorNumber + '-' + item.roomNumber
						if(null!=item.proprietorName&&item.proprietorName!=undefined){
							if(item.proprietorName.length==2){
								item.proprietorName=item.proprietorName.substring(0,1)+'*' //截取proprietorName 字符串截取第一个字符，
							}else if(item.proprietorName.length==3){
								item.proprietorName=item.proprietorName.substring(0,1)+'*'+ item.proprietorName.substring(2,3) //截取第一个和第三个字符
							}else if(item.proprietorName.length>3){
								item.proprietorName=item.proprietorName.substring(0,1)+'*'+'*'+ item.proprietorName.substring(3,item.proprietorName.length) //截取proprietorName 字符串截取第一个字符，
							}else{
								item.proprietorName=''
							}
						}
					item.floorName = floorName
				})
				this.homeList = data
				console.log(this.homeList)
			}
		},
		mounted() {
			this.getHousePages()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '选择房屋',
			});
		},
		onLoad(opt) {
			this.isWyjf = opt.isWyjf
		}
	}
</script>

<style lang="less" scoped>
	.page-choosehome-index {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;

		.centent-box {
			width: 100%;
			height: 160rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			padding: 0 30rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.icon-home {
				width: 90rpx;
				height: 90rpx;
			}

			.home-info {
				margin-left: 23rpx;

				.top {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 30rpx;

					.home-name {
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						color: #303331;
						font-size: 36rpx;
					}

					.yezhu {
						flex-shrink: 0;
						background-color: #FCEDFF;
						margin-left: 26rpx;
						color: #802890;
						line-height: 42rpx;
						border-radius: 4rpx;
					}

					.qinshu {
						flex-shrink: 0;
						background-color: #E3FBDB;
						margin-left: 26rpx;
						color: #80C26A;
						line-height: 42rpx;
						border-radius: 4rpx;
					}

					.zuke {
						flex-shrink: 0;
						background-color: #FEEEE6;
						margin-left: 26rpx;
						color: #FF894F;
						line-height: 42rpx;
						border-radius: 4rpx;
					}

					.qianfei {
						position: absolute;
						right: 30rpx;
						color: #F05050;
						font-size: 30rpx;
					}

					.un-qianfei {
						position: absolute;
						right: 30rpx;
						color: #333333;
						font-size: 30rpx;
					}
				}

				.yz_msg {
					color: #79807A;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					margin-top: 22rpx;

					image {
						width: 22rpx;
						height: 22rpx;
						margin-right: 8rpx;
					}

					.name {
						display: flex;
						justify-content: space-between;

						view {
							margin: 0 10rpx;
						}
					}
				}
			}

		}
	}
</style>
