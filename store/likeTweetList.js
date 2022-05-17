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
  setTweetList(state, tweetList) {
    state.tweetList = tweetList
  },
  setNextToken(state, nextToken) {
    state.nextToken = nextToken
  }
}

export default { state, getters, mutations }
