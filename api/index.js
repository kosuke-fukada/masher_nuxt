import https from 'https'
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cookieParser())
app.use(cors({
  origin: '.masher.app',
  exposedHeaders: 'set-cookie',
  credentials: true
}))
app.use(bodyParser.json())

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

// Axios config
const axios = require('axios').default
axios.defaults.withCredentials = true
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
axios.defaults.baseURL = process.env.BACKEND_API_HOST

app.get('/signin/twitter/', async (req, res) => {
  try {
    const response = await axios.get('/signin/twitter')
    res.setHeader('set-cookie', response.headers['set-cookie'])
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
    logger.error('Authorize canceled.')
    res.status(403).send({
      message: 'Authorize canceled.'
    })
    return
  }
  try {
    const response = await axios.get('/signin/twitter/callback',
      {
        params: query,
        headers: {
          Cookie: req.headers.cookie
        }
      }
    )
    Object.keys(req.cookies).forEach(key => {
      res.clearCookie(key, {
        domain: '.masher.app',
        path: '/'
      })
    })
    res.setHeader('set-cookie', response.headers['set-cookie'])
    res.status(204).send()
  } catch (e) {
    logger.error('Could not signin: ' + e.response.data.message)
    Object.keys(req.cookies).forEach(key => {
      res.clearCookie(key, {
        domain: '.masher.app',
        path: '/'
      })
    })
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/signout/', async (req, res) => {
  try {
    await axios.get('/signout')
    Object.keys(req.cookies).forEach(key => {
      res.clearCookie(key, {
        domain: '.masher.app',
        path: '/'
      })
    })
    res.status(204).send()
  } catch (e) {
    logger.error('Could not signout: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/user/', async (req, res) => {
  const params = {}
  if (req.cookies.masher_session) {
    params.headers = {}
    params.headers.Cookie = req.headers.cookie
  }

  try {
    const response = await axios.get('/user', params)
    res.setHeader('set-cookie', response.headers['set-cookie'])
    res.send(response.data)
  } catch (e) {
    logger.error('Could not get user info: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/user/twitter/', async (req, res) => {
  if (!req.cookies.masher_session) {
    const emptyData = {
      data: {
        id: '',
        name: '',
        username: ''
      }
    }
    res.send(emptyData)
    return
  }

  try {
    const userInfo = await axios.get('/user/twitter',
      {
        headers: {
          Cookie: req.headers.cookie
        },
        params: {
          user_name: req.query.user_name
        }
      }
    )
    res.send(userInfo.data)
  } catch (e) {
    logger.error('Could not get twitter user info: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/likes', async (req, res) => {
  if (!req.cookies.masher_session) {
    res.status(403).send({
      message: 'Forbidden.'
    })
  }

  try {
    const likeList = await axios.get('/likes',
      {
        headers: {
          Cookie: req.headers.cookie
        },
        params: {
          user_id: req.query.user_id,
          order_key: req.query.order_key,
          order_value: req.query.order_value,
          page: req.query.page
        }
      }
    )
    res.send(likeList.data)
  } catch (e) {
    logger.error('Could not get like list: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/likes/twitter', async (req, res) => {
  if (!req.cookies.masher_session) {
    res.status(403).send({
      message: 'Forbidden.'
    })
  }

  try {
    const nextToken = req.query.next_token ?? ''
    const list = await axios.get('/likes/twitter',
      {
        headers: {
          Cookie: req.headers.cookie
        },
        params: {
          next_token: nextToken
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
  if (!req.cookies.masher_session) {
    res.status(403).send({
      message: 'Forbidden.'
    })
    return
  }

  try {
    await axios.get('/user/refresh/twitter', {
      headers: {
        Cookie: req.headers.cookie
      }
    })
    res.send()
  } catch (e) {
    logger.error('Could not refresh token: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/tweet/', async (req, res) => {
  try {
    const tweet = await axios.get('/tweet', {
      params: {
        tweet_id: req.query.tweet_id,
        author_id: req.query.author_id,
        author_name: req.query.author_name
      }
    })
    res.send(tweet.data)
  } catch (e) {
    logger.error('Could not get tweet: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.get('/like_count/', async (req, res) => {
  if (!req.cookies.masher_session) {
    res.status(403).send({
      message: 'Forbidden.'
    })
    return
  }

  if (!req.query.user_id || !req.query.tweet_id || !req.query.author_id) {
    res.status(400).send()
    return
  }

  try {
    const likeCount = await axios.get('/like_count', {
      headers: {
        Cookie: req.headers.cookie
      },
      params: {
        user_id: req.query.user_id,
        tweet_id: req.query.tweet_id,
        author_id: req.query.author_id
      }
    })
    res.send(likeCount.data)
  } catch (e) {
    logger.error('Could not get like count: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.post('/like_count', async (req, res) => {
  if (!req.cookies.masher_session) {
    res.status(403).send({
      message: 'Forbidden.'
    })
    return
  }

  if (!req.body.user_id ||
    !req.body.tweet_id ||
    !req.body.author_id ||
    !req.body.like_count
  ) {
    res.status(400).send()
    return
  }

  try {
    const params = {
      user_id: req.body.user_id,
      tweet_id: req.body.tweet_id,
      author_id: req.body.author_id,
      like_count: req.body.like_count
    }
    const createdLike = await axios.post('/like_count', params, {
      headers: {
        Cookie: req.headers.cookie,
        'X-XSRF-TOKEN': req.headers['x-xsrf-token']
      }
    })
    res.send(createdLike.data)
  } catch (e) {
    logger.error('Could not create like count: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.put('/like_count', async (req, res) => {
  if (!req.cookies.masher_session) {
    res.status(403).send({
      message: 'Forbidden.'
    })
    return
  }

  if (!req.body.id ||
    !req.body.user_id ||
    !req.body.tweet_id ||
    !req.body.author_id ||
    !req.body.like_count
  ) {
    res.send()
    return
  }

  try {
    const params = {
      id: req.body.id,
      user_id: req.body.user_id,
      tweet_id: req.body.tweet_id,
      author_id: req.body.author_id,
      like_count: req.body.like_count
    }
    await axios.put('/like_count', params, {
      headers: {
        Cookie: req.headers.cookie,
        'X-XSRF-TOKEN': req.headers['x-xsrf-token']
      }
    })
    res.status(204).send()
  } catch (e) {
    logger.error('Could not update like count: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message
    })
  }
})

app.post('/inquiry', async (req, res) => {
  if (!req.body.name ||
    !req.body.email ||
    !req.body.body
  ) {
    res.status(400).send()
    return
  }

  try {
    const params = {
      name: req.body.name,
      email: req.body.email,
      body: req.body.body
    }
    await axios.post('/inquiry', params, {
      headers: {
        Cookie: req.headers.cookie,
        'X-XSRF-TOKEN': req.headers['x-xsrf-token']
      }
    })
    res.status(204).send()
  } catch (e) {
    logger.error('Could not complete inquiry: ' + e.response.data.message)
    res.status(e.response.status).send({
      message: e.response.data.message,
      errors: e.response.data.errors
    })
  }
})

module.exports = {
  path: '/api/',
  handler: app
}
