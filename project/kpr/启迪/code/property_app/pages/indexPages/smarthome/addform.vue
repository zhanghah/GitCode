<template>
	<view class="page-smarthome-addform">
		<view class="addform">
			<ui-link label="设备名称" :arrow="false" :border="false">
				<input slot="ext" placeholder="请输入家居名称" class="link-ext" v-model="shebeiName" />
			</ui-link>
			<ui-link label="设备类型" @tap="toTypePage">
				<view slot="ext" :class="['link-ext', {'inactivated': !shebeiType}]">
					{{shebeiType|| '请选择'}}
				</view>
			</ui-link>
			<ui-link label="设备编号" @tap="toTypePage">
				<view slot="ext" :class="['link-ext', {'inactivated': !shebeiType}]">
					{{shebeiType|| '请选择'}}
				</view>
			</ui-link>
			<ui-link label="规格型号" @tap="toTypePage">
				<view slot="ext" :class="['link-ext', {'inactivated': !shebeiType}]">
					{{shebeiType|| '请选择'}}
				</view>
			</ui-link>
			<ui-link label="设备品牌" @tap="toTypePage">
				<view slot="ext" :class="['link-ext', {'inactivated': !shebeiType}]">
					{{shebeiType|| '请选择'}}
				</view>
			</ui-link>
			<ui-link label="所在房间" @tap="toTypePage">
				<view slot="ext" :class="['link-ext', {'inactivated': !shebeiType}]">
					{{shebeiType|| '请选择'}}
				</view>
			</ui-link>
		</view>
		
		<view class="submit">
			<view class="btn" @tap="add">
				<ui-button >确认添加</ui-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shebeiName:'',
				shebeiType:'',
			}
		},
		methods: {
			toTypePage(){
				uni.navigateTo({
					url:"./type"
				})
			},
			add(){
				console.log(125)
				uni.navigateBack({
					delta:4
				})
			},
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: "添加智能设备",
			});
		}
	}
</script>

<style lang="less" scoped>
	.page-smarthome-addform {
		width: 100%;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;

		.addform {
			margin-top: 32rpx;
			border-bottom: 1rpx #EEEEEE solid;

			.link-ext {
				max-width: 450rpx;
				font-size: 30rpx;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: right;
				
				&.inactivated {
					color: #999999;
				}
			}
		}
		
		.submit {
			width: 100%;
			position: fixed;
			bottom: 130rpx;
			left: 0rpx;
			height: 82rpx;
			z-index: 9;
			padding: 0 24rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		
			.btn {
				width: 100%;
			}
		}
	}
</style>
