import Vue from 'vue'
import App from './App.vue'
import less from 'less'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '../utils/request.js';
import Meta from "vue-meta";
Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(less);
Vue.use(Meta);
new Vue({
  render: h => h(App),
}).$mount('#app')
