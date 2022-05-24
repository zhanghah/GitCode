<template>
	<view :class="['ui-input', `ui-${type}`, { clearable: clearable }]">
		<view class="icon" v-if="$slots.icon">
			<slot name="icon" />
		</view>

		<view class="pre" v-if="$slots.pre">
			<slot name="pre" />
		</view>

		<input :maxlength="max" :minlength="min" :class="['input', type]" :type="localType" placeholder-class="placeholder" v-model="inputval"
			:placeholder="placeholder" />

		<view class="option">
			<view class="clear" v-if="clearable" @click="clearHandler"></view>

			<view :class="['eye', { close: localType === 'password', open: localType === 'text' }]"
				v-if="type === 'password'" @click="pwdVisibleHandler"></view>

			<slot name="ext" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Input',
		components: {},
		props: {
			clearable: {
				type: Boolean,
				default: false,
			},
			value: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'text',
			},
			placeholder: {
				type: String,
				default: '',
			},
			max:{
				type:Number,
				default:16,
			},
			min:{
				type:Number,
				default:6,
			}
		},
		data() {
			return {
				inputval: '',
				localType: '',
			}
		},
		watch: {
			inputval(val) {
				this.$emit('input', val);
			},
		},
		methods: {
			clearHandler() {
				this.inputval = '';
			},
			pwdVisibleHandler() {
				if (this.localType === 'password') {
					this.localType = 'text';
				} else {
					this.localType = 'password';
				}
			},
		},
		beforeMount() {
			this.localType = this.type;
			this.inputval = this.value;
		},
	}
</script>

<style scoped lang="less">
	.placeholder {
		color: #ccc;
	}

	.ui-input {
		display: flex;
		align-items: center;
		color: #424242;
		font-size: 28rpx;
		border-bottom: 1rpx solid #A6A6A6;
		position: relative;

		.icon {
			margin: 0 30rpx;
			width: 29rpx;
			height: 36rpx;
		}

		.option {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			z-index: 9;

			display: flex;
			align-items: center;
		}

		.clear {
			width: 40rpx;
			height: 40rpx;
			background: url(@/static/components/delete-mmdl.png) no-repeat center center;
			background-size: 36rpx 36rpx;
		}

		.input {
			flex: 1;
			color: #424242;
			font-size: 30rpx;
			padding: 25rpx 0;
			appearance: none;
			border: none;
			outline: none;
		}

		&.clearable {
			.input {
				padding-right: 60rpx;
			}

			.password {
				padding-right: 120rpx;
			}
		}

		.eye {
			margin-left: 20rpx;
			width: 40rpx;
			height: 40rpx;
			background-repeat: no-repeat;
			background-position: center center;

			&.close {
				background-image: url(@/static/components/down-mmdl.png);
				background-size: 30rpx 20rpx;
			}

			&.open {
				background-image: url(@/static/components/eye-mmdl.png);
				background-size: 32rpx 22rpx;
			}
		}
	}
</style>
