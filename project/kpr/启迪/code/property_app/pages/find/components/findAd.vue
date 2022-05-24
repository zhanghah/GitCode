<template>
	<view class="find-ad">
		<ad-block :source="source"></ad-block>
	</view>
</template>

<script>
	export default {
    name: 'FindAd',
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
  .find-ad {
		width: 100%;
		height: 300rpx;
  }
</style>
