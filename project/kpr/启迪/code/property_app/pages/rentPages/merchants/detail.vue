<template>
	<view class="page-merchant-detail">
		<view class="select" @click="choicePosition">
			<view class="label">广告位位置</view>
			<view class="position">{{data.name}}</view>
			<view class="arrow"></view>
		</view>

		<view class="content">
			<view>
				{{address.name||''}}
			</view>
		</view>

		<call-phone :tell="phone"></call-phone>

		<position-select v-if="isShow" @cancel="cancel" @confirm="confirm" :typeId="typeId"></position-select>
	</view>
</template>

<script>
	import api from '@/api';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import callPhone from './components/callPhone.vue'
	import PositionSelect from './components/positoinselect';

	export default {
		components: {
			PositionSelect,
			callPhone
		},
		data() {
			return {
				isShow:false,
				phone:'',
				typeId:'',
				data:{},
				address:'',
			};
		},
		computed: {
			...mapState(['user']),
		},
		onLoad(option) {
			this.typeId = option.id
			this.phone = option.phone
			this.getInfo()
			uni.setNavigationBarTitle({
				title: '招商中心',
			});
		},
		methods: {
			getInfo(id){
				api.lifejf.getInfo({id:this.typeId}).then(res=>{
					console.log(res)
					this.data=res.data
				})
			},
			
			choicePosition(){
				this.isShow = true
			},
			cancel(e){
				this.isShow = e
			},
			confirm(e){
				this.address=e[0]
				console.log(this.address)
				this.isShow=false
			}
		}
		
	}
</script>

<style scoped lang="less">
	.page-merchant-detail {
		min-height: 100vh;
		padding: 25rpx;
		box-sizing: border-box;
	}
	.select {
		width: 100%;
		height: 88rpx;
		border: 1rpx solid #CFCFCF;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 25rpx;
		box-sizing: border-box;
		color: #999;
		font-size: 30rpx;
		margin-bottom: 25rpx;

		.label {
			margin-right: 30rpx;
			flex-shrink: 0;
			flex-grow: 0;
		}

		.position {
			flex: 1;
			color: #333;
		}

		.arrow {
			margin-left: 30rpx;
			flex-shrink: 0;
			flex-grow: 0;
			width: 16rpx;
			height: 29rpx;
			background: url(../static/rent/icon_arrow.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.content {
		font-size: 30rpx;
		color: #333;
	}
</style>
