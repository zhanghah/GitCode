// 引入工具类
import request from './request.js'
import uniPopup from './popup.js'
import api from './api.js'

export default {
	
	/**
	 * 查询店铺分类列表
	 * @param {Object} data
	 */
	mallShopsClassification(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallShopsClassification/list', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询店铺列表
	 * @param {Object} data
	 */
	mallShop(data) {
		var shuju = data 
		
		var address = api.getStorageSync(3)
		if (address != null && address.length !=0) {
			var getLocation = JSON.parse(address)
			shuju['userLongitude']=getLocation.longitude
			shuju['userLatitude']=getLocation.latitude
		}else{
			shuju['userLongitude']="106.525595"
			shuju['userLatitude']="29.554545"
		}
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallShop/list', shuju, null, true)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询店铺
	 * @param {Object} data
	 */
	mallShop_id(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/mallShop/' + data.id, data, 'application/x-www-form-urlencoded', true)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},

	/**
	 * 查询店铺  商品分组
	 * @param {Object} data
	 */
	mallShop_findRootList(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/category/findRootList/' + data.shopId, data, 'application/x-www-form-urlencoded',true)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询店铺  查询产品信息列表
	 * @param {Object} data
	 */
	mallShop_spuInfoList(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/goods/findList',data,null,true)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 根据商品id查询店铺配送设置
	 * @param {Object} data
	 */
	shopDelivery_findInfo(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/shopDelivery/findShopDeliveryList/' + data.shopId,data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 根据商品id查询商品分类明细
	 * @param {Object} data
	 */
	getListByGoodsId(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/goodsCategoryDetailed/getListByGoodsId/' + data.goodsId,data,'application/x-www-form-urlencoded',true)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 根据产品id查询商品列表信息(不含分页)
	 * @param {Object} data
	 */
	findListBySpuId(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/goods/findListBySpuId/' + data.spuId,data,'application/x-www-form-urlencoded',true)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},


	/**
	 * 查询商品列表（带分页）
	 * @module 	查询商品列表（带分页）
	 */
	findList(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/goods/findList', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询商品
	 * @param {Object} data
	 */
	goods_id(data) {
		uniPopup.showLoading('加载中')
		return new Promise((resolve, reject) => {
			request.axios('GET', '/goods/' + data.id, data)
				.then((res) => {
					if (res.code == 'success') {
						uniPopup.hideLoading(500)
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},

	/**
	 * 获取商品评价列表(带分页)
	 * @param {Object} data
	 */
	findEvaluateList(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/goods/findEvaluateList', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},







	/**
	 * 保存购物车
	 * @param {Object} data
	 */
	mallShoppingCart(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallShoppingCart', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},

	/**
	 * 查询购物车列表
	 * @param {Object} data
	 */
	mallShoppingCartList(data) {
		uniPopup.showLoading('加载中')
		return new Promise((resolve, reject) => {
			request.axios('POST', '/mallShoppingCart/list', data)
				.then((res) => {
					if (res.code == 'success') {
						uniPopup.hideLoading(200)
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 删除购物车
	 * @param {Object} data
	 */
	mallShoppingCartDELETEt(data) {
		return new Promise((resolve, reject) => {
			request.axios('DELETE', '/mallShoppingCart/' + data.id, data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 修改购物车
	 * @param {Object} data
	 */
	cartGoodsNumber(data) {
		return new Promise((resolve, reject) => {
			request.axios('PUT', '/mallShoppingCart/cartGoodsNumber', data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询购物车统计
	 * @param {Object} data
	 */
	goodsTypeNumberAndTotalPrice(data) {
		return new Promise((resolve, reject) => {
			request.axios('GET', '/mallShoppingCart/goodsTypeNumberAndTotalPrice', data,'application/x-www-form-urlencoded')
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 查询商品浏览的历史记录列表
	 * @param {Object} data
	 */
	spuViewHistory_list(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/spuViewHistory/list', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	/**
	 * 保存用户浏览的历史记录
	 * @param {Object} data
	 */
	spuViewHistory_save(data) {
		return new Promise((resolve, reject) => {
			request.axios('POST', '/spuViewHistory/save', data)
				.then((res) => {
					if (res.code == 'success') {
						resolve(res)
					}
				}).catch(res => {
					reject(res.failMessages)
				});
		})
	},
	

}
