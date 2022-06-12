const state = () => ({
  name: '',
  email: '',
  body: '',
  errors: {
    name: '',
    email: '',
    body: ''
  },
  complete: false
})

const getters = {
  name: state => {
    return state.name
  },
  email: state => {
    return state.email
  },
  body: state => {
    return state.body
  },
  nameError: state => {
    return state.errors.name
  },
  emailError: state => {
    return state.errors.email
  },
  bodyError: state => {
    return state.errors.body
  },
  errorExists: state => {
    return state.errors.name.length || state.errors.email.length || state.errors.body.length
  },
  complete: state => {
    return state.complete
  }
}

const mutations = {
  setName: (state, name) => {
    state.name = name
  },
  setEmail: (state, email) => {
    state.email = email
  },
  setBody: (state, body) => {
    state.body = body
  },
  setNameError: (state, nameError) => {
    state.errors.name = nameError
  },
  setEmailError: (state, emailError) => {
    state.errors.email = emailError
  },
  setBodyError: (state, bodyError) => {
    state.errors.body = bodyError
  },
  setComplete: (state, complete) => {
    state.complete = complete
  }
}

const actions = {
  inquiryCompleted: context => {
    context.commit('setComplete', true)
    context.commit('setName', '')
    context.commit('setEmail', '')
    context.commit('setBody', '')
  }
}

export default { state, getters, mutations, actions }
