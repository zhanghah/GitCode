<template>
	<view class="reportRecord_box">
		<view class="bj">
			<uni-status-bar></uni-status-bar>
			<uni-nav-bar :backgroundColor="headColor" :border="false" :leftIcon="leftIcon" :color="letIconColor"
				@clickLeft="clickLeft"></uni-nav-bar>
			<view class="head_text">
				<view class="title" v-if="infoList.eventStatus==1">工单待审核</view>
				<view class="title" v-if="infoList.eventStatus==2">工单待指派</view>
				<view class="title" v-if="infoList.eventStatus==3">工单已指派</view>
				<view class="title" v-if="infoList.eventStatus==4">工单处理中</view>
				<view class="title" v-if="infoList.eventStatus==6">工单已关闭</view>
				<view class="title" v-if="infoList.eventStatus==7">工单待评价</view>
				<view class="title" v-if="infoList.eventStatus==8">工单已完成</view>
				<view class="title" v-if="infoList.eventStatus==9">工单已上报</view>
				<view class="jindu" @click="showProgress">查看进度
					<image src="../../static/reportRecord/reportRecord_right.png" mode="" />
				</view>
			</view>
		</view>
		<view class="content_box">

			<!-- 报事报修信息 -->
			<view class="box">
				<view class="title">
					<view>
						报事报修信息
					</view>
					<view class="status" v-if="infoList.isTimeOut">已超时</view>
				</view>
				<view class="text_box">
					<view class="name">事件名称：</view>
					<view class="text">{{infoList.woEventName}}</view>
				</view>
				<view class="text_box">
					<view class="name">报事类型：</view>
					<view class="text">{{infoList.woEventParentText}}-{{infoList.woEventTypeText}}</view>
				</view>
				<view class="text_box">
					<view class="name">紧急程度：</view>
					<view class="text" v-if="infoList.emergencyLevel==1">紧急</view>
					<view class="text" v-if="infoList.emergencyLevel==2">较急</view>
					<view class="text" v-if="infoList.emergencyLevel==3">一般</view>
				</view>
				<view class="text_box">
					<view class="name">事件地点：</view>
					<view class="text address">
						{{infoList.eventPosition}}
						<image src="../../../indexPages/static/icon_address.png" mode=""></image>
					</view>
				</view>
				<view class="text_box">
					<view class="name">详细地址：</view>
					<view class="text">{{infoList.adress}}</view>
				</view>
				<view class="text_box">
					<view class="name">联系人：</view>
					<view class="text">{{infoList.contacts}}</view>
				</view>
				<view class="text_box">
					<view class="name">联系电话：</view>
					<view class="text">{{infoList.contactsPhone}}</view>
				</view>
				<view class="text_box">
					<view class="name">处置时间：</view>
					<view class="text">{{infoList.beginTime}}</view>
				</view>
				<view class="text_box">
					<view class="name">处置工具要求：</view>
					<view class="text" v-if="infoList.assignRecordList !== undefined && infoList.assignRecordList.length>0">{{infoList.assignRecordList[0].tool}}</view>
				</view>
				<view class="text_box">
					<view class="name">处置人员要求：</view>
					<view class="text" v-if="infoList.assignRecordList !== undefined && infoList.assignRecordList.length>0" >{{infoList.assignRecordList[0].staffing}}</view>
				</view>
				<view class="text_content">
					<view class="name">报修内容：</view>
					<view class="text">{{infoList.description}}</view>
				</view>
				<view class="img_box">
					<view class="img" v-for="(item,index) of infoList.eventImageList" :key='index'>
						<image :src="`${item.fileVisitUrl}`" mode="" @click="clickImg(infoList.eventImageList)"></image>
					</view>
				</view>
			</view>

			<view class="personnel">
				<view>
					处置人员
				</view>
				<view class="name" v-if="infoList.disposalRecordList !==undefined && infoList.disposalRecordList.length>0">
					{{infoList.disposalRecordList.handleName}}
				</view>
				<view class="name" v-else>
					暂无人员
				</view>
			</view>
			<!-- 派工信息 -->
			<view class="box" v-if="infoList.employeeId">
				<view class="title">派工信息</view>
				<view class="text_box">
					<view class="name">维修人员：</view>
					<view class="text">{{infoList.assignRecord.receivePersonName}}</view>
				</view>
				<view class="text_box">
					<view class="name">要求完成时间：</view>
					<view class="text">{{infoList.checkTime | date('YYYY-MM-DD')}}</view>
				</view>
			</view>

			<!-- 工单信息 -->
			<view class="box">
				<view class="title">工单信息</view>
				<view class="text_box">
					<view class="name">工单编号：</view>
					<view class="text">{{infoList.id}}</view>
				</view>
				<view class="text_box">
					<view class="name">提交时间：</view>
					<view class="text">{{infoList.createTime}}</view>
				</view>
			</view>
			<template v-if=" infoList.eventStatus=='7'">
				<view class="btn">
					<ui-button @click.native="show=true">评价工单</ui-button>
				</view>
				<u-popup v-model="show" mode="bottom" :closeable="true" height="463">
					<view class="rate">
						<u-rate :count="count" v-model="value" size="60" active-color="#F8C344" inactive-color="#f2e5c6" gutter="42" @change="changeRate"></u-rate>
					</view>
					<view class="popup-btn">
						<ui-button @click.native="evaluationHandel">确认提交</ui-button>
					</view>
				</u-popup>
			</template>
		</view>

		<progress-pop :progress="infoList"></progress-pop>
	</view>
</template>
<script>
	import api from '@/api';
	import {
		mapState
	} from 'vuex';
	import progressPop from './components/progressPop.vue'
	export default {
		components: {
			progressPop
		},
		computed: {
			...mapState(['user', 'imageView','community'])
		},
		data() {
			return {
				count: 5,
				value: 0,
				headColor: 'transparent',
				leftIcon: "left-nav",
				letIconColor: '#fff',
				id: '',
				checkStatus: '', //审核状态
				infoList: {}, //报事报修信息详情
				maintainId: '', //报事报修id
				address: '', //房屋地址
				show: false,
			}
		},
		methods: {
			showProgress() {
				this.$store.commit('user/PROGRESS_SHOW', true)
			},
			changeRate(e){
				this.value=e
			},
			evaluationHandel(){
				if(this.value==0){
					uni.showToast({
						icon:'none',
						title:'最少选择一颗星'
					})
				}else{
					const res=api.my.woEventResultOwnerEvaluate({
						currentCeResidentialQuartersId:this.community.id,
						evaluate:this.value,
						sysUserId:this.user.userId,
						woEvenId:this.id,
					})
					if(res.code=='success'){
						uni.showToast({
							icon:'none',
							title:'评价成功'
						})
						this.show=false
					}
				}
			},
			// 获取详情信息
			async getMaintainInfo() {
				try {
					const res = await api.my.getMaintainInfo({
						id: this.id,
					})
					if (res.code != 'success') {
						return
					};
					this.infoList = res.data;
				} catch (err) {

				}
			},
			clickImg(v) {
				console.log(v)
				let viewImg = [];
				v.forEach(item => {
					viewImg.push(this.imageView + item)
				})
				wx.previewImage({
					urls: viewImg,
					current: 0, // 当前显示图片的http链接，默认是第一个
				})
			},
			clickLeft() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(opt) {
			this.id = opt.id
		},
		mounted() {
			this.getMaintainInfo()
		}
	}
</script>
<style lang="less" scoped>
	.reportRecord_box {
		min-height: 100vh;
		background: #F5F5F5;
		white-space: nowrap;
		padding-bottom: 20rpx;

		.bj {
			width: 100%;
			height: 316rpx;
			background-color: #AF4AC1;

			.head_text {
				width: 90%;
				margin: 30rpx auto 0 auto;
				color: #FFFFFE;
				font-size: 46rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.jindu {
					font-size: 26rpx;

					image {
						width: 13rpx;
						height: 21rpx;
						margin-left: 16rpx;
					}
				}
			}
		}

		.content_box {
			margin-top: -50rpx;

			.box {
				width: 90%;
				background: #fff;
				border-radius: 16rpx;
				margin: 0 auto;
				overflow: hidden;
				padding-bottom: 40rpx;
				margin-bottom: 24rpx;

				.title {
					height: 100rpx;
					border-bottom: 1px solid #E6E6E6;
					color: #323333;
					font-size: 30rpx;
					line-height: 100rpx;
					padding: 0 30rpx;
					margin-bottom: 40rpx;
					display: flex;
					justify-content: space-between;

					.status {
						color: #F05050;
					}
				}

				.text_box {
					display: flex;
					justify-content: space-between;
					width: 90%;
					margin: 0 auto;
					margin-bottom: 20rpx;

					.name {
						color: #999999;
						font-size: 28rpx;
					}

					.text {
						white-space: pre-line;
						color: #333333;
						font-size: 28rpx;
					}

					.address {
						display: flex;
						align-items: center;

						image {
							flex-shrink: 0;
							margin-left: 10rpx;
							width: 35rpx;
							height: 35rpx;
						}
					}
				}

				.text_content {
					display: flex;
					width: 90%;
					margin: 0 auto;
					margin-bottom: 20rpx;

					.name {
						color: #999999;
						font-size: 28rpx;
					}

					.text {
						overflow: hidden;
						white-space: normal;
						color: #333333;
						font-size: 28rpx;
					}
				}

				.img_box {
					width: 100%;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;

					image {
						width: 136rpx;
						height: 136rpx;
						border-radius: 8rpx;
						background: #aaa;
						margin-left: 27rpx;
						margin-bottom: 21rpx;

						&:last-child {
							margin-right: 0;
						}
					}
				}
			}

			.personnel {
				width: 90%;
				margin: 0 auto;
				border-radius: 13rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				color: #999999;
				font-size: 27rpx;
				margin-bottom: 20rpx;
				padding: 22rpx 25rpx;

				.name {
					color: #333333;
				}
			}

		}
	}

	.rate {
		padding: 0  138rpx;
		padding-top: 157rpx;
	}
	
	.popup-btn{
		margin: 52rpx auto;
		width: 353rpx;
	}

	.btn {
		width: 90%;
		margin: 20rpx auto;
	}
</style>
