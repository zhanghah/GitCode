<template>
	<view class="page-entry">
		<view class="content">
			<image class="entry-image" src="../../static/entry.png" @load="imageLoadedHandler" @tap="toIndex"></image>
			<view class="jummp" v-if="loaded">
				{{time}}s后跳转
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/api';
	const {
		NODE_ENV
	} = process.env;

	export default {
		components: {},
		data() {
			return {
				time: NODE_ENV === 'development' ? 1 : 3,
				timer: null,
				loaded: false,
			}
		},
		computed: {
			...mapState([
				'community',
				'user',
			]),
		},
		methods: {
			createTimer() {
				this.timer = setInterval(() => {
					this.time = this.time - 1;

					if (this.time <= 0) {
						this.clearTimer();

						this.redirectHandler();
					}
				}, 1000);
			},
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					console.log('clearTimer');
					this.timer = null;
				}
			},
			redirectHandler() {
				console.log(222,this.user.userId,this.community.id)
				// if (this.user.token) {
				if (this.user.userId) {
					if (this.community.id) {
						uni.redirectTo({
							url: '/pages/index/index',
						});
					} else {
						uni.redirectTo({
							url: '/pages/entryPages/bind/choosecom?bindHome=1'
						})
					}
				} else {
					uni.redirectTo({
						url: '/pages/entryPages/login/pwd'
					})
				}
			},
			imageLoadedHandler() {
				this.loaded = true;
				this.createTimer();
			},
			toIndex() {
				this.clearTimer();
				this.redirectHandler()
			},
		},
		onLoad() {

		},
		onUnload() {
			this.clearTimer();
		}
	}
</script>

<style scoped>
	.page-entry {

		height: 100vh;
		overflow: hidden;
	}

	.content {
		position: relative;
		z-index: 99;
		height: calc(100vh - var(--status-bar-height));
		width: 100%;
	}

	.entry-image {
		width: 750rpx;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
	}

	.jummp {
		background-color: #FFFFFF;
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		position: absolute;
		top: 84rpx;
		z-index: 1000;
	}

	/* #ifndef MP-WEIXIN */
	.jummp {
		right: 40rpx;
	}

	/* #endif */

	/* #ifdef MP-WEIXIN */
	.jummp {
		left: 40rpx;
	}

	/* #endif */
</style>
