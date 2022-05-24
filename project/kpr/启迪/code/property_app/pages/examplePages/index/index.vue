<template>
	<view class="page-example">
		<view class="nav-wrap">
			<nav-bar title="组件示例" :useBack="true">
				<template slot="option">
				</template>
			</nav-bar>
		</view>

		<view class="components">
			<ui-link label="菜单栏" @click.native="toInfo('navbar')"></ui-link>
			<ui-link label="导航栏" @click.native="toInfo('tabbar')"></ui-link>
			<ui-link label="Link" @click.native="toInfo('link')"></ui-link>
			<ui-link label="按钮" @click.native="toInfo('button')"></ui-link>
			<ui-link label="输入框" @click.native="toInfo('input')"></ui-link>
			<ui-link label="复选/单选框" @click.native="toInfo('checkbox')"></ui-link>
			<ui-link label="密码强度" @click.native="toInfo('strength')"></ui-link>
			<ui-link label="表单选择器" @click.native="toInfo('formpicker')"></ui-link>
			<ui-link label="表单日期" @click.native="toInfo('formdate')"></ui-link>
			<ui-link label="表单输入框" @click.native="toInfo('forminput')"></ui-link>
			<ui-link label="图片上传" @click.native="toInfo('imageupload')"></ui-link>
			<ui-link label="广告区块" @click.native="toInfo('adblock')"></ui-link>
			<ui-link label="无结果显示" @click.native="toInfo('noresult')"></ui-link>
			<ui-link label="Tab切换" @click.native="toInfo('tabs')"></ui-link>
			<ui-link label="加减器" @click.native="toInfo('adder')"></ui-link>
			<ui-link label="底部弹窗" @click.native="toInfo('modal')"></ui-link>
			<ui-link label="车牌输入(参考停车缴费页)"></ui-link>
			<ui-link label="验证码输入(参考验证码登录页)"></ui-link>
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
			toInfo(target) {
				uni.navigateTo({
					 url: `../demos/${target}`,
				});
			}
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
