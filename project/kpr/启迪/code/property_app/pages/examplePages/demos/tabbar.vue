<template>
	<view class="page-example">
		<view class="components">
			<tab-bar :setting="tabBar"></tab-bar>
		</view>

    <view class="props">
      
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
				tabBar: {
          color: "#7A7A7C",
	        selectedColor: "#1B76FF",
          list: [
            {
              pagePath: "/pages/rentPages/index/index",
              iconPath: '',
              selectedIconPath: '',
              text: "租售"
            },
            {
              pagePath: "/pages/rentPages/entrust/index",
              iconPath: '',
              selectedIconPath: '',
              text: "委托"
            },
          ],
        },
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
