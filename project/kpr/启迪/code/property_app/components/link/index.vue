<template>
	<view :class="['ui-link', 'ui-link-' + size]">
		<view :class="['wrap', { 'border': border }]">
			<view class="icon" v-if="$slots.icon">
				<slot name="icon"></slot>
			</view>

			<view :class="['content', { 'no-arrow': !arrow }]">
				<view class="label">
					{{label}}
					<view class="require" v-if="required">*</view>
				</view>
				<view class="ext" v-if="$slots.ext">
					<slot name="ext"></slot>
				</view>
			</view>

			<view class="arrow" v-if="arrow"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Link',
		components: {},
		props: {
			required: {
				type: Boolean,
				default: false,
			},
			label: String,
			size: {
				type: String,
				default: 'default',
			},
			arrow: {
				type: Boolean,
				default: true,
			},
			border: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {}
		},
		methods: {},
		beforeMount() {},
	}
</script>

<style scoped lang="less">
	.ui-link {
		background: #FFFFFF;
		padding-left: 29rpx;
		box-sizing: border-box;

		.wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 29rpx;
			height: 100rpx;
			box-sizing: border-box;

			&.border {
				border-bottom: 1rpx solid #E6E6E6;
			}
		}

		&.ui-link-start {
			.wrap {
				justify-content: flex-start;

				& .content {
					justify-content: flex-start;
				}

				.label {
					color: #808080;
				}
			}
		}


		&.ui-link-small {
			.wrap {
				height: 85rpx;
			}
		}

		&.ui-link-default {
			.wrap {
				height: 100rpx;
			}
		}

		&.ui-link-large {
			.wrap {
				height: 130rpx;
			}

			.label {
				flex-shrink: 0,
			}
		}

		.icon {
			width: 70rpx;
			height: 70rpx;
			flex-shrink: 0;
			flex-grow: 0;
			display: flex;
			align-items: center;

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.label {
			font-size: 30rpx;
			color: #2F3033;
			display: flex;
			align-items: center;

			.require {
				margin-left: 5rpx;
				color: #FF5151;
			}
		}

		.ext {
			font-size: 36rpx;
			height: 100%;
			display: flex;
			align-items: center;
		}

		.content {
			padding: 0 25rpx 0 10rpx;
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&.no-arrow {
				padding-right: 0;
			}
		}

		.arrow {
			width: 13rpx;
			height: 23rpx;
			flex-shrink: 0;
			flex-grow: 0;
			background: url(@/static/components/icon_link_arrow.png) no-repeat;
			background-size: 100% 100%;
		}
	}
</style>
