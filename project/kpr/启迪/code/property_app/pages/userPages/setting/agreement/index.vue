<template>
	<view class="agreement">
		<template v-if="data">
			<view v-html="data.userAgreement">

			</view>
		</template>
	</view>
</template>

<script>
	import api from '@/api'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				data: ''
			}
		},
		computed: {
			...mapState([
				'user',
			]),
		},
		methods: {
			getAgreement() {
				api.my.getOne({}).then(res => {
					if (res) {
						this.data = res.data
						console.log(res)
					}
				})
			}
		},
		beforeMount() {
			this.getAgreement()
			uni.setNavigationBarTitle({
				title: '使用条款及用户协议',
			});
		},
	}
</script>

<style>
	.agreement {
		padding: 20rpx;
	}
</style>
