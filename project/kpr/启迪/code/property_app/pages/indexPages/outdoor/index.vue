<template>
	<view class="page-outdoor-index">
		<view class="content-top">
			<ui-link label="房屋" size="large" @tap="toChooseHouse">
				<view slot="ext" class="link-ext">
					{{myHome.HouseMsg.name?myHome.HouseMsg.name:'请选择房屋'}}
				</view>
			</ui-link>

			<picker mode="date" :start="startDate" :value="chooseTime" @change="bindDateChange">
				<ui-link label="出门时间" size="large">
					<view slot="ext" :class="['link-ext', {'inactivated': !formData.outTime}]">
						{{chooseTime || '请选择时间'}}
					</view>
				</ui-link>
			</picker>

			<ui-form-input label="出门物件" placeholder="请输入出门物件" v-model="formData.article" size="large">
			</ui-form-input>

			<view class="articleImage">
				<view class="name">
					物件图片
				</view>
				<template v-if="formData.img">
					<view class="image-box">
						<ui-image-upload target="java" :params="{ type: 18 }" @success="uploadSuccessHandler">
							<image class="wujian-image" :src="`${imageView}${formData.img}`" />
						</ui-image-upload>
					</view>
				</template>
				<view class="image-box" v-else>
					<ui-image-upload target="java" :params="{ type: 18 }" @success="uploadSuccessHandler">
						<image class="image" src="../static/icon_pic.png" />
					</ui-image-upload>
				</view>
			</view>
		</view>
		<view class="content-center">
			<view class="goOut">
				<view class="title">
					出门原因
				</view>
				<view class="goOut-content">
					<textarea v-model="formData.content" maxlength="-1" height="200px" class="text" placeholder-class="textarea"
					 placeholder="请输入出门原因" />
				</view>
			</view>
		</view>
		
		<view class="submitAdd">
			<button class="button" @click="addCode">生成出门条</button>
		</view>
		<view class="popup-box">
			<u-popup v-model="show" mode="center" border-radius="16" width="570" height="668">
				<view class="popup-content">
					<view class="text active">业主，您好！</view>
					<view class="text">以下为物件出门条</view>
					<view class="ayQrcode-box">
						<ayQrcode ref="qrcode" :modal="modal_qr" :url="url" @hideQrcode="hideQrcode" :height="176" :width="176" />
					</view>	
				</view>
			</u-popup>
		</view>
		
	</view>
</template>

<script>
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	import {
		mapState
	} from "vuex";
	import api from '@/api';
	import {
		showToast
	} from '@/utils/utils.js'
	export default{
		data(){
			return{
				startDate:'',
				chooseTime:undefined,
				formData:{
					img:'',
					outTime:undefined,
					article:'',
					content:'',
				},
				show:false,
				//二维码相关参数
				modal_qr: false,
				url: '', // 要生成的二维码值
			}
		},
		components:{
			ayQrcode,
		},
		computed: {
			...mapState(['user', 'community', "imageView", "myHome"]),
		},
		methods:{
			// 上传
			uploadSuccessHandler(url) {
				console.log(url)
				this.formData.img=url.data
			},
			// 选择房屋
			toChooseHouse(){
				uni.navigateTo({
					url:'../suggest/myHome/index'
				})
			},
			//选择时间
			bindDateChange(e){
				// 将时间格式转化为时间戳
				this.chooseTime=e.target.value
				let strtime=e.target.value;
				let date=new Date(strtime)
				this.formData.outTime = date.getTime();
			},
			// 获取当前时间
			getNewTime(){
				var time=new Date()
				var y = time.getFullYear();
				var m = time.getMonth()+1;
				var d=time.getDate()
				if(m<10){
					m='0'+m
				}else if(m==12){
					m='01'
				}else{
					m=m+1
				}
				this.startDate= y+'-'+m+'-'+d
			},
			async addCode(){
				const params={
					article:this.formData.article,
					content:this.formData.content,
					img:this.formData.img,
					outTime:this.formData.outTime,
					roomId:this.myHome.HouseMsg.id,
					proprietorId:this.myHome.HouseMsg.proprietorId
				}
				if(!this.myHome.HouseMsg.id){
					showToast('请选择房屋');
					return
				};
				if(!this.formData.outTime){
					showToast('请选择出门时间');
					return
				};
				if(!this.formData.article){
					showToast('请输入出门物件');
					return
				};
				if(!this.formData.img){
					showToast('请选择物件图片');
					return
				};
				if(!this.formData.content){
					showToast('请输入出门原因');
					return
				};
				const res=await api.lifejf.addGoOutQrCode(params)
				if(res.status!='0'){return}
				this.url=res.data
				this.show=true;
				this.showQrcode();//一加载生成二维码
			},
			
			// 展示二维码
			showQrcode() {
			    let _this = this;
			    this.modal_qr = true;
				setTimeout(()=> {
			    _this.$refs.qrcode.crtQrCode()
				
				}, 1000)
			                
			},
			
			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '出门条',
			});
			this.getNewTime()
		},
		onLoad() {
			
		}
	}
</script>

<style lang="less" scoped>
	.page-outdoor-index{
		width: 100vw;
		height: 100vh;
		padding-top: 1rpx;
		background-color: #F5F5F5;
		.content-top{
			margin-top: 19rpx;
			background-color: #FFFFFF;
			
			.articleImage{
				height: 199rpx;
				padding: 0 34rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name{
					font-size: 30rpx;
					color: #352620;
				}
				.image-box{
					width: 160rpx;
					height: 160rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #F5F5F5;
					border-radius: 10rpx;
					.wujian-image{
						width: 160rpx;
						height: 160rpx;
					}
					.image{
						text-align: center;
						width: 62rpx;
						height: 54rpx;
					}
				}
			}
		}
		
		.content-center{
			height: 280rpx;
			background-color: #FFFFFF;
			margin-top: 34rpx;
			.goOut{
				padding: 29rpx 31rpx 42rpx 26rpx;
				.title{
					
				}
				.goOut-content{
					height: 155rpx;
					background-color: #F5F5F5;
					margin-top: 25rpx;
					border-radius: 8rpx;
					/deep/textarea{
						color: #B3A9A8;
						font-size: 30rpx;

					}
					
					.text{
						width: 96%;
						padding: 12rpx;
						color: #352620;
						font-size: 30rpx;
					}
					uni-textarea{
						height: 140rpx;
					}
				}
			}
		}
		.submitAdd{
			width: 100%;
			position: absolute;
			bottom: 100rpx;
			z-index: 9;
			
			.button{
				width: 90%;
				height: 88rpx;
				border-radius: 44rpx;
				font-size: 30rpx;
				color: #FFFFFF;
				line-height: 88rpx;
				background: linear-gradient(to right, #1B76FF, #3093FF);
			}
		}
		
		.popup-box{
			.popup-content{
				overflow: hidden;
				text-align: center;
				.active{
					margin-top: 78rpx;
				}
				.text{
					font-size: 34rpx;
					color: #333635;
					font-weight: bold;
					text-align: center;
					margin-bottom: 12rpx;
				}
				.ayQrcode-box{
					margin-top: 50rpx;
				}
			}
		}
	}
		.link-ext {
			font-size: 30rpx;
			color: #333;
		
			&.inactivated {
				color: #B3B3B3;
			}
		}
</style>
