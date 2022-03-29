import crypto from 'crypto'

export default ({ $axios, $encrypt }) => {
  $axios.onRequest(config => {
    const key = crypto.randomBytes(16).toString('base64').substring(17, 32)
    const encrypted = $encrypt(process.env.AXIOS_REQUEST_VERIFICATION, key)
    config.headers.common.request_key = key
    config.headers.common.request_field = encrypted
    return config
  })
}
