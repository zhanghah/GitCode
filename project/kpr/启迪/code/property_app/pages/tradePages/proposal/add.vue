<template>
	<view>
		<nav-bar-new :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			物业建议
		</nav-bar-new>
		<view class="conter">
			<view class="item">
				<view class="item_name">
					<text>*</text>
					标题
				</view>
				<view class="item_input">
					<input type="text" v-model="form.title" maxlength="15" placeholder="请输入信息标题" placeholder-class="placeholder" />
				</view>
				<view class="item_limit">
					0/15
				</view>
			</view>
			
			<view class="frame">
				<view class="frame_title">
					<text>*</text>
					内容
				</view>
				<view class="textarea">
					<textarea v-model="form.content" placeholder="请输入内容" placeholder-class="placeholder" />
				</view>
			</view>
			<!-- 发布 -->
			<view class="release">
				<view class="submit_btn" @tap="submit">提交建议</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	
	export default {
		data() {
			return {
				form: {
					title:'',
					content:'',
				},
			}
		},
		methods: {
			// 发起
			async submit() {
				this.form.title = this.form.title.replace(/\s*/g,'');
				if(!this.form.title){
					this.$toast('请填写标题');
					return false;
				}
				this.form.content = this.form.content.replace(/\s*/g,'');
				if(!this.form.content){
					this.$toast('请填写内容');
					return false;
				}
				var param = {
					title:this.form.title,
					content: this.form.content,
				}
				const res = await api.trade.addPropose(param)
				if (res) {
					setTimeout(() => {
						this.$toast(res.msg);
					},200);
					setTimeout(() => {
						uni.navigateBack();
					},1800);
				}
			},
		}
	}
</script>

<style lang="less">
page {
	background: #f5f5f5;
}
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.item {
		width: 100%;
		padding: 27rpx 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 20rpx;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
		.item_name {
			width: 130rpx;
			font-size: 30rpx;
			color: #333333;
			text {
				color: #F05050;
				font-size: 22rpx;
			}
		}
		.item_input {
			flex: 1;
			input {
				width: 100%;
				border: none;
				outline: none;
			}
			.placeholder {
				color: #AAAAAA;
				font-size: 30rpx;
			}
		}
		.item_limit {
			color: #AAAAAA;
			font-size: 24rpx;
			margin-left: 24rpx;
			display: -webkit-flex;
			align-items: center;
			image {
				width: 20rpx;
				height: 11rpx;
			}
		}
		.item_type {
			flex: 1;
			justify-content: flex-end;
			.uni-input {
				color: #282828;
				font-size: 30rpx;
			}
		}
	}
	.frame {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 20rpx;
		.frame_title {
			width: 100%;
			font-size: 30rpx;
			color: #333333;
			margin-bottom: 27rpx;
			text {
				color: #F05050;
				font-size: 22rpx;
			}
		}
		.textarea {
			width: 100%;
			margin-bottom: 30rpx;
			textarea {
				width: 100%;
				height: 300rpx;
				border: none;
				font-size: 30rpx;
			}
			.placeholder {
				color: #AAAAAA;
				font-size: 30rpx;
			}
		}
	}
	.release {
		padding: 30rpx 0;
	}
}
</style>
