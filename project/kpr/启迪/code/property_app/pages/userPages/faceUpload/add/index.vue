<template>
	<view class="upload_box">
		<view class="box">
			<view class="upload" @click="onCameraHandle">
				<view class="text" v-if="!img">
					<image src="../../static/faceUpload/faceUpload_img2.png" mode="" />
					请上传一张正面照
				</view>
				<image v-else :src="`${imageView}${img}`"></image> 
			</view>
			<view class="input_box">
				<view>姓&nbsp;&nbsp;&nbsp;&nbsp;名</view>
				<input type="text" placeholder="请输入姓名" v-model="name">
			</view>
			<view class="input_box">
				<view>手机号</view>
				<input type="text" placeholder="请输入手机号" v-model="phone">
			</view>
			<view class="button" @click="sbumit">提交</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	import config from '../../../../config';
	import reg from '@/utils/reg.js'
	export default {
		components: {},
		data() {
			return {
				img:'',
				headIcon: '',
				name:'',
				phone:'',
				pId:'',
				roomId:''
			}
		},
		computed: {
			...mapState(['user','imageView'])
		},
		methods: {
			onCameraHandle() {
				console.log()
				uni.showActionSheet({
					itemList: ['相册', '拍照'],
					itemColor: '#1B76FF',
					success: (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (res.tapIndex === 0) {
							this.getUpload()
						} else if (res.tapIndex === 1) {
							this.getUpload()
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},
			
			//上传图片
			getUpload(){
				const _this = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res)
						_this.headIcon = res.tempFilePaths[0];
						uni.uploadFile({
							url: `${config.apiRoot}/resourceApi/fileUpload/upload`,
							filePath: _this.headIcon,
							name: 'file',
							formData: {
								'type': '6'
							},
							success: (res) => {
								console.log(res);
								if(+res.statusCode === 200){
									let data = JSON.parse(res.data)
									_this.img = data.data
								}
							}
						});
					}
				});
			},
			
			//提交
			sbumit(){
				const _this = this;
				if(_this.name === ''){
					_this.$toast("姓名不能为空~");
					return
				}else if(_this.phone === ''){
					_this.$toast("手机号不能为空~");
					return;
				}else if(!reg.phone.test(_this.phone)){
					_this.$toast("请输入正确的手机号~");
					return;
				}
				let canshu = {
					propertyId:_this.user.propertyId,
					faceImg:_this.img,
					phone:_this.phone,
					proprietorId:_this.pId,
					roomId:_this.roomId,
					userName:_this.name
				}
				api.my.getFaceAdd(canshu).then(res=>{
					if(res.status !== '0'){return};
					_this.$toast("添加成功~");
					setTimeout(()=>{
						uni.navigateBack()
					},500)
				})
			}
		},
		onLoad(option) {
			this.pId = option.pId
			this.roomId = option.roomId
			uni.setNavigationBarTitle({
				title: '添加人脸',
			});
		},
	}
</script>
<style lang="less" scoped>
	.upload_box {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;
		overflow: hidden;

		.box {
			background: #FFFFFF;
			margin-top: 24rpx;
			padding: 29rpx 0 198rpx 0;

			.upload {
				width: 90%;
				height: 460rpx;
				background: #F5F5F5;
				border-radius: 8rpx;
				margin: 0 auto 17rpx auto;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: #999999;
				font-size: 30rpx;

				.text {
					image {
						display: block;
						width: 87rpx;
						height: 72rpx;
						margin: 0 auto 30rpx auto;
					}
				}
			}

			.input_box {
				width: 90%;
				height: 100rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #E6E6E6;
				margin: 0 auto;

				view {
					color: #333333;
					font-size: 36rpx;
					margin-left: 35rpx;
					width: 190rpx;
				}

				input {
					color: #999999;
					font-size: 36rpx;
				}
			}

			.button {
				width: 90%;
				height: 88rpx;
				line-height: 88rpx;
				background: linear-gradient(0deg, #1B76FF, #3093FF);
				border-radius: 44rpx;
				text-align: center;
				color: #FEFEFE;
				font-size: 32rpx;
				margin: 28rpx auto 0 auto;
			}
		}
	}
</style>
