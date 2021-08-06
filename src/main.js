import Vue from 'vue'
import App from './App.vue'
//引入全局样式
import "./assets/mycss.css"
//引入路由对象
import router from "./router/router";
//引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.config.productionTip = false
//取消代码警告
Vue.config.silent = true
//导入字体图标
import "./assets/fonts/iconfont.css"
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
