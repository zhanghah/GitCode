<template>
	<view class="content_mall">
		<view class="address">
			<view class="xuzn" v-if="forDate.receivingAddress.length==0" @click="chooseLocation()">
				<text>选择收货地址</text>
				<u-icon name="arrow-right" color="#802890" size="28"></u-icon>
			</view>
			<view class="xuzns" v-else>
				<view class="text">
					<text class="diz">{{forDate.receivingAddress}}</text>
					<text class="xxdz">{{forDate.detailedAddress}}10号</text>
				</view>
				<image src="../../../../static/mall/my/xgdiz@2x.png" mode="aspectFill" @click="chooseLocation()">
				</image>
			</view>

			<view class="mph">
				<view class="cell">
					<text class="mz">门牌号</text>
					<view class="shuru">
						<input type="text" v-model="forDate.detailedAddress" placeholder="详细地址，例如1层101室" />
					</view>
				</view>
				<view class="cell">
					<text class="mz">联系人</text>
					<view class="shuru">
						<input class="nams"  v-model="forDate.contactName" type="text" placeholder="请填写收货人姓名" />
						<radio-group class="danxuan" @change="radioGroupChange">
							<label v-for="(item,index) in radioGroup" :class="index">
								<radio  style="transform:scale(0.6)" color='#802890' :value="item.key" :checked='item.checked'></radio><text>{{item.text}}</text>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="cell ">
					<text class="mz">手机号</text>
					<view class="shuru shurus">
						<input type="number" v-model="forDate.contactPhoneNumber" placeholder="请填写收货手机号码" />
					</view>
				</view>
			</view>
			<view class="mor">
				<ui-checkbox style="transform:scale(0.7)" v-model="forDate.defaultAddressStatus"></ui-checkbox>
				<text>是否为默认地址</text>
			</view>
			<text class="ann" @click="sysUserReceivingAddress_date()">保存地址</text>
			<text class="annsc">删除改地址</text>
		</view>
	</view>
</template>

<script>
	import user from '../../../../api/mallUser/user.js'
	import uRadioGroup from "@/uview-ui/components/u-radio-group/u-radio-group.vue";
	import uRadio from "@/uview-ui/components/u-radio/u-radio.vue";
	import uIcon from "@/uview-ui/components/u-icon/u-icon.vue";
	export default {
		components: {
			uRadioGroup,
			uRadio,
			uIcon
		},
		data() {
			return {
				isAdd: false,
				forDate: {
					contactPhoneNumber: '',
					defaultAddressStatus: false,
					detailedAddress: '',
					gender: '',
					contactName:'',
					receivingAddress: '',
					receivingAddressLatitude:'',
					receivingAddressLongitude:''
				},
				radioGroup:[{
					key : '1',
					text:'先生',
					checked:false
				},{
					key : '0',
					text:'女生',
					checked:false
				}],
				id: null,
				value: '1'
			};
		},
		onLoad(optin) {
			this.id = optin.id
			uni.setNavigationBarTitle({
				title: optin.id ? '编辑收货地址' : '新增收货地址'
			});
			if (optin.id) {
				this.sysUserReceivingAddress_cx()
			}
		},
		methods: {
			radioGroupChange(e) {
				this.forDate.gender = e.detail.value
				
				console.log(this.forDate.gender)
			},
			chooseLocation() {
				var that = this
				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						that.forDate.receivingAddress = res.address
						that.forDate.receivingAddressLatitude = res.latitude
						that.forDate.receivingAddressLongitude = res.longitude
					}
				});
			},
			/**
			 * 保存
			 */
			sysUserReceivingAddress_date() {
				var that = this
				if (that.id) {
					that.sysUserReceivingAddress_put()
					return
				}
				var dateSoure = that.forDate
				dateSoure['sysUserId'] = that.$store.state.user.userId
				console.log(dateSoure)
				user.sysUserReceivingAddress(dateSoure).then(res => {
					setTimeout(function() {
						that.$goPage('back')
					}, 2000);
				})
			},
			/**
			 * 修改地址
			 */
			sysUserReceivingAddress_put() {
				var that = this
				var dateSoure = that.forDate
				dateSoure['sysUserId'] = that.$store.state.user.userId
				dateSoure['id'] = that.id
				console.log(dateSoure)
				user.sysUserReceivingAddress_put(dateSoure).then(res => {
					setTimeout(function() {
						that.$goPage('back')
					}, 2000);
				})
			},
			/**
			 * 查询
			 */
			sysUserReceivingAddress_cx() {
				user.sysUserReceivingAddress_id({
					id: this.id
				}).then(res => {
					console.log(res)
					this.forDate = {
						contactPhoneNumber: res.contactPhoneNumber,
						defaultAddressStatus: res.defaultAddressStatus,
						detailedAddress: res.detailedAddress,
						gender: res.gender,
						contactName:res.contactName,
						receivingAddress: res.receivingAddress,
						receivingAddressLatitude:res.receivingAddressLatitude,
						receivingAddressLongitude:res.receivingAddressLongitude
					}
					for(var i=0;i<this.radioGroup.length;i++){
						this.radioGroup[i].checked = false
						if(this.radioGroup[i].key == res.gender){
							this.radioGroup[i].checked = true
						}
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.content_mall {
		display: flex;
		justify-content: center;
		align-content: flex-start;

		.address {
			width: 698rpx;
			border-radius: 20rpx 20rpx 0px 0px;
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;
			position: relative;

			.xuzn {
				width: 100%;
				height: 81rpx;
				// border: 1rpx solid #802890;
				background: #FFFFFF;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0rpx 30rpx;

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #802890;
					line-height: 80rpx;
				}
			}

			.xuzns {
				width: 100%;
				height: 113rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				margin-top: 20rpx;
				padding: 0rpx 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.text {
					width: 80%;
					display: flex;
					justify-content: flex-start;
					align-content: center;
					flex-wrap: wrap;

					.diz {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #555555;
					}

					.xxdz {
						width: 100%;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						margin-top: 10rpx;
					}
				}

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.mph {
				width: 100%;
				background: #FFFFFF;
				border-radius: 20rpx;
				margin-top: 20rpx;
				padding: 0rpx 30rpx;
				display: flex;
				justify-content: flex-start;
				align-content: flex-start;
				flex-wrap: wrap;

				.cell {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					height: 109rpx;

					.mz {
						width: 130rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #282828;
					}

					.shuru {
						width: calc(100% - 130rpx);
						border-bottom: 1rpx solid #DFDFDF;
						height: 100%;
						display: flex;
						justify-content: flex-start;
						align-items: center;

						input {
							width: 100%;
							height: 100%;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
						}

						.nams {
							width: 50%;
						}

						.danxuan {
							width: 50%;
							display: flex;
							justify-content: flex-end;
							align-items: center;

							text {
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}
					}

					.shurus {
						border: none;
					}
				}

			}

			.ann {
				width: 450rpx;
				height: 90rpx;
				background: linear-gradient(88deg, #802890 0%, #7928C5 100%);
				border-radius: 45rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 90rpx;
				text-align: center;
				position: fixed;
				bottom: 50rpx;
				left: 150rpx;
			}
			.annsc{
				width: 450rpx;
				font-size: 14rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #555555;
				text-align: center;
				position: fixed;
				bottom: 15rpx;
				left: 150rpx;
			}
		}
	}

	/deep/uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: #d1d1d1
	}

	.mor {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 60rpx;

		text {
			font-size: 20rpx;
		}
	}
</style>
