/**
 * http 请求封装
 * @author tangsj
 * @param {*} url  请求地址
 * @param {*} options 请求参数
 */
import config from '../config';
import utils from '../utils';
import store from '../store';

// 记录请求中的请求数，控制loading显示
let requestCount = 0;
let hasError = false;

export function fetch(url, options) {
	const {
		token: Authorization,
		userId: userId
	} = store.state.user;
	const {
		id
	} = store.state.community

	const header = {
		comId: id,
		Authorization,
		userId,
		'EM-Access-identity': 'TzPKhtYtj+osi/g/1U9G6FdRfmDyvVkJ4KpsWApSOfuyNsq409xbDhShCGFooTNg04ChBYpLXMp4fI+hZlhGCNftxxjxfbRI3DZcjT+ErmHyUHH8O3PBJ6qO0mOqUthRJMgdh3DfDgg7NUDELWvztPKKdtuuoBmhqcNEqGkie9xdQotdV1ewdE9RbpWjcTy0p1q+FzYc4blpG/1s38OzQvjgDL1CInhsYlP58kiKU2KkFpQB3yEem8w8KQLZUvtOoKc8agycUHo+XlbqlFBA8haAGsFg5dzv7+ILceVTxDWzh+xTpwHNv9Ssa88ALVQ+zRUXeJhFUpXnuWG8eSnjphQW5tBM0xL9zu8mGyZsLz+I7WNyUYVcVA7V0OexyIT+ydgKHsM4v1w/JQ4m2NPTmW4Xl/HPehDpUTqX9QEP6c/3xZ2Hrw4G9tJJcntJeH7EKE8cnWRf8NTbYuCJmDg5T9Mnjai/c3DYQeZiwN2QZIx6RNshQXON5pq/pmIORh9yb1YjJIdu5jJ+NrrR82U3QQTFjrqIeyw9Xdwzk3rmfroqpryV/P7WP7K0YOfJM0ZLPE4198Uj+SLx3YqUYCNpBAyojrfD55d/00UU2g10AWur6Ehx+dLhJVIid9UyuGF47nIfN/mjROgx8g03JyMVOPHvfAIVIMvhfX6JS7boQ10=',
		'platform-Access-identity': 'PPUq9W2uiS9acnm4bBSkGEUcb5Kj9LqoZiJ2vht23SLHCHvhnQhx0I+xUi0jWu9mxiF8+zXT0wWiZhFGrr1UAGoO+BaF0BWtByJH5yBqAp0L/gH5gPVwgew+1PSA+k3+9rusqz0rar38KaO8miSpoFfYNuHVrMp7qQDj/9xA0oI3mm1gpa75bKAFkR6AjSWGjMZvm5n8DVazMIkteMfH5ohRdujhfXrEYEN1zAsadRjn/V6XvWnzIt2d275/g1vE5Z1d9nSd6gylGrpmdaANZhI3Yp2bbMPqgwWfW6Tf27XhsycHr/Cf0478AYlYYsZN1CKMkg1xC0m4tlQUWGPtrkTLHxcUGe+A4TfiS42ssrPxwOmnj7IEyhUiW2NruSXYiwncKDqNDN4V4w8na9w+yHn9i8dQWhSqxZWvF2xfuLg6ybvpij7nnnlhES+NOOHkK9XfqAAnqdq0a3Z4a/cffHuN6noEL6eFXn6WxnP2/mQ2c1C1trqhXcPB+6/Pygd2RX5rNwsrxOfi5mpYnWk7J99aWH5R6G8HVb3WR0lCWvu3iLkVMJLakgR/+zznsjM/TwFwcZk+068/NZ8mQ8+0iD1cVUt4hDb0abAqou+YnnXz1hcbvPOToTARsMYyvoJQlYuosIsGaO5I0ljE/6yOGQeKgDzOcrQZl3+bgm/ln3A='
	};

	options = Object.assign({
		loading: true,
		method: 'GET',
		data: {},
		holdTip: false,
	}, options);

	return new Promise((resolve, reject) => {
		if (requestCount === 0 && options.loading) {
			hasError = false;
			uni.showLoading({
				title: '加载中...',
				mask:true
			});
		}
		requestCount += 1;
		uni.request({
			url: `${config.apiRoot}${url}`,
			data: options.data,
			method: options.method,
			header,
			success: (res) => {
				console.log(res)
				if (res.statusCode < 200 || res.statusCode > 300 || Number(res.data.status) !== 0 &&
					res.data.code != 'success') {
					if (!options.holdTip) {
						uni.showToast({
							title: res.data.msg || res.data.failMessages[0].message ||
								'服务器异常！',
							icon: 'none',
						});
						hasError = true;
					}
					return reject(res.data || {});
				}
				return resolve(res.data || {});
			},
			fail: () => {
				hasError = true;
				uni.showToast({
					title: '服务器异常！',
					icon: 'none',
				});
				reject({
					msg: '服务器异常！',
				});
			},
			complete: () => {
				requestCount -= 1;
				if (requestCount === 0 && options.loading) {
					if (hasError) {
						setTimeout(() => {
							uni.hideLoading();
						}, 2000);
					} else {
						uni.hideLoading();
					}
				}
			},
		});
	});
}

const http = {
	get(url, data = {}, options = {}) {
		return fetch(url, {
			method: 'GET',
			data: data.params,
			...options,
		});
	},
	post(url, data = {}, options = {}) {
		if (data.params) {
			// 将param放到url 参数里面
			const query = utils.buildQueryString(data.params);
			url += `?${query}`;
			delete data.params;
		}
		return fetch(url, {
			method: 'POST',
			data,
			...options,
		});
	},
	put(url, data = {}, options = {}) {
		if (data.params) {
			// 将param放到url 参数里面
			const query = utils.buildQueryString(data.params);
			url += `?${query}`;
			delete data.params;
		}
		return fetch(url, {
			method: 'PUT',
			data,
			...options,
		});
	},

};

export default http;
