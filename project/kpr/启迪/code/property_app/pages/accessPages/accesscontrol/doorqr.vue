<template>
	<view class="page-visitor-doorqr">
		<view class="top">
			你好，刘东阳业主
		</view>
		
		<view class="content">
			<view class="home-info">
				<view class="home-name">
					幸福五社小区
				</view>
				<view class="change-home" @click="changeHome">
					切换房屋
				</view>
			</view>
			
			<view class="center">
				<view class="ayQrcode-box" >
					<ayQrcode ref="qrcode" :modal="modal_qr" :url="url" @hideQrcode="hideQrcode" @getValue="getName" :height="176" :width="176" />
				</view>
				<view class="tips">
					请将二维码靠近通闸或门禁扫码处
				</view>
				
				<view class="bluetooth" @click="toBluetooth">
					<image src="../static/btn_yjkm_01.png" mode=""></image>
					<view class="">
						蓝牙门禁
					</view>
				</view>
			</view>
			<view class="bottom">
				<image src="../../../static/access/bg_yjkm_03.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	export default {
		data() {
			return {
				modal_qr: false,
				url: '1254', // 要生成的二维码值
				imgUrl:'',
			}
		},
		components:{
			ayQrcode,
		},
		methods:{
			// 展示二维码
			showQrcode() {
			    let _this = this;
				this.modal_qr = true;
				setTimeout(function() {
					_this.$refs.qrcode.crtQrCode();
				}, 100)
			},
			
			getName(val){
				this.imgUrl = val;
			 },	
			
			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
			
			changeHome(){
				uni.navigateTo({
					url:"/pages/indexPages/choosehome/index"
				})
			},
			toBluetooth(){
				uni.navigateBack({
					delta:1
				})
			},
		},
		mounted() {
			this.showQrcode();//加载生成二维码
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title:'一键开门'
			})
		},
	}
</script>

<style lang="less" scoped>
	.page-visitor-doorqr{
		min-height: 100vh;
		background-color: #F5F5F5;
		overflow: hidden;
	}
	.top{
		padding: 37rpx;
		color: #4B4D49;
		font-size: 30rpx;
	}
	
	.content{
		width: 92%;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		
		.home-info{
			padding: 30rpx;
			border-bottom: 1rpx #E5E5E5 solid;
			display: flex;
			justify-content: space-between;
			
			.home-name{
				color: #303333;
				font-size: 32rpx;
			}
			
			.change-home{
				width: 162rpx;
				height: 44rpx;
				line-height: 44rpx;
				color: #EF5050;
				text-align: center;
				border: 1rpx #EF5050 solid;
				border-radius: 8rpx;
			}
		}
		
		.center{
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.tips{
				color: #352620;
				font-size: 32rpx;
				margin-top: 28rpx;
			}
			
			.bluetooth{
				width: 268rpx;
				height: 78rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border: 2rpx #F05050 solid;
				color: #F05050;
				font-size: 36rpx;
				padding: 35rpx;
				margin-top: 56rpx;
				border-radius: 40rpx;
				
				image{
					width: 36rpx;
					height: 36rpx;
				}
			}
			
			.course{
				color: #282828;
				font-size: 36rpx;
				margin-top: 56rpx;
			}
		}
	
		.bottom{
			margin-top: 34rpx;
			image{
				width: 100%;
				height: 108rpx;
			}
		}
	}
	
	.ayQrcode-box{
		margin-top: 50rpx;
		image{
			width: 352rpx;
			height: 352rpx;
		}
	}
</style>
