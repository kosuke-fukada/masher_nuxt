export default ({ $axios, error }) => {
  $axios.onError(e => {
    const statusCode = e.response.status
    if (statusCode >= 400) {
      error({ statusCode, message: e.response.data.message })
    }
  })
}
