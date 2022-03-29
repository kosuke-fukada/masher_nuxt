import * as cryptoJs from 'crypto-js'
const express = require('express')
const app = express()

const isRequestFromApp = (req, res, next) => {
  if (req.url === '/auth/callback') {
    next()
  }
  const keyString = req.get('request_key')
  const encrypted = req.get('request_field')
  if (!keyString || !encrypted) {
    res.status(403).send('Forbidden.')
  }
  const key = cryptoJs.HmacSHA256(process.env.KEY_BASE_STRING + keyString, process.env.KEY_SALT).toString()
  if (cryptoJs.AES.decrypt(encrypted, key).toString(cryptoJs.enc.Utf8) === process.env.AXIOS_REQUEST_VERIFICATION) {
    next()
  } else {
    res.status(403).send('Forbidden.')
  }
}

app.use((req, res, next) => {
  isRequestFromApp(req, res, next)
})

module.exports = {
  path: '/api/',
  handler: app
}
