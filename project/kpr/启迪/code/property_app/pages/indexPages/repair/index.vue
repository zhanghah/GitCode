<template>
	<view class="pages-repair-index">
		<view class="tips">
			提示：若情况紧急，请拨打<text @tap="handDial">客服热线</text>
			<image src="../static/icon_phone.png" style="width: 26rpx; height: 24rpx" mode="" />
		</view>

		<view class="search">
			<ui-form-input label="事件名称" placeholder="请输入" type="text" maxlength="15" v-model="woEventName"
				size="default">
				<view slot="ext" class="link-ext"></view>
			</ui-form-input>

			<ui-link label="报事报修类型" @click.native="toTypePage">
				<view slot="ext" :class="['link-ext', {'inactivated': !repairType.typeName}]">
					{{repairType.typeName|| '请选择'}}
				</view>
			</ui-link>

			<ui-link label="紧急度" @click.native="show=true">
				<view slot="ext" :class="['link-ext', {'inactivated': !status.label}]">
					{{status.label|| '请选择'}}
				</view>
			</ui-link>
			<u-select v-model="show" :list="list" @confirm="confirm" title="紧急度"></u-select>

			<view class="split"></view>

			<view class="address">
				<view class="warp">
					<view class="label">
						事件地点
					</view>
					<view class="location">
						<text v-if="address.longitude">
							({{address.longitude.toFixed(5)}},{{address.latitude.toFixed(5)}})
						</text>
					</view>
					<view class="icon" @click="chooseMap">
						<view>
							地图选点
						</view>
						<image src="../static/icon_com.png" mode=""></image>
					</view>
				</view>
			</view>
			<ui-form-input label="详细地址" placeholder="请输入" v-model="addressDetail" size="default">
				<view slot="ext" class="link-ext"></view>
			</ui-form-input>
			<view class="split"></view>

			<view class="info">
				<ui-link label="联系人" :arrow="false">
					<input slot="ext" class="link-ext" v-model="name" />
				</ui-link>
				<ui-link label="联系电话" :arrow="false">
					<input maxlength="11" slot="ext" class="link-ext" v-model="phone" />
				</ui-link>
			</view>
			<view class="split"></view>

			<view class="requirement">
				<view class="describe-title">
					处置工具要求
				</view>
				<textarea class="text" :auto-height="true" placeholder="请输入" maxlength="100" v-model="tool"></textarea>
			</view>
			<view class="split"></view>

			<view class="requirement">
				<view class="describe-title">
					处置人员要求
				</view>
				<textarea class="text" :auto-height="true" placeholder="请输入" maxlength="100"
					v-model="renyuan"></textarea>
			</view>
			<view class="split"></view>

			<view class="pickerTime">
				<view>处置时间要求</view>
				<view class="times">
					<picker mode="date" :value="arrivedTime" @change="bindDateChanges">
						<view class="uni-input-start" v-if="!startime">开始时间</view>
						<view class="uni-input" v-if="startime">{{startime }}</view>
					</picker>
				</view>
			</view>
			<ui-link label="是否开启超时提醒" :arrow="false">
				<u-switch slot="ext" v-model="checked" active-color="#FEC1C1" inactive-color="#eee"
					@change="switchChange"></u-switch>
			</ui-link>
		</view>

		<view class="content">
			<view class="iptText">
				<view class="describe-title">
					报事描述
				</view>
				<textarea class="text" :auto-height="true" placeholder="请输入问题投诉详情，以便我们更好的处理" maxlength="100"
					v-model="description"></textarea>

				<view class="img-title">
					图片/视频
				</view>
				<view class="uploadImg">
					<view class="box" v-for="(item, index) in imgList" :key="index">
						<image src="../static/icon_delete.png" class="delete" @click="deleteImg(index)" />
						<image :src="`${item.fileVisitUrl}`" @click.native="imgtap(imgList,index)" mode="" />
					</view>
					<view class="box">
						<view class="upload-img" @tap="stateChangeHandler">
							<image src="../static/icon_pic.png" class="btn" />
						</view>
					</view>
				</view>
			</view>
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
	} from '@/utils/utils.js'
	import config from '@/config';
	import dayjs from 'dayjs'
	export default {
		computed: {
			...mapState(['user', 'community', "imageView", 'myHome']),
		},
		data() {
			return {
				url: `${config.apiRoot}/em-public-api/public/woEvent/saveWoEventImage`,
				show: false,
				checked: true, //是否开启超时提醒
				imgList: [], //上传图片列表
				imgIdList: [], //上传图片id列表
				woEventName: '', //事件名称
				repairType: {}, //报修类型
				status: {
					value: '',
					label: ''
				}, //紧急度
				address: {
					name:'',
					address:'',
					latitude: '',
					longitude: '',
				}, //定位
				addressDetail: '', //详细地址
				name: '', //联系人
				phone: '', //联系电话
				tool: '', //处置工具要求
				renyuan: '', //处置人员要求
				arrivedTime: undefined, //时间要求
				startime:undefined,
				userList: '',
				description: '', //报事描述
				maintainPhone: '', //服务电话
				timer: null,
				list: [{
						value: '1',
						label: '紧急'
					},
					{
						value: '2',
						label: '较急'
					},
					{
						value: '3',
						label: '一般'
					}
				],
			};
		},

		methods: {
			stateChangeHandler() {
				console.log(this.url)
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera '],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths)
						for(let i=0;i<tempFilePaths.length;i++){
							uni.uploadFile({
								url: `${this.url}?sysUserId=${this.user.userId}`, //url:`${config.apiRoot}/public/woEvent/saveWoEventImage`
								filePath: tempFilePaths[i],
								name: 'file',
								// formData: {sysUserId:this.user.userId},
								header: {
									'EM-Access-identity': 'TzPKhtYtj+osi/g/1U9G6FdRfmDyvVkJ4KpsWApSOfuyNsq409xbDhShCGFooTNg04ChBYpLXMp4fI+hZlhGCNftxxjxfbRI3DZcjT+ErmHyUHH8O3PBJ6qO0mOqUthRJMgdh3DfDgg7NUDELWvztPKKdtuuoBmhqcNEqGkie9xdQotdV1ewdE9RbpWjcTy0p1q+FzYc4blpG/1s38OzQvjgDL1CInhsYlP58kiKU2KkFpQB3yEem8w8KQLZUvtOoKc8agycUHo+XlbqlFBA8haAGsFg5dzv7+ILceVTxDWzh+xTpwHNv9Ssa88ALVQ+zRUXeJhFUpXnuWG8eSnjphQW5tBM0xL9zu8mGyZsLz+I7WNyUYVcVA7V0OexyIT+ydgKHsM4v1w/JQ4m2NPTmW4Xl/HPehDpUTqX9QEP6c/3xZ2Hrw4G9tJJcntJeH7EKE8cnWRf8NTbYuCJmDg5T9Mnjai/c3DYQeZiwN2QZIx6RNshQXON5pq/pmIORh9yb1YjJIdu5jJ+NrrR82U3QQTFjrqIeyw9Xdwzk3rmfroqpryV/P7WP7K0YOfJM0ZLPE4198Uj+SLx3YqUYCNpBAyojrfD55d/00UU2g10AWur6Ehx+dLhJVIid9UyuGF47nIfN/mjROgx8g03JyMVOPHvfAIVIMvhfX6JS7boQ10=',
								},
								success: (uploadFileRes) => {
									const res = JSON.parse(uploadFileRes.data);
									console.log(res)
									this.imgList = [...this.imgList, res.data[0]];
									this.imgIdList = [...this.imgIdList, res.data[0].id];
									console.log(this.imgList)
									console.log(this.imgIdList)
								},
								fail: () => {
									// 上传失败
									uni.showToast({
										icon: 'none',
										title: '上传失败!'
									})
								}
							});
						}
					}
				});
			},
			// 删除
			deleteImg(index) {
				this.imgList.splice(index, 1);
				this.imgIdList.splice(index, 1);
			},
			// 预览图片
			imgtap(item,index) {
				let imgArr = []
				console.log(item)
				item.forEach((res) => {
					imgArr.push(`${res.fileVisitUrl}`);
					console.log(imgArr)
					console.log(res)
				})
				uni.previewImage({
					current: index,
					urls: imgArr,
				});
			},
			// 选择紧急度
			confirm(e) {
				this.status = e[0]
			},
			// 地图选点
			chooseMap() {
				uni.navigateTo({
					url: "./choosemap"
				})
			},
			//开始时间
			bindDateChanges(e) {
				this.arrivedTime=dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss")
				this.startime=dayjs(e.target.value).format("YYYY-MM-DD")
			},

			// 是否开启提醒
			switchChange() {},
			// 提交
			async clickSubmit() {
				//  
				let form = {
					adress: this.addressDetail,
					arrivedTime: this.arrivedTime,
					company:1,
					contacts: this.name,
					contactsPhone: this.phone,
					currentCeResidentialQuartersId:this.community.id,
					dataSource: 4,
					description: this.description,
					emergencyLevel: this.status.value,
					// eventPosition: this.address.name,
					eventPosition:'重庆市渝北区两江新区大竹林街道星光大道90号21号办公',
					eventStatus:1,
					latitude: Number(this.address.latitude),
					longitude: Number(this.address.longitude),
					staffing: this.renyuan,
					sysStaticResourceImageIdList: this.imgIdList,
					sysUserId:this.user.userId,
					timeoutAlarmOrNot: this.checked,
					tool: this.tool,
					woEventName: this.woEventName,
					woEventParentId: this.repairType.parentId,
					woEventTypeId: this.repairType.childrenId,
				}

				var reg = /^1[3456789]\d{9}$/; //电话正则
				if (!this.woEventName) {
					showToast('请输入事件名称');
					return
				};
				if (!this.repairType.parentId) {
					showToast('请选择报事报修类型');
					return
				};
				if (!this.name) {
					showToast('请输入联系人');
					return
				};
				if (!this.phone) {
					showToast('请输入联系电话');
					return
				}
				if (!reg.test(this.phone)) {
					showToast('请输入有效的手机号码');
					return
				}
				if (!this.tool) {
					showToast('请描述处置工具要求');
					return
				}
				if (!this.renyuan) {
					showToast('请描述处置人员要求');
					return
				}
				if (!this.description) {
					showToast('请输入问题投诉详情，以便我们更好的处理');
					return
				};
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(async () => {
					const res = await api.maintain.getSaveRepair(form)
					if (res.code == 'success') {
						uni.showToast({
							duration:2000,
							title:'提交成功',
							icon:'success'
						})
						uni.navigateBack();
					}
				}, 800)
			},
			// 拨号
			handDial() {
				if (this.maintainPhone) {
					uni.showActionSheet({
						itemList: [`客服：${this.maintainPhone}`, '拨打'],
						success: (res) => {
							if (res.tapIndex == 1) {
								uni.makePhoneCall({
									phoneNumber: this.maintainPhone //仅为示例
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
					phoneType: 'maintain',
				}
				const res = await api.service.getPropertyPhone(query)
				if (res.status !== '0') {
					return
				} else {
					this.maintainPhone = res.data.maintainPhone[0]
				}
			},
			// 切换房屋
			navTo(e) {
				uni.navigateTo({
					url: '/pages/indexPages/choosehome/index',
				});
			},
			// 选择报修类型
			toTypePage() {
				uni.navigateTo({
					url: './type'
				});
			},
			typeName() {
				uni.$on('typeName', data => {
					this.repairType = data
				})
			},
			getAdd() {
				uni.$on('getAdd', data => {
					this.address = data
					console.log(data)
				})
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '报事报修',
			});
			this.typeName();
			this.getAdd()
			this.getPropertyPhone()
		},
		onLoad(opt) {

		},
	};
</script>

<style lang="less" scoped>
	view,
	text {
		font-family: "PingFang SC";
		font-weight: 500;
	}

	.pages-repair-index {
		min-height: 100vh;
		padding-bottom: 162rpx;
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
			margin-left: 22rpx;
		}

		text {
			text-decoration: underline;
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
			color: #282828;
			font-size: 30rpx;
			margin-bottom: 30rpx;
		}

		.iptText {
			border-bottom: 1rpx solid #e6e6e6;

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
	}

	.info,
	.search {
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
	}

	.address {
		background: #FFFFFF;
		padding-left: 39rpx;
		box-sizing: border-box;

		.warp {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 29rpx;
			height: 100rpx;
			box-sizing: border-box;
			border-bottom: 1rpx #EEEEEE solid;

			.label {
				color: #282828;
				font-size: 30rpx;

			}

			.icon {
				// width: 100%;
				display: flex;
				align-items: center;
				color: #80C26A;
				font-size: 30rpx;

				view {
					margin-right: 15rpx;
				}

				image {
					width: 29rpx;
					height: 27rpx;
				}
			}
		}
	}

	.requirement {
		padding: 29rpx 24rpx 0rpx 24rpx;
		background-color: #fff;

		.describe-title {
			color: #282828;
			font-size: 30rpx;
			margin-bottom: 25rpx;
		}

		.text {
			width: 100%;
			min-height: 200rpx;
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
			margin-right: 30rpx;

		}

		.uni-input {
			width: 165rpx;
			height: 90rpx;
			text-align: center;
			color: #F05050;
			border-bottom: 1rpx solid #F05050;
		}

		.uni-input-start {
			width: 165rpx;
			height: 90rpx;
			text-align: center;
			color: #666666;
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

	.label {
		color: #7A7A7C;
	}
</style>
