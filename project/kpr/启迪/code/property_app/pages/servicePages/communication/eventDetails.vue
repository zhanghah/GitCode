<template>
	<view>
		<view class="split"></view>
		<view class="event-details">
			<template v-if="typeDetail==0">
				<view class="status" v-if="detailList.onendStatus=='1'">
					<view>
						进行中
					</view>
				</view>
				<view class="stop" v-if="detailList.onendStatus=='2'">
					<view>
						已截止
					</view>
				</view>
			</template>
			<view class="title">
				<view class="title-tit">{{detailList.title}}</view>
				<view class="create-time">
					<text>活动发布时间:</text><text
						style="margin-left: 10rpx;">{{detailList.createTime|date('YYYY-MM-DD')}}</text>
				</view>
			</view>
			<!-- <view class="title-img" v-if="detailList.image">
				<image :src="`${imageView}${detailList.image}`" mode=""  @click="clickImg(detailList.image)"></image>
			</view> -->
			<u-parse class="content" :html="detailList.content" :lazy-load="true"></u-parse>
			<!-- 投票活动 -->
			<view class="" v-if="typeDetail==0">
				<view class="rule">
					<h5>投票规则：</h5>
					<p>1.每个用户仅能投票一次</p>
					<p>2.投票截止时间:{{detailList.endTime|date('YYYY-MM-DD HH:mm:ss')}}</p>
					<p>严禁刷票,一经发现将取消资格</p>
				</view>
				<!-- 活动未开始 -->
				<view v-if="detailList.onendStatus==0">
					<view class="hove-vote">活动未开始</view>
				</view>
				<!-- 活动进行中 -->
				<view v-if="detailList.onendStatus==1">
					<!-- 已投票 -->
					<view class="votedList" v-if="detailList.join">
						<view class="item" v-bind:class="{ voteActive: item.check }"
							v-for="(item,index) in detailList.optionList" :key="index">
							<p>{{item.optionContent}}</p>
							<view class="Mask"  :style="{width:item.billie+'%'}" v-if="item.joinCount>0">
								<image v-if="item.check" src="../../userPages/static/activity/icon_hd_yixuan.png">
								</image>
							</view>
							<text class="joinCount">{{item.joinCount}}人</text>
						</view>
						<view class="hove-vote">已投票</view>
					</view>
					<!-- 未投票 -->
					<view class="votingList" v-else>
						<radio-group @change="radioChange" v-if="detailList.votingType==1">
							<label class="flex-label" v-for="(item, index) in detailList.optionList" :key="index">
								<view>
									<radio :value="item.id" />
								</view>
								<view class="label-box">{{item.optionContent}}</view>
							</label>
						</radio-group>
						<checkbox-group @change="checkboxChange" v-else>
							<label class="flex-label" v-for="(item, index) in detailList.optionList" :key="index">
								<checkbox color="#802890" :value="item.id" />
								<view class="label-box">{{item.optionContent}}</view>
							</label>
						</checkbox-group>

						<view class="vote" @tap="voteBtn">立即投票</view>
					</view>
				</view>
				<!-- 活动已截止 -->
				<view v-if="detailList.onendStatus==2">
					<view class="hove-vote">活动已截止</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	// import mainList from './components/mainList.vue';
	import api from '@/api';
	import dayjs from 'dayjs'
	import {
		mapState
	} from 'vuex';


	export default {
		components: {
			// mainList,
		},
		data() {
			return {
				typeDetail: "", //活动类型
				optionId: "", //选项id
				votingId: '', //投票活动id	
				current: 0,
				active: false,
				isActive: true,
				detailList: {},
				timer:null
			}
		},
		computed: {
			...mapState(['imageView', "user"]),
			myhouse() {
				return uni.getStorageSync('my_house')
			}
		},
		onLoad(option) {
			this.votingId = option.id;
			this.getDetailList(option.id, option.type)
			this.typeDetail = option.type
		},
		methods: {
			// 获取资源
			// 活动类型0-投票,1-社区活动,2-报名活动
			async getDetailList(id, type) {
				let res = await api.homepage.getActivityZoneInfo({
					id: id,
					type: type
				})
				console.log(res)
				if(type===0){
					res.data.optionList.forEach(item=>{
						item.billie=parseInt((item.joinCount/item.allCount)*100)
					})
				}
				this.detailList = res.data
			},
			getNum(index) {
				this.current = index;
			},
			//复选框changge
			checkboxChange(e) {
				console.log(8, e)
				this.optionId = e.detail.value.join(',')
			},
			// 单选框
			radioChange(e) {
				this.optionId = e.detail.value;
			},
			//投票按钮
			async voteBtn() {
				let canshu = {
					userId: this.user.userId,
					votingId: this.votingId,
					optionId: this.optionId,
				}
				if(this.myhouse.length>0){
					if (!this.optionId) {
						uni.showToast({
							icon: 'none',
							title: '请选择投票的内容'
						})
						return
					}
					
					if (this.timer) {
						clearTimeout(this.timer)
					}
					this.timer = setTimeout(async () => {
						let res = await api.homepage.postAddVot(canshu)
						if (res) {
							this.getDetailList(this.votingId, this.typeDetail)
							this.$toast('投票成功');
							this.savePoints();
						}
					}, 1000)
				}else{
					this.$toast('请先绑定房屋')
					return
				}
			},
			// 保存积分
			async savePoints(){
				const query={
					mobilePhoneNumber: this.user.phone,
					operationPoints: 100,
					pointsSource: "业主APP",
					pointsType: 5,
				}
				const res=await api.my.savePoints(query);
				if(res){
					this.$toast('积分+100')
				}
			},
			//查看图片
			clickImg(v) {
				let viewImg = [];
				viewImg.push(this.imageView + v);
				console.log(viewImg)
				wx.previewImage({
					urls: viewImg,
					current: 0, // 当前显示图片的http链接，默认是第一个
				})
			},

		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '活动详情',
			});
		},
	}
</script>

<style scoped lang="less">
	.status,
	.stop {
		width: 112rpx;
		height: 40rpx;
		background-color: #F05050;
		color: #FFFFFF;
		font-size: 27rpx;
		font-weight: bold;
		line-height: 40rpx;
		text-align: center;
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
		float: right;
	}

	.stop {
		background-color: #AAAAAA;
	}

	.split {
		height: 20rpx;
		background-color: #F5F5F5;
	}

	.hove-vote {
		width: 703rpx;
		height: 88rpx;
		border-radius: 44rpx;
		background-color: #C3C3C3;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
		font-weight: 500;
		line-height: 88rpx;
		margin-top: 50rpx;
	}

	.title-tit {
		font-size: 36rpx;
		font-weight: bold;
		height: 80rpx;
		margin-top: 47rpx;
	}

	.create-time {
		margin-bottom: 35rpx;
	}
	
	.content{
		margin-top: 30rpx;
	}

	.label-box {
		width: 637rpx;
		height: 74rpx;
		border: solid 1rpx #999;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flex-label {
		margin: 20rpx 0;
		display: flex;
		align-items: center;
	}

	.event-details {
		background: white;
		font-family: 'PingFang-SC-Bold';
		height: 100vh;
		padding: 0 28rpx;
		overflow: auto;
	}

	.title {
		// margin: 20rpx 0;
	}

	.title view {
		font-size: 36rpx;
		color: #3F3A39;
	}

	.title text {
		font-size: 26rpx;
		margin-top: 30rpx;
		line-height: 60rpx;
		color: #999999;
	}

	image {
		width: 100%;
		height: 444rpx;
		margin-bottom: 20rpx;
	}

	.rule {
		margin: 30rpx 0;
	}

	.rule h5 {
		font-size: 30rpx;
		color: #3F3A39;
	}

	.rule p {
		font-size: 30rpx;
		margin: 10rpx 0;
		color: #999999;
	}

	.votingList {
		width: 100%;
		padding: 20rpx 0;

		.item {
			margin: 20rpx 0;
			display: flex;
			flex-direction: row;
			align-content: center;
			justify-content: center;

			.radio {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			p {
				flex: 1;
				padding: 20rpx;
				margin-left: 20rpx;
				border-radius: 5rpx;
				border: 1px solid #d0d0d0;
				color: #3F3A39;
			}

		}

		.vote {
			width: 100%;
			margin: 52rpx 0;
			line-height: 88rpx;
			border-radius: 44rpx;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
			background-color: #802890;
		}
	}

	.votedList {
		width: 100%;
		padding: 20rpx 0;
		.item{
			width: 100%;
			height: 90rpx;
			position: relative;
			border: 1rpx #d0d0d0 solid;
			margin: 20rpx 0;
			border-radius: 15rpx;
			p{
				position: absolute;
				top: 30%;
				left: 2%;
			}
			.Mask{
				height: 100%;
				background-color: #F05050;
				border-radius: 15rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				image{
					width: 40rpx;
					height: 28rpx;
					margin: 0;
					margin-right: 10rpx;
				}
			}
			.joinCount{
				position: absolute;
				right: 5%;
				top: 30%;

			}
		}

	}

	.title-img {
		width: 702rpx;
		height: 444rpx;

		.title-img image {
			width: 702rpx;
			height: 444rpx;
		}
	}
</style>
