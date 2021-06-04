/*
 * @Author: niebiguang
 * @Date: 2020-10-14 14:55:04
 * @LastEditTime: 2020-11-06 17:17:18
 * @LastEditors: niebiguang
 * @Description: 
 * @FilePath: \gouxiao-manage-fd\src\main.js
 * @symbol_custom_string_obkoro1: 可以输入预定的版权声明、个性签名、空行等
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// 引入lodash
import _ from 'lodash'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import '@/icons' // icon
import '@/permission' // permission control

import {hasPermission} from "./utils/hasPermission";

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

//全局的常量
Vue.prototype.hasPerm = hasPermission
Vue.prototype._ = _

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)


Vue.config.productionTip = false

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    "inline": true,
    "button": true,
    "navbar": true,
    "title": true,
    "toolbar": true,
    "tooltip": true,
    "movable": true,
    "zoomable": true,
    "rotatable": true,
    "scalable": true,
    "transition": true,
    "fullscreen": true,
    "keyboard": true,
    "url": "data-source"
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
