<template>
  <section class="container">
    <div class="search-head">
      <img src="../assets/img/arrow-left.png" alt="" class="back-img">
      <div class="input-wrapper">
        <img src="../assets/img/search.png" alt="" class="search-img">
        <input type="text" placeholder="请输入搜索内容" class="input">
        <img src="../assets/img/del.png" alt="" class="del-img">
        <p class="search">搜索</p>
      </div>
    </div>
    <div class="nav-bar">
      <ul>
        <li class="item">综合</li>
        <li class="item">视频</li>
        <li class="item">资讯</li>
        <li class="item">小视频</li>
        <li class="item">图片</li>
        <li class="item">音乐</li>
        <li class="item">用户</li>
        <li class="item">微头条</li>
      </ul>
    </div>
    <div class="search-content">
      <div class="content-wrapper" v-for="(item, idx) in list" :key="idx">
        <div class="title">{{item.title}}</div>
        <div class="description">{{item.description}}</div>
        <div class="relation">
          <span>{{item.user_name}}</span>
          <span>{{item.comments_count}}条评论</span>
          <span>2018年10月5日</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  components: {

  },
  data() {
    return {
      isFixed: false,
      list: []
    }
  },
  mounted() {
    this.getdata1()
  },
  methods: {
    getdata1() {
      let that = this
      return axios.get('https://i.snssdk.com/search/api/study/', {
        params: {
          keyword: '前端'
        }
      }).then(res => {
        console.log(res)
        that.list = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    .search-head {
      width: 100%;
      padding: 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      position: fixed;
      top: 0;
      .back-img {
        width: 30px;
        height: 30px;
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
        }
        :first-child {
          padding-left: 15px;
          font-size: 22px;
          color: #e73e3e;
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
          text-align: justify;
          display:-webkit-box;
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
