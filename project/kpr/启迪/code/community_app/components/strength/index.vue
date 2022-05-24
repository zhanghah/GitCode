<template>
  <view class="strength">
    <view class="level">
      <view :class="['item', `item${index}`, { active: state }]" v-for="(state, index) in level" :key="index"></view>
    </view>

    <view class="state">
      {{text}}
    </view>
  </view>
</template>

<script>

	export default {
    name: 'Strength',
		components: {
    },
    props: {
			value: {
				type: String,
				default: '',
			},
		},
		computed: {
			score() {
				let score = 0;
				// 1. 密码长度
				if (this.value.length <= 5) {
					score += 5;
				} else if (5 < this.value.length && this.value.length <= 7) {
					score += 10;
				} else {
					score += 25;
				}

				// 2. 字母
				const str = this.value.match(/[a-z]/ig);
				if (str) {
					if (str.length === 1) {
						score += 10;
					} else if (str.length >= 3) {
						score += 20;
					}
				}

				// 3. 数字
				const num = this.value.match(/[0-9]/g);
				if (num) {
					if (num.length === 1) {
						score += 10;
					} else if (num.length >= 3) {
						score += 20;
					}
				}
				
				// 4. 符号
				const v = this.value;
				const flength = v.replace(/[0-9a-z]/ig, '').length;
				console.log('flength', flength.length);
				if (flength === 1) {
					score += 10;
				} else if (flength > 1) {
					score += 30;
				}
				return score;
			},
			level() {
				const l = [false, false, false];

				if (this.score >= 25) {
					l[0] = true;
				}

				if (this.score >= 50) {
					l[1] = true;
				}

				if (this.score >= 70) {
					l[2] = true;
				}
				return l;
			},
			text() {
				const state = this.level.filter(a => a);

				if (state.length <= 1) {
					return '弱';
				} else if (state.length == 2) {
					return '一般';
				} else if (state.length == 3) {
					return '强';
				}

				return '';
			},
		},
		data() {
			return {
			}
		},
		methods: {
		},
		beforeMount() {
		},
	}
</script>

<style scoped lang="less">
  .strength {
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.level {
			display: flex;

			.item {
				width: 144rpx;
				height: 8rpx;
				background: #CCCCCC;
				margin-right: 10rpx;

				&.item0.active {
					background: #3093FF;
				}

				&.item1.active {
					background: #1C89FF;
				}

				&.item2.active {
					background: #1B76FF;
				}
			}
		}

		.state {
			color: #3093FF;
			font-size: 30rpx;
		}
	}
</style>
