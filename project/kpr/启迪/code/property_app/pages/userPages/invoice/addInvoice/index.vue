<template>
	<view class="add_invoice_wrap">
		<view class="invoice_top">
			<view class="top_tabs" :class="{'active':index === 1}" @click="onElectronHandle">
				<view class="tabs_name">电子发票</view>
				<view class="tabs_info">发送到您的邮箱</view>
			</view>
			<view class="top_tabs" :class="{'active':index === 2}" @click="onPaperHandle">
				<view class="tabs_name">纸质发票</view>
				<view class="tabs_info">到物业客服处领取打印</view>
			</view>
		</view>
		<view class="invoice_info_text">电子发票与纸质发票具有同等法律效力，可支持报销入账</view>
		<view class="invoice_info_title">发票信息</view>
		<!-- 发票抬头 -->
		<picker @change="PickerChange" :value="index" :range="ValueList" >
			<view class="invoice_rise">
				<view class="rise_title">发票抬头</view>
				<view class="rise_wrap" v-if="headMsg.length">
					<view class="wrap_label_infos">
						<view class="label_name">{{headMsg[0].receiptHead}}</view>
						<view class="label_danwei">{{headMsg[0].type === 1?'企业':'个人'}}</view>
						<view class="label_icon"></view>
					</view>
					<view class="wrap_number">税号{{headMsg[0].taxNumber}}</view>
				</view>
				<view v-else>请选择发票抬头</view>
			</view>
		</picker>
		<!-- 发票内容 -->
		<view class="invoice_content">
			<ui-link label="发票内容" :border="false" @tap="toMyPointsPage">
				<view slot="ext" class="link_wy_txt">{{arr[0].feeType === '1'?'物业费':'停车费'}}</view>
			</ui-link>
		</view>
		<!-- 发票金额 -->
		<view class="invoice_price">
			<ui-link label="发票金额" :border="false" :arrow="false">
				<view slot="ext" class="link_price_ext">{{price}}</view>
			</ui-link>
		</view>
		<!-- 更多信息 -->
		<view class="invoice_more">
			<ui-form-input label="更多信息" placeholder="填写备注信息(选填)" v-model="form.info"></ui-form-input>
		</view>
		<view class="invoice_emil">
			<ui-form-input label="收票邮箱" placeholder="用于向您发送电子发票" v-model="form.email"></ui-form-input>
		</view>
		<view class="submit" @click="submit">提交</view>
	</view>
</template>
<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	export default {
		name: 'AddInvoice',
		data() {
			return {
				curIndex: '', // 判断是物业费还是停车费
				index: 1, // 判断是电子发票还是纸质发票
				form: {
					info: '',
					email: '',
				},
				list:[],//发票抬头列表-所有信息
				ValueList:[],//发票抬头列表-头部名字
				headMsg:[],
				price:0,
				arr:[],
				busiIds:'',//业务id
			}
		},
		computed:{
			...mapState(['user']),
		},
		methods: {
			onElectronHandle() {
				this.index = 1;
			},
			onPaperHandle() {
				this.index = 2;
			},
			getHeadList(){
				this.ValueList = []
				api.my.getListReceiptHead().then(res=>{
					if(res.status !== '0'){return};
					this.list = res.data
					this.list.forEach(item=>{
						this.ValueList.push(item.receiptHead)
					})
				})
			},
			PickerChange(e){
				this.headMsg = []
				this.headMsg.push(this.list[+e.target.value])
				console.log(this.headMsg)
			},
			
			//提交
			submit(){
				if(!this.headMsg.length){
					this.$toast('请选择发票抬头~');
					return
				}
				let canshu = {
					address:'',
					remark:'',
					busiIds:this.busiIds,
					content:'物业费',
					email:this.form.email,
					feeType:'1',
					money:this.price,
					receiptHeadId:this.headMsg[0].id,
					type:'2',
					userId:this.user.id,
				}
				api.my.addApply(canshu).then(res=>{
					if(res.status !== '0'){return};
					this.$toast('申请成功~');
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						})
					},500)
				})
			}
		},
		onLoad(option) {
			this.busiIds = ''
			this.price = option.price
			this.arr = JSON.parse(option.list)
			this.arr.forEach(res=>{
				this.busiIds += res.id+','
			})
			this.busiIds = this.busiIds.substring(0, this.busiIds.length - 1);
			console.log(this.busiIds)
			this.getHeadList()
			this.curIndex = option.curIndex;
			uni.setNavigationBarTitle({
				title: '填写发票信息',
			});
		},
	}
</script>
<style lang="less" scoped>
	view {
		box-sizing: border-box;
	}

	.add_invoice_wrap {
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	.invoice_top {
		width: 100%;
		background-color: #fff;
		height: 215rpx;
		padding-top: 56rpx;
		padding: 56rpx 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.top_tabs {
			width: 330rpx;
			height: 140rpx;
			background: #FFFFFF;
			border: 1rpx solid #999999;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #999999;

			.tabs_name {
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				margin-bottom: 10rpx;
			}

			.tabs_info {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}
		}
	}

	.add_invoice_wrap .invoice_top .active {
		border-color: #1B76FF;
		color: #1B76FF;
	}

	.invoice_info_text {
		width: 100%;
		height: 62rpx;
		padding: 0 33rpx;
		background-color: #fff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #AAB3AB;
	}

	.invoice_info_title {
		width: 100%;
		height: 82rpx;
		padding-left: 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #9E9E9E;
	}

	// 发票抬头
	.invoice_rise {
		width: 100%;
		height: 206rpx;
		background-color: #fff;
		padding: 30rpx 20rpx 30rpx 30rpx;
		border-bottom: 1rpx solid #E0E0E0;

		.rise_title {
			width: 100%;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #777779;
			margin-bottom: 20rpx;
		}

		.rise_wrap {
			.wrap_label_infos {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.label_name {
					flex: 1;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #020204;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}

				.label_danwei {
					width: 123rpx;
					height: 40rpx;
					background: #FFFFFF;
					border: 1rpx solid #FB9200;
					border-radius: 4rpx;
					display: flex;
					flex-shrink: 0;
					flex-grow: 0;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FB9200;
					margin-right: 44rpx;
				}

				.label_icon {
					width: 13rpx;
					height: 23rpx;
					flex-shrink: 0;
					flex-grow: 0;
					background: url(@/static/components/icon_link_arrow.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}

	.invoice_content,
	.invoice_price {
		width: 100%;
		border-bottom: 1rpx solid #E0E0E0;
	}

	.invoice_content .link_wy_txt {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #020204;
	}

	.invoice_price .link_price_ext {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FB9200;
	}

	.invoice_more {
		margin-bottom: 30rpx;
	}
	.submit{
		width: 90%;
		height: 88rpx;
		line-height: 88rpx;
		background: linear-gradient(0deg, #1B76FF, #3093FF);
		border-radius: 44rpx;
		text-align: center;
		color:#FEFEFE;
		font-size:32rpx;
		margin:100rpx auto 10rpx auto;
	}
</style>
