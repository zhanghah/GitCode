<template>
	<view class="service-ad">
    <ad-block :source="source"></ad-block>
	</view>
</template>

<script>
	export default {
    name: 'ServiceAd',
		components: {
		},
		props: {
			source: {
				type: Array,
				default() {
					return [];
				},
			},
		},
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style scoped>
  .service-ad {
		width: 100%;
		height: 300rpx;
  }
</style>
