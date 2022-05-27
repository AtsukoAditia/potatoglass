export default {
  addMaterialListVendor (context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('addMaterialCommitVendor', payload)
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
