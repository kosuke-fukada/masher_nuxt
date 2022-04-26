import https from 'https'
const session = require('express-session')
const express = require('express')
const axios = require('axios').default
const app = express()

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
    domain: 'masher.app'
  }
}))

axios.defaults.withCredentials = true
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
axios.defaults.baseURL = process.env.BACKEND_API_HOST

app.get('/signin/twitter/', async (req, res) => {
  const response = await axios.get('/signin/twitter')
  req.session.masher_session = response.headers['set-cookie']
  res.json(response.data)
})

app.get('/signin/twitter/callback/', async (req, res) => {
  const query = req.query
  const response = await axios.get('/signin/twitter/callback',
    {
      params: query,
      headers: {
        Cookie: req.session.masher_session
      }
    }
  )
  req.session.masher_session = response.headers['set-cookie']
  res.status(204).send()
})

app.get('/signout/', async (req, res) => {
  await axios.get('/signout')
  req.session.destroy()
  res.status(204).send()
})

app.get('/user/', async (req, res) => {
  if (!req.session.masher_session) {
    res.send()
    return
  }
  const userInfo = await axios.get('/user',
    {
      headers: {
        Cookie: req.session.masher_session
      }
    }
  )
  res.send(userInfo.data)
})

module.exports = {
  path: '/api/',
  handler: app
}
