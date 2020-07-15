<template>
  <section class="container">
    <div class="search-head">
      <a href="http://127.0.0.1:3000/">
        <img src="../assets/img/arrow-left.png" alt="" class="back-img">
      </a>
      <div class="input-wrapper">
        <img src="../assets/img/search.png" alt="" class="search-img">
        <input
          type="text"
          placeholder="请输入搜索内容"
          class="input"
          v-model="keyword"
          >
        <img src="../assets/img/del.png" alt="" class="del-img" @click="clearKeyword()">
        <p class="search" @click="currentIdx=0;getContentList(keyword,true)">搜索</p>
      </div>
    </div>
    <search-history v-show="showHistory" @search="getContentList"/>
    <div class="search-list" v-show="showSearchList">
      <div
        class="search-item-wrapper"
        v-for="(item, idx) in searchList"
        :key="idx"
        @click="getContentList(item.keyword)">
        <img src="../assets/img/search.png" alt="" class="search-img">
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
          @click="navSearch(idx,item)"
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
    <layout v-if="showLayout"/>
  </section>
</template>

<script>
import SearchHistory from '../components/searchHistory'
import Layout from '../components/layout'
import axios from 'axios'
export default {
  components: {
    SearchHistory,
    Layout
  },
  data() {
    return {
      keyword: '',
      timer: null,
      searchList: [],
      contentList: [],
      showHistory: true,
      showSearchList: true,
      showContent: false,
      showLayout: false,
      currentIdx: 0,
      navList: [
        '综合',
        '视频',
        '资讯',
        '训练营',
        '秋招',
        '音乐',
        '问答',
        '直播',
        '微头条'
      ]
    }
  },
  watch: {
    keyword() {
      if (!this.keyword) {
        let ul = document.getElementById('ul')
        ul.scrollLeft = 0
        this.currentIdx = 0
        this.searchList = []
        this.showHistory = true
        this.showSearchList = true
        this.showContent = false
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (this.keyword) {
          this.getSearchList()
        }
      }, 300)
    }
  },
  methods: {
    clearKeyword() {
      let ul = document.getElementById('ul')
      ul.scrollLeft = 0
      this.currentIdx = 0
      this.keyword = ''
      this.searchList = []
      this.showHistory = true
      this.showSearchList = true
      this.showContent = false
    },
    getSearchList() {
      return axios.get('https://i.snssdk.com/search/api/sug/', {
        params: {
          keyword: this.keyword
        }
      }).then(res => {
        this.showHistory = false
        this.searchList = res.data.data
      })
    },
    getContentList(keyword, fromSearch) {
      this.showHistory = false
      if (!keyword) {
        if (this.keyword) {
          keyword = this.keyword
        } else {
          return
        }
      }
      if (fromSearch) {
        let ul = document.getElementById('ul')
        ul.scrollLeft = 0
      }
      this.resetScrollTop()
      return axios.get('https://i.snssdk.com/search/api/study/', {
        params: {
          keyword
        }
      }).then(res => {
        this.showSearchList = false
        this.showContent = true
        this.keyword = keyword
        this.searchList = []
        this.contentList = res.data.data
        this.contentList.forEach(element => {
          element.create_time = this.getRealDate(element.create_time)
        })
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
    navSearch(idx, navKeyword) {
      let ul = document.getElementById('ul')
      switch (idx) {
        case 0: this.scrollAnimate(ul, 0)
          break
        case 1: this.scrollAnimate(ul, 0)
          break
        case 2: this.scrollAnimate(ul, 0)
          break
        case 3: this.scrollAnimate(ul, 47)
          setTimeout(() => {
            this.showLayout = true
          }, 600)
          setTimeout(() => {
            this.showLayout = false
          }, 11000)
          break
        case 4: this.scrollAnimate(ul, 94)
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
      // this.getContentList(navKeyword)
    },
    resetScrollTop() {
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
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
    }
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
          width: 24px;
          height: 24px;
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
  }
</style>
