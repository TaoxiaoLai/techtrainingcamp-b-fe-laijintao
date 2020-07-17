import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/search'
})

router.get('/searchList', async (ctx) => {
  const keyword = encodeURI(ctx.query.keyword) || ''
  let {
    status,
    data
  } = await axios.get(`https://i.snssdk.com/search/api/sug/?keyword=${keyword}`)
  if (status === 200) {
    ctx.body = {
      data: data.data
    }
  } else {
    ctx.body = {
      data: {}
    }
  }
})

router.get('/searchContent', async (ctx) => {
  const keyword = encodeURI(ctx.query.keyword) || ''
  let {
    status,
    data
  } = await axios.get(`https://i.snssdk.com/search/api/study/?keyword=${keyword}`)
  if (status === 200) {
    ctx.body = {
      data: data.data
    }
  } else {
    ctx.body = {
      data: {}
    }
  }
})

export default router
