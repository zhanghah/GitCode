<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				islm: false,
				mallOrder_GET_date: null,
			}
		},
		onLoad(option) {
			this.id = option.id
			this.mallOrder_GET(option.id)
		},
		methods: {
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

<style scoped lang="less">

</style>
