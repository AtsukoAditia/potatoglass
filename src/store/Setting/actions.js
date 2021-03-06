export default {
  horizontalMenuAction (context, payload) {
    if (context.state.horizontalMenu) {
      context.commit('horizontalMenuCommit', false)
    } else {
      context.commit('horizontalMenuCommit', true)
    }
  },
  miniSidebarAction (context, payload) {
    return new Promise((resolve, reject) => {
      if (context.state.miniSidebarMenu) {
        context.commit('miniSidebarCommit', false)
        resolve(false)
      } else {
        context.commit('miniSidebarCommit', true)
        resolve(true)
      }
    })
  },
  authUserAction (context, payload) {
    context.commit('authUserCommit', payload)
  },
  dataUserAction (context, payload) {
    context.commit('dataUserCommit', payload)
  },
  addUserAction (context, payload) {
    context.commit('addUserCommit', payload)
  },
  activePageAction (context, payload) {
    context.commit('activePageCommit', payload)
  },
  addBookmarkAction (context, payload) {
    context.commit('addBookmarkCommit', payload)
  },
  removeBookmarkAction (context, payload) {
    context.commit('removeBookmarkCommit', payload)
  },
  setLangAction (context, payload) {
    context.commit('setLangCommit', payload)
  },
  layoutModeAction (context, payload) {
    let dark = payload.dark ? 'dark' : 'light'
    let rtl = payload.rtl ? 'rtl' : 'ltr'
    document.getElementsByTagName('html')[0].setAttribute('mode', dark)
    document.getElementsByTagName('html')[0].setAttribute('dir', rtl)
    context.commit('layoutModeCommit', {
      dark: payload.dark,
      rtl: payload.rtl,
      sidebar: ''
    })
  }
}
