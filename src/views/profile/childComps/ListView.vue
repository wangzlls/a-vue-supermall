<template>
  <div id="list">
    <div class="message">
      <img src="~assets/img/profile/message.svg" alt="">
      <span>我的消息</span>
    </div>
    <div class="message">
      <img src="~assets/img/profile/pointer.svg" alt="">
      <span>积分商城</span>
    </div>
    <div class="message">
      <img src="~assets/img/profile/vip.svg" alt="">
      <span>会员中心</span>
    </div>
    <div class="space"></div>
    <div class="others">
      <div class="cart message">
        <img src="~assets/img/profile/cart.svg" alt="">
        <span>我的购物车</span>
      </div>
      <div class="app message">
        <img src="~assets/img/profile/shopping.svg" alt="">
        <span>下载购物app</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
  }
</script>

<style scoped>
  #list {
    width: 100%;
    font-size: 13px;
    color: #333;
  }

  .message{
    border: 1px solid #eee;
    border-bottom: #ccc;
    height: 44px;
    background-color: #fff;
  }
  .message img {
    width: 33px;
    height: 33px;
  }

  .message span{
    margin-left: 10px;
    vertical-align: 9px;
    font-size: 18px;
    font-weight: bold;
    line-height: 44px;
  }

  .space{
    height: 20px;
    background-color: #f2f2f2;
  }

  .others img{
    width: 33px;
    height: 33px;
  }

  .others span{
    margin-left: 10px;
    vertical-align: 9px;
    font-size: 18px;
    font-weight: bold;
    line-height: 44px;
  }
</style>
