'use strict'

var _vue = _interopRequireDefault(require('vue'))

require('mutationobserver-shim')

require('./Utils/fliter')

// require('./config/firebase')

var _App = _interopRequireDefault(require('./App.vue'))

var _router = _interopRequireDefault(require('./router'))

var _store = _interopRequireDefault(require('./store'))

var _raphael = _interopRequireDefault(require('raphael/raphael'))

require('./plugins')

require('./registerServiceWorker')

var _vueInstantsearch = _interopRequireDefault(require('vue-instantsearch'))

var _i18n = _interopRequireDefault(require('./i18n'))

var _vueMultiselect = _interopRequireDefault(require('vue-multiselect'))

require('../node_modules/vue-multiselect/dist/vue-multiselect.min.css')

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

global.Raphael = _raphael['default']

_vue['default'].use(_vueInstantsearch['default'])

_vue['default'].config.productionTip = false
// eslint-disable-next-line new-cap
var vm = new _vue['default']({
  router: _router['default'],
  store: _store['default'],
  i18n: _i18n['default'],
  render: function render (h) {
    return h(_App['default'])
  }
}).$mount('#app')
window.vm = vm

_vue['default'].component('multiselect', _vueMultiselect['default'])
