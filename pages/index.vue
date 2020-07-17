<template>
  <section class="container">
    <div class="logo-wrapper">
      <img src="https://lf1-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser/images/logo-2x.a7b8b9c7.png" alt="" class="logo" />
    </div>
    <a class="search-wrapper" href="http://localhost:3000/search">
      <div class="search">
        <div class="placehoder">搜你想看</div>
        <img src="../assets/img/search.svg" alt="" class="search-img">
      </div>
    </a>
    <div class="hot-search">
      <div class="hot-title">
        <img src="../assets/img/img_title.png" alt="" class="icon-re">
        <p>每分钟更新一次</p>
      </div>
      <div class="hot-content" v-for="(item, idx) in hotList" :key="idx">
        <span class="order" :class="{'orderRed': item.numRed}">{{item.num}}</span>
        <span class="hot-detail">{{item.content}}</span>
        <div class="icon-warpper">
          <img src="../assets/img/icon_re.png" alt="" class="hot-icon" v-if="item.hot">
          <img src="../assets/img/icon_xin.png" alt="" class="hot-icon" v-if="item.new">
        </div>
        <span class="nums">{{item.heat}}万</span>
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
      hotList: []
    }
  },
  async asyncData() {
    let {status, data: {hotList}} = await axios.get('http://localhost:3000/hotSearch/hotList/')
    if (status === 200) {
      return {
        hotList
      }
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
    padding-bottom: 30px;
    .logo {
      width: 130px;
      height: 54px;
      margin: 30px auto;
    }
    .search-wrapper {
      display: inline-block;
      width: 100%;
      .search {
        height: 52px;
        border: 1px solid #161616;
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
    }
    .hot-search {
      margin-top: 30px;
      .hot-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-re {
          width: 56px;
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
          font-size: 14px;
          padding: 0 2px;
          color: #9b9b9b;
          &.orderRed {
            color: #f04142;
          }
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
