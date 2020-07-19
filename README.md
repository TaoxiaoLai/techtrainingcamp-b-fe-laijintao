# re-headline-search 复现移动端web简易版头条搜索

## 项目简介

本项目参考头条搜索实现，实现移动端web的简易头条搜索，并且本项目使用了 nuxt.js + koa2 实现服务端渲染。

项目主要实现了首页及首页热搜榜数据服务端渲染、点击热搜榜跳转搜索结果页、输入搜索词实现搜索词条推荐、点击搜索或是点击推荐的搜索词条获取搜索结果数据并渲染、点击历史搜索跳转搜索结果页、搜索结果页滚动条触底加载更多内容、搜索结果页横向tab切换、根据关键词弹出彩蛋动画等功能。在服务端使用koa做了首页热搜榜的接口封装，同时对于关键词匹配接口和搜索结果接口也用koa作为中间层进行了转发，重新定义了接口路由。项目中使用asyncData实现首页异步数据渲染。

在本项目中用到的技术栈如下：nuxt.js(基于Vue的ssr框架) + axios + sass + postcss-px-to-viewport(移动端适配方案) + koa2。

项目的主要文件介绍如下：
* **asserts**: 存放静态资源的文件夹
* **components**: 存放页面组件的文件夹
* **pages**: 存放本项目页面视图的文件夹
* **server**: 服务端文件夹，主要是提供API接口服务
* **nuxt.config.js**: nuxt.js应用配置
* **postcss.config.js**: 移动端适配配置文件

## 项目启动

``` bash
# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
## 主要功能实现说明及效果截图

* **首页使用服务端渲染**，服务端封装了首页显示的热搜榜的接口 "/hotSearch/hotList/" ，为了在服务器端获取并渲染热搜榜数据，项目中使用asyncData实现异步数据，asyncData方法会在组件（限于页面组件）每次加载之前被调用，它可以在服务端或路由更新之前被调用。热搜榜接口封装(由于未有相关数据及接口，故将热搜榜的数据是写死的数据)及asyncData实现异步数据主要代码如下：
``` bash
# 服务端封装热搜榜"/hotSearch/hotList/"接口的主要代码
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

# asyncData实现异步数据的主要代码
async asyncData() {
  let {status, data: {hotList}} = await axios.get('http://localhost:3000/hotSearch/hotList/')
  if (status === 200) {
    return {
      hotList
    }
  }
}
```
</br>

* **首页效果截图**，可以看到返回的是已经是在服务端渲染好的页面了

![](/screenshot/homeindex.png)

</br>

* **点击热搜榜跳转搜索结果页面**。使用nuxt-link实现点击跳转，nuxt.js框架提供nuxt-link用于路由跳转，同时在跳转时亦可传递参数。

![](/screenshot/热搜榜跳转.gif)

</br>

* **输入搜索词实现搜索词条推荐**。在实现关键词推荐功能时，使用了nuxt里面的数据双向绑定，同时watch输入的keyword，当keyword改变时就触发获取关键词的方法，同时也使用了setTimeout对其进行了节流处理，控制其发送请求的频率。

![](/screenshot/搜索词推荐.gif)

</br>

* **搜索结果页滚动条触底加载更多**。搜索结果页监听scroll事件实现触底加载，通过scrollHeight(滚动条内容高度)，scrollTop(滚动条距离顶部的距离)，clientHeight(页面可见区域的高度)这三个属性来判断滚动条是否已经触底，当scrollHeight = scrollTop + clientHeight 时，即表明滚动条已经触底。实现触底加载功能的主要代码如下：
``` bash
# 滚动条触底加载更多内容
touchBottomGetMore() {
  let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight  // 滚动条内容总高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop           // 滚动条到顶部的距离
  let clientHeight = document.documentElement.clientHeight || document.body.clientHeight  // 当前页面可见区域的总高度
  scrollHeight = Math.round(scrollHeight)
  scrollTop = Math.round(scrollTop)
  clientHeight = Math.round(clientHeight)
  if (scrollHeight > clientHeight) {
    if (scrollHeight === scrollTop + clientHeight) {
      this.offset = this.offset + 1
      this.getContentList(this.keyword, this.offset)
    }
  }
}
```

![](/screenshot/触底加载.gif)

<br/>

* **搜索结果页tab横向切换**。对tab栏的每个关键词都有一个index，点击时通过监听index的改变，人为修改scrollleft的值实现切换效果，同时通过setInterval来实现切换时平滑的过渡，tab切换的主要代码如下：
``` bash
# tab横向切换过渡动画主要代码
scrollAnimate(ele, standTarget) {   // ele是tab栏当前点击的元素，standTarget是需要修改的scrollleft的值
  let scrollWidth = document.body.scrollWidth
  let target = scrollWidth * (standTarget / 375)  // 适配不同屏幕宽度
  clearInterval(ele.timer)
  ele.timer = setInterval(() => {
    let step = (target - ele.scrollLeft) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (Math.abs(target - ele.scrollLeft) <= Math.abs(step)) {
      ele.scrollLeft = target
      clearInterval(ele.timer)
    } else {
      ele.scrollLeft = ele.scrollLeft + step
    }
  }, 30)
}
```

![](/screenshot/tab跳转.gif)

<br/>

* **彩蛋动画**。tab切换时，当切换到“训练营”这个关键词时，会弹出彩蛋动画，动画主要是通过CSS3的animation属性来实现的，彩蛋动画效果如下：(PS:由于所用的GIF制作工具只能制作10秒的GIF，为完整呈现便将其分为两个GIF图)

![](/screenshot/彩蛋动画1.gif)
![](/screenshot/彩蛋动画2.gif)

<br/>

* **历史搜索栏点击跳转结果页**，在搜索页面有历史记录栏，点击历史搜索亦可以跳转到相应的搜索结果页面

![](/screenshot/历史搜索.gif)

* **服务端koa接口转发**，在服务端，使用koa进行了接口转发，同时配置了相关的路由，其主要代码如下：
``` bash
# 对关键词匹配接口的转发
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

# 对搜索结果接口的转发
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
```

<br/>

* **移动端不同窗口大小的适配**，做移动端适配时，开始时是考虑使用rem来做，后来又发现了一个新的方案，就是使用viewport，现在viewport单位越来越受到众多浏览器的支持，而其使用也非常简单。在本项目中，只需将安装postcss-px-to-viewport这个插件，之后根据自己的项目需求配置一下postcss.config.js文件即可，相关文档 [postcss-px-to-viewport](https://developer.aliyun.com/mirror/npm/package/postcss-px-to-viewport)

``` bash
# 安装
npm install postcss-px-to-viewport

# 项目中的postcss.config.js配置
module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,  //视窗的宽度
      viewportHeight:667, //视窗的高度
      unitPrecision:5,  //制定‘px’转换为视窗单位的小数位数
      viewportUnit:'vw',  //指定需要转换成的视窗单位
      selectorBlackList:[], //指定不需要转换的类，
      minPixelValue:1,  //小于或等于‘1px’不转换为视窗单位
      mediaQuery:false  //允许在媒体查询中转换为‘px’
    },
  }
}
```
<br/>

## 性能优化

关于性能优化部分，主要是对页面中图片、icon图标的加载以及相关的代码逻辑进行了优化。

对于页面中的图片，每张图片及icon图标的加载都是需要发送一次http请求，对性能进行优化，考虑的就是尽量减少请求的发送
