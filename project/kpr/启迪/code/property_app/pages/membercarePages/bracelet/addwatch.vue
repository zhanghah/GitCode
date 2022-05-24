<template>
	<view class="page-add">
		<view class="block">
			<u-checkbox-group>
				<u-checkbox v-model="checked1" active-color="red" name="checked1" label-size="36rpx" @change="checkboxChange" >手环进入电子围栏</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="block">
			<u-checkbox-group>
				<u-checkbox v-model="checked2" active-color="red" name="checked2" label-size="36rpx" @change="checkboxChange" >手环进入游乐场</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="block">
			<u-checkbox-group>
				<u-checkbox v-model="checked3" active-color="red" name="checked3" label-size="36rpx" @change="checkboxChange" >手环经过蓝牙基站</u-checkbox>
			</u-checkbox-group>
		</view>
		
		<view class="btn" @tap="add">
			<ui-button type='transparent'>确认添加</ui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked1: false,
				checked2: false,
				checked3: false,
			}
		},
		methods: {
			checkboxChange(e) {
				if(e.name=='checked1' && e.value){
					this.checked1=true
					this.checked2=false
					this.checked3=false
				}else if(e.name=='checked2' && e.value){
					this.checked1=false
					this.checked2=true
					this.checked3=false
				}else if(e.name=='checked3' && e.value){
					this.checked1=false
					this.checked2=false
					this.checked3=true
				}
			},
			
			add(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '添加监测事件'
			})
		}
	}
</script>

<style lang="less" scoped>
	.page-add {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F5F5F5;
	}

	.block {
		margin: 30rpx;
		background-color: #FFFFFF;
		border-radius: 4rpx;
		padding: 30rpx;

	}
	
	.btn{
		width: 50%;
		margin: 58rpx auto;
	}
</style>
