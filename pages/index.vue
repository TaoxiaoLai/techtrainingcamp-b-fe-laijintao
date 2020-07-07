<template>
  <section class="container">
    <div class="logo-wrapper">
      <img src="../assets/img/logo.png" alt="" class="logo" />
    </div>
    <div class="search">
      <div class="placehoder">搜你想看</div>
      <img src="../assets/img/search.png" alt="" class="search-img">
    </div>
    <div class="hot-search">
      <div class="hot-title">
        <img src="../assets/img/img_title.png" alt="" class="icon-re
        ">
        <p>每分钟更新一次</p>
      </div>
      <div class="hot-content">
        <span class="order">1</span>
        <span class="hot-detail">辟谣中国送印度大米</span>
        <div class="icon-warpper">
          <img src="../assets/img/icon_xin.png" alt="" class="hot-icon">
        </div>
        <span class="nums">480.1万</span>
      </div>
    </div>
    <div @click="getdata1" class="data1">1</div>
    <div @click="getdata2" class="data1">2</div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    getdata1() {
      return axios.get('https://i.snssdk.com/search/api/study/', {
        params: {
          keyword: '前端'
        }
      }).then(res => {
        console.log(res)
      })
    } 
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 335px;
    margin: 0 auto;
    text-align: center;
    padding-top: 100px;
    .logo-wrapper {
      width: 130px;
      height: 54px;
      margin: 30px auto;
    }
    .search {
      height: 52px;
      border: 1px solid;
      padding: 0 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .placehoder {
        font-size: 18px;
        color: #9b9b9b;
      }
      .search-img {
        width: 24px;
        height: 24px;
      }
    }
    .hot-search {
      margin-top: 30px;
      .hot-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-re {
          width: 61px;
          height: 16px;
        }
        p {
          color: #999;
          font-size: 13px;
        }
      }
      .hot-content {
        height: 48px;
        line-height: 28px;
        padding: 10px 0;
        border-bottom: 1px solid #d8d7d7;
        .order {
          float: left;
          padding: 0 2px;
          color: #f04142;
        }
        .hot-detail {
          float: left;
          padding: 0 10px;
          font-size: 16px;
        }
        .icon-warpper {
          float: left;
          .hot-icon {
            width: 15px;
            height: 14px;
            vertical-align: middle;
          }
        }
        .nums {
          float: right;
          color: #9b9b9b;
          font-size: 12px;
        }
        ::after {
          display: block;
          content: ' ';
          clear: both;
        }
      }
    }
    .data1 {
      width: 50px;
      height: 50px;
      margin: 20px;
      background: red;
    }
  }
</style>
