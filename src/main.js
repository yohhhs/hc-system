import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import iView from 'iview'
import store from './store'
import '../my-theme/index.less'
import VueDND from 'awe-dnd'

Vue.use(VueDND)

Vue.config.productionTip = false

Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
