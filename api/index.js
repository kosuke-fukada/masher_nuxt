import https from 'https'
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const express = require('express')
const axios = require('axios').default
const app = express()
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

const sessionStore = new MySQLStore({
  host: process.env.MYSQL_DB_HOST,
  port: 3306,
  user: process.env.MYSQL_DB_USER_NAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  schema: {
    tableName: 'nuxt_sessions'
  }
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
  store: sessionStore
}))

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
    res.status(e.response.status).send({
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

module.exports = {
  path: '/api/',
  handler: app
}
