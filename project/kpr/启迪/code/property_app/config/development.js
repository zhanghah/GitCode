//#ifdef H5
const baseUrl = '';
//#endif

//#ifndef H5
const baseUrl = 'https://community.tuscq.com';
// const baseUrl = 'http://106.110.173.48:8990';
//#endif

//#ifdef H5
const phpRoot = '';
//#endif

//#ifndef H5
const phpRoot = 'https://shop.kupurui.cn';
//#endif

// const imageView = 'http://47.108.145.94:8992';
const imageView='https://community.tuscq.com'
// const imageView = 'http://106.110.173.48:8990';

export default {
  baseUrl,
  phpRoot,
  imageView
};
