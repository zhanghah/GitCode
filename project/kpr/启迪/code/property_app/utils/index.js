import dayjs from 'dayjs';

import reg from './reg';
import module from '../config/module.json';

export const formatDate = (value = Date.now(), exp = 'YYYY-MM-DD HH:mm:ss') => dayjs(value).format(exp);

const utils = {
	reg,
	formatDate,
	buildQueryString(params) {
		const esc = encodeURIComponent;
		const query = Object.keys(params)
			.map(k => `${esc(k)}=${esc(params[k])}`)
			.join('&');
		return query;
	},
	moduleRedirect(item, redirect = false) {
		if (!item.code) {
			return;
		}
		const target = module.filter(m => m.code === item.code)[0];

		if (target && target.page) {
			if (redirect) {
					uni.redirectTo({
						url: target.page,
					});
			} else {
				// 如果需要判断有无房屋,有房屋则跳转，无房屋则提示且禁止跳转
				if(item.checked){
					let myhouse= uni.getStorageSync('my_house')
					if(myhouse.length){
						let values=uni.getStorageSync('recently_used')
						// 如果缓存中最近使用数据为空
						if(!values){
							let recentlyUsed=[]
							recentlyUsed.push(item.name)
							uni.setStorageSync('recently_used',recentlyUsed)
						}else{
							// 如果缓存中不存在该菜单
							if(values.indexOf(item.name)==-1){
								// 如果缓存中小于4
								if(values.length<4){
									values.unshift(item.name);
									uni.setStorageSync('recently_used',values)
								}else{
									values.pop()
									values.unshift(item.name);
									uni.setStorageSync('recently_used',values)
								}
							}else{
								// 缓存中存在
								// 查找该菜单在数组中位置
								let index = values.indexOf(item.name);
								let first = values.splice(index , 1)[0];
								values.unshift(first);
								uni.setStorageSync('recently_used',values)
							}
						}
						uni.navigateTo({
							url: target.page,
							fail: (res) => {
								console.log(res);
								console.log(target);
							},
						});
					}else{
						uni.showToast({
							icon:'none',
							title:'请先绑定房屋'
						})
					}
				}else{
					let values=uni.getStorageSync('recently_used')
					// 如果缓存中最近使用数据为空
					if(!values){
						let recentlyUsed=[]
						recentlyUsed.push(item.name)
						uni.setStorageSync('recently_used',recentlyUsed)
					}else{
						// 如果缓存中不存在该菜单
						if(values.indexOf(item.name)==-1){
							// 如果缓存中小于4
							if(values.length<4){
								values.unshift(item.name);
								uni.setStorageSync('recently_used',values)
							}else{
								values.pop()
								values.unshift(item.name);
								uni.setStorageSync('recently_used',values)
							}
						}else{
							// 缓存中存在
							// 查找该菜单在数组中位置
							let index = values.indexOf(item.name);
							let first = values.splice(index , 1)[0];
							values.unshift(first);
							uni.setStorageSync('recently_used',values)
						}
					}
					uni.navigateTo({
						url: target.page,
						fail: (res) => {
							console.log(res);
							console.log(target);
						},
					});
				}
			}
		} else {
			console.log(`模块【code: ${item.code}】未指定路由地址，请在config/module.json中指定`);
		}
	},
}

export default utils;
