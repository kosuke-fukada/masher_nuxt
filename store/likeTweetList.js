const state = () => ({
  tweetList: [],
  nextToken: ''
})

const getters = {
  tweetList(state) {
    return state.tweetList
  },
  nextToken(state) {
    return state.nextToken
  }
}

const mutations = {
  setTweetList(state, payload) {
    state.tweetList = payload
  },
  setNextToken(state, payload) {
    state.nextToken = payload.nextToken
  }
}

export default { state, getters, mutations }
