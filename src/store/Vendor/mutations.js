export default {
  addMaterialCommitVendor (state, data) {
    state.materialListVendor = data
  },
  removeMaterialCommit (state, data) {
    let updatedRowData = this.state.vendorModule.materialList.findIndex(row => row.ID === data.ID)
    state.materialList.splice(updatedRowData, 1)
  }
}
