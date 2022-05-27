export default {
  addUserList (context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('addUserCommit', payload)
      resolve()
    })
  },
  removeUser (context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('removeUserCommit', payload)
      resolve()
    })
  },
  addMaterialList (context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('addMaterialCommit', payload)
      resolve()
    })
  },
  addLogList (context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('addLogCommit', payload)
      resolve()
    })
  },
  removeMaterial (context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('removeMaterialCommit', payload)
      resolve()
    })
  }
}
