<template>
	<view class="page-smarthome-addhouse">
		<view class="form">
			<ui-form-input label="房间名称" placeholder="请输入房间名称" :arrow="false">
				<view slot="ext" class="link-ext"></view>
			</ui-form-input>
			<view class="room-pic">
				<view class="title">
					房间图片
				</view>
			</view>
			<view class="uploadImg">
				<template v-if="imgList.length>0">
					<view class="img" v-for="(item,index) in imgList" :key="index">
						<image :src="`${imageView}${item}`" mode=""></image>
					</view>
				</template>
				<view class="box">
					<ui-image-upload target="java" :params="{ type: 3 }" @stateChange="stateChangeHandler"
						@success="uploadSuccessHandler">
						<view class="upload-img">
							<image src="../../userPages/static/faceUpload/faceUpload_img2.png" />
						</view>
					</ui-image-upload>
				</view>
			</view>
			
		</view>
		<view class="submit">
			<view class="btn">
				<ui-button>确认添加</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				imgList: [],
				roomName:'',
			}
		},
		computed: {
			...mapState(["imageView"]),
		},
		methods: {
			// stateChangeHandler() {},
			// 上传
			uploadSuccessHandler(url) {
				this.imgList=[]
				this.imgList = [...this.imgList, url.data];
			},
			// 删除
			deleteImg(index) {
				this.imgList.splice(index, 1);
			},
			// 预览图片
			imgtap(index) {
				console.log(this.imgList)
				uni.previewImage({
					current: index,
					urls: this.imgList,
				});
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "添加房间",
			});
		}
	}
</script>

<style lang="less" scoped>
	.page-smarthome-addhouse {
		min-height: 100vh;
		background-color: #F5F5F5;
		box-sizing: border-box;
	}

	.form {
		padding-bottom: 25rpx;
		background-color: #FFFFFF;

		.room-pic {
			line-height: 100rpx;
			color: #333333;
			font-size: 30rpx;
			padding-left: 38rpx;
		}
		
		// .link-ext {
		// 	max-width: 450rpx;
		// 	font-size: 30rpx;
		// 	color: #333;
		// 	overflow: hidden;
		// 	text-overflow: ellipsis;
		// 	white-space: nowrap;
		// 	text-align: right;
		
		// 	&.inactivated {
		// 		color: #999999;
		// 	}
		// }
	}

	.uploadImg {
		width: 93.6%;
		overflow: hidden;
		border-radius: 16rpx;
		margin: 0 auto;

		.img {
			width: 100%;
			height: 240rpx;
			margin-bottom: 20rpx;
			image{
				width: 100%;
			}
		}

		.box {
			width: 100%;
			height: 240rpx;
			background-color: #F5F5F5;
			display: flex;
			justify-content: center;
			align-items: center;

			.upload-img {
				width: 47rpx;
				height: 40rpx;
			}
		}
		
	}
		.submit {
			margin-top: 37rpx;
			height: 162rpx;
			z-index: 9;
			padding: 0 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		
			.btn {
				width: 100%;
			}
		}
</style>
