import dayjs from 'dayjs';
import reg from './reg';

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
}

export default utils;