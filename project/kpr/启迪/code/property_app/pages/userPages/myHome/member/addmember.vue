<template>
	<view class="page-addmember">
		<!-- top -->
		<view class="yz_box">
			<image class="img" src="../../static/myHome/myHome_icon1.png" mode="" />
			<view class="msg">
				<view class="num">
					{{homeList.communityName}}{{homeList.buildingNumber}}栋{{homeList.floorNumber}}-{{homeList.roomNumber}}
				</view>
				<view class="yz_msg">
					<image src="../../static/myHome/myHome_icon2.png" mode="" />
					<view class="name">
						{{homeList.type === '1'?'业主':homeList.type === '2'?'租户':'亲属'}}：{{homeList.proprietorName}}
						{{homeList.proprietorPhone}}
					</view>
				</view>
			</view>
		</view>

		<!-- form -->
		<view class="form-data">
			<ui-link label="成员属性" :arrow="false">
				<view slot="ext" class="qinshu" @tap="changeQS">
					<view class="title">
						亲属
					</view>
					<ui-checkbox v-model="chooseQS"></ui-checkbox>
				</view>
				<view slot="ext" class="zuke" @tap="changeZK">
					<view class="title">
						租客
					</view>
					<ui-checkbox v-model="chooseZK"></ui-checkbox>
				</view>
			</ui-link>
			<view v-if="chooseQS">
				<ui-form-input label="姓名" placeholder="请输入姓名" type="text" maxlength="15" v-model="memberName"
					size="default">
					<view slot="ext" class="link-ext"></view>
				</ui-form-input>
				<ui-form-input label="手机号" placeholder="请输入手机号" type="number" maxlength="15" v-model="memberPhone"
					size="default">
					<view slot="ext" class="link-ext"></view>
				</ui-form-input>
			</view>
			<view v-if="chooseZK">
				<ui-form-input label="姓名" placeholder="请输入姓名" type="text" maxlength="15" v-model="memberName"
					size="default">
					<view slot="ext" class="link-ext"></view>
				</ui-form-input>
				<ui-form-input label="手机号" placeholder="请输入手机号" type="number" maxlength="11" v-model="memberPhone"
					size="default">
					<view slot="ext" class="link-ext"></view>
				</ui-form-input>
				<ui-form-input label="身份证号" placeholder="请输入身份证号" type="text" maxlength="18" v-model="memberCard"
					size="default">
					<view slot="ext" class="link-ext"></view>
				</ui-form-input>
				<ui-link label="租约到期时间" :arrow="false">
					<picker solt="ext" mode="date" :value="date" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</ui-link>
			</view>
		</view>

		<!-- btn -->
		<view class="btn">
			<ui-button>确认添加</ui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memberInfo:{},
				type:'',//type为1：编辑 ，2：添加
				homeList: {}, //房屋列表
				memberName: '', //成员姓名
				memberPhone: '', //成员电话
				memberCard: '', //身份证
				date: '',
				chooseQS: true,
				chooseZK: false,
			}
		},
		methods: {
			changeQS() {
				console.log(this.chooseQS)
				if (this.chooseQS) {
					this.chooseZK = false
				}
			},

			changeZK() {
				if (this.chooseZK) {
					this.chooseQS = false
				}
			},
			
			bindDateChange(){},
		},
		onLoad(opt) {
			this.homeList = JSON.parse(opt.homeList);
			this.type=JSON.parse(opt.type)
			if(this.type=='1'){
				this.memberInfo=JSON.parse(opt.memberInfo);
				if(this.memberInfo.type=='2'){
					this.chooseZK=true;
					this.chooseQS=false;
				}else if(this.memberInfo.type=='3'){
					this.chooseZK=false;
					this.chooseQS=true
				}
			}
		},
		beforeMount() {
			if(this.type=='1'){
				uni.setNavigationBarTitle({
					title: '编辑成员'
				})
			}else{
				uni.setNavigationBarTitle({
					title: '添加成员'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-addmember {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;
		overflow: hidden;
		position: relative;
	}

	.yz_box {
		width: 92%;
		padding: 25rpx 32rpx 29rpx 17rpx;
		background: #fff;
		display: flex;
		border: 1px solid #E6E6E6;
		border-radius: 8rpx;
		margin: 29rpx auto 32rpx auto;
		align-items: center;

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
			}
		}
	}

	.form-data {
		padding: 0 30rpx;

		.qinshu,
		.zuke {
			display: flex;
			align-items: center;
			margin-right: 30rpx;
			color: #333333;
			font-size: 32rpx;

			.title {
				margin-right: 10rpx;
			}
		}
	}

	.btn {
		padding: 30rpx;
		margin-top: 70rpx;
	}

	.link-ext {
		max-width: 450rpx;
		font-size: 30rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;

	}
</style>
