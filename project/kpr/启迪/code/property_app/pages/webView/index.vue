<template>
	<view>
		<web-view :src="address"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:""
			}
		},
		onLoad(option) {
			this.address=option.address
			uni.setNavigationBarTitle({
				title: '首页广告',
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
