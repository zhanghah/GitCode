/**
 * 系统配置参数
 */
import development from './development';
import production from './production';

const { NODE_ENV } = process.env;
let base = {};

if (NODE_ENV === 'development') {
  base = development;
} else if (NODE_ENV === 'production') {
  base = production;
}
          
const Config = {
  apiRoot: `${base.baseUrl}`,
  ...base,
};

export default Config;
 