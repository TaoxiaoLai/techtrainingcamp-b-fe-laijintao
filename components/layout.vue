<template>
  <div class="wrapper">
    <div class="circle">
      <div class="inner"></div>
      <div class="middle"></div>
      <div class="outer"></div>
      <div class="bulb"></div>
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
  opacity: .8;
  display: flex;
  flex-direction: column;

  .circle {
    width: 100%;
    height: 400px;
    position: relative;
    .inner, .middle, .outer, .bulb {
      position: absolute;
      top: 50%;
      left: 50%;
    }
    .inner {
      width: 200px;
      height: 200px;
      margin: -100px 0 0 -100px;
      background: url('../assets/img/circle_inner.png') no-repeat center;
      background-size: contain;
      animation: circle_inner linear 8s infinite;
    }
    .middle {
      width: 220px;
      height: 220px;
      margin: -110px 0 0 -110px;
      background: url('../assets/img/circle_inner.png') no-repeat center;
      background-size: contain;
      animation: circle_middle linear 8s infinite;
    }
    .outer {
      width: 360px;
      height: 360px;
      margin: -180px 0 0 -180px;
      background: url('../assets/img/circle_middle.png') no-repeat center;
      background-size: contain;
      animation: circle_outer linear 10s infinite;
    }
    .bulb {
      width: 150px;
      height: 150px;
      margin: -75px 0 0 -75px;
      background: url('../assets/img/bulb.png') no-repeat center;
      background-size: contain;
      transform: scale(0, 0);
      animation: bulb 3s 1s ease-in-out forwards;
    }
  }

  .slide-bar {
    position: relative;
    color: transparent;
    animation: fill-text-white 2s 5.6s forwards;
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
      animation: slide-in-out 2s 4s cubic-bezier(0.75, 0, 0, 1) forwards;
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
      font-size: 20px;
      line-height: 30px;
      letter-spacing: 5px;
      text-transform: uppercase;
      animation-delay: 7.2s;
      &::before {
        background: #03A9F4;
        animation-delay: 6s;
      }
    }
  }

  @keyframes circle_inner {
    from {transform: rotateX(0deg);}
    to   {transform: rotateX(360deg);}
  }
  @keyframes circle_middle {
    from {transform: rotateY(0deg);}
    to   {transform: rotateY(360deg);}
  }
  @keyframes circle_outer {
    from {transform: rotateZ(0deg);}
    to   {transform: rotateZ(360deg);}
  }
  @keyframes bulb {
    from {transform: scale(0, 0);}
    75%  {transform: scale(1.5, 1.5);}
    to   {transform: scale(1, 1);}
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
}
</style>
