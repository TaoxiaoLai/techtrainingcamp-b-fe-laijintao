<template>
  <section class="container">
    <div class="search-head">
      <nuxt-link to="/">
        <img src="../assets/img/arrow.png" alt="" class="back-img">
      </nuxt-link>
      <div class="input-wrapper">
        <img src="../assets/img/search.svg" alt="" class="search-img">
        <input
          type="text"
          placeholder="请输入搜索内容"
          class="input"
          v-model="keyword"
          >
        <img src="../assets/img/del.png" alt="" class="del-img" @click="clearKeyword()">
        <p class="search" @click="getContentList(keyword, 0)">搜索</p>
      </div>
    </div>
    <search-history v-show="showHistory" @search="getContentList"/>
    <div class="search-list" v-show="showSearchList">
      <div
        class="search-item-wrapper"
        v-for="(item, idx) in searchList"
        :key="idx"
        @click="getContentList(item.keyword)">
        <img src="../assets/img/search.svg" alt="" class="search-img">
        <div class="search-item">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <div class="nav-bar" v-if="showContent">
      <ul id="ul">
        <li
          class="item"
          v-for="(item,idx) in navList"
          :key="idx"
          :class="{'currentItem': currentIdx==idx}"
          @click="navChange(idx)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="search-content" v-if="showContent">
      <div class="content-wrapper" v-for="(item, idx) in contentList" :key="idx">
        <div class="title">{{item.title}}</div>
        <div class="description">{{item.description}}</div>
        <div class="relation">
          <span>{{item.user_name}}</span>
          <span>{{item.comments_count}}条评论</span>
          <span>{{item.create_time}}</span>
        </div>
      </div>
    </div>
    <!-- transtion控制彩蛋动画渐影渐现 -->
    <transition name="slide-fade">
      <mask-layer v-if="showLayer"/>
    </transition>
  </section>
</template>

<script>
import SearchHistory from '../components/searchHistory'
import MaskLayer from '../components/maskLayer'
import axios from 'axios'
export default {
  components: {
    SearchHistory,
    MaskLayer
  },
  data() {
    return {
      keyword: this.$route.params.keyword || '',    // 搜索框关键词
      offset: 0,  // 搜索偏移量
      fromHotList: this.$route.params.fromHotList || false,   // 是否来自首页热搜榜
      searchList: [],   // 搜索关键词匹配列表
      contentList: [],  // 搜索结果列表
      showHistory: true,  // 是否显示历史搜索
      showSearchList: true, // 是否显示关键词匹配列表
      showContent: false,   // 是否显示搜索结果
      showLayer: false,    // 是否显示彩蛋动画
      currentIdx: 0,    // nav-bar当前显示tab的id
      isSearch: true,   // 控制搜索结果页改变keyword不触发获取关键词匹配列表
      navList: [        // nav-bar各个tab的显示内容列表
        '综合',
        '视频',
        '资讯',
        '图片',
        '训练营',
        '音乐',
        '问答',
        '直播',
        '微头条'
      ]
    }
  },
  mounted() {
    // 来自首页热榜时，触发获取搜索结果列表
    if (this.fromHotList === true) {
      this.getContentList()
      this.fromHotList = false
    }
    // 监听滚动条事件，触底时加载更多搜索结果
    window.addEventListener('scroll', this.touchBottomGetMore)
  },
  watch: {
    keyword() {
      if (!this.keyword) {
        this.resertIndex()
      }
      let timer
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {  // 节流
        // 在搜索结果页keyword改动不触发获取关键词匹配列表
        if (this.keyword && this.isSearch) {
          this.getSearchList()
        }
      }, 300)
    }
  },
  methods: {
    clearKeyword() {
      this.keyword = ''
    },
    getSearchList() {
      return axios.get('http://localhost:3000/search/searchList/', {
        params: {
          keyword: this.keyword
        }
      }).then(res => {
        this.showHistory = false
        this.searchList = res.data.data
      })
    },
    getContentList(keyword, offset = 0) {
      this.isSearch = false
      this.showHistory = false
      if (offset === 0) {
        this.offset = offset
        this.contentList = []
        this.resetScrollTop()
      }
      if (!keyword) {
        if (this.keyword) {
          keyword = this.keyword
        } else {
          return
        }
      } else {
        this.keyword = keyword
      }
      return axios.get(`http://localhost:3000/search/searchContent/`, {
        params: {
          keyword,
          offset
        }
      }).then(res => {
        this.showSearchList = false
        this.showContent = true
        this.searchList = []
        res.data.data.forEach(element => {
          element.create_time = this.getRealDate(element.create_time)
        })
        this.contentList = this.contentList.concat(res.data.data)
        if (this.currentIdx !== 0) {
          this.currentIdx = 0
          this.navChange(0)
        }
      })
    },
    getRealDate(createTime) {
      let realTime = ''
      let time = new Date(createTime)
      let year = time.getFullYear()
      let month = time.getMonth()
      let date = time.getDate()
      realTime = `${year}年${month}月${date}日`
      return realTime
    },
    // 滚动条触底加载更多内容
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
    },
    navChange(idx) {
      let ul = document.getElementById('ul')
      switch (idx) {
        case 0: this.scrollAnimate(ul, 0)
          break
        case 1: this.scrollAnimate(ul, 0)
          break
        case 2: this.scrollAnimate(ul, 0)
          break
        case 3: this.scrollAnimate(ul, 47)
          break
        case 4: this.scrollAnimate(ul, 94)
          setTimeout(() => {
            this.showLayer = true
          }, 600)
          setTimeout(() => {
            this.showLayer = false
          }, 12000)
          break
        case 5: this.scrollAnimate(ul, 153)
          break
        case 6: this.scrollAnimate(ul, 188)
          break
        case 7: this.scrollAnimate(ul, 188)
          break
        case 8: this.scrollAnimate(ul, 188)
          break
      }
      this.currentIdx = idx
    },
    // nav-bar横向点击切换动画
    scrollAnimate(ele, standTarget) {
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
    },
    resertIndex() {   // keyword清空时重置页面显示内容
      this.currentIdx = 0
      this.offset = 0
      this.searchList = []
      this.contentList = []
      this.showHistory = true
      this.showSearchList = true
      this.showContent = false
      this.isSearch = true
    },
    resetScrollTop() {
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.touchBottomGetMore, false)
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    overflow: hidden;
    .search-head {
      width: 100%;
      padding: 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      position: fixed;
      top: 0;
      a {
        display: inline-block;
        .back-img {
          width: 30px;
          height: 30px;
          transform: rotateZ(180deg);
          margin-top: 5px;
        }
      }
      .input-wrapper {
        display: flex;
        align-items: center;
        width: 350px;
        height: 44px;
        padding-left: 5px;
        margin-right: 10px;
        background: #e6e3e3;
        border-radius: 5px;
        .search-img {
          flex: 1;
          width: 20px;
          height: 20px;
        }
        .input {
          flex: 9;
          background: #e6e3e3;
          padding-left: 8px;
          height: 24px;
          line-height: 24px;
          font-size: 17px;
          caret-color: rgb(5, 127, 146); // 改变输入框焦点颜色
          border: 0;
          outline: none;
          background-color: rgba(0,0,0,0);
        }
        .del-img {
          flex: 1;
          margin: auto 5px;
          width: 24px;
          height: 24px;
        }
        .search {
          font-size: 16px;
          flex: 2.5;
          text-align: center;
          border-left: 1px solid #7e7d7d;
        }
      }
    }
    .search-list {
      width: 100%;
      margin-top: 60px;
      .search-item-wrapper {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e3e3;
        .search-img {
          flex: 1;
          width: 16px;
          height: 16px;
          margin: 0 8px;
        }
        .search-item {
          flex: 19;
          font-size: 17px;
          color: #999;
          white-space: nowrap;  // 不换行
          text-overflow: ellipsis;  // 显示省略号
          overflow: hidden;
        }
      }
    }
    .nav-bar {
      width: 100%;
      height: 39px;
      margin-top: 55px;
      overflow: hidden;
      border-bottom: 1px solid #e6e3e3;
      ul {
        width: auto;
        overflow-x: auto;
        white-space: nowrap;
        .item {
          display: inline-block;
          text-align: center;
          height: 44px;
          line-height: 44px;
          padding: 0 10px;
          font-size: 18px;
          transition: .4s;
          &.currentItem {
            font-size: 22px;
            color: #e73e3e;
          }
        }
        :first-child {
          padding-left: 15px;
        }
      }
    }
    .search-content {
      width: 100%;
      background-color: #e6e3e3;
      padding-bottom: 1px;
      .content-wrapper {
        width: 100%;
        margin-bottom: 5px;
        background-color: #ffffff;
        padding: 15px 17px;
        .title {
          font-size: 20px;
          font-weight: bold;
          padding-bottom: 10px;
        }
        .description {
          font-size: 14px;
          color: #7e7d7d;
          text-align: justify;   // 两端对齐
          display:-webkit-box;  // 显示3行，多出来的省略号
          -webkit-line-clamp:3;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
        .relation {
          padding-top: 10px;
          font-size: 12px;
          color: #7e7d7d;
          span {
            padding-right: 6px;
          }
        }
      }
    }
    .slide-fade-enter-active {
      transition: all .8s ease-in-out;
    }
    .slide-fade-leave-active {
      transition: all .8s ease-in-out;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translate(0, 0);
      opacity: 0;
    }
  }
</style>
