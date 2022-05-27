import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  userList: [],
  materialList: [],
  logList: []
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
