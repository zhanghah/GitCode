<template>
	<view class="page-venue-reserve">
		<view class="content">
			<view class="venue" v-if="detailData">
				<view class="venue-img">
					<image :src="`${imageView}${detailData.pictures[0].picture}`" mode=""></image>
				</view>
				<view class="venue-info">
					<view class="venue-name">
						{{detailData.name}}
					</view>
					<view class="type">
						{{detailData.type}}
					</view>
					<view class="open-time">
						开放时间：{{detailData.openTime}}
					</view>
				</view>
			</view>
			<view class="receive-time">
				<view class="title">
					预定时间
				</view>
				<view class="week">
					<view :class="active==index?'week-active':''" v-for="(item,index) in week" :key="index"
						@click="handelWeek(index)">
						{{item}}
					</view>
				</view>
				<view class="date">
					<view :class="active==index?'date-active':''" v-for="(item,index) in date" :key="index"
						@click="handelWeek(index)">
						{{item}}
					</view>
				</view>
			</view>

			<template v-if="show">
				<view class="time">
					<view v-for="(item,index) in timeList" :key="index"
						:class="selectTime.indexOf(item.time)!=-1?'time-active':''">
						<view @click="handelTime(item.time,index)" v-if="!item.checked">
							{{item.time}}
						</view>
						<view v-else class="disabled">
							{{item.time}}
						</view>
					</view>
				</view>

				<view class="btn" @click="handelReserve">
					<ui-button>提交预订</ui-button>
				</view>
			</template>
			<no-result message="场馆未开放~" v-else></no-result>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import api from '@/api'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				venueId: '',
				detailData: '',
				week: [], //周一-周日
				date: [],
				dayList: [],
				openDay: [], //开放
				closeDayList: [], //已预订日期
				closeDateList: [], //已预订日期
				closeTime: '', //已预订时间
				openTime: [],
				selectDay: '', //选中的日期
				selectTime: [], //选中的时间段
				timeList: [],
				active: 0,
				show: false,
			}
		},
		computed: {
			...mapState(['user', 'imageView'])
		},
		methods: {
			handelWeek(index) {
				this.active = index
				this.selectDay = this.dayList[index];
				this.selectTime = []
				if (this.openDay.indexOf(this.week[index]) != -1) {
					this.show = true
				} else {
					this.show = false
				}
				if(this.closeDateList.indexOf(this.selectDay )!=-1){
					this.closeDayList.forEach(item => {
						if (item.date == this.selectDay) {
							this.closeTime = item.time
						}
					})
					this.timeList.forEach(item => {
						item.checked = false
						this.closeTime.forEach(i => {
							if (item.time == i) {
								item.checked = true
							}
						})
					})
				}else{
					this.timeList.forEach(item => {
						item.checked = false
					})
				}
			},
			handelTime(item, index) {
				// 如果不存在
				if (this.selectTime.indexOf(this.timeList[index].time) == -1) {
					this.selectTime.push(this.timeList[index].time)
				} else {
					this.selectTime.splice(this.selectTime.indexOf(this.timeList[index].time), 1)
				}
				console.log(this.selectTime)
			},
			async handelReserve() {
				const canshu = {
					venueId: this.venueId,
					appointmentTime: this.selectTime.join(','),
					appointmentDay: this.selectDay,
					userId: this.user.userId
				}
				console.log(canshu)
				const res = await api.service.postVenueReserve(canshu)
				if (res) {
					this.selectTime=[]
					this.getVenueInfo()
					uni.navigateTo({
						url: "./success"
					})
				}
			},
			// 获取当前时间
			getNewDate() {
				var myDate = Date.parse(new Date());
				var week = dayjs(myDate).day();
				for (let i = 0; i < 7; i++) {
					let day = dayjs(myDate).format('MM-DD');
					let week = dayjs(myDate).day();
					let daylists = dayjs(myDate).format('YYYY-MM-DD')
					this.date.push(day)
					this.week.push(week)
					this.dayList.push(daylists)
					myDate += 86400000
				}
				this.week.forEach((item, index) => {
					if (item == 0) {
						this.week[index] = "周日"
					} else if (item == 1) {
						this.week[index] = "周一"
					} else if (item == 2) {
						this.week[index] = "周二"
					} else if (item == 3) {
						this.week[index] = "周三"
					} else if (item == 4) {
						this.week[index] = "周四"
					} else if (item == 5) {
						this.week[index] = "周五"
					} else if (item == 6) {
						this.week[index] = "周六"
					}
				})
				this.selectDay = this.dayList[0];
				// this.selectTime = this.time[0];
			},
			// 获取场馆信息
			async getVenueInfo() {
				const res = await api.service.getAllById({
					id: this.venueId
				})
				if (res.status != '0') {
					return
				};
				res.data.venueOrderList.forEach(item => {
					item.date = item.time.substr(0, 10)
					item.time = item.time.substring(10, item.time.length).trim().split(',')
					this.closeDayList.push(item)
				})
				this.detailData = res.data
				if (this.detailData.openTime.includes("周一")) {
					this.openDay.push('周一')
				}
				if (this.detailData.openTime.includes("周二")) {
					this.openDay.push('周二')
				}
				if (this.detailData.openTime.includes("周三")) {
					this.openDay.push('周三')
				}
				if (this.detailData.openTime.includes("周四")) {
					this.openDay.push('周四')
				}
				if (this.detailData.openTime.includes("周五")) {
					this.openDay.push('周五')
				}
				if (this.detailData.openTime.includes("周六")) {
					this.openDay.push('周六')
				}
				if (this.detailData.openTime.includes("周日")) {
					this.openDay.push('周日')
				}
				let startime = this.detailData.openTime.substr(-19, 8)
				let endtime = this.detailData.openTime.substr(-8, 2)
				var myDate = Date.parse(new Date());
				let startdate = dayjs(dayjs(myDate).format('YYYY-MM-DD ') + startime).valueOf(); //开始时间的时间戳
				let enddate = dayjs(dayjs(myDate).format('YYYY-MM-DD ') + endtime).valueOf() //结束时间的时间戳
				let timer = (enddate - startdate) / 1000 / 60 / 60; //每天开放的时间差
				startime = this.detailData.openTime.substr(-19, 5); //截取开放的时间字符串 09:00 
				endtime = this.detailData.openTime.substr(-8, 5); //截取结束的时间字符串   17:00
				let timeSt = startdate
				let timeEn = enddate
				for (let i = 0; i < timer + 1; i++) {
					timeEn = timeSt
					timeSt += 1000 * 60 * 60
					let endVal = dayjs(timeSt).format('HH:mm')
					let startVal = dayjs(timeEn).format('HH:mm')
					let timeQuantum
					if (i == Math.floor(timer)) {
						timeQuantum = startVal + '-' + endtime
					} else {
						timeQuantum = startVal + '-' + endVal
					}
					this.timeList.push({
						time: timeQuantum,
						checked: false
					})
				}
				this.closeDayList.forEach(item => {
					this.closeDateList.push(item.date)
					if (item.date == this.selectDay) {
						this.closeTime = item.time
					}
				})
				this.closeTime.forEach((item,index) => {
					this.timeList.forEach((element,key) => {
						if(element.time == item) {
							element.checked = true;
						}
					});
				});
				if (this.openDay.indexOf(this.week[0]) != -1) {
					this.show = true
				} else {
					this.show = false
				}
			},
		},
		mounted() {
			this.getNewDate();
			this.getVenueInfo()
		},
		onLoad(opt) {
			this.venueId = opt.venueId
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '立即预定',
			});
		},
	}
</script>

<style lang="less" scoped>
	.page-venue-reserve {
		min-height: 100vh;
		background-color: #F5F5F5;
		overflow: auto;
	}

	.content {
		width: 100%;
		height: calc(100vh - 20rpx);
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 30rpx 20rpx 30rpx;
		overflow: auto;


		.venue {
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1rpx #E6E6E6 solid;

			.venue-img {


				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.venue-info {
				color: #333333;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;

				.venue-name {
					font-size: 38rpx;
					font-weight: bold;

				}

				.type {
					color: #999999;
					font-size: 28rpx;
					margin: 25rpx 0;
				}

				.open-time {
					font-size: 24rpx;
				}
			}
		}

		.receive-time {
			margin-top: 40rpx;
			padding-bottom: 30rpx;
			border-bottom: 1rpx #F7F7F7 solid;

			.title {
				color: #333333;
				font-size: 32rpx;
				font-weight: bold;
			}

			.week {
				margin-top: 35rpx;
				margin-bottom: 27rpx;
				display: flex;
				justify-content: space-between;

				view {
					width: 14%;
					text-align: center;
				}

				.week-active {
					color: #802890;
				}
			}

			.date {
				display: flex;
				justify-content: space-between;

				view {
					width: 14%;
					text-align: center;
				}

				.date-active {
					color: #FFFFFF;
					background-color: #802890;
					padding: 4rpx;
					border-radius: 4rpx;
				}
			}
		}

		.time {
			display: flex;
			flex-wrap: wrap;
			align-items: center;

			view {
				width: 210rpx;
				height: 80rpx;
				border: 1rpx #DADADA solid;
				text-align: center;
				line-height: 80rpx;
				margin-bottom: 25rpx;
				margin-right: 30rpx;
				border-radius: 4rpx;
			}

			view:nth-child(3n) {
				margin-right: 0;
			}

			.time-active {
				color: #FFFFFF;
				border-radius: 4rpx;
				background-color: #802890;
			}

			.disabled {
				color: #FFFFFF;
				border-radius: 4rpx;
				background-color: #a5a5a5;
			}
		}
	}

	.btn {
		width: 100%;
		margin-top: 100rpx;
	}
</style>
