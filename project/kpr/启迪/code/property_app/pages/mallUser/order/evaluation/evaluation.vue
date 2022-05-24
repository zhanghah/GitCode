<template>
	<view class="content">
		<view class="content_evaluation" v-if="mallOrder_GET_date">
			<view class="name_v" v-if="!ispj">
				<text>您对商家/商品还满意吗？</text>
				<view class="xianz">
					<ui-checkbox v-model="islm" style="transform:scale(0.7)"></ui-checkbox>
					<text>匿名提交</text>
				</view>
			</view>
			<view class="sp_v" v-for="(cell,index_s) in mallOrder_GET_date.subOrderList">
				<view class="cell" v-for="(item,index) in cell.goodsInfoVOList">
					<view class="name">
						<u-image class="tx" width="80rpx" height="80rpx" border-radius='5'
							:src="item.goodsResourceDtos?item.goodsResourceDtos[0].fileVisitUrl:''">
						</u-image>
						<text>{{item.goodsName}}</text>
					</view>
					<view class="evaluateBranch">
							<u-rate :count="5" v-model="item.evaluateBranch" active-color="#FFB200" inactive-color="#FFB200" size="40"></u-rate>
					</view>
					<view class="evaluateContent">
						<textarea auto-height v-model="item.evaluateContent"  placeholder="请填写评价"/>
					</view>
					<view class="resourceIds">
						<uni-file-picker v-model="item.imgArr" :auto-upload="false" ref="imag_pic" mode="grid" title="" limit="9"
							file-mediatype="image" @select="(res) => select(res,index,index_s)" @delete='(res) => deleteTap(res,index,index_s)'></uni-file-picker>
					</view>
				</view>
			</view>
		</view>
		<view class="tj">
			<text @click="woEvent">提交</text>
		</view>
	</view>
</template>

<script>
	import order from '../../../../api/mallUser/order.js'
	import api from '@/api/mallUser/api.js'
	import helper from '@/api/mallUser/helper.js'
	
	const baseUrl = helper.websiteUrl
	export default {
		data() {
			return {
				id:'',
				ispj:false,
				islm: false,
				mallOrder_GET_date: null,
				imgArr:[]
			};
		},
		onLoad(option) {
			this.id = option.id
			if( option.ispj){
				this.ispj = option.ispj
			}
			this.mallOrder_GET(option.id)
		},
		methods:{
			// 获取上传状态
			select(e,index,index_s) {
				for (var i = 0; i < e.tempFilePaths.length; i++) {
					this.uoload('/goods/saveGoodEvaluateImgs',e.tempFilePaths[i],index,index_s)
				}
			},
			deleteTap(e,index,index_s) {
				for (let item in this.imgArr ) {
					if(this.imgArr[item].index_s == index_s){
						this.imgArr[item].resourceIds.map((val, idx) => {
							if (val.index == index) {
								val.resourceIds.map((vals, idxs) => {
									if (vals.filePath == e.tempFilePath) {
										this.imgArr[item].resourceIds[idx].resourceIds.splice(idxs, 1)
										console.log('选择文件：', this.imgArr)
										return
									}
								})
							}
						})
					}
				}
				this.mallOrder_GET_date.subOrderList[index_s].goodsInfoVOList[index].filePath.map((dic, i) => {
					if (dic == e.tempFilePath) {
						this.mallOrder_GET_date.subOrderList[index_s].goodsInfoVOList[index].resourceIds.splice(i, 1)
						return
					}
				})
				// .push(res.data[0].id)
			},
			uoload(url,filePath,index,index_s){
				var token = ''
				var token = api.getStorageSync(0)
				console.log(token)
				if (token != null) {
					token = token.token
				} else {
					token = ""
				}
				uni.uploadFile({
					url: baseUrl + url,
					filePath: filePath,
					name: 'file',
					header: {
						'token': token,
					},
					success: (uploadFileRes) => {
						var res = JSON.parse(uploadFileRes.data)
						console.log(res)
						if (res.code != 'success') {
							this.$uniPopup.showToast(res.message)
							return
						} else {
							//商铺
							var imgArr_s ={
								index_s:index_s,
								resourceIds:[]
							}
							//商品
							var imgArr_s2 ={
								index:index,
								resourceIds:[]
							}
							//图片
							var imgArr ={
								fileVisitUrl:res.data[0].fileVisitUrl,
								id:res.data[0].id,
								filePath:filePath
							}
							console.log(this.mallOrder_GET_date.subOrderList)
							this.mallOrder_GET_date.subOrderList[index_s].goodsInfoVOList[index].resourceIds.push(res.data[0].id)
							this.mallOrder_GET_date.subOrderList[index_s].goodsInfoVOList[index].filePath.push(imgArr)
							if(this.imgArr.length==0){
								imgArr_s2.resourceIds.push(imgArr)
								imgArr_s.resourceIds.push(imgArr_s2)
								this.imgArr.push(imgArr_s)
								return
							}
							for (var idx = 0; idx < this.imgArr.length; idx++) {
								if( this.imgArr[idx].index_s == index_s){
									for (var idxs = 0; idxs < this.imgArr[idx].resourceIds.length; idxs++) {
										if(this.imgArr[idx].resourceIds[idxs].index == index){
											this.imgArr[idx].resourceIds[idxs].resourceIds.push(imgArr)
											return
										}else{
											if(idxs == this.imgArr[idx].resourceIds.length-1){
												imgArr_s2.resourceIds.push(imgArr)
												this.imgArr[idx].resourceIds.push(imgArr_s2)
												return
											}
										}
									}
									return
								}else{
									if(idx == this.imgArr.length-1){
										imgArr_s2.resourceIds.push(imgArr)
										imgArr_s.resourceIds.push(imgArr_s2)
										this.imgArr.push(imgArr_s)
										return
									}
								}
							}
						}
					},
					fail: (res) => {
						console.log('图片上传失败', res)
						this.$uniPopup.showToast('图片上传失败')
					}
				});
			},
			woEvent() {
				var that = this
				var subOrderList =  that.mallOrder_GET_date.subOrderList;
				var dateSoures = []
				for (var i = 0; i < subOrderList.length; i++) {
					for (var j = 0; j < subOrderList[i].goodsInfoVOList.length; j++) {
						var resourceIds = []
						var dic = {
							evaluateBranch:subOrderList[i].goodsInfoVOList[j].evaluateBranch,
							evaluateContent:subOrderList[i].goodsInfoVOList[j].evaluateContent,
							orderId:subOrderList[i].id,
							goodsId:subOrderList[i].goodsInfoVOList[j].id,
							shopId:subOrderList[i].mallShopId,
							resourceIds:subOrderList[i].goodsInfoVOList[j].resourceIds
						}
						dateSoures.push(dic)
					}
				}
				console.log(dateSoures)
				order.saveEvaluate(dateSoures).then(res => {
					that.$u.toast(`提交成功！`);
					setTimeout(function() {
						that.$goPage('back')
					}, 500);
				})
			},
			
			/**
			 * 订单详情
			 * @param {Object} id
			 */
			mallOrder_GET(id) {
				var that = this
				order.mallOrder_GET({
					id: id
				}).then(res => {
					var date_list =  res.data ? res.data : [];
					console.log(date_list)
					for (var i = 0; i < date_list.subOrderList.length; i++) {
						for (var j = 0; j < date_list.subOrderList[i].goodsInfoVOList.length; j++) {
							date_list.subOrderList[i].goodsInfoVOList[j]["evaluateBranch"]=""
							date_list.subOrderList[i].goodsInfoVOList[j]["evaluateContent"]=""
							date_list.subOrderList[i].goodsInfoVOList[j]["resourceIds"]=[]
							date_list.subOrderList[i].goodsInfoVOList[j]["imgArrs"]=[]
							date_list.subOrderList[i].goodsInfoVOList[j]["filePath"]=[]
						}
					}
					that.mallOrder_GET_date =date_list
					console.log(date_list)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	/* #ifdef MP */  
	page{background:#F5F5F5;}  
	/* #endif */  

	.content {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		/* #ifdef H5 */
		min-height: 100vh;
		background: #F5F5F5;
		/* #endif */  
	}
	.content_evaluation {
		width: 700rpx;
		display: flex;
		justify-content: center;
		align-content: flex-start;
		flex-wrap: wrap;
		.name_v{
			width: 100%;
			height: 95rpx;
			display: flex;
			padding: 0rpx 20rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 20rpx;
			justify-content: space-between;
			align-items: center;
			text{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #282828;
			}
			.xianz{
				display: flex;
				justify-content: space-between;
				align-items: center;
				text{
					font-size: 28rpx;
					font-weight: 500;
					margin-left: 10rpx;
				}
			}
		}
		.sp_v{
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;
			
			.cell{
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-content: flex-start;
				flex-wrap: wrap;
				margin-top: 20rpx;
				padding:20rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				.name {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #282828;
						margin-left: 15rpx;
					}
				}
				.resourceIds,
				.evaluateContent,
				.evaluateBranch{
					width: 100%;
					margin-top: 30rpx;
					textarea{
						width: 100%;
						height: 150rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
					}
					
				}
			}
		}
	}
	.tj{
		width: 100%;
		height: 140rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		margin-top: 80rpx;
		text{
			width: 450rpx;
			height: 90rpx;
			background: linear-gradient(88deg, #802890 0%, #7928C5 100%);
			border-radius: 45rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			line-height: 90rpx;
		}
		
	}
</style>
