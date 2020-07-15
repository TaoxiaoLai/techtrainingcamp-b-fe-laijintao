<template>
  <div class="wrapper">
    <div class="cicle">
      <div class="inner"></div>
      <div class="middle"></div>
      <div class="outer"></div>
    </div>
    <div class="animation-text">
      <h1 class="title slide-bar">Hellow World!</h1>
      <p class="subtitle slide-bar">welcome to open the door to front-end world !</p>
    </div>
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
  opacity: .7;
  display: flex;
  align-items: center;
  .slide-bar {
    position: relative;
    color: transparent;
    animation: fill-text-white 2s 1.6s forwards;
    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #35b9f1;
      transform: scaleX(0);
      transform-origin: left;
      animation: slide-in-out 2s cubic-bezier(0.75, 0, 0, 1) forwards;
    }
  }
  @keyframes slide-in-out {
    50% {
      transform: scaleX(1);
      transform-origin: left;
    }
    50.1% {
      transform-origin: right;
    }
    100% {
      transform: scaleX(0);
      transform-origin: right;
    }
  }
  @keyframes fill-text-white {
    to {
      color: white;
    }
  }
  .animation-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      margin: 0;
      font-family: Lora, serif;
      font-size: 32px;
      line-height: 30px;
      &::before {
        background: #FF4081;
      }
    }
    .subtitle {
      margin: 10px 15px 0 15px;
      font-family: Lato, sans-serif;
      font-size: 12px;
      line-height: 30px;
      letter-spacing: 5px;
      text-transform: uppercase;
      animation-delay: 3.2s;
      &::before {
        background: #03A9F4;
        animation-delay: 2s;
      }
    }
  }
}
</style>
