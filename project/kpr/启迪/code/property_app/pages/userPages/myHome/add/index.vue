<template>
	<view class="addHome_box">
		<view class="title">
			为了保障本社区内的住户能够享受高品质的服务，
			请提供您的真实信息以供物业中心进行验证！
		</view>
		<view class="content">
			<view class="box">
				<view class="name">姓名</view>
				<input type="text" placeholder="请输入您的姓名" v-model="name">
			</view>
			<view class="box">
				<view class="name">手机号</view>
				<input type="text" placeholder="请输入您手机号" v-model="phone">
			</view>
			<view class="box">
				<view class="name">小区名</view>
				<view class="xz" @click="toCommunity">
					{{myHome.comMsg.name?myHome.comMsg.name:'请选择小区'}}
					<image src="../../static/myHome/icon_arrow.png" mode="" />
				</view>
			</view>
			<view class="box">
				<view class="name">楼栋</view>
				<view class="xz" @click="toBuilding">
					<view v-if="myHome.buildingMsg.name">{{myHome.buildingMsg.name}}栋 {{myHome.unitMsg.name}}</view>
					<view v-else>请选择楼栋</view>
					<image src="../../static/myHome/icon_arrow.png" mode="" />
				</view>
			</view>
			<view class="box">
				<view class="name">房号</view>
				<view class="xz" @click="toFloor">
					<view v-if="myHome.floorMsg.name">{{myHome.floorMsg.name}}楼 {{myHome.RoomMsg.name}}号房</view>
					<view v-else>请选择房号</view>
					<image src="../../static/myHome/icon_arrow.png" mode="" />
				</view>
			</view>
			<view class="box">
				<view class="name">住房关系</view>
				<view class="radio_box">
					<view @click="radioClick(index)" :class="radioIdex===index?'radio radio_on':'radio'"
						v-for="(item,index) in radioList" :key="index">
						<view class="radio_quan"></view>
						<view class="name">{{item}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="button">
			<view @click="bindSbumit">立即绑定</view>
		</view>
	</view>
</template>
<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	import { showToast } from '@/utils/utils.js'
	export default {
		components: {},
		data() {
			return {
				radioList: ['业主', '亲属', '租客'],
				radioIdex: 0,
				name:'',
				phone:'',
			}
		},
		computed: {
			...mapState(['user','community','myHome'])
		},
		methods: {
			//住房关系切换
			radioClick(index) {
				console.log(index)
				this.radioIdex = index
			},
			
			//选择小区
			toCommunity(){
				uni.navigateTo({
					url: `/pages/entryPages/bind/choosecom?bindHome=2`,
				});
			},
			
			//选择楼栋
			toBuilding(){
				if(!this.myHome.comMsg.id){showToast('请选择小区~'); return};
				uni.navigateTo({
					url: '/pages/entryPages/bind/building',
				});
			},
			
			//选择房号
			toFloor(){
				if(!this.myHome.buildingMsg.id){showToast('请选择楼栋~'); return};
				if(!this.myHome.unitMsg.id){showToast('请选择单元~'); return};
				uni.navigateTo({
					url: '/pages/entryPages/bind/floor',
				});
			},
			
			//立即绑定
			bindSbumit(){
				const _this = this;
				if(!_this.name){showToast('请输入姓名~'); return};
				if(!_this.phone){showToast('请输入手机号~'); return};
				if(!_this.myHome.comMsg.id){showToast('请选择小区~'); return};
				if(!_this.myHome.buildingMsg.id){showToast('请选择楼栋~'); return};
				if(!this.myHome.unitMsg.id){showToast('请选择单元~'); return};
				if(!this.myHome.floorMsg.id){showToast('请选择楼层~'); return};
				if(!_this.myHome.RoomMsg.id){showToast('请选择房号~'); return};
				let canshu = {
					ceBuildingId:Number(_this.myHome.buildingMsg.id),//楼栋id
					ceFloorId:Number(_this.myHome.floorMsg.id),//单元楼层id
					ceHouseId:Number(_this.myHome.RoomMsg.id),//房屋id
					ceUnitId:Number(_this.myHome.unitMsg.id),//单元id
					currentCeResidentialQuartersId:Number(_this.myHome.comMsg.id),//小区id	
					dataSource:'4',//数据源 4登录来源, 业主APP
					mobilePhoneNumber:_this.phone,//移动电话号码	
					name:_this.name,
					ownerType:(_this.radioIdex+1)+'',
					// passWord:'',
				}
				api.my.bindRoom(canshu).then(res=>{
					console.log(res)
					if(res.code !== 'success'){return};
					uni.setStorageSync('RoomId', _this.myHome.RoomMsg.id);//房号ID
					showToast('添加成功~')
					setTimeout(()=>{
						uni.navigateBack()
					},500)
				})
			},
			// 获取用户电话
			getUserPhone(){
				this.phone=this.user.phone
			}
		},
		mounted() {
			this.getUserPhone()
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '新增房屋',
			});
		},
	}
</script>
<style lang="less" scoped>
	.addHome_box {
		min-height: 100vh;
		background: #fff;
		white-space: nowrap;
		overflow: hidden;
		position: relative;

		.title {
			height: 121rpx;
			background: #F5F5F5;
			font-size: 28rpx;
			color: #919992;
			padding-left: 34rpx;
			display: flex;
			align-items: center;
			white-space: pre-line;
			line-height: 44rpx;
		}

		.content {
			.box {
				height: 120rpx;
				margin-left: 38rpx;
				width: 92%;
				border-bottom: 1px solid #E6E6E6;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.name {
					color: #303233;
					font-size: 36rpx;
				}

				input {
					color: #A9ADB1;
					font-size: 32rpx;
					text-align: right;
				}

				.xz {
					display: flex;
					align-items: center;
					color: #303233;
					font-size: 34rpx;

					image {
						width: 18rpx;
						height: 30rpx;
						margin-left: 9rpx;
					}
				}

				.radio_box {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.radio {
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #303331;
						font-size: 32rpx;
						margin-left: 37rpx;

						.radio_quan {
							width: 42rpx;
							height: 42rpx;
							background-repeat: no-repeat;
							background-position: center center;
							background-size: 100% 100%;
							background-image: url(@/static/components/icon_checkbox.png);
							border-radius: 50%;
							overflow: hidden;
							margin-right: 20rpx;
						}
					}

					.radio_on {
						.radio_quan {
							background-image: url(@/static/components/icon_checkbox_active.png);
						}
					}
				}
			}
		}

		.button {
			width: 100%;
			position: absolute;
			bottom: 20rpx;
			left: 0;

			view {
				width: 92%;
				height: 88rpx;
				line-height: 88rpx;
				background-color: #802890;
				border-radius: 44rpx;
				color: #fff;
				font-size: 34rpx;
				text-align: center;
				margin: 0 auto;
			}
		}
	}
</style>
