<template>
	<view class="page-visitor-course">
		<view class="course">
			<image src="../../../static/access/course.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title:'门禁教程'
			})
		},
	}
</script>

<style lang="less" scoped>
	.page-visitor-course{
		min-height: 100vh;
		
		.course{
			image{
				width: 100%;
				height: 100vh;
			}
		}
	}
</style>
