<template>
  <div class="search-history">
    <p>历史记录</p>
    <div class="history-wrapper">
      <div
        class="history-content"
        v-for="(item, idx) in historyList"
        :key="idx"
        @click="search(item)">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyList: [
        '玩转前端训练营',
        '字节跳动面试',
        'React从入门到精通',
        'ES6标准入门（第3版）',
        'JavaScript高级程序设计',
        'Vue 3.0 新特性'
      ]
    }
  },
  methods: {
    search(keyword) {
      this.$emit('search', keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-history {
    width: 100%;
    margin-top: 60px;
    padding-left: 10px;
    background-color: #ffffff;
    p {
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      color: #999999;
    }
    .history-wrapper {
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;
      :nth-child(even)::before {  // 给偶数项的子元素添加一个伪元素
        display: inline-block;
        content: '';
        width: 2px;
        height: 10px;
        margin-right: 10px;
        margin-top: 10px;
        background-color: gray;
      }
      .history-content {
        width: 48%;
      }
    }
  }
</style>
