const state = () => ({
  user: {
    userId: '',
    accountId: '',
    userName: '',
    displayName: '',
    avatar: ''
  }
})

const getters = {
  userId(state) {
    return state.user.userId
  },
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
  },
  isAuthenticated(state) {
    return !!state.user.accountId
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
        userId: '',
        accountId: '',
        userName: '',
        displayName: '',
        avatar: ''
      }
    })
  },
  async setUserInfo(context, userInfo) {
    const user = {
      userId: userInfo.user_id,
      accountId: userInfo.account_id,
      userName: userInfo.user_name,
      displayName: userInfo.display_name,
      avatar: userInfo.avatar
    }
    await context.commit('setUser', { user })
  }
}

export { state, getters, mutations, actions }
