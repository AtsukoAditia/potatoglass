export default {
  addUserCommit (state, data) {
    state.userList = data
  },
  removeUserCommit (state, data) {
    let updatedRowData = this.state.masterModule.userList.findIndex(row => row.id === data.id)
    state.userList.splice(updatedRowData, 1)
  },
  addMaterialCommit (state, data) {
    state.materialList = data
  },
  removeMaterialCommit (state, data) {
    let updatedRowData = this.state.masterModule.materialList.findIndex(row => row.ID === data.ID)
    state.materialList.splice(updatedRowData, 1)
  },
  addLogCommit (state, data) {
    state.logList = data
  }
}
