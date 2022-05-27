import Vue from 'vue'
import 'mutationobserver-shim'
import './Utils/fliter'
// import './config/firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import Raphael from 'raphael/raphael'
import './plugins'
import './registerServiceWorker'
import AlgoliaComponents from 'vue-instantsearch'
import i18n from './i18n'
import Multiselect from 'vue-multiselect'
import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import wysiwyg from 'vue-wysiwyg'
import '../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'
import VueExcelXlsx from 'vue-excel-xlsx'
import * as VueGoogleMaps from 'vue2-google-maps'
import vuetify from './plugins/vuetify'
import 'intro.js/minified/introjs.min.css'
global.Raphael = Raphael

Vue.use(AlgoliaComponents)
Vue.use(wysiwyg, {})
Vue.use(VueExcelXlsx)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB18YH9iQ3e6PedY0imJlYSM3mRTmzIZK8',
    libraries: 'places'
  },
  installComponents: true
})

Vue.config.productionTip = false

let vm = new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')

window.vm = vm

Vue.component('multiselect', Multiselect)
