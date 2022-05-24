<template>
	<view class="pages-suggest-index">
		<view class="tips">
			提示：若情况紧急，请拨打<text @tap="handDial">客服热线</text>
			<image src="../static/icon_phone.png" style="width: 26rpx; height: 24rpx;margin-left: 22rpx;" mode="" />
		</view>

		<view class="search" @click="navTo">
			<ui-link :label="floorName || ''" :border="false">
				<image slot="icon" src="../static/icon_home.png" style="width: 58rpx; height: 58rpx"></image>
			</ui-link>
		</view>

		<view class="split"></view>

		<view class="content">
			<view class="iptText">
				<textarea class="text" :auto-height="true" placeholder="请输入问题投诉详情，以便我们更好的处理" maxlength="-1"
					v-model="content"></textarea>

				<view class="uploadImg">
					<view class="box" v-for="(item, index) in imgList" :key="index">
						<image src="../static/icon_delete.png" class="delete" @tap="deleteImg(index)" />
						<image :src="`${imageView}${item}`" @click.nayive="imgtap(imgList,index)" mode="" />
					</view>
					<view class="box" v-if="imgList.length<9">
						<view class="upload-img" @tap="getUpload">
							<image src="../static/icon_pic.png" class="btn" />
						</view>
					</view>
				</view>
			</view>
			<view class="bodys">
				<view>
					<view class="type">类型</view>
					<view v-for="(item, index) in typeList" :key="index" class="bodys_content" @tap="handType(item.id)"
						:class="{ 'active': complaintTypeId == item.id }">
						{{ item.name }}
					</view>
				</view>
				<view>
					<view class="type">部门</view>
					<view class="bodys-type">
						<view v-for="(item, index) in deptList" :key="index" class="bodys_content"
							@tap="handDepartment(item.id)" :class="{ 'active': complaintDeptId == item.id }">
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="info">
			<ui-link label="联系人" :arrow="false">
				<input slot="ext" class="link-ext" type="text" v-model="contactPeople" />
			</ui-link>
			<ui-link label="联系电话" :arrow="false">
				<input maxlength="11" slot="ext" class="link-ext" type="number" v-model="contactPhone" />
			</ui-link>
		</view>

		<view class="submit">
			<view class="btn">
				<ui-button @click.native="clickSubmit">提交</ui-button>
			</view>
		</view>
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
	import config from '@/config';

	export default {
		computed: {
			...mapState(['user', "imageView"]),
		},
		data() {
			return {
				typeList: [], //类型列表
				deptList: [], //部门列表
				current: 1,
				size: 10,
				floorName: '', //房屋名字
				homeList: {}, //默认住房列表第一个房屋
				complaintDeptId: '', //部门ID
				complaintTypeId: '', //类型ID
				contactPeople: '', //联系人	
				contactPhone: '', //联系人电话
				content: '', //内容	
				imgList: [], //投诉意见文件信息
				roomId: '', //住房ID	
			};
		},
		methods: {
			stateChangeHandler() {},
			// 上传
			uploadSuccessHandler(url) {
				this.imgList = [...this.imgList, url.data];
			},
			// 删除
			deleteImg(index) {
				this.imgList.splice(index, 1);
			},
			// 预览图片
			imgtap(item,index) {
				console.log(item)//["/data/pic/complaint/3d6ef61db1e547e29f42557b6fa39444.png"]
				let imgArr = []
				item.forEach((res) => {
					imgArr.push(`${this.imageView}${res}`);
					console.log(imgArr)
				})
				uni.previewImage({
					current: index,
					urls: imgArr,
				});
			},
			//上传图片
			getUpload() {
				uni.chooseImage({
					count: 9,
					sourceType: [ 'camera '],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						for (let i = 0; i < tempFilePaths.length; i++) {
							uni.uploadFile({
								url: `${config.apiRoot}/resourceApi/fileUpload/upload`,
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'type': '5'
								},
								success: (res) => {
									let data = JSON.parse(res.data)
									this.imgList = [...this.imgList, data.data];
									console.log(this.imgList)
								}
							});
						}
					}
				});
			},
			// 提交
			async clickSubmit() {
				const form = {
					complaintDeptId: this.complaintDeptId,
					complaintTypeId: this.complaintTypeId,
					contactPeople: this.contactPeople,
					contactPhone: this.contactPhone,
					content: this.content,
					fileList: this.imgList,
					roomId: this.homeList.roomId,
					userId: this.user.userId,
				}
				var reg = /^1[3456789]\d{9}$/;
				if (!this.roomId) {
					showToast('请绑定房屋');
					return
				}
				if (!this.content) {
					showToast('请输入问题投诉详情，以便我们更好的处理');
					return
				};
				if (!this.complaintTypeId) {
					showToast('请选择类型');
					return
				};
				if (!this.complaintDeptId) {
					showToast('请选择部门');
					return
				};
				if (!this.contactPeople) {
					showToast('请输入联系人');
					return
				};
				if (!this.contactPhone) {
					showToast('请输入联系电话');
					return
				};
				if (!reg.test(this.contactPhone)) {
					showToast('请输入有效的手机号码');
					return
				};

				console.log(form)
				const res = await api.suggest.addSuggest(form).then(res => {
					if (res.status == '0') {
						showToast('提交成功！');
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000)
						console.log(res)
					} else {
						showToast('提交失败！');
					}
				})
			},
			// 拨号
			handDial() {
				if (this.complaintPhone) {
					uni.showActionSheet({
						itemList: [`客服：${this.complaintPhone}`, '拨打'],
						success: (res) => {
							if (res.tapIndex == 1) {
								uni.makePhoneCall({
									phoneNumber: this.complaintPhone //仅为示例
								});
							}
						},
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '还没有客服电话'
					})
				}
			},
			// 获取报事报修服务电话、
			async getPropertyPhone() {
				const query = {
					phoneType: 'complaint',
					propertyId: this.user.propertyId
				}
				const res = await api.service.getPropertyPhone(query)
				if (res.status !== '0') {
					return
				} else {
					this.complaintPhone = res.data.complaintPhone[0]
				}
			},
			// 选择类型
			handType(index) {
				this.complaintTypeId = index;
				console.log(index)

			},
			// 选择部门
			handDepartment(index) {
				this.complaintDeptId = index;
				console.log(index)
			},
			// 切换房屋
			navTo() {
				uni.navigateTo({
					url: '/pages/indexPages/choosehome/index',
				});
			},

			// 获取类型、部门
			async loadData() {
				const _this = this;
				const res = await api.suggest.getResources({});
				console.log(res)
				if (res) {
					_this.deptList = res.data.deptList;
					_this.typeList = res.data.typeList;
				}
			},
			//获取住房列表
			getHomeList() {
				const _this = this;
				let canshu = {
					current: _this.current,
					size: _this.size,
					checkStatus: 1,
				}
				api.my.getMyHousingPages(canshu).then(res => {
					if (res.status !== '0') {
						return
					} else {
						if (res.data.records.length > 0) {
							_this.homeList = res.data.records[0];
							_this.floorName = _this.homeList.communityName + _this.homeList.buildingNumber + '栋' +
								_this
								.homeList.unitNumber + '-' + _this.homeList.floorNumber + '-' + _this.homeList
								.roomNumber;
							_this.roomId = _this.homeList.roomId
						}
					}
				})
			},
			changeHome() {
				uni.$on('changeHome', data => {
					console.log(data)
					this.userList = data;
					this.roomId = this.userList.roomId;
					this.floorName = data.floorName
				})
			},
			// 获取个人信息
			getUserInfo() {
				this.contactPeople = this.user.userName;
				this.contactPhone = this.user.phone;

			}
		},
		mounted() {

			this.getUserInfo()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "投诉建议",
			});
			this.getHomeList();
			this.getPropertyPhone();
			this.changeHome();
		},
		onLoad() {
			this.loadData()
		},
	};
</script>

<style lang="less" scoped>
	* {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.pages-suggest-index {
		min-height: 100vh;
		padding-bottom: 128rpx;
		box-sizing: border-box;
		background-color: #ffffff;
	}

	.split {
		height: 25rpx;
		background-color: #f5f5f5;
	}

	.tips {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-weight: normal;
		color: #EF5050;
		padding: 23rpx 24rpx;
		background-color: #fcdcdc;

		image {
			margin-left: 9rpx;
		}

		text {
			text-decoration: underline;
		}
	}

	.content {
		padding: 29rpx 24rpx 0rpx 24rpx;
		background-color: #fff;

		.iptText {
			.text {
				width: 100%;
				min-height: 200rpx;
			}

			.uploadImg {
				padding-bottom: 32rpx;
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

		.bodys {
			display: flex;
			flex-direction: column;
			padding-bottom: 56rpx;
			border-bottom: 1rpx solid #e6e6e6;

			view {
				color: #9e9e9e;
				display: flex;
				align-items: center;
				// flex-wrap: wrap;

				&.active {
					background-color: #FFAC2A;
					color: #fff;
				}

				.type {
					flex-shrink: 0;
					margin-right: 16rpx;
				}

				view:last-child {
					margin-right: 0rpx;
				}
			}

			.bodys-type {
				display: flex;
				flex-wrap: wrap;
			}

			.bodys_content {
				margin-right: 10rpx;
				flex-shrink: 0;
				box-sizing: border-box;
				padding: 9rpx 14rpx;
				margin-bottom: 10rpx;
				border-radius: 8px;
				font-size: 28rpx;
				color: #020204;
				border: 1px solid #dfdfdf;
			}
		}
	}

	.info,
	.search {
		.link-ext {
			max-width: 450rpx;
			font-size: 28rpx;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: right;
		}
	}

	.submit {
		position: fixed;
		bottom: 24rpx;
		left: 0rpx;
		right: 0rpx;
		height: 98rpx;
		z-index: 9;
		padding: 0rpx 32rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			width: 100%;
		}
	}
</style>
