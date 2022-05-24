<template>
	<view class="myHome_box">
		<view class="myHome_top">
			<view class="home_box">
				<view class="content_box">
					<view class="yz_box" @click="toMember()">
						<image class="img" src="../static/myHome_icon1.png" mode="" />
						<view class="msg" v-if="userList">
							<view class="num">
								{{floorName}}
								<view class="label" v-if="userList.type=='1'">业主</view>
								<view class="label" v-if="userList.type=='2'">租户</view>
								<view class="label" v-if="userList.type=='3'">亲属</view>

							</view>
							<view class="yz_msg">
								<image src="../static/myHome_icon2.png" mode="" />
								<view class="name">业主：{{userList.proprietorName.replace(/^(.).+(.)$/g, "*$2")}}
									{{userList.proprietorPhone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="warn">
				最多可上传人脸数量为3人
			</view>
		</view>

		<view class="ex" v-if="list.length>0">
			<scroll-view scroll-y="true" class="scroll_list">
				<view class="content" v-for="item of list" :key="item.id">
					<view>
						<text>{{item.name}}</text>
						<text>{{item.phone}}</text>
					</view>
					<view class="img_box">
						<image class="img" :src="`${imageView}${item.faceImg}`" mode=""></image>
						<!-- <view class="change" @click="handleUpdate(item)">
							<image class="delete_img" src="../static/icon_pic.png" mode=""></image>
							<text>修改</text>
						</view> -->
						<view class="delete" @click="hanleDelete(item.id,item.name)">
							<image class="delete_img" src="../static/icon_clear.png" mode=""></image>
							<text>删除</text>
						</view>
						<view class="audit" v-if="item.checkStatus=='0'">
							<image class="audit_img" src="../../../static/audit/audit.png" mode=""></image>
							<view>审核中...</view>
						</view>
						<view class="audit" v-if="item.checkStatus=='2'">
							<image class="audit_img" src="../../../static/audit/audit.png" mode=""></image>
							<view>审核未通过</view>
						</view>
					</view>
				</view>

			</scroll-view>
			<view class="add_person1">
				<ui-button class="button" @click.native="addUpload">添加重点人员</ui-button>
			</view>
		</view>

		<view class="ex" v-else>
			<image class="no_data" src="../static/faceUpload_img1.png" mode=""></image>
			<view class="add_person2">
				<ui-button class="button" @click.native="addUpload">添加重点人员</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/api';
	export default {
		data() {
			return {
				current: 1,
				size: 10,
				homeList: [],
				userList: '',
				floorName: '',
				list: [],
			}
		},
		computed: {
			...mapState(["user", "community", "imageView"]),
		},
		methods: {
			addUpload() {
				uni.navigateTo({
					url: "./upload?roomId=" + this.userList.roomId
				})
			},

			//删除
			hanleDelete(i, name) {
				uni.showModal({
					title: '提示',
					content: "您确定要删除" + name + "轨迹吗？",
					success: res => {
						if (res.confirm) {
							const result = api.community.deleteTrajectory({
								ids: [i],
								propertyId: this.$config.propertyId
							})
							console.log(result)
							this.getData()
						}
					}
				})
				console.log(i)
			},

			// 修改
			// handleUpdate(i){
			// 	const res=api.community.updateTrajectory({
			// 		comId:this.community.id,
			// 		faceImg:i.faceImg,
			// 		id:i.id,
			// 		name:i.name,
			// 		phone:i.phone,
			// 		propertyId:this.$config.propertyId,
			// 		roomId:this.userList.roomId
			// 	})
			// 	if (res.status != '0') {
			// 		return
			// 	};
			// },

			async getInfo() {
				const res = await api.my.getMyHousingPages({
					comId: this.community.id,
					propertyId: this.user.propertyId,
					userId: this.user.id,
				})
				if (res.status !== '0') {
					return
				} else {
					let data = res.data.records
					if (data.length > 0) {
						// 筛选出审核通过的房屋
						for (let val in data) {
							if (data[val].checkStatus == 1) {
								this.homeList.push(data[val])
							}
						}
						if (this.homeList.length > 0) {

							// 默认获取第一个房屋信息
							this.userList = this.homeList[0]
							this.floorName = this.userList.communityName + this.userList.buildingNumber + '栋' + this.userList.unitNumber +
								'-' + this.userList.floorNumber + '-' + this.userList.roomNumber
							// console.log(this.userList)
							// this.roomId=this.userList.roomId
						}
					}
				}
			},

			async getData() {
				try {
					let obj = {
						current: this.current,
						propertyId: this.$config.propertyId,
						roomId: this.userList.roomId,
						size: this.size
					}
					console.log(obj)
					const res = await api.community.getTrajectory(obj)
					if (res.status != '0') {
						return
					};
					console.log(res)
					this.list = res.data.records
				} catch (err) {
					// 
				}
			},

			toMember() {
				uni.navigateTo({
					url: '../suggest/myHome/index'
				})
			},
		},
		async mounted() {
			await this.getInfo();
			await this.getData()
		},
		onShow() {
			this.getData()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "人员轨迹",
			});

		},
	}
</script>

<style lang="less" scoped>
	.myHome_top {
		position: fixed;
		background-color: #FFFFFF;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 99;
	}

	.myHome_box {
		background: #FFFFFF;
		white-space: nowrap;
		overflow: hidden;
		position: relative;

		.home_box {
			margin-bottom: 47rpx;
		}

		.warn {
			margin-left: 32rpx;
			margin-bottom: 34rpx;
			color: #F58311;
			font-size: 28rpx;
		}

		.content_box {
			width: 92%;
			height: 140rpx;
			margin: 0 auto;
			margin-top: 22rpx;

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
					width: 82%;

					.num {
						color: #303331;
						font-size: 36rpx;
						display: flex;
						align-items: center;

						.label {
							width: 72rpx;
							height: 30rpx;
							line-height: 30rpx;
							background: #1B76FF;
							border-radius: 15rpx;
							text-align: center;
							font-size: 24rpx;
							color: #fff;
							margin-left: 25rpx;
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
						color: #1B76FF;
						font-size: 26rpx;
						margin-top: 18rpx;
					}
				}
			}

			.box {
				align-items: center;
			}
		}

		.ex {
			height: 100%;
			padding-top: 290rpx;

			.scroll_list {
				width: 90%;
				height: 100%;
				margin: 0 auto;
				margin-bottom: 128rpx;
				background-color: #FFFFFF;

				// background-color: #18B566;
				.content {
					box-shadow: 0 0 1px #000;
					width: 90%;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
					border-radius: 8rpx;
					margin-bottom: 40rpx;
					padding: 20rpx;
					font-size: 36rpx;
					color: #333333;

					.img_box {
						position: relative;

						.img {
							width: 675rpx;
							height: 460rpx;
							margin: 0 auto;
							margin-top: 37rpx;
						}

						.delete,
						.change {
							float: right;
							width: 160rpx;
							height: 60rpx;
							background-color: #000000;
							opacity: 0.4;
							color: #FFFFFF;
							font-size: 30rpx;
							border-radius: 30rpx;
							display: flex;
							justify-content: space-around;
							align-items: center;
							margin-right: 20rpx;

							.delete_img {
								width: 30rpx;
								height: 30rpx;
							}
						}

						.audit {
							position: absolute;
							left: 50%;
							top: 50%;
							width: 100%;
							height: 190rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							transform: translate(-50%, -50%);
							color: #FFFFFF;
							font-size: 36rpx;

							.audit_img {
								width: 114rpx;
								height: 129rpx;
							}
						}
					}


				}
			}
		}

		.add_person1 {
			position: fixed;
			width: 100%;
			height: 128rpx;
			color: #FEFEFE;
			background-color: #FFFFFF;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.button {
				width: 80%;
			}
		}

		.add_person2 {
			position: fixed;
			width: 100%;
			color: #FEFEFE;
			bottom: 182rpx;
			display: flex;
			justify-content: center;

			.button {
				width: 80%;
			}
		}
		.no_data{
			width: 100%;
			height: 600rpx;
		}
	}
</style>
