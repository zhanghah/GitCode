<template>
	<view class="page-example">
		<view class="components">
			<ui-tabs :dataList="tabList" initKey="xf"></ui-tabs>
		</view>

    <view class="code">
      
    </view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		components: {
		},
		data() {
			return {
				tabList: [
          {
            label: '新房',
            key: 'xf',
          },
          {
            label: '二手房',
            key: 'esf',
          },
          {
            label: '租房',
            key: 'zf',
          },
        ],
			}
		},
		computed: {
			...mapState([
				'community',
				'user',
			]),
		},
		methods: {
     
		},
		onLoad() {
			
		},
		onUnload() {
		}
	}
</script>

<style scoped>
	.page-example {
		padding-bottom: 110rpx;
	}
	.nav-wrap {
		background: #222;
	}
</style>
