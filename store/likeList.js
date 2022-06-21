const state = () => ({
  likeList: []
})

const getters = {
  likeList(state) {
    return state.likeList
  }
}

const mutations = {
  setLikeList(state, likeList) {
    state.likeList = likeList
  }
}

export default { state, getters, mutations }
