<template>
	<view class="page-example">
		<view class="components">
      <view class="nav-wrap">
        <nav-bar title="导航示例" :useBack="true">
          <template slot="option">
          </template>
        </nav-bar>

        <nav-bar title="导航示例" :useBack="false">
          <template slot="option">
          </template>
        </nav-bar>

        <nav-bar title="导航示例" :useBack="false">
          <template slot="option">
            操作区
          </template>
        </nav-bar>
      </view>
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
