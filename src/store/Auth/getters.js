
export default {
  getUserData: (state) => {
    const dt = JSON.parse(localStorage.getItem('user'))
    return dt
  },
  getDataToken: (state) => {
    return state.token
  },
  getDataExpToken: (state) => {
    return state.tokenExp
  }
}
