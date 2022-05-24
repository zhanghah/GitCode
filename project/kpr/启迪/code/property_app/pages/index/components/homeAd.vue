<template>
	<view class="home-ad" >
    <ad-block :source="source"  ></ad-block>
	</view>
</template>

<script>
	export default {
    name: 'HomeAd',
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
		methods: {
		},
		beforeMount() {
		},
	}
</script>

<style scoped>
  .home-ad {
		width: 100%;
		height: 340rpx;
  }
</style>
