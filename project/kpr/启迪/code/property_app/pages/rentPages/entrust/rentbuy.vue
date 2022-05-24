<template>
	<view class="page-entrust-rentbuy">
		<ui-form-input :label="pageType === 'renting' ? '租房预算' : '总价预算'" placeholder="请输入" required v-model="regFormData.price"
		 size="large">
			<view slot="ext" class="link-ext">元/月</view>
		</ui-form-input>
		<view class="tips" v-if="caveat.some((a) => a == 'price')">
			{{pageType === 'renting' ? '租房预算' : '总价预算'}}为必填项，请输入
		</view>

		<ui-link label="户 型" size="large" :required="true" @click.native="visibleType = true">
			<view slot="ext" :class="['link-ext', {'inactivated': !regFormData.unitType}]">
				{{regFormData.unitType.name || '请选择'}}
			</view>
		</ui-link>
		<view class="tips" v-if="caveat.some((a) => a == 'unitType')">户型为必填项，请选择</view>

		<ui-link :label="pageType === 'renting' ? '租房方式' : '房子类型'" size="large" :required="true" @click.native="visible = true">
			<view slot="ext" :class="['link-ext', {'inactivated': !regFormData.housesType}]">
				<text v-if="pageType=='renting'">{{regFormData.housesType.name || '请选择租房方式'}}</text>
				<text v-else>{{regFormData.housesType.name || '请选择房子类型'}}</text>
			</view>
		</ui-link>

		<view class="tips" v-if="caveat.some((a) => a == 'housesType')">
			{{pageType === 'renting' ? '租房方式' : '房子类型'}}为必填项，请选择
		</view>

		<ui-link :label="pageType === 'renting' ? '想租区域' : '想买区域'" size="large" @click.native="regingShow">
			<view slot="ext" :class="['link-ext', { inactivated: !area }]">
				{{ regingDetail || "不限" }}
			</view>
		</ui-link>

		<view class="pt"></view>

		<ui-form-input class="from-input" :required="true" size="large" label="联系人" v-model="regFormData.name" placeholder="请输入联系人">
			<view slot="ext" class="check-radio">
				<radio-group @change="changeRadio">
					<label>
						<radio value="1" :checked="true" style="transform:scale(0.8)" />男士</label>
					<label class="">
						<radio value="2" :checked="false" style="transform:scale(0.8)" />女士</label>
				</radio-group>
			</view>
		</ui-form-input>
		<view class="tips" v-if="caveat.some((a) => a == 'name')">联系人为必填项，请输入</view>

		<ui-form-input :required="true" size="large" v-model="regFormData.phone" label="联系电话" placeholder="请输入联系电话"></ui-form-input>
		<view class="tips" v-if="caveat.some((a) => a == 'phone')">请输入您11位数字的手机号码</view>

		<view class="Introduction">
			<image src="../static/entrust/icon_zszx_ts.png" mode="" style="width: 36rpx; height:36rpx;" />
			<view>当有符合你需求的房源时，优选置业顾问将一对一为您服务</view>
		</view>

		<view class="btn">
			<view class="lt" @click="dial">
				<image src="../static/entrust/icon_zszx_phone.png" style="width: 48rpx; height: 48rpx" />
				<text>联系客服</text>
			</view>
			<view class="btnBox" @click="handSubmit">
				<ui-button>提交委托</ui-button>
			</view>
		</view>

		<ui-modal v-model="visibleType" @close="closeHandler" full>
			<view class="titles">选择户型</view>
			<view class="model_content">
				<view class="modalText" v-for="(item, index) in unitTypeData" :key="index" @click.native="handunitTypeChange(item)">
					{{item.name}}
				</view>
			</view>
			<view class="splits"></view>
			<view class="cancel" @click="visibleType = false">取消</view>
		</ui-modal>

		<ui-modal v-model="visible" @close="closeHandler" full>
			<view class="titles">选择出租方式</view>
			<view class="model_content">
				<view class="modalText" v-for="(item, index) in housesData" :key="index" @click.native="handHouseChange(item)">
					{{item.name}}
				</view>
			</view>
			<view class="splits"></view>
			<view class="cancel" @click="visible = false">取消</view>
		</ui-modal>

		<view class="modelSucess" v-if="successStatus">
			<view class="success">
				<image src="../static/entrust/icon_zszx_cgi.png" mode="" style="width:66rpx; height:66rpx" />
				<view class="sucesText">提交成功！</view>
				<view>您的委托申请已提交成功，</view>
				<view>我们将尽快安排服务人员为您服务</view>
				<view class="btnSuccess" @click="determine">
					<ui-button class="btn-btm">确定</ui-button>
				</view>
			</view>
		</view>
		<u-picker mode="region" v-model="show" @confirm="confirm" :area-code='["13", "1303", "130304"]'></u-picker>
	</view>
</template>

<script>
	import api from "@/api"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				contactSex: "1",
				regingId: "",
				regingDetail: "",
				show: false,
				successStatus: false,
				visibleType: false,
				visible: false,
				housesData: [],
				unitTypeData: [],
				area: '',
				regFormData: {
					name: '',
					phone: '',
					price: '',
					unitType: {},
					housesType: '',
				},
				caveat: [],
				pageType: '',
				infoType: "",
			}
		},
		computed: {
			...mapState(['user', 'community', "myHome"]),
		},
		onShow() {
			//获取多少居
			this.getHouseTypeList()

		},
		methods: {
			changeRadio(e) {
				this.contactSex = e.detail.value
				console.log(this.contactSex)
			},
			confirm(e) {
				console.log(e)
				this.regingDetail = `${e.province.label},${e.city.label},${e.area.label}`
				this.regingId = `${e.province.value},${e.city.value},${e.area.value}`
				console.log(3, this.regingDetail)
				console.log(3, this.regingId)
			},
			regingShow() {
				this.show = true
				console.log(2)
			},
			async getHouseTypeList() {
				let res = await api.resource.getHouseTypeList({
					propertyId: this.$config.propertyId
				})
				this.unitTypeData = res.data
				console.log(res)
			},
			// 出租方式
			handHouseChange(item) {
				console.log(item.label)
				this.regFormData.housesType = item;
				this.visible = false;

			},

			// 户型
			handunitTypeChange(item) {
				this.regFormData.unitType = item;
				console.log(item)
				this.visibleType = false;
			},
			// 联系客服
			async dial() {
				const res=await api.service.getPropertyPhone({
					phoneType:'saleRent',
					propertyId:this.user.propertyId
				})
				let saleRentPhone=res.data.saleRentPhone
				if(res.status!='0'){return}
				if(saleRentPhone.length>0){
					uni.makePhoneCall({
						phoneNumber: saleRentPhone[0] //仅为示例
					});
				}else{
					uni.showToast({
						title:'暂无号码',
						icon:'none'
					})
				}
			},
			// 提交
			handSubmit() {
				console.log(221, this.regFormData)
				this.caveat = [];
				this.rentSaleInfoAdd()
				// 公共必须参数验证
				Object.getOwnPropertyNames(this.regFormData).forEach(item => {
					if (!this.regFormData[item]) {
						this.caveat.push(item)
					}
				});
				if (this.caveat.length == 0) {
					this.successStatus = true;
					console.log(this.regFormData)
				}
			},
			//添加我要出租
			async rentSaleInfoAdd() {
				let {
					housesType,
					name,
					phone,
					price,
				} = this.regFormData
				let unitType=this.regFormData.unitType.id
				let res = await api.service.rentSaleInfoAdd({
					contactPeople: name,
					contactPhone: phone,
					contactSex: this.contactSex,
					houseTypeId: unitType,
					infoType: this.infoType,
					price: price,
					propertyId: this.$config.propertyId,
					rentType: housesType.label,
					userId: this.user.id,
					vid: this.regingDetail || "",
					vname: this.regingId || "",
				})
				// console.log(666, res)
			},
			// 确定
			determine() {
				uni.navigateBack({
					delta:1
				})
				this.successStatus = false;
			},
		},
		onLoad(option) {
			if (option.pageType) {
				this.pageType = option.pageType
				console.log(333, option.pageType)
				this.infoType = option.pageType == 'renting' ? 'rentIn' : 'buy'
				this.housesData = option.pageType === 'renting' ? [{
						name: "整租",
						label: "1"
					},
					{
						name: "合租",
						label: "2"
					},
					{
						name: "不限",
						label: "3"
					}
				] : [{
						name: "新房",
						label: "1"
					},
					{
						name: "二手房",
						label: "2"
					},
					{
						name: "不限",
						label: "3"
					}
				];
			}
			uni.setNavigationBarTitle({
				title: this.pageType === 'renting' ? '我要租房' : '我要买房',
			});
		}
	}
</script>


<style lang="less" scoped>
	/deep/.ui-form-input .input {
		width: 220rpx;
	}

	// .check-radio{
	// 	position: relative;
	// 	left: -80rpx;
	// }
	.page-entrust-rentbuy {
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #f5f5f5;
		padding-bottom: 100rpx;
		font-family: PingFang SC;
		font-weight: 500;
	}

	.Introduction {
		padding: 41rpx 30rpx;
		font-size: 32rpx;
		color: #666;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;

		image {
			flex-shrink: 0;
		}

		view {
			margin-left: 15rpx;
		}
	}

	.tips {
		color: #EA6464;
		font-size: 30rpx;
		text-align: right;
		padding: 21rpx 31rpx;
	}

	.link-ext {
		font-size: 30rpx;
		color: #333;

		&.inactivated {
			color: #B3B3B3;
		}
	}

	.pt {
		height: 20rpx;
	}

	.check {
		display: flex;
		justify-content: flex-end;

		.spacing {
			margin: 0rpx 5rpx;
		}
	}

	// 底部弹窗
	.titles {
		height: 95rpx;
		text-align: center;
		font-size: 28rpx;
		color: #4d4d4d;
		border-bottom: 1rpx solid #e6e6e6;
		line-height: 95rpx;
	}

	.modalText {
		padding: 58rpx 0rpx 0rpx 0rpx;
		font-size: 32rpx;
		color: #4D4D4D;
		text-align: center;
	}

	.splits {
		height: 17rpx;
		background-color: #f5f5f5;
	}

	.cancel {
		font-size: 32rpx;
		color: #4D4D4D;
		height: 100rpx;
		line-height: 100rpx;
		// margin-top: 17rpx;
		text-align: center;
	}

	.model_content {
		view:last-child {
			padding-bottom: 58rpx;
		}
	}

	.btn {
		// width: 100%;
		background-color: #fff;
		padding: 0rpx 20rpx;
		height: 120rpx;
		font-size: 30rpx;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;

		.btnBox {
			width: 480rpx;
		}

		.lt {
			padding-left: 14rpx;
			display: flex;
			align-items: center;

			text {
				padding-left: 12rpx;
			}
		}
	}

	.modelSucess {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: space-around;
		align-items: center;

		.success {
			max-width: 540rpx;
			max-height: 500rpx;
			background-color: #fff;
			padding: 62rpx 39rpx;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			color: #666666;
			border-radius: 16px;
			font-size: 30rpx;

			view {
				text-align: center;
				width: 100%;
				font-size: 30rpx;
				color: #666666;
			}

			.sucesText {
				color: #1B76FF;
				padding: 33rpx 0rpx 59rpx 28rpx;
			}

			.btn-btm {
				color: #fff;
				font-size: 30rpx;
				font-weight: 500;
			}

			.btnSuccess {
				padding-top: 25rpx;
				height: 80rpx;
				width: 400rpx;
			}
		}
	}
</style>
