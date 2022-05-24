<template>
	<view class="content_mall">
		<view class="address" v-if="sysUserReceivingAddress_date.length>0">
			<view class="cell" v-for="(item,index) in sysUserReceivingAddress_date">
				<view class="text" @click="xuanz(item)">
					<text class="diz">{{item.receivingAddress}} </text>
					<text class="phone">{{item.contactName}} {{item.gender==1?'先生':'女生'}} <text class="mor" v-if="item.defaultAddressStatus">默认</text></text>
					<text class="phone">{{item.contactPhoneNumber}}</text>
				</view>
				<image src="../../../static/mall/my/xgdiz@2x.png" mode="aspectFill"
					@click="$goPage(['/pages/mallUser/address/editorAddress/editorAddress'],function fun() {return {'id':item.id}})">
				</image>
			</view>
		</view>
		<no-result message="暂无收货地址!" v-else></no-result>
		<text class="ann"
			@click="$goPage(['/pages/mallUser/address/editorAddress/editorAddress'],function fun() {return {'isAdd': true}})">新增地址</text>
	</view>
</template>

<script>
	import user from '../../../api/mallUser/user.js'
	export default {
		data() {
			return {
				sysUserReceivingAddress_date: [],
				isXz: false
			};
		},
		onShow() {
			this.sysUserReceivingAddress_list()
		},
		onLoad(optin) {
			if (optin.isXz) {
				this.isXz = optin.isXz
			}
		},
		methods: {
			/**
			 * 点击cell
			 */
			xuanz(sysUserReceivingAddress_date) {
				if (this.isXz) {
					var pages = getCurrentPages()
					var prevPage = pages[pages.length - 2];
					prevPage.$vm.sysUserReceivingAddress_date=sysUserReceivingAddress_date
					this.$goPage('back')
				} else {
					this.$goPage(['/pages/mallUser/address/editorAddress/editorAddress'], function fun() {
						return {
							'id': item.id
						}
					})
				}
			},
			/**
			 * h获取地址列表
			 */
			sysUserReceivingAddress_list() {
				user.sysUserReceivingAddress_list({}).then(res => {
					console.log(res)
					this.sysUserReceivingAddress_date = res.data && res.data.list ? res.data.list : []
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content_mall {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		position: relative;

		.address {
			width: 698rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0px 0px;
			margin-top: 20rpx;
			padding: 0rpx 30rpx;
			display: flex;
			justify-content: center;
			align-content: flex-start;
			flex-wrap: wrap;
			position: relative;

			.cell {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0rpx;
				border-bottom: 1rpx solid #DFDFDF;
				.text {
					display: flex;
					justify-content: flex-start;
					align-content: center;
					flex-wrap: wrap;
					height: 100%;
					width: 80%;
					.diz {
						width: 100%;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #555555;
					}
					.phone {
						width: 100%;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						margin-top: 20rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				image {
					width: 32rpx;
					height: 32rpx;
				}
				.mor{
					background: #7928C5;
					padding: 0rpx 10rpx;
					color: #FFFFFF;
					border-radius: 20rpx;
					font-size:16rpx;
					margin-left: 20rpx;
					font-weight: normal;
					display: inline-block;
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
	}
</style>
