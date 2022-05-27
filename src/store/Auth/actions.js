export default {
  authUserAction (context, payload) {
    context.commit('authUserCommit', payload)
  },
  tokenUserAction (context, payload) {
    context.commit('tokenUserCommit', payload)
  },
  tokenExpAction (context, payload) {
    context.commit('tokenExpCommit', payload)
  },
  checkLoginAction (context, payload) {
    context.commit('checkLoginCommit', payload)
  }
}
