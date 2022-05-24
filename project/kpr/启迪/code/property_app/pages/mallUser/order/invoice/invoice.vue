<template>
	<view class="content_mall">
		<view class="invoice">
			<view class="lx">
				<text class="name">类型</text>
				<view class="nav">
					<text :class="isNav==index?'act':''" v-for="(item,index) in navDate" :key='index'
						@click="isNav=index">{{item}}</text>
				</view>
			</view>
			<view class="cell">
				<text class="name">抬头</text>
				<input type="text" value="" placeholder="请填写准确的抬头名称"/>
			</view>
			<view class="cell">
				<text class="name">税号</text>
				<input type="text" value="" placeholder="请填写公司税号"/>
			</view>
			
			<text class="ts">可咨询公司财务部门获得【税号】或【社会信用代码】信息</text>
		</view>
		<text class="ann" @click="">保存</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isNav: 0,
				navDate: ['公司', '个人', '非企业单位' ]
			};
		}
	}
</script>

<style lang="less" scoped>
	.content_mall {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}
	.invoice {
		width: 100%;
		margin-top: 20rpx;
		background: #FFFFFF;
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 0rpx 20rpx;
		.lx{
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			margin-top: 40rpx;
			.name{
				width: 120rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282828;
				height: 56rpx;
				line-height: 56rpx;
			}
			.nav{
				width: calc(100% - 120rpx);
				display: flex;
				justify-content: flex-start;
				align-content: flex-start;
				flex-wrap: wrap;
				text{
					height: 56rpx;
					padding: 0rpx 34rpx;
					border: 1rpx solid #999999;
					border-radius: 10rpx;
					line-height: 52rpx;
					margin-right: 20rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #282828;
					margin-bottom: 20rpx;
				}
				.act{
					background: #F6EEF7;
					border: 1rpx solid #802890;
				}
			}
		}
		.cell{
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: 40rpx;
			height: 90rpx;
			border-bottom: 1rpx solid #DFDFDF;
			.name{
				width: 120rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282828;
				height: 56rpx;
				line-height: 56rpx;
			}
			input{
				width: calc(100% - 120rpx);
				
			}
		}
		.ts{
			width: 100%;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			margin-top: 50rpx;
		}
	}
	
	
	.ann {
		width: 450rpx;
		height: 90rpx;
		background: linear-gradient(88deg, #802890 0%, #7928C5 100%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 90rpx;
		text-align: center;
		position: fixed;
		bottom: 50rpx;
		left: 150rpx;
	}
</style>
