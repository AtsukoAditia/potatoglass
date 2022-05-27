// import Cookies from 'js-cookie'

export default {
  LOGOUT (state) {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_exp')
    state.token = ''
    state.name = ''
    state.isLoggedin = false

    window.location.href = '/'
  },
  authUserCommit (state, data) {
    state.dataUser = data
  },
  tokenUserCommit (state, data) {
    state.token = data
  },
  tokenExpCommit (state, data) {
    state.tokenExp = data
  },
  checkLoginCommit (state, data) {
    state.isLoggedin = data
  }
}
