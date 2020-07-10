import Router from 'koa-router'

const router = new Router({
  prefix: '/hotSearch'
})

router.get('/hotList', async (ctx) => {
  ctx.body = {
    hotList: [
      {
        num: '1',
        numRed: true,
        content: '13省份局部大到暴雨',
        hot: true,   // 是否是热门搜索
        new: false,  // 是否是新晋搜索
        heat: '486.6'
      },{
        num: '2',
        numRed: true,
        content: '广州惊现七蒂睡莲',
        hot: true,
        new: false,
        heat: '415.3'
      },{
        num: '3',
        numRed: true,
        content: '胡锡进谈不明原因肺炎',
        hot: false,
        new: false,
        heat: '409.2'
      },{
        num: '4',
        numRed: false,
        content: '香港新增42例新冠肺炎',
        hot: false,
        new: false,
        heat: '323.9'
      },{
        num: '5',
        numRed: false,
        content: '央行谈超10万元转账',
        hot: false,
        new: true,
        heat: '319.2'
      },{
        num: '6',
        numRed: false,
        content: '字节跳动前端训练营',
        hot: true,
        new: false,
        heat: '316.6'
      },{
        num: '7',
        numRed: false,
        content: '黄健翔回击王兴言论',
        hot: false,
        new: false,
        heat: '309.3'
      },{
        num: '8',
        numRed: false,
        content: '曝梁安琪400亿资产',
        hot: false,
        new: true,
        heat: '301.1'
      }
    ]
  }
})

export default router
