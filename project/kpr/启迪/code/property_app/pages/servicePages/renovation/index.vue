<template>
	<view class="page-renovation-index">
		<view class="split"></view>
		<view class="search" @tap="navTo">
			<ui-link :label="floorName || ''" :border="false">
				<image slot="icon" src="../../indexPages/static/icon_home.png" style="width: 58rpx; height: 58rpx">
				</image>
			</ui-link>
		</view>
		<view class="split"></view>
		<ui-form-input label="申请人姓名" placeholder="请输入申请人姓名" type="text" maxlength="15" v-model="eventName"
			size="default">
		</ui-form-input>
		<ui-form-input label="申请人电话" placeholder="请输入申请人电话" type="number" maxlength="11" v-model="eventPhone"
			size="default">
		</ui-form-input>
		<ui-link label="装修类型" @click.native="show=true">
			<view slot="ext" :class="['link-ext', {'inactivated': !renovationType.label}]">
				{{renovationType.label|| '请选择'}}
			</view>
		</ui-link>
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>

		<ui-link label="开始装修时间" @tap="showTime=true">
			<view slot="ext" :class="['link-ext', {'inactivated': !startime}]">
				<picker mode="date" :value="startime" @change="bindDateChanges">
					<view class="uni-input-start" v-if="!startime">请选择</view>
					<view class="uni-input" v-if="startime">{{startime }}</view>
				</picker>
			</view>
		</ui-link>
		<ui-link label="是否清运垃圾" :arrow="false">
			<u-switch slot="ext" v-model="checked" active-color="#FEC1C1" inactive-color="#eee" @change="switchChange">
			</u-switch>
		</ui-link>

		<view class="split"></view>
		<view class="content">
			<view class="iptText">
				<textarea class="text" :auto-height="true" placeholder="请描述您的装修申请" maxlength="100"
					v-model="description"></textarea>
				<view class="uploadImg">
					<view class="box" v-for="(item, index) in zXimgList" :key="index">
						<image src="../../indexPages/static/icon_delete.png" class="delete" @click="deleteImg(index)" />
						<image :src="`${imageView}${item.drawingUrl}`" @click="imgtap(index)" mode="" />
					</view>
					<view class="box">
						<ui-image-upload target="java" :params="{ type: 19 }" @success="uploadZxHandler">
							<view class="upload-img">
								<image src="../static/add_upload.png" class="btn" />
							</view>
						</ui-image-upload>
					</view>
				</view>
				<view class="img-title">
					装修图纸
				</view>
			</view>
		</view>
		<view class="split"></view>
		<view class="ziliao">
			<view class="title">
				装修单位资料
			</view>
			<view class="ziliao-box">
				<view class="zhizhao">
					<template>
						<ui-image-upload target="java" :params="{ type: 19 }" @success="uploadZzHandler">
							<template v-if="zZimgList.length>0">
								<view class="upload-img" v-for="(item, index) in zZimgList" :key="index">
									<image :src="`${imageView}${item}`" mode="" />
								</view>
							</template>
							<view class="upload-img" v-else>
								<view class="zz-title">
									营业执照
								</view>
								<view class="add">
									+
								</view>
							</view>
						</ui-image-upload>
					</template>
				</view>
				<view class="zhengshu">
					<template>
						<ui-image-upload target="java" :params="{ type: 19 }" @success="uploadZsHandler">
							<template v-if="zSimgList.length>0">
								<view class="upload-img" v-for="(item, index) in zSimgList" :key="index">
									<image :src="`${imageView}${item}`" mode="" />
								</view>
							</template>
							<view class="upload-img" v-else>
								<view class="zs-title">
									资质证书
								</view>
								<view class="add">
									+
								</view>
							</view>
						</ui-image-upload>
					</template>
				</view>
			</view>
		</view>

		<view class="split"></view>
		<view class="worker-info">
			<view class="worker-top">
				<view>
					施工人员身份
				</view>
				<view class="add-worker" @tap="addPerson">
					<text class="add">
						+
					</text>
					施工人员
				</view>
			</view>
			<view class="worker-box" v-if="personInfo.length">
				<view v-for="(item,index) in personInfo" :key="index" class="person">
					<view class="name">
						<view>
							姓名
						</view>
						<input type="text" placeholder="请输入" v-model="item.name" />
					</view>
					<view class="card">
						<view>
							身份证
						</view>
						<input type="number" placeholder="请输入" v-model="item.cardId" />
					</view>
					<view class="card-box">
						<view class="front">
							<view class="uploadImg">
								<ui-image-upload target="java" :params="{ type: 19 }" @click.native="stateChangeHandler(index)" @success="uploadFrontHandler">
									<template v-if="item.cardFront">
										<view class="img">
											<image :src="`${imageView}${item.cardFront}`" mode="" />
										</view>
									</template>
									<view class="upload-img" v-else>
										<image src="../static/icon_camera.png" mode=""></image>
									</view>
								</ui-image-upload>
							</view>
							<view class="img-bottom">
								身份证正面
							</view>
						</view>
						<view class="back">
							<view class="uploadImg">
								<ui-image-upload target="java" :params="{ type: 19 }" @click.native="stateChangeHandler(index)" @success="uploadBackHandler">
									<template v-if="item.cardBack">
										<view class="img">
											<image :src="`${imageView}${item.cardBack}`" mode="" />
										</view>
									</template>
									<view class="upload-img" v-else>
										<image src="../static/icon_camera.png" mode=""></image>
									</view>
								</ui-image-upload>
							</view>
							<view class="img-bottom">
								身份证背面
							</view>
						</view>
					</view>
					<view class="split-person"></view>
				</view>
			</view>
		</view>

		<view class="submit">
			<view class="btn" @tap="clickSubmit">
				<ui-button>提交</ui-button>
			</view>
		</view>

		<u-popup v-model="showPopup" mode="center" border-radius="40">
			<view class="pupop">
				<image class="success" src="../static/icon_success_zx.png" mode=""></image>

				<view class="result">
					提交成功
				</view>
				<view class="btn" @click="showPopupHamdel">
					<ui-button>确定</ui-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import api from '@/api';
	import {
		showToast
	} from '@/utils/utils.js';
	export default {
		computed: {
			...mapState(["imageView",'community']),
		},
		data() {
			return {
				current: 1,
				size: 10,
				floorName: '', //房屋名字
				eventName: '', //申请人名字
				eventPhone: '', //申请人电话
				isClean: false,
				roomId: '',
				renovationType: {
					label: '',
					value: ''
				}, //装修类型
				show: false,
				showTime: false,
				checked: false,
				showPopup: false,
				startime: '', //开始装修时间
				list: [{
						value: '1',
						label: '自装'
					},
					{
						value: '2',
						label: '半包'
					},
					{
						value: '3',
						label: '全包'
					}
				],
				description: '', //描述
				zXimgList: [], //装修图片文件
				zZimgList: [], //执照图片文件
				zSimgList: [], //证书图片文件
				uploadIndex:'',
				personInfo: []
			}
		},
		methods: {
			stateChangeHandler(index){
				this.uploadIndex=index
			},
			// 上传装修图纸
			uploadZxHandler(url) {
				this.zXimgList.push({
					drawingUrl:url.data
				}) ;
				console.log(this.zXimgList)
				console.log(url.data)
			},
			// 上传执照
			uploadZzHandler(url) {
				this.zZimgList = [];
				this.zZimgList = [...this.zZimgList, url.data]
			},
			// 上传证书
			uploadZsHandler(url) {
				this.zSimgList = [];
				this.zSimgList = [...this.zSimgList, url.data]
			},
			// 上传身份证正面
			uploadFrontHandler(url) {
				this.personInfo[this.uploadIndex].cardFront = '';
				this.personInfo[this.uploadIndex].cardFront = url.data
			},
			// 上传身份证背面
			uploadBackHandler(url) {
				console.log(url)
				this.personInfo[this.uploadIndex].cardBack ='';
				this.personInfo[this.uploadIndex].cardBack = url.data
			},
			// 删除
			deleteImg(index) {
				this.zXimgList.splice(index, 1);
			},
			// 预览图片
			imgtap(index) {
				console.log(this.zXimgList)
				uni.previewImage({
					current: index,
					urls: this.zXimgList,
				});
			},
			// 切换房屋
			navTo() {
				uni.navigateTo({
					url: '/pages/indexPages/choosehome/index',
				});
			},
			confirm(e) {
				this.renovationType = e[0]
			},
			// 添加施工人员
			addPerson() {
				this.personInfo.push({
					name: '',
					cardId: '',
					cardFront: '', //身份证正面
					cardBack: '', //身份证背面
				})
				console.log(this.personInfo)
			},
			async clickSubmit() {
				const query = {
					// 装修申请信息
					rsDecorationApplication: {
						des: this.description, //申请描述
						isClean: this.isClean, //是否清运垃圾
						name: this.eventName,
						phone: this.eventPhone,
						roomId: this.roomId,
						comId:this.community.id,
						startTime: this.startime,
						type: this.renovationType.value, //装修类型
					},
					// 施工人员信息
					rsDecorationBuilders: this.personInfo,
					// 公司资料
					rsDecorationCompanyFile: {
						certificateUrl: this.zSimgList[0], //资质证书
						licenseUrl: this.zZimgList[0], //营业执照
					},
					// 施工图纸
					rsDecorationDrawings: this.zXimgList
				}
				var reg = /^1[3456789]\d{9}$/; //电话正则
				if (!this.eventName) {
					showToast('请输入申请人姓名')
					return
				};
				if (!this.eventPhone) {
					showToast('请输入申请人电话')
					return
				};
				if (!reg.test(this.eventPhone)) {
					showToast('请输入有效的手机号码');
					return
				}
				if (!this.renovationType) {
					showToast('请选择装修类型')
					return
				};
				if (!this.startime) {
					showToast('请选择装修开始时间')
					return
				};
				if (!this.description) {
					showToast('请输入装修申请')
					return
				};
				if (this.zZimgList.length <= 0) {
					showToast('请上传营业执照')
					return
				};
				if (this.zSimgList.length <= 0) {
					showToast('请上传资质证书')
					return
				};
				if (this.personInfo.length <= 0) {
					showToast('请上传施工人员身份证信息')
					return
				};
				for(let i=0;i<this.personInfo.length;i++){
					if(!this.personInfo[i].name){
						showToast('请输入施工人员姓名')
						return
					}
					if (!this.personInfo[i].cardId) {
						showToast('请输入施工人员身份证号')
						return
					};
					if(this.personInfo[i].cardFront.length<=0){
						showToast('请上传身份证正面')
						return
					}
					if (this.personInfo[i].cardBack.length <= 0) {
						showToast('请上传身份证反面')
						return
					};
				}
				console.log(query)
				const res = await api.service.postDecorationAdd(query);
				if (res.status != '0') {
					return
				}
				console.log(res)
				this.showPopup = true

			},

			showPopupHamdel() {
				this.showPopup = false;
				uni.navigateBack({
					delta: 1
				})
			},
			bindDateChanges(e) {
				this.startime = e.target.value
				console.log(this.startime)
			},
			// 是否清运垃圾
			switchChange(e) {
				this.isClean = e
			},

			//获取住房列表
			async getHomeList() {
				let canshu = {
					current: this.current,
					size: this.size,
					checkStatus: 1,
				}
				const res = await api.my.getMyHousingPages(canshu)
				if (res.status !== '0') {
					return
				} else {
					console.log(res)
					if (res.data.records.length > 0) {
						this.homeList = res.data.records[0];
						this.roomId = res.data.records[0].roomId
						this.floorName = this.homeList.communityName + this.homeList.buildingNumber + '栋' + this
							.homeList.unitNumber + '-' + this.homeList.floorNumber + '-' + this.homeList.roomNumber;
					}
				}
			},
			changeHome() {
				uni.$on('changeHome', data => {
					console.log(data)
					this.userList = data;
					this.roomId = data.roomId;
					this.floorName = data.floorName
				})
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "./process"
			})
		},
		mounted() {
			this.getHomeList();
			this.changeHome()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '装修申请',
			});
		},
	}
</script>

<style lang="less" scoped>
	view,
	text {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.page-renovation-index {
		min-height: 100vh;
		padding-bottom: 162rpx;
		box-sizing: border-box;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.split {
		height: 25rpx;
		background-color: #f5f5f5;
	}
	
	.split-person{
		width: 100%;
		height: 25rpx;
		background-color: #FFFFFF;
	}

	.link-ext {
		max-width: 450rpx;
		font-size: 30rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;

		&.inactivated {
			color: #999999;
		}
	}

	.pickerTime {
		height: 110rpx;
		line-height: 110rpx;
		padding-left: 9rpx;
		margin-left: 30rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-bottom: 1rpx solid #EEEEEE;

		.times {
			display: flex;
			justify-content: space-between;

			view.splits {
				padding: 0rpx 39rpx;
			}
		}

		.uni-input {
			width: 165rpx;
			height: 90rpx;
			text-align: center;
			color: #F05050;
			border-bottom: 1rpx solid #F05050;
		}

		.uni-input-start,
		.uni-input-end {
			width: 165rpx;
			height: 90rpx;
			text-align: center;
			color: #666666;
		}
	}

	.content {
		padding: 29rpx 24rpx 0rpx 24rpx;
		background-color: #fff;

		.describe-title {
			color: #282828;
			font-size: 30rpx;
			margin-bottom: 25rpx;
		}

		.img-title {
			color: #333333;
			font-size: 28rpx;
			margin-bottom: 30rpx;
		}

		.iptText {
			border-bottom: 1rpx solid #e6e6e6;

			.text {
				width: 100%;
				min-height: 200rpx;
			}

			.uploadImg {
				padding-bottom: 19rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;

				.btn,
				.box {
					width: 120rpx;
					height: 120rpx;
				}

				.box {
					margin: 0rpx 25rpx 10rpx 0rpx;
					position: relative;

					image {
						border-radius: 8rpx;
					}

					image.delete {
						width: 28rpx;
						height: 28rpx;
						position: absolute;
						top: -14rpx;
						right: -14rpx;
						z-index: 9;
					}
				}

				.upload-img {
					width: 120rpx;
					height: 120rpx;
					background-color: #F5F5F5;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 4rpx;

					image {
						width: 58rpx;
						height: 47rpx;
					}
				}
			}
		}
	}

	.ziliao {
		padding: 29rpx 24rpx 0rpx 24rpx;
		background-color: #fff;
		color: #333333;
		font-size: 35rpx;
		margin-bottom: 34rpx;

		.ziliao-box {
			display: flex;
			justify-content: space-around;
			margin-top: 30rpx;

			.zhizhao,
			.zhengshu {
				width: 330rpx;
				height: 172rpx;
				color: #333333;
				font-size: 32rpx;
				border: 1rpx #999999 dashed;
				display: flex;
				justify-content: center;
				align-items: center;

				.upload-img {
					width: 330rpx;
					height: 172rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				.add {
					font-size: 48rpx;
					font-weight: bold;
				}
			}

		}
	}

	.worker-info {
		width: 100%;
		padding: 29rpx 24rpx 0rpx 24rpx;

		.worker-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #333333;
			font-size: 35rpx;
			margin-bottom: 28rpx;

			.add-worker {
				color: #F05050;
				font-size: 35rpx;

				.add {
					font-size: 48rpx;
				}
			}
		}

		.worker-box {
			background-color: #F5F5F5;
			border-radius: 4rpx;
			
			.name,
			.card {
				height: 88rpx;
				padding: 0 30rpx;
				font-size: 32rpx;
				border-bottom: 1rpx #E3E3E3 solid;
				display: flex;
				justify-content: space-between;
				align-items: center;

				input {
					width: 80%;
					text-align: right;
				}
			}
		}
	}

	.card-box {
		display: flex;
		justify-content: space-around;
		margin-top: 30rpx;
		padding: 0 30rpx;

		.front,
		.back {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #666666;
			font-size: 22rpx;

			.uploadImg {
				width: 301rpx;
				height: 190rpx;
				border: 1rpx #999999 dashed;

				.img {
					width: 100%;
					height: 187rpx;
				}

			}

			.img-bottom {
				margin-top: 14rpx;
				margin-bottom: 20rpx;
			}
		}

		.front .uploadImg .upload-img {
			width: 100%;
			height: 187rpx;
			background: url(../static/cardID_front.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 93rpx;
				height: 93rpx;
			}
		}

		.back .uploadImg .upload-img {
			width: 100%;
			height: 187rpx;
			background: url(../static/cardID_back.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 93rpx;
				height: 93rpx;
			}
		}
	}

	.submit {
		position: fixed;
		bottom: 0;
		left: 0rpx;
		right: 0rpx;
		height: 162rpx;
		z-index: 9;
		padding: 0 32rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			width: 100%;
		}
	}

	.pupop {
		width: 400rpx;
		height: 450rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.success {
			width: 235rpx;
			height: 204rpx;

		}

		.result {
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
		}

		.btn {
			width: 100%;
			padding: 0 80rpx;
			margin-top: 0;
		}
	}
</style>
