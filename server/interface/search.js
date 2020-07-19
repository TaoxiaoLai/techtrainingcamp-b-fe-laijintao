import Router from 'koa-router'
import LRU from 'lru-cache'
import axios from './utils/axios'

let router = new Router({
  prefix: '/search'
})

const CACHED = new LRU({
  max: 100, // 缓存队列长度
  maxAge: 1000 * 60 // 缓存时间
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
  const offset = ctx.query.offset
  let {
    status,
    data
  } = await axios.get(`https://i.snssdk.com/search/api/study/?keyword=${keyword}&offset=${offset}`)
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

// 使用缓存
// router.get('/searchContent', async (ctx) => {
//   const keyword = ctx.query.keyword || ''
//   let data
//   if (CACHED.has(`"${keyword}"`)) {
//     data = JSON.parse(CACHED.get(`"${keyword}"`))
//     console.log(1)
//   } else {
//     let res = await axios.get(`https://i.snssdk.com/search/api/study/?keyword=${encodeURI(keyword)}`)
//     CACHED.set(`"${keyword}"`, JSON.stringify(res.data))
//     data = JSON.parse(CACHED.get(`"${keyword}"`))
//     console.log(2)
//   }
//   ctx.body = {
//     data: data.data
//   }
// })

export default router
