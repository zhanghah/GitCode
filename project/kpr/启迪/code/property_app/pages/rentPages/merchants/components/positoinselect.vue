<template>
	<view class="merchant-positoin-select">
		<view class="overlay"></view>

		<view class="content">
			<view class="title">
				<view class="cancel" @tap="cancelHandler">取消</view>

				<view class="head">广告位位置</view>

				<view class="confirm" @click="confirmHandler">确定</view>
			</view>

			<view class="container">
				<view class="col area">
					<view :class="['item', { active: index === index1 }]" v-for="(item,index) in parkData" :key="index" @click="clickPark(item,index)">{{item.name}}</view>
				</view>

				<view class="col position">
					<view :class="['item', { active: index === index2 }]" v-for="(item,index) in addressData" :key="index" @click="clickAddress(index)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		components: {},
		data() {
			return {
				parkData: [],
				addressData: [],
				index1: 0,
				index2: 0
			};
		},
		props: {
			typeId: {
				type: String,
				default: ''
			},
		},
		computed: {
			...mapState(['user']),
		},
		methods: {
			cancelHandler() {
				this.$emit('cancel', false)
			},
			confirmHandler() {
				this.$emit('confirm', this.addressData);
			},
			// 园区列表
			async getParkList() {
				await api.lifejf.getParkList().then(res => {
					if (res.status !== '0') {
						return
					};
					this.parkData = res.data
					console.log((this.parkData))
				})
			},
			// 地址列表
			async getAddressList(id) {
				let canshu = {
					parkId: id,
					typeId: this.typeId
				}
				await api.lifejf.getAddressList(canshu).then(res => {
					if (res.status !== '0') {
						return
					};
					this.addressData = res.data
					console.log(res)
				})
			},


			async getAggregate() {
				await this.getParkList()
				await this.getAddressList(this.parkData[0].id)
			},
			// 选择园区
			clickPark(item, index) {
				this.index1 = index

				this.getAddressList(item.id)
			},
			// 选择地址
			clickAddress(index) {
				this.index2 = index
			}
		},
		mounted() {
			this.getAggregate()
		},
	}
</script>

<style scoped lang="less">
	.merchant-positoin-select {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #FFFFFF;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;

		.cancel {
			color: #999;
			padding: 30rpx 25rpx;
		}

		.head {
			color: #3F3A39;
		}

		.confirm {
			color: #1B76FF;
			padding: 28rpx 25rpx;
		}
	}

	.container {
		height: 790rpx;
		display: flex;

		.col {
			height: 100%;
			overflow-y: auto;
			overflow-x: hidden;
		}

		.area {
			width: 260rpx;
			flex-shrink: 0;
			flex-grow: 0;
			background: #F5F5F5;

			.active {
				background-color: #1B76FF;
				color: #FFFFFF;
			}
		}

		.position {
			flex: 1;

			.active {
				color: #1B76FF;
				font-weight: bold;
				padding-right: 60rpx;
			}

			.check {
				width: 37rpx;
				height: 36rpx;
				background: url(../../static/rent/icon_check_bold.png) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 25rpx;
			}
		}

		.item {
			position: relative;
			box-sizing: border-box;
			padding: 30rpx 25rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
