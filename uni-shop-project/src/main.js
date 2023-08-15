import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
Vue.config.productionTip = false

/**
 * 全局注册调用消息提示
 * @param {*} title 提示文本
 * @param {duration} duration  持续时间
 *
 */
uni.$showMsg = function (title = '数据加载失败', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}


App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
