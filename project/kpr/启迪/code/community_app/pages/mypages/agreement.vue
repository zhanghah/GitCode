<template>
	<view class="agreement">
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			使用条款及用户协议
		</nav-bar>
		<template v-if="data">
			<view v-html="data.userAgreement">

			</view>
		</template>
	</view>
</template>

<script>
	import api from '@/api'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				data: {
					userAgreement: '<p><strong>重要提示：</strong><strong>请您仔细阅读以下条款，并确认您已完全理解本协议之规定，尤其是免除及限制责任的条款、知识产权条款、法律适用及争议解决条款。</strong><p>如您对本声明或本协议任何条款有异议，请停止注册或使用简书（包括jianshu.com、名称为“简书”的手机端、电脑等设备客户端应用程序，下同）软件及所提供的全部服务。</p><p><strong>一、序言</strong> </p><p> 1、您使用简书软件和/或服务，即视为您签署了本协议，表明您自愿接受本协议全部条款的约束，本协议将构成您与上海佰集科技有限公司（以下称我公司）就“简书”软件及服务（以下统称“简书”）之间具有约束力的法律文件。无论您是进入简书浏览网页，还是在简书上发布任何内容，或者是直接或通过各类方式（如站外API引用等）间接使用简书的行为，都将被视作已无条件接受本声明所涉全部内容。</p><p>2、我公司有权利对本协议进行修改，我公司将在简书相关页面公告或发送通知等方式公布修改的内容，修改后的协议一经公布即有效的代替原协议。如果您不同意本协议的修改，请立即停止访问或使用简书或取消已经获得的服务；如果您选择继续访问或使用简书，则视为您已接受本协议的修改。</p><p>3、本协议所列明的条款，并不能完全涵盖您与我公司之间所有的权利和义务。因此，我公司不定期公布的其他声明、规则、子协议等均视为本协议之补充协议，为本协议不可分割的组成部分，与本协议具有同等法律效力。</p><p>4、如本协议与简书的补充协议不一致，以补充协议内容为准。</p></p>'
				}
			}
		},
		computed: {
			...mapState([
				'user',
			]),
		},
		methods: {

		},
		beforeMount() {
		},
	}
</script>

<style>
	.agreement {
		padding: 20rpx;
		min-height: 100vh;
	}
</style>
