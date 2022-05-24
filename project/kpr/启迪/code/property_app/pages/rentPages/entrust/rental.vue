<template>
	<view class="page-entrust-rental">
		<view class="info">
			<ui-link label="小 区" size="large" :required="true" @click.native="tochoosecomPage">
				<view slot="ext" :class="['link-ext', {'inactivated': !regFormData.community}]">
					<!-- {{regFormData.community || '请选择'}} -->
					{{myHome.comMsg.name?myHome.comMsg.name:'请选择小区'}}
				</view>
			</ui-link>
			<view class="tips" v-if="caveat.some((a) => a == 'community')">小区为必填项，请选择</view>

			<ui-link label="户 型" size="large" :required="true" @click.native="visibleType = true">
				<view slot="ext" :class="['link-ext', {'inactivated': !regFormData.unitType}]">
					{{regFormData.unitType || '请选择户型'}}
				</view>
			</ui-link>
			<view class="tips" v-if="caveat.some((a) => a == 'unitType')">户型为必填项，请选择</view>

			<ui-form-input  label="建筑面积" ext="㎡" placeholder="请输入建筑面积" required v-model="regFormData.area" size="large">
				<view slot="ext"  class="link-ext">㎡</view>
			</ui-form-input>
			<view class="tips" v-if="caveat.some((a) => a == 'area')">建筑面积为必填项，请输入</view>

			<ui-link label="具体地址" size="large" @click.native="floorGo">
				<view slot="ext" :class="['link-ext', {'inactivated': !address}]">
					{{tower}}
				</view>
			</ui-link>

			<ui-form-input :label="pageType === 'rental' ? '每月租金' : '期望售价'" ext="万元" :placeholder="pageType === 'rental' ? '请输入期望租金' : '请输入期望售价'" required v-model="regFormData.price"
			 size="large">
				<view slot="ext" class="link-ext">{{pageType == 'rental'?'元':'万元'}}</view>
			</ui-form-input>
			<view class="tips" v-if="caveat.some((a) => a == 'price')">售价为必填项，请输入</view>
			<ui-link label="出租方式" size="large" :required="true" @click.native="visible = true" v-if="pageType == 'rental'">
				<view slot="ext" :class="['link-ext', {'inactivated': !housesType}]">
					{{housesType|| '请选择出租方式'}}
				</view>
			</ui-link>
			<ui-link label="房屋类型" size="large" :required="true" @click.native="visible = true" v-else>
				<view slot="ext" :class="['link-ext', {'inactivated': !housesType}]">
					{{housesType|| '请选择出售类型'}}
				</view>
			</ui-link>
			<view class="tips" v-if="caveat.some((a) => a == 'housesType')">{{pageType == 'rental'?'出租方式必填项，请选择':'房屋类型必填项，请选择'}}</view>

			<view class="pt"></view>

			<ui-form-input class="form-input" :required="true" size="large" label="联系人" v-model="regFormData.name" placeholder="请输入联系人">
				<view slot="ext" class="check">
					<!-- <view class="">
						<u-radio-group  v-model="value1" @change="radioGroupChange">
							<u-radio @change="radioChange(item.label)" v-for="(item, index) in sexList"  :key="index" :name="item.name"
							 :disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view> -->
					<radio-group @change="changeRadio">
						<label ><radio value="1" :checked="true" style="transform:scale(0.8)" />男士</label>
						<label class=""><radio value="2" :checked="false" style="transform:scale(0.8)" />女士</label>
					</radio-group>
				</view>
			</ui-form-input>
			<view class="tips" v-if="caveat.some((a) => a == 'name')">联系人为必填项，请输入</view>

			<ui-form-input :required="true" size="large" v-model="regFormData.phone" label="联系电话" placeholder="请输入联系电话"></ui-form-input>
			<view class="tips" v-if="caveat.some((a) => a == 'phone')">请输入您11位数字的手机号码</view>
		</view>

		<view class="process">
			<view class="title">房源发布流程</view>
			<view class="process_content">
				<view>
					<image src="../static/entrust/icon_zszx_fb.png" style="width: 48rpx; height: 48rpx" />
					<view>线上发布</view>
				</view>
				<view class="split active"></view>
				<view>
					<image src="../static/entrust/icon_zszx_dh.png" style="width: 48rpx; height: 48rpx" />
					<view>电话核实</view>
				</view>
				<view class="split"></view>
				<view>
					<image src="../static/entrust/icon_zszx_fy.png" style="width: 48rpx; height: 48rpx" />
					<view>房源上架</view>
				</view>
				<view class="split"></view>
				<view>
					<image src="../static/entrust/icon_zszx_qy.png" style="width: 48rpx; height: 48rpx" />
					<view>签约成交</view>
				</view>
			</view>
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

		<ui-modal v-model="visible" @close="closeHandler" full>
			<view class="titles">选择出租方式</view>
			<view class="model_content">
				<view class="modalText" v-for="(item, index) in housesData" :key="index" @click.native="handHouseChange(item)">
					{{ item.name }}
				</view>
			</view>
			<view class="splits"></view>
			<view class="cancel" @click="visible = false">取消</view>
		</ui-modal>
		<!-- <ui-modal v-model="visible" @close="closeHandler" full v-else>
			<view class="titles">选择出租方式</view>
			<view class="model_content">
				<view class="modalText" v-for="(item, index) in housesData" :key="index" @click.native="handHouseChange(item)">
					{{ item.name }}
				</view>
			</view>
			<view class="splits"></view>
			<view class="cancel" @click="visible = false">取消</view>
		</ui-modal> -->

		<ui-modal v-model="visibleType" @close="closeHandler" full>
			<view class="titles">选择户型</view>
			<view class="model_content">
				<view class="modalText" v-for="(item, index) in unitTypeData" :key="index" @click.native="handunitTypeChange(item.name)">
					{{ item.name }}
				</view>
			</view>
			<view class="splits"></view>
			<view class="cancel" @click="visibleType = false">取消</view>
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
				current:"1",
				//租房类型
				rentType: "",
				value1: "男",
				sexList: [{
						name: '男',
						label: "1",
						disabled: false
					},
					{
						name: '女',
						label: "0",
						disabled: false
					}
				],
				pageType: 'rental', // 页面类型 rental 出租 / sell 出售
				housesData: [{
						name: "整租",
						label: "1"
					},
					{
						name: "合租",
						label: "2"
					}
				],
				//多少居
				unitTypeData: [],
				visible: false, // 选择出租方式
				visibleType: false, // 选择户型
				successStatus: false, // 提交状态
				regFormData: {
					community: '春上南滨', // 小区
					unitType: '', // 户型
					price: '', // 期望售价
					name: '', // 联系人
					phone: '', // 联系电话
					area: '', // 建筑面积
				},
				housesType: undefined, // 出租方式
				address: '',
				caveat: [],
				sexParams: "1",
			};
		},
		computed: {
			// `${myHome.buildingMsg.name }-${myHome.unitMsg.name }-${myHome.floorMsg.name }-${myHome.RoomMsg.name }`
			tower() {
				let datas =
					`${this.myHome.buildingMsg.name }栋-${this.myHome.unitMsg.name }单元-${this.myHome.floorMsg.name }楼层-${this.myHome.RoomMsg.name }号房`
				if (this.myHome.RoomMsg.name) {
					return datas
				} else {
					return "请选择"
				}
			},
			...mapState(['user', 'community', "myHome"]),
			// ...mapState({
			// 	comId:state=>state.myHome.comMsg
			// })
		},
		created() {},
		onShow() {
			//获取多少居
			this.getHouseTypeList()
		},
		methods: {
			async getHouseTypeList() {
				let res = await api.resource.getHouseTypeList({
					propertyId: this.$config.propertyId
				})
				this.unitTypeData = res.data
				console.log(res)
			},
			//楼层地址
			floorGo() {
				if(this.myHome.comMsg.name){
					uni.navigateTo({
						url: "../floorSite/index"
					})
				}else{
					uni.showToast({
						title:"请先选择小区",
						icon:"none",
						duration:1000
					})
				}
				
			},

			radioGroupChange(e) {
				console.log(e)
			},
			radioChange(e) {
				this.sexParams = e
				console.log(e)

			},
			changeRadio(e){
				this.sexParams = e.detail.value
				console.log(this.sexParams)
			},
			// 小区
			tochoosecomPage() {
				uni.navigateTo({
					url: '/pages/entryPages/bind/choosecity?bindHome='+true
				});
			},
			// 出租方式
			handHouseChange(item) {
				console.log(item)
				this.housesType = item.name;
				this.rentType = item.label
				this.visible = false;
			},
			// 户型
			handunitTypeChange(item) {
				console.log('几居', item)
				this.regFormData.unitType = item;
				this.visibleType = false;
			},
			// 提交
			handSubmit() {
				this.caveat = [];
				// 公共必须参数验证
				Object.getOwnPropertyNames(this.regFormData).forEach(item => {
					if (!this.regFormData[item]) {
						this.caveat.push(item)
					}
				});


				if (this.pageType) {
					if (!this.housesType) {
						this.caveat.push('housesType');
					}
				}

				if (this.caveat.length == 0) {
					this.successStatus = true;
					if (this.pageType == 'rental') {
						// this.rentAdd()
					}
					if (this.pageType == 'sell') {
						// this.sellAdd()
					}
					console.log(559, this.regFormData)
				}
				console.log(22, this.regFormData)

			},
			//出租提交
			async rentAdd() {
				let {
					area,
					name,
					phone,
					price,
					unitType
				} = this.regFormData
				let unitTypes = unitType.substring(0, 1)
				let res = await api.service.rentAdd({
					buildingArea: area,
					comId: this.myHome.id,
					contactPeople: name,
					contactPhone: phone,
					contactSex: this.sexParams,
					houseTypeId: unitTypes,
					infoType: "rent",
					price: price,
					propertyId: this.$config.propertyId,
					rentType: this.rentType,
					roomId: this.myHome.RoomMsg.id,
					userId: this.user.id
				})
				if(res){
					this.$store.commit('myHome/BUILDING_MSG',{})
					this.$store.commit('myHome/UNIT_MSG',{})
					this.$store.commit('myHome/ROOM_MSG',{})
					this.$store.commit('myHome/FLOOR_MSG',{})
				}
			},
			//出售提交
			async sellAdd() {
				let {
					area,
					name,
					phone,
					price,
					unitType
				} = this.regFormData
				let unitTypes = unitType.substring(0, 1)
				let res = await api.service.rentAdd({
					buildingArea: area,
					comId: this.myHome.id,
					contactPeople: name,
					contactPhone: phone,
					contactSex: this.sexParams,
					houseTypeId: unitTypes,
					infoType: "sale",
					price: price,
					propertyId: this.$config.propertyId,
					rentType: this.rentType,
					roomId: this.myHome.RoomMsg.id,
					userId: this.user.id
				})
				if(res){
					this.$store.commit('myHome/BUILDING_MSG',{})
					this.$store.commit('myHome/UNIT_MSG',{})
					this.$store.commit('myHome/ROOM_MSG',{})
					this.$store.commit('myHome/FLOOR_MSG',{})
				}
			},
			// 确定
			determine() {
				uni.navigateBack({
					delta:1
				})
				this.successStatus = false;
			},
			// 联系客服
			async dial() {
				const res=await api.service.getPropertyPhone({
					phoneType:'saleRent',
					propertyId:this.user.propertyId
				})
				let saleRentPhone=res.data.saleRentPhone
				console.log(saleRentPhone)
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
			}
		},
		onLoad(option) {
			if (option.pageType) {
				this.pageType = option.pageType
			}
			if (option.pageType == 'rental') {
				this.housesData = [{
						name: "整租",
						label: "1"
					},
					{
						name: "合租",
						label: "2"
					}
				]
			} else {
				this.housesData = [{
						name: "新房",
						label: "1"
					},
					{
						name: "二手房",
						label: "2"
					}
				]

			}
			uni.setNavigationBarTitle({
				title: this.pageType === 'rental' ? '委托出租' : '委托出售',
			});
		}
	};
</script>

<style lang="less" scoped>
	/deep/.ui-form-input .input[data-v-0be67dff]{
		width:220rpx;
	}
	.page-entrust-rental {
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #f5f5f5;
		font-family: PingFang SC;
		font-weight: 500;
	}

	.tips {
		color: #EA6464;
		font-size: 30rpx;
		text-align: right;
		padding: 21rpx 31rpx;
	}

	.info {
		.check {
			display: flex;
			justify-content: flex-end;

			.spacing {
				margin: 0rpx 5rpx;
			}
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
	}

	.process {
		padding: 79rpx 0rpx 199rpx 0rpx;

		.title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			text-align: center;
		}

		.process_content {
			padding: 54rpx 43rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			view {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				font-size: 26rpx;
				color: #333;
				padding-top: 13rpx;
			}

			.split {
				padding-top: 0;
				width: 46rpx;
				// height: 1rpx;
				// background: #999;
				border-bottom: 1rpx dashed #999;

				&.active {
					border-color: #333;
				}
			}
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

	.model_content {
		view:last-child {
			padding-bottom: 58rpx;
		}
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
			.btn-btm{
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
