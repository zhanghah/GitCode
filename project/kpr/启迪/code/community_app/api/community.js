import http from './http';

export default {
  // 信息发布首页展示
  getCommunityInfo(params) {
    return http.get('/governmentAffairsAppApi/data/communityInfo', {params});
  },
};
