<!-- 省市区选择器页 -->
<template>
	<view class="page">
		<!-- 固定默认值 -->
		<view class="row">
			<text class="name">所在位置：</text>
			<view class="value">
				<biaofun-region :defaultValue="['山西省', '大同市', '南郊区']" @change="onChangeRegion"></biaofun-region>
			</view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>
		
		<!-- 不固定默认值 -->
		<view class="row">
			<text class="name">所在位置：</text>
			<view class="value">
				<biaofun-region :defaultValue="defaultValue" @change="onChangeRegion"></biaofun-region>
			</view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>
	</view>
</template>

<!-- 页面数据，页面逻辑 -->
<script>
let _this;
let _app = getApp();
import biaofunRegion from '@/components/biaofun-region/biaofun-region.vue';
export default {
	/**
	 * 页面用到的组件
	 */
	components: {
		biaofunRegion
	},

	/**
	 * 页面数据
	 */
	data() {
		return {
			defaultValue: ['山西省', '大同市', '南郊区'], // 默认值
		};
	},

	/**
	 * 页面函数
	 */
	methods: {
		/**
		 * 确认选择省市区
		 * @param {Array(Object)} region 省市区数据
		 */
		onChangeRegion(region) {
			console.log('选择的省市区数据：', region);
		},
	}
};
</script>

<!-- 页面样式 -->
<style lang="scss" scoped>
.page {
	padding: 0 30upx;
}

.row {
	display: flex;
	height: 100upx;
	align-items: center;
	color: #040506;
	border-bottom: 1upx solid rgba($color: #707070, $alpha: 0.3);
}

.row:active {
	opacity: 0.8;
}

.name {
	flex-shrink: 0;
}

.value {
	flex: 1;
}

.right-icon {
	color: #707070;
}
</style>
