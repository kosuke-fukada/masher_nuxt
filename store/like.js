const state = () => ({
  like: {
    id: null,
    userId: null,
    tweetId: '',
    authorId: '',
    likeCount: 0
  }
})

const getters = {
  id(state) {
    return state.like.id
  },
  userId(state) {
    return state.like.userId
  },
  tweetId(state) {
    return state.like.tweetId
  },
  authorId(state) {
    return state.like.authorId
  },
  likeCount(state) {
    return state.like.likeCount
  }
}

const mutations = {
  setLike(state, like) {
    state.like = like
  },
  setLikeCount(state, likeCount) {
    state.like.likeCount = likeCount
  }
}

const actions = {
  async setLike(context, likeEntity) {
    const like = {
      id: likeEntity.id,
      userId: likeEntity.user_id,
      tweetId: likeEntity.tweet_id,
      authorId: likeEntity.author_id,
      likeCount: likeEntity.like_count
    }
    await context.commit('setLike', like)
  }
}

export default { state, getters, mutations, actions }
