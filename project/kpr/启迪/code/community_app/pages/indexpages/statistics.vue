<template>
	<view class="page">
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			数据统计
		</nav-bar>
		<view class="conter">
			<view class="block">
				<view class="block_title">公共事务统计</view>
				<view class="charts-box" style="height: 650rpx;">
					<qiun-data-charts type="bar" :opts="opts" :chartData="chartsDataColumn1" />
				</view>
			</view>

			<view class="block">
				<view class="block_box">
					<view class="block_title">消防事件统计</view>
					<view class="block_time">
						<picker mode="date" :value="date" fields="year" @change="bindDateChange">
							<view class="uni-input">
								<view class="qh">
									{{date}}
									<image src="/static/index/bottom.png" mode=""></image>
								</view>
							</view>
						</picker>
					</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="area" :opts="area" canvasId="scrolllineid" :ontouch="true" :canvas2d="true"
						:chartData="fireList" />
				</view>
			</view>

			<view class="block">
				<view class="block_title">健康统计</view>
				<view class="charts-box">
					<qiun-data-charts type="column" :opts="column" :chartData="chartsDataColumn3" />
				</view>
				<view class="ul">
					<view class="li">
						<view class="than cor1">80%</view>
						<view class="num">201</view>
						<view class="name">心率过低</view>
					</view>
					<view class="strip"></view>
					<view class="li">
						<view class="than cor2">80%</view>
						<view class="num">201</view>
						<view class="name">心率正常</view>
					</view>
					<view class="strip"></view>
					<view class="li">
						<view class="than cor3">80%</view>
						<view class="num">201</view>
						<view class="name">心率过高</view>
					</view>
				</view>
				<view class="ul">
					<view class="li">
						<view class="than cor1">80%</view>
						<view class="num">201</view>
						<view class="name">血氧饱和度过低</view>
					</view>
					<view class="strip"></view>
					<view class="li">
						<view class="than cor2">80%</view>
						<view class="num">201</view>
						<view class="name">血氧饱和度正常</view>
					</view>
					<view class="strip"></view>
					<view class="li">
						<view class="than cor3">80%</view>
						<view class="num">201</view>
						<view class="name">血氧饱和度过高</view>
					</view>
				</view>
			</view>

			<view class="block">
				<view class="block_title">特殊人员统计</view>
				<view class="charts-box" style="height: 650rpx;">
					<qiun-data-charts type="bar" :opts="opts" :chartData="specialList" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api'
	export default {
		data() {
			return {
				date: '',
				chartsDataColumn1: {
					"categories": ["食品药品安全", "城市管理", "教育管理", "公共安全", "劳保", "矛盾纠纷", "社情民意", "安全", "房管", "环保", "水务"],
					"series": [{
						"name": "目标值",
						"data": [535, 346, 831, 133, 413, 934, 435, 536, 331, 433, 103],
						"color": 'rgba(128, 194, 106, 0.5)',
						"textColor": '#80C26A',
					}]
				},
				specialList: {},
				chartsDataColumn3: {
					"categories": ["高血压", "高血脂", "高血糖", "糖尿病", "心脏病"],
					"series": [{
						"name": "目标值",
						"data": [535, 346, 831, 133, 413],
						"color": '#AB8BBC',
						"textColor": '#7F298E',
					}]
				},
				fireList:{},
				area: {
					enableScroll: true,
					padding: [25, 5, 0, 5],
					xAxis: {
						scrollShow: true,
						itemCount: 12,
						disableGrid: true,
					},
					yAxis:{data:[{max:10}]},
					legend: {
						show: false,
					},
					fontSize: 12,
					fontColor: "#AAAAAA",
				},
				opts: {
					xAxis: {
						max: 100,
						disableGrid: true,
						axisLine: true,
						axisLineColor: '#EEEEEE',
					},
					yAxis: {
						axisLineColor: '#EEEEEE',
					},
					legend: {
						show: false,
					},
					fontSize: 12,
					fontColor: "#AAAAAA",
					extra: {
						bar: {
							linearType: 'none', //渐变类型
							barBorderCircle: false, // 圆角
							barBorderRadius: [3, 3, 3, 3],
							width: 15,
							seriesGap: 2,
							categoryGap: 2,
						},
					}
				},
				column: {
					padding: [25, 5, 0, 5],
					xAxis: {
						max: 1000,
					},
					yAxis: {
						axisLineColor: '#EEEEEE',
						gridColor: '#EEEEEE',
					},
					legend: {
						show: false,
					},
					fontSize: 12,
					fontColor: "#AAAAAA",
					extra: {
						column: {
							barBorderRadius: [6, 6, 6, 6],
						},
					}
				}
			}
		},
		methods: {
			// 获取当前年
			getYear() {
				var date = new Date();
				this.date = date.getFullYear()
			},
			bindDateChange(e) {
				console.log(e)
				this.date = e.target.value
				this.getFireDataTotal()
			},
			// 消防事件统计
			async getFireDataTotal() {
				const res = await api.inform.getFireDataTotal({
					times: Date.parse(this.date)
				})
				if (res) {
					const fireList={
						"categories": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						"series": [{
							"name": "目标值",
							"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
							"color": '#C6AA6B',
							"textColor": '#C6AA6B',
						}]
					}
					const specialList={
					"categories": [],
					"series": [{
						"name": "目标值",
						"data": [],
						"color": 'rgba(255, 137, 79, 0.5)',
						"textColor": '#FF894F',
					}]
				}
					res.data.alarmTotalVos.forEach(item => {
						fireList.series[0].data[item.month - 1] = Number(item.monthSum)
					})
					this.fireList=fireList
					res.data.specialPersonnelTotalVos.forEach(item=>{
						specialList.categories.push(item.typeName)
						specialList.series[0].data.push(item.personTotal)
					})
					this.specialList=specialList
				}
			},
		},
		onShow() {
			this.getYear()
		},
		beforeMount() {
			this.getFireDataTotal()
		}
	}
</script>

<style lang="less" scoped>
	.page {
		background-color: #F5F5F5;
	}

	.conter {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;

		.block {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 6rpx;
			margin-bottom: 24rpx;

			.block_box {
				display: flex;
			}

			.qh {
				display: flex;
				align-items: center;
				color: #727677;
				font-size: 28rpx;
				margin-right: 30rpx;
			}

			.qh image {
				width: 14rpx;
				height: 8rpx;
				margin-left: 10rpx;
			}

			.block_title {
				width: 100%;
				font-size: 30rpx;
				color: #282828;
			}

			.ul {
				width: 100%;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
				margin-top: 40rpx;
				margin-bottom: 10rpx;

				.strip {
					width: 1px;
					height: 80rpx;
					background: #EEEEEE;
				}

				.li {
					flex: 1;
					display: -webkit-flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.than {
						width: 60rpx;
						height: 30rpx;
						font-size: 17rpx;
						color: #FFFFFF;
						display: -webkit-flex;
						justify-content: center;
						align-items: center;
						border-radius: 10rpx;
						margin-bottom: 6rpx;
					}

					.cor1 {
						background: rgba(127, 41, 142, 0.3);
					}

					.cor2 {
						background: #CFCFCF;
					}

					.cor3 {
						background: #AB8BBC;
					}

					.num {
						font-size: 34rpx;
						color: #282828;
						font-weight: bold;
						margin-bottom: 6rpx;
					}

					.name {
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}
	}
</style>
