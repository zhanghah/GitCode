<template>
	<view class="upload_box">
		<view class="uploadImg">
			<ui-image-upload class="box" target="java" :params="{ type: 6 }" @stateChange="stateChangeHandler" @success="uploadSuccessHandler">
				<view class="upload_pic" v-if="!imgList">
					<image src="../static/icon_pic.png" />
					<view class="text">
						请上传一张正面照
					</view>
				</view>
				<view class="isPic" v-else>
					<image :src="`${imageView}${imgList}`" mode="" />
				</view>
			</ui-image-upload>
		</view>

		<view class="info">
			<view class="form">
				<text class="left">
					姓 &nbsp;名
				</text>
				<view class="right">
					<input type="text" v-model="name" placeholder="请输入姓名" />
				</view>
			</view>
			<view class="form">
				<text class="left">
					手机号
				</text>
				<view class="right">
					<input type="text" v-model="phone" placeholder="请输入手机号" />
				</view>
			</view>
		</view>
		<view class="submit">
			<ui-button @click.native="clickSubmit">提交</ui-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/api';
	import {
		showToast
	} from '@/utils/utils.js';
	export default {
		data() {
			return {
				imgList: '',
				name: '',
				phone: '',
				roomId: ''
			}
		},
		computed: {
			...mapState(["user", "community", "imageView"]),
		},
		methods: {
			stateChangeHandler(e) {
				console.log(e)
			},
			// 上传
			uploadSuccessHandler(url) {
				this.imgList = [...this.imgList, url.data];
				console.log(this.imgList)
			},
			// 校验手机
			checkMobile(mobile) {
				return RegExp(/^1[34578]\d{9}$/).test(mobile);
			},
			//提交
			async clickSubmit() {
				if (!this.imgList) {
					showToast('至少上传一张图片~');
					return
				};
				if (!this.name) {
					showToast('请输入姓名~');
					return
				}
				if (!this.checkMobile(this.phone)) {
					showToast('请输入正确的手机号~');
					return
				}

				const res = await api.community.trajectoryAdd({
					comId: this.community.id,
					faceImg: this.imgList[0],
					ids: [],
					name: this.name,
					phone: this.phone,
					propertyId: this.$config.propertyId,
					roomId: this.roomId
				});
				if (res.status != '0') {
					return
				}
				uni.navigateBack({
					delta: 1
				})
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "添加重点人员",
			});

		},
		onLoad(opt) {
			this.roomId = opt.roomId;
			console.log(opt.roomId)
		}
	}
</script>

<style lang="less" scoped>
	.upload_box {
		width: 100%;

		.uploadImg {
			width: 689rpx;
			height: 460rpx;
			background-color: #F5F5F5;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;

			.box {
				width: 100%;
				height: 100%;
			}

			.box {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				.upload_pic {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.text {
					margin-top: 33rpx;
					color: #666666;
					font-size: 28rpx;
				}

				image {
					width: 87rpx;
					height: 72rpx;
					border-radius: 8rpx;
				}

				.isPic {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;

					image {
						width: 90%;
						height: 100%;
					}
				}
			}
		}

		.info {
			margin-top: 17rpx;
			margin-bottom: 96rpx;

			.link-ext {
				min-width: 450rpx;
				font-size: 28rpx;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: right;
				display: flex;
				justify-content: flex-start;
			}

			.form {
				width: 690rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				margin: auto;
				border-bottom: 1rpx solid #E6E6E6;

				.left {
					width: 35%;
					text-align: center;
					color: #333333;
					font-size: 36rpx;
					font-weight: bold;
				}

				.right {
					width: 70%;
					color: #999999;
					font-weight: 500;
					font-size: 36rpx;
				}
			}
		}

		.submit {
			width: 690rpx;
			color: #FEFEFE;
			margin: 0 auto;
		}
	}
</style>
