<template>
	<view class="pages_health">
		<view class="top">
			<view class="tips">
				个人健康数据
			</view>
			<view class="user">
				<view class="name">
					{{user.userName}}
				</view>
				<image class="avatar" src="../static/icon_zhjk_touxiang.png" mode=""></image>
			</view>
		</view>
		<view class="content">

			<view class="ui_link" @tap="addHandel('height')">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_01.png" mode=""></image>
					<view class="label">身高</view>
				</view>
				<view class="right">
					<view class="indicators" v-if="healthData.height">{{healthData.height}}</view>
					<view class="placeholder" v-else>无数据</view>
					<view class="link-ext">CM</view>
					<view class="arrow"></view>
				</view>
			</view>
			<view class="ui_link" @tap="addHandel('weight')">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_02.png" mode=""></image>
					<view class="label">体重</view>
				</view>
				<view class="right">
					<view class="indicators" v-if="healthData.weight">{{healthData.weight}}</view>
					<view class="placeholder" v-else>无数据</view>
					<view class="link-ext">公斤</view>
					<view class="arrow"></view>
				</view>
			</view>

			<view class="ui_link" @tap="addHandel('waist')">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_05.png" mode=""></image>
					<view class="label">腰围</view>
				</view>
				<view class="right">
					<view class="indicators" v-if="healthData.waist">{{healthData.waist}}</view>
					<view class="placeholder" v-else>无数据</view>
					<view class="link-ext">CM</view>
					<view class="arrow"></view>
				</view>
			</view>

			<view class="ui_link">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_03.png" mode=""></image>
					<view class="label">身高体重指数（BMI）</view>
				</view>
				<view class="right">
					<view class="indicators" v-if="healthData.heightBody">{{healthData.heightBody}}</view>
					<view class="placeholder" v-else>无数据</view>
				</view>
			</view>

			<view class="ui_link">
				<view class="ui_icon">
					<image class="image" style="width: 64rpx; height: 64rpx;" src="../static/icon_zhjk_04.png" mode=""></image>
					<view class="label">体脂率</view>
				</view>
				<view class="right">
					<view class="indicators" v-if="healthData.bodyFat">{{healthData.bodyFat}}</view>
					<view class="placeholder" v-else>无数据</view>
				</view>
			</view>

		</view>
		<ui-modal class="ui_modal" v-model="visible" :showClose="false">
			<view class="modal_top">
				<view class="cancel" @click="visible = false">取消</view>
				<view class="titles">{{title}}</view>
				<view class="confirm" @click="confirm">确定</view>
			</view>
			<view class="input">
				<input type="digit" placeholder="请输入" v-model="content" />
			</view>
		</ui-modal>
	
		<view class="btn">
			<ui-button type="transparent">+添加手环设备</ui-button>
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
				pageType: 'value',
				healthData: {
					height: '',
					weight: '',
					waist: '',
					heightBody: '',
					bodyFat: '',
				},
				title: '',
				content: '',
				type: '',
				visible: false,
			}
		},
		computed: {
			...mapState(['user', 'community']),
		},
		methods: {
			// 点击添加
			addHandel(params) {
				this.visible = true;
				this.type = params;
				if (this.type == 'height') {
					this.title = "身高"
				} else if (this.type == 'weight') {
					this.title = "体重"
				} else {
					this.title = "腰围"
				}
			},
			confirm() {
				if (this.type == 'height') {
					this.healthData.height = this.content
				} else if (this.type == 'weight') {
					this.healthData.weight = this.content
				} else {
					this.healthData.waist = this.content
				}
				this.add();
				this.visible = false;
				this.content=''
			},
			// 发送添加请求
			async add() {
				const params = {
					comId: this.community.id,
					height: this.healthData.height,
					weight: this.healthData.weight,
					waist: this.healthData.waist,
					propertyId: this.user.propertyId,
					userId: this.user.id
				}
				const res = await api.lifejf.addHealth(params)
				console.log(res)
				console.log(params)
				this.getInfoByUserId()
				this.content = ''
			},
			// 获取资源（回显）、
			async getInfoByUserId() {
				const res = await api.lifejf.getInfoByUserId({
					propertyId: this.user.propertyId,
					userId: this.user.id
				});
				console.log([res.data])
				if (res.status !== '0') {
					return
				}
				[res.data].forEach(item => {
					this.healthData.height = item.height;
					this.healthData.weight = item.weight;
					this.healthData.waist = item.waist;
					this.healthData.heightBody = item.heightBody;
					this.healthData.bodyFat = item.bodyFat
				})
			},

		},
		mounted() {
			// this.getInfoByUserId()
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:"history"
			})
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '智慧健康',
			});
		}
	}
</script>

<style lang="less" scoped>
	.pages_health {
		padding: 0 24rpx;
		height: 100vh;
		background-color: #F5F5F5;

		.top {
			padding: 29rpx 0;
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.user{
				display: flex;
				align-items: center;
			}
			
			.avatar{
				width: 46rpx;
				height: 46rpx;
				margin-left: 18rpx;
			}
		}

		.content {

			.ui_link {
				width: 100%;
				height: 150rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 20rpx;

				.ui_icon {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.image {
						margin-left: 24rpx;
					}

					.label {
						font-size: 30rpx;
						color: #333333;
						margin-left: 11rpx;
					}
				}

				.right {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.indicators {
						font-size: 30rpx;
						color: #333333;
						margin-right: 25rpx;
					}

					.placeholder {
						font-size: 30rpx;
						color: #9E9E9E;
						margin-right: 25rpx;
					}

					.link-ext {
						font-size: 30rpx;
						color: #333333;
					}

					.arrow {
						width: 13rpx;
						height: 23rpx;
						margin: 0 28rpx;
						flex-shrink: 0;
						flex-grow: 0;
						background: url(@/static/components/icon_link_arrow.png) no-repeat;
						background-size: 100% 100%;
					}
				}

			}
		}

		.ui_modal {
			.modal_top {
				display: flex;
				justify-content: space-between;

				.cancel {
					color: #9E9E9E;
					font-size: 30rpx;
				}

				.titles {
					color: #020204;
					font-size: 30rpx;
				}

				.confirm {
					color: #1B76FF;
					font-size: 30rpx;
				}
			}

			.input {
				width: 375rpx;
				height: 70rpx;
				text-align: center;
				margin: 60rpx auto;
				border-bottom: 4rpx #FEAA21 solid;
			}
		}
	}
	
	.btn{
		width: 348rpx;
		margin: 73rpx auto;
	}
</style>
