<template>
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
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
        &.uncurrentItem {
          padding: 0 10px;
          font-size: 18px;
        }
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
</style>
