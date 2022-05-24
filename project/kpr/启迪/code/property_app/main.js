import Vue from 'vue'
import App from './App'
import config from './config';
import utils from './utils';
import store from './store';
import refreshto from '@/utils/routing.js'
import uniPopup from '@/api/mallUser/popup.js'
import helper from '@/api/mallUser/helper.js'
import SOtime from '@/api/mallUser/SOtime.js'
import TabBar from './components/tab-bar';
import NavBar from './components/nav-bar';
import NavBarNew from './components/zhouWei-navBar';
import Link from './components/link';
import Button from './components/button';
import Input from './components/input';
import CheckBox from './components/checkbox';
import Strength from './components/strength';
import FormInput from './components/form-input';
import FormPicker from './components/form-picker';
import FormDate from './components/form-date';
import ImageUpload from './components/image-upload';
import AdBlock from './components/adblock';
import NoResult from './components/noresult';
import Tabs from './components/tabs';
import Adder from './components/adder';
import Modal from './components/modal';
import datetimePicker from './components/datetimePicker';

// import Modal from './components/modal';
import uView from "uview-ui";
Vue.use(uView);

const { NODE_ENV } = process.env;

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.prototype.$helper = helper
Vue.prototype.$goPage = refreshto
Vue.prototype.$config = config;
Vue.prototype.$utils = utils;
Vue.prototype.$SOtime = SOtime;
Vue.prototype.$uniPopup=uniPopup 
Vue.prototype.isDev = NODE_ENV === 'development';

Vue.filter('date', utils.formatDate);

Vue.prototype.$toast = (msg, duration = 2000) => {
  uni.showToast({
    icon: 'none',
    title: msg,
    duration,
  }); 
}

Vue.prototype.$showLoading = (msg = '加载中') => {
  uni.showLoading({
    title: msg
  });
}

Vue.prototype.$hideLoading = () => {
  uni.hideLoading();
}

/** 全局组件引入 */
Vue.component('nav-bar', NavBar);
Vue.component('nav-bar-new', NavBarNew);
Vue.component('tab-bar', TabBar);
Vue.component('ui-link', Link);
Vue.component('ui-button', Button);
Vue.component('ui-input', Input);
Vue.component('ui-checkbox', CheckBox);
Vue.component('ui-strength', Strength);
Vue.component('ui-form-picker', FormPicker);
Vue.component('ui-form-date', FormDate);
Vue.component('ui-form-input', FormInput);
Vue.component('ui-image-upload', ImageUpload);
Vue.component('ad-block', AdBlock);
Vue.component('no-result', NoResult);
Vue.component('ui-tabs', Tabs);
Vue.component('ui-adder', Adder);
Vue.component('ui-modal', Modal);
Vue.component('uni-datetime-picker', datetimePicker);


const app = new Vue({
    ...App,
    store
})
app.$mount()
