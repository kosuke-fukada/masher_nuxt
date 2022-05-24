const state = () => ({
  tweetId: '',
  authorId: '',
  authorName: ''
})

const getters = {
  tweetId(state) {
    return state.tweetId
  },
  authorId(state) {
    return state.authorId
  },
  authorName(state) {
    return state.authorName
  },
  isSetTweet(state) {
    return state.tweetId && state.authorId && state.authorName
  }
}

const mutations = {
  setTweetId(state, tweetId) {
    state.tweetId = tweetId
  },
  setAuthorId(state, authorId) {
    state.authorId = authorId
  },
  setAuthorName(state, authorName) {
    state.authorName = authorName
  }
}

const actions = {
  setTweet(context, tweet) {
    context.commit('setTweetId', tweet.tweet_id)
    context.commit('setAuthorId', tweet.author_id)
    context.commit('setAuthorName', tweet.author_name)
  }
}

export default { state, getters, mutations, actions }
