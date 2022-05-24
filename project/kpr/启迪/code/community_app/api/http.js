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
  const { token: Authorization, id: userId, comId: comId } = store.state.user;

  const header = {
    comId,
    Authorization,
    userId,
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
      // uni.showLoading({
      //   title: '加载中...',
      // });
    }

    requestCount += 1;
    uni.request({
      url: `${config.apiRoot}${url}`,
      data: options.data,
      method: options.method,
      header,
      success: (res) => {
        if (res.statusCode < 200 || res.statusCode > 300 || Number(res.data.status) !== 0) {
          if (!options.holdTip) {
            uni.showToast({
              title: res.data.msg || '服务器异常！',
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
          title: '服务器异常！！',
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
            // setTimeout(() => {
            //   uni.hideLoading();
            // }, 2000);
          } else {
            // uni.hideLoading();
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
};

export default http;
