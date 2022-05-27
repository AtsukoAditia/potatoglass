import * as rules from 'vee-validate/dist/rules'
import id from '../locales/validateid.json'
import { extend, localize, ValidationObserver, ValidationProvider } from 'vee-validate'
import Vue from 'vue'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
localize('id', id)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
