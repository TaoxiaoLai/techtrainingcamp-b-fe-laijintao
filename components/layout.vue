<template>
  <div class="wrapper">
    <p class="landin">
      You derserve more than what you have!
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  z-index: 100;
  opacity: .5;
  .landin {
    width: 80%;
    margin: 250px auto;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
