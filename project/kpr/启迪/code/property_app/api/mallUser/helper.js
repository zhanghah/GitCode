// #ifdef APP-PLUS
const websiteUrl = 'https://community.tuscq.com/mall-user-api';
// #endif
// #ifdef H5
const websiteUrl = '/api';
// #endif
const now = Date.now || function () {
    return new Date().getTime();
};
const isArray = Array.isArray || function (obj) {
    return obj instanceof Array;
};

export default {
    websiteUrl,
    now,
    isArray
}
