<template>
	<view>
		<nav-bar-new :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			申请业主大会
		</nav-bar-new>
		<view class="conter">
			<view class="item">
				<view class="item_name">
					<text>*</text>
					楼栋
				</view>
				<view class="item_type">
					<picker @change="bindPickerChange" :value="arrayIndex" :range="array" :range-key="'name'">
						<view class="uni-input" :class="arrayname == '请选择楼栋'?'ash':''">
							{{arrayname}}
						</view>
					</picker>
				</view>
				<view class="item_limit">
					<image src="/static/trade/apply1.png" mode=""></image>
				</view>
			</view>

			<view class="item">
				<view class="item_name">
					<text>*</text>
					标题
				</view>
				<view class="item_input">
					<input type="text" v-model="form.name" maxlength="15" placeholder="请输入信息标题"
						placeholder-class="placeholder" />
				</view>
				<view class="item_limit">
					{{form.name.length}}/15
				</view>
			</view>

			<view class="frame">
				<view class="frame_title">
					<text>*</text>
					内容
				</view>
				<view class="textarea">
					<textarea v-model="form.content" placeholder="请输入内容" placeholder-class="placeholder" />
				</view>
			</view>
			<!-- 发布 -->
			<view class="release">
				<view class="submit_btn" @tap="submit">提交申请</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';

	export default {
		data() {
			return {
				arrayIndex: '',
				arrayname: '请选择楼栋',
				array: [],
				form: {
					name: '',
					content: '',
					buildId: '',
				},
				timer: null
			}
		},
		onLoad() {
			this.getDetails();
		},
		methods: {
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.arrayIndex = e.target.value;
				this.arrayname = this.array[this.arrayIndex].name;
			},
			// 获取楼栋
			async getDetails() {
				const res = await api.trade.getBuildList()
				if (res) {
					this.array = [];
					this.array.push({
						name: '全部',
						value: ''
					})
					res.data.forEach((item, index) => {
						var obj = {
							name: item.name,
							value: item.id,
						}
						this.array.push(obj);
						console.log(this.array)
					});
				}
			},
			// 发起
			submit() {
				if (this.arrayname == '请选择楼栋') {
					this.$toast('请选择楼栋');
					return false;
				}
				this.form.name = this.form.name.replace(/\s*/g, '');
				if (!this.form.name) {
					this.$toast('请填写标题');
					return false;
				}
				this.form.content = this.form.content.replace(/\s*/g, '');
				if (!this.form.content) {
					this.$toast('请填写内容');
					return false;
				}
				// 如果选择全部
				if (this.arrayIndex === 0) {
					var param = {
						build: 0,
						name: this.form.name,
						content: this.form.content,
					}
				} else {
					var param = {
						build: 1,
						buildId: this.array[this.arrayIndex].value,
						name: this.form.name,
						content: this.form.content,
					}
				}
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(async () => {
					const res = await api.trade.meetingAdd(param)
					if (res) {
						uni.showToast({
							duration:2000,
							title:'申请成功',
							icon:'success'
						})
						uni.navigateBack();
					}
				}, 1000)
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.conter {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;

		.item {
			width: 100%;
			padding: 27rpx 24rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 6rpx;
			margin-bottom: 20rpx;
			display: -webkit-flex;
			flex-direction: row;
			align-items: center;

			.item_name {
				width: 130rpx;
				font-size: 30rpx;
				color: #333333;

				text {
					color: #F05050;
					font-size: 22rpx;
				}
			}

			.item_input {
				flex: 1;

				input {
					width: 100%;
					border: none;
					outline: none;
				}

				.placeholder {
					color: #AAAAAA;
					font-size: 30rpx;
				}
			}

			.item_limit {
				color: #AAAAAA;
				font-size: 24rpx;
				margin-left: 24rpx;
				display: -webkit-flex;
				align-items: center;

				image {
					width: 20rpx;
					height: 11rpx;
				}
			}

			.item_type {
				flex: 1;
				justify-content: flex-end;

				.uni-input {
					color: #282828;
					font-size: 30rpx;
				}

				.ash {
					color: #AAAAAA;
				}
			}
		}

		.frame {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 6rpx;
			margin-bottom: 20rpx;

			.frame_title {
				width: 100%;
				font-size: 30rpx;
				color: #333333;
				margin-bottom: 27rpx;

				text {
					color: #F05050;
					font-size: 22rpx;
				}
			}

			.textarea {
				width: 100%;
				margin-bottom: 30rpx;

				textarea {
					width: 100%;
					height: 300rpx;
					border: none;
					font-size: 30rpx;
				}

				.placeholder {
					color: #AAAAAA;
					font-size: 30rpx;
				}
			}
		}

		.release {
			padding: 30rpx 0;
		}
	}
</style>
