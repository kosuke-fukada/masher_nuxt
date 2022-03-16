import crypto from 'crypto-js'

export default ({ app }, inject) => {
  inject('encrypt', (value, keyString) => {
    const key = crypto.HmacSHA256(process.env.KEY_BASE_STRING + keyString, process.env.KEY_SALT).toString()
    return crypto.AES.encrypt(value, key).toString()
  })
  inject('decrypt', (encrypted, keyString) => {
    const key = crypto.HmacSHA256(process.env.KEY_BASE_STRING + keyString, process.env.KEY_SALT).toString()
    return crypto.AES.decrypt(encrypted, key).toString(crypto.enc.Utf8)
  })
}
