<template>
	<view class="page-visitor-index">
		<view class="content-top">
			<ui-link label="到访房屋" size="large" @click.native="toChooseHouse">
				<view slot="ext" class="link-ext">
					{{roomName?roomName:'请选择房屋'}}
				</view>
			</ui-link>

			<picker mode="date" :start="startDate" :value="chooseTime" @change="bindDateChange">
				<ui-link label="到访时间" size="large">
					<view slot="ext" :class="['link-ext', {'inactivated': !visitTime}]">
						{{chooseTime || '请选择到访时间'}}
					</view>
				</ui-link>
			</picker>
		</view>
		<view class="content-center">
			<view class="title">
				到访目的
			</view>
			<view class="content">
				<textarea v-model="content" maxlength="-1" height="200px" class="text" placeholder-class="textarea" placeholder="请输入到访目的" />
				</view>
		</view>
		
		<view class="submitVisit">
			<button class="button" @click="addPassCode">生成通行证</button>
		</view>
		
		<view class="popup-box">
			<u-popup v-model="show" mode="center" border-radius="16" width="570" height="720">
				<view class="popup-content">
					<view class="active text">业主，您好！</view>
					<view class="text">以下为访客通行码</view>
					<view class="ayQrcode-box" >
						<ayQrcode ref="qrcode" :modal="modal_qr" :url="url" @hideQrcode="hideQrcode" @getValue="getName" :height="176" :width="176" />
					</view>	
					<!-- <view class="ayQrcode-box" >
						<image :src="imgUrl" mode="" :show-menu-by-longpress="true"></image>
					</view>	 -->
					<view class="tip">
						<ui-button @click.native="toShare">长按保存二维码</ui-button>
					</view>
				</view>
			</u-popup>
			<image v-if="imgShow" @tap="closeHandel" class="close" src="../static/close-style2.png" mode=""></image>
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
	import config from '@/config';
	export default {
		data() {
			return {
				startDate: undefined,
				chooseTime: undefined,
				visitTime: undefined,
				content:'',
				show:false,
				modal_qr: false,
				url: '826770', // 要生成的二维码值
				imgUrl:'',//生成的base64图片
				imgShow:false,
				urlRes: `${config.apiRoot}/em-public-api/public/woEvent/saveWoEventImage`,
				imgList:'',//图片链接
				userList:[],
				roomName:''
			}
		},
		components:{
			ayQrcode,
		},
		computed: {
			...mapState(["user", "myHome"]),
		},
		watch:{
			show(){
				if(!this.show){
					this.imgShow=false
				}
			}
		},
		methods: {
			// 选择房屋
			toChooseHouse() {
				uni.navigateTo({
					url: '../choosehome/index'
				})
			},
			//选择时间
			bindDateChange(e) {
				// 将时间格式转化为时间戳
				this.chooseTime = e.target.value
				let strtime = e.target.value;
				let date = new Date(strtime)
				this.visitTime = date.getTime();
			},
			// 获取当前时间
			getNewTime() {
				var time = new Date()
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate()
				if (m < 10) {
					m = '0' + m
				} else if (m == 12) {
					m = '01'
				} else {
					m = m + 1
				}
				this.startDate = y + '-' + m + '-' + d
			},
			// 生成通行证
			async addPassCode(){
				// const params={
				// 	content:this.content,
				// 	inTime:this.visitTime,
				// 	roomId:this.myHome.HouseMsg.id,
				// 	userId:this.user.id
				// };
				// if(!this.myHome.HouseMsg.id){
				// 	showToast('请选择房屋');
				// 	return
				// };
				// if(!this.visitTime){
				// 	showToast('请选择到访时间');
				// 	return
				// };
				// if(!this.content){
				// 	showToast('请输入到访目的');
				// 	return
				// };
				// const res=await api.lifejf.addGoInQrCode(params)
				// if(res.status!='0'){return}
				// console.log(params)
				// console.log(res)
				// this.url=res.data
				this.imgShow=true;
				this.show=true;
				this.showQrcode();//加载生成二维码
			},
			
			// 展示二维码
			showQrcode() {
			    let _this = this;
				this.modal_qr = true;
				setTimeout(function() {
					_this.$refs.qrcode.crtQrCode();
				}, 100)
			},
			toShare(){
				// uni.share({
				//     provider: "weixin",
				//     scene: "WXSceneSession",
				//     type: 2,
				//     imageUrl: this.imgList,
				//     success: function (res) {
				//         console.log("success:" + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         console.log("fail:" + JSON.stringify(err));
				//     }
				// });
				// console.log(this.imgList)
			},
			
			// 修改房屋
			changeHome() {
				uni.$on('changeHome', data => {
					this.userList = data;
					this.roomName = data.communityName + data.buildingNumber + '栋' + data.unitNumber +
						'-' + data.floorNumber + '-' + data.roomNumber
				})
			},
			
			getName(val){
				this.imgUrl = val;
				console.log(val)
				uni.uploadFile({
					url: `${this.urlRes}?sysUserId=${this.user.userId}`, //url:`${config.apiRoot}/public/woEvent/saveWoEventImage`
					filePath: this.imgUrl,
					name: 'file',
					// formData: {sysUserId:this.user.userId},
					header: {
						'EM-Access-identity': 'TzPKhtYtj+osi/g/1U9G6FdRfmDyvVkJ4KpsWApSOfuyNsq409xbDhShCGFooTNg04ChBYpLXMp4fI+hZlhGCNftxxjxfbRI3DZcjT+ErmHyUHH8O3PBJ6qO0mOqUthRJMgdh3DfDgg7NUDELWvztPKKdtuuoBmhqcNEqGkie9xdQotdV1ewdE9RbpWjcTy0p1q+FzYc4blpG/1s38OzQvjgDL1CInhsYlP58kiKU2KkFpQB3yEem8w8KQLZUvtOoKc8agycUHo+XlbqlFBA8haAGsFg5dzv7+ILceVTxDWzh+xTpwHNv9Ssa88ALVQ+zRUXeJhFUpXnuWG8eSnjphQW5tBM0xL9zu8mGyZsLz+I7WNyUYVcVA7V0OexyIT+ydgKHsM4v1w/JQ4m2NPTmW4Xl/HPehDpUTqX9QEP6c/3xZ2Hrw4G9tJJcntJeH7EKE8cnWRf8NTbYuCJmDg5T9Mnjai/c3DYQeZiwN2QZIx6RNshQXON5pq/pmIORh9yb1YjJIdu5jJ+NrrR82U3QQTFjrqIeyw9Xdwzk3rmfroqpryV/P7WP7K0YOfJM0ZLPE4198Uj+SLx3YqUYCNpBAyojrfD55d/00UU2g10AWur6Ehx+dLhJVIid9UyuGF47nIfN/mjROgx8g03JyMVOPHvfAIVIMvhfX6JS7boQ10=',
					},
					success: (uploadFileRes) => {
						const res = JSON.parse(uploadFileRes.data);
						console.log(res)
						this.imgList =res.data[0].fileVisitUrl;
					},
					fail: () => {
						// 上传失败
						uni.showToast({
							icon: 'none',
							title: '上传失败!'
						})
					}
				});
			 },	
			
			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
			// 关闭二维码
			closeHandel(){
				this.show=false
			},
		},


		beforeMount() {
			uni.setNavigationBarTitle({
				title: '访客通行',
			});
			this.getNewTime()
			this.changeHome()
		},
	}
</script>

<style lang="less" scoped>
	.page-visitor-index {
		width: 100vw;
		height: 100vh;
		padding-top: 1rpx;
		background-color: #F5F5F5;

		.content-top {
			margin-top: 19rpx;
			background-color: #FFFFFF;
		}
		
		.content-center{
			height: 280rpx;
			background-color: #FFFFFF;
			margin-top: 34rpx;
			padding: 29rpx 31rpx 42rpx 26rpx;
			
			.content{
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
		
		.submitVisit{
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
				background-color: #802890;
			}
		}
		
		.popup-box{
			
			.close{
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				top: calc(84% - 30rpx);
				left: calc(50% - 30rpx);
				z-index: 99999;
			}
			.popup-content{
				text-align: center;
				position: relative;
				overflow: hidden;
				.active{
					margin-top: 60rpx;
				}
				.text{
					font-size: 34rpx;
					color: #333635;
					font-weight: bold;
					text-align: center;
					margin-bottom: 12rpx;
				}
				.ayQrcode-box{
					display: flex;
					justify-content: center;
					margin-top: 50rpx;
					margin-bottom: 20rpx;
					image{
						width: 352rpx;
						height: 352rpx;
					}
				}
				
				.tip{
					width: 400rpx;
					margin: 0 auto;
				}
				

			}
			
			.submit{
				width: 100%;
				position: absolute;
				bottom: 40rpx;
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
