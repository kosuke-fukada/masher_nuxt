const state = () => ({
  user: {
    accountId: '',
    userName: '',
    displayName: '',
    avatar: ''
  }
})

const getters = {
  accountId(state) {
    return state.user.accountId
  },
  userName(state) {
    return state.user.userName
  },
  displayName(state) {
    return state.user.displayName
  },
  avatar(state) {
    return state.user.avatar
  },
  user(state) {
    return state.user
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  }
}

const actions = {
  clearUser(context) {
    context.commit('setUser', {
      user: {
        accountId: '',
        userName: '',
        displayName: '',
        avatar: ''
      }
    })
  },
  async setUserInfo(context, userInfo) {
    const user = {
      accountId: userInfo.account_id,
      userName: userInfo.user_name,
      displayName: userInfo.display_name,
      avatar: userInfo.avatar
    }
    await context.commit('setUser', { user })
  }
}

export { state, getters, mutations, actions }
