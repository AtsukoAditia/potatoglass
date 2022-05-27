import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  materialListVendor: []
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
