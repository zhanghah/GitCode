<template>
	<view :class="['ui-checkbox', { active: state, disabled }]" @tap="changeHandler"></view>
</template>

<script>
	export default {
		name: 'CheckBox',
		components: {},
		props: {
			value: {
				type: Boolean,
				default: false,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				state: false,
			}
		},
		methods: {
			changeHandler() {
				if (this.disabled) {
					return;
				}
				this.state = !this.state
				this.$emit('input', this.state);
			}
		},
		watch:{
			value(e){
				this.state = e
			}
		},
		beforeMount() {
			this.state = this.value
		},
	}
</script>

<style scoped lang="less">
	.ui-checkbox {
		width: 42rpx;
		height: 42rpx;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 100% 100%;
		background-image: url(@/static/components/icon_checkbox.png);
		border-radius: 50%;
		overflow: hidden;

		&.disabled {
			background-color: #E6E6E6;
		}

		&.active {
			background-image: url(@/static/components/icon_checkbox_active.png);
		}
	}
</style>
