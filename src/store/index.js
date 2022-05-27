import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

// modules
import Setting from './Setting/index'
import authModule from './Auth/index'
import masterModule from './Admin/index'
import vendorModule from './Vendor/index'
import Ecommerce from './Ecommerce/index'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting,
    authModule,
    masterModule,
    vendorModule,
    Ecommerce
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  // strict: debug
  strict: debug,
  plugins: [
    createPersistedState({
      key: 'PROYEKITA.ID',
      paths: ['authModule'],
      storage: {
        getItem: (key) => Cookies.getJSON(key),
        setItem: (key, state) => Cookies.set(key, state, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})
