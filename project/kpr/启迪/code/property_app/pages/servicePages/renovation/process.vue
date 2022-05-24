<template>
	<view class="page-process">
		<view v-if="content">
			<u-parse :html="content" :lazy-load="true"></u-parse>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import api from '@/api';
	export default {
		data() {
			return {
				content: '',
			}
		},
		computed: {
			...mapState(["community"]),
		},
		methods: {
			getData() {
				api.service.getDecorationProcess().then(res => {
					if (res.status != '0') {
						return
					};
					if(res.data){
						this.content = res.data.content
					}else{
						uni.showToast({
							icon:'none',
							title:'该小区暂无装修办理流程'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				})
			}
		},
		mounted() {
			this.getData()
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '装修办理流程'
			})
		}
	}
</script>

<style>
</style>
