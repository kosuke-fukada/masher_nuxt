import https from 'https'
const express = require('express')
const app = express()

// Logger config
const log4js = require('log4js')
log4js.configure({
  appenders: {
    nuxt_server: {
      type: 'file',
      filename: './api/log/nuxt_server.log'
    }
  },
  categories: {
    default: {
      appenders: ['nuxt_server'],
      level: 'error'
    }
  }
})
const logger = log4js.getLogger('nuxt_server')

// Session config
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { createClient } = require('redis')
const redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(e => {
  logger.error(e)
})
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
    domain: 'masher.app'
  },
  store: new RedisStore({ client: redisClient })
}))

// Axios config
const axios = require('axios').default
axios.defaults.withCredentials = true
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
axios.defaults.baseURL = process.env.BACKEND_API_HOST

app.get('/signin/twitter/', async (req, res) => {
  try {
    const response = await axios.get('/signin/twitter')
    req.session.masher_session = response.headers['set-cookie']
    res.json(response.data)
  } catch (e) {
    logger.error('Could not get authorize url: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/signin/twitter/callback/', async (req, res) => {
  const query = req.query
  if (Object.prototype.hasOwnProperty.call(query, 'error')) {
    req.session.destroy()
    logger.error('Authorize canceled.')
    res.send({
      message: 'Authorize canceled.'
    })
    return
  }
  try {
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
  } catch (e) {
    logger.error('Could not signin: ' + e.response.data.message)
    req.session.destroy()
    res.send({
      message: e.response.data.message
    })
  }
})

app.get('/signout/', async (req, res) => {
  try {
    await axios.get('/signout')
    req.session.destroy()
    res.status(204).send()
  } catch (e) {
    logger.error('Could not signout: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/user/', async (req, res) => {
  if (!req.session.masher_session) {
    res.send()
    return
  }

  try {
    const userInfo = await axios.get('/user',
      {
        headers: {
          Cookie: req.session.masher_session
        }
      }
    )
    res.send(userInfo.data)
  } catch (e) {
    logger.error('Could not get user info: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/likes/', async (req, res) => {
  if (!req.session.masher_session) {
    res.status(403).send({
      message: 'Forbidden.'
    })
  }

  try {
    const list = await axios.get('/likes/twitter',
      {
        headers: {
          Cookie: req.session.masher_session
        }
      }
    )
    res.send(list.data)
  } catch (e) {
    logger.error('Could not get likes tweet list: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/refresh/twitter/', async (req, res) => {
  try {
    await axios.get('/user/refresh/twitter', {
      headers: {
        Cookie: req.session.masher_session
      }
    })
    res.send()
  } catch (e) {
    logger.error('Could not get likes tweet list: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

module.exports = {
  path: '/api/',
  handler: app
}
