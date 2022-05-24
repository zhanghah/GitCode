<template>
	<view class="myHome_box">
		<view class="content_box" v-if="homeList.length">
			<view class="yz_box" @click="toMember(item)" v-for="(item,index) in homeList" :key="index">
				<image class="img" src="../static/myHome/myHome_icon1.png" mode="" />
				<view class="msg">
					<view class="num">
						<view class="home-name">
							{{item.communityName}}{{item.buildingNumber}}栋{{item.unitNumber}}单元{{item.floorNumber}}-{{item.roomNumber}}
						</view>
						<text class="label yz" v-if="item.type === '1'">业主</text>
						<text class="label zk" v-if="item.type === '2'">租客</text>
						<text class="label qs" v-if="item.type === '3'">亲属</text>
						<view class="status through" v-if="item.checkStatus=='0'">审核中</view>
						<view class="status pass" v-if="item.checkStatus=='2'">审核未通过</view>
					</view>
					<view class="yz_msg">
						<image src="../static/myHome/myHome_icon2.png" mode="" />
						<view class="name">
							{{item.type === '1'?'业主':item.type === '2'?'租户':'亲属'}}：{{item.proprietorName}}
							{{item.proprietorPhone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}
						</view>
						<image v-if="item.type=='1' && item.checkStatus=='1'" class="right" src="../static/myHome/icon_arrow.png" mode="" />
					</view>
					<view class="member" v-if="item.type=='1'">
						<image src="../static/myHome/myHome_icon3.png" mode="" />
						<view class="name">成员：{{item.peopleNum}}</view>
					</view>
				</view>
			</view>
		</view>
		<no-result v-else message="暂无房屋~"></no-result>
		<view :class="homeList.length>=8?'addHomeMore':'addHome'">
			<ui-button @click.native="addHome">添加房屋</ui-button>
		</view>
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
				homeList: [],
				current: 1,
				size: 10,
				total:0,
			}
		},
		computed: {
			...mapState(['user', 'community'])
		},
		methods: {
			toMember(val) {
				if (val.type == '1') {
					uni.navigateTo({
						url: `/pages/userPages/myHome/member/index?msg=${JSON.stringify(val)}`,
					});
				}
			},

			//获取住房列表
			getHomeList() {
				try {
					const _this = this;
					let canshu = {
						current: _this.current,
						size: _this.size,
					}
					api.my.getMyHousingPages(canshu).then(res => {
						if (res.status !== '0') {
							return
						};
						this.total = res.data.total
						res.data.records.forEach(item => {
							// if(null!=item.proprietorName&&item.proprietorName!=undefined){
							// 	if(item.proprietorName.length==2){
							// 		item.proprietorName=item.proprietorName.substring(0,1)+'*' //截取proprietorName 字符串截取第一个字符，
							// 	}else if(item.proprietorName.length==3){
							// 		item.proprietorName=item.proprietorName.substring(0,1)+'*'+ item.proprietorName.substring(2,3) //截取第一个和第三个字符
							// 	}else if(item.proprietorName.length>3){
							// 		item.proprietorName=item.proprietorName.substring(0,1)+'*'+'*'+ item.proprietorName.substring(3,item.proprietorName.length) //截取proprietorName 字符串截取第一个字符，
							// 	}else{
							// 		item.proprietorName=''
							// 	}
							// }
							this.homeList.push(item)
						})
					})
				} catch (e) {
					//TODO handle the exception
				}finally{
					uni.stopPullDownRefresh()
				}

			},
			addHome() {
				uni.navigateTo({
					url: "./add/index"
				})
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.homeList = []
			this.getHomeList()
		},
		// 上拉加载
		onReachBottom() {
			if (this.total > this.size * this.current) {
				this.current++;
				this.getHomeList()
			} else {
				uni.showToast({
					title: '已经全部加载'
				})
			}
		},
		onShow() {
			this.homeList=[];
			this.getHomeList();
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '我的房屋',
			});
		},
	}
</script>
<style lang="less" scoped>
	.myHome_box {
		min-height: 100vh;
		background: #F5F5F5;
		overflow: hidden;
		position: relative;

		.content_box {
			width: 92%;
			margin: 0 auto;
			margin-top: 22rpx;
			padding-bottom: 120rpx;

			.yz_box {
				padding: 25rpx 32rpx 29rpx 17rpx;
				background: #fff;
				display: flex;
				margin-bottom: 20rpx;
				border: 1px solid #E6E6E6;
				border-radius: 8rpx;

				.img {
					width: 90rpx;
					height: 90rpx;
					margin-right: 23rpx;
				}

				.msg {
					width: 92%;

					.num {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						font-size: 30rpx;

						.home-name {
							width: 62%;
							overflow: hidden;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							color: #303331;
							font-size: 36rpx;
						}

						.label {
							width: 72rpx;
							// height: 35rpx;
							line-height: 35rpx;
							border-radius: 15rpx;
							text-align: center;
							font-size: 24rpx;
							color: #fff;
							flex-shrink: 0;
						}
						.status{
							font-size: 24rpx;
							margin-left: 15rpx;
						}
						.through{
							color: #FFBA00;
						}
						.pass{
							color: #FF0000;
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

						.right {
							width: 13rpx;
							height: 21rpx;
							margin-left: auto;
						}
					}

					.member {
						display: flex;
						align-items: center;
						margin-top: 15rpx;

						image {
							width: 22rpx;
							height: 22rpx;
							margin-right: 8rpx;
						}

						.name {
							color: #79807A;
							font-size: 26rpx;
						}

						.state {
							width: 196rpx;
							height: 36rpx;
							line-height: 36rpx;
							background: #F66060;
							border-radius: 18rpx;
							font-size: 26rpx;
							color: #fff;
							text-align: center;
							margin-left: 22rpx;
						}
					}

					.sh {
						color: #C369D3;
						font-size: 26rpx;
						margin-top: 18rpx;
					}
				}
			}

			.box {
				align-items: center;
			}
		}
	}

	.yz {
		background-color: #802890;
	}

	.zk {
		background-color: #FF884D;
	}

	.qs {
		background-color: #80C269;
	}

	.addHome {
		width: 100%;
		padding: 30rpx;
		position: fixed;
		bottom: 60rpx;
	}

	.addHomeMore {
		padding: 0 30rpx;
		margin-bottom: 60rpx;
	}
</style>
