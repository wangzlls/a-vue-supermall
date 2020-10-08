<template>
  <div class="chat-pay" v-show="isShow">
    <span @click="closePng">X</span>
    <img src="~assets/img/cart/chatPay.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "ChatPay",
    data() {
      return {
        isShow:true
      }
    },
    methods:{
      closePng() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style scoped>
  .chat-pay{
    width: 250px;
    height: 260px;
    /*background-color: #ccc;*/
  }
  .chat-pay span{
    float: right;
    font-weight: bold;
    color: red;
  }

  .chat-pay img {
    width: 250px;
    height: 250px;
    /*position: absolute;*/
    /*top: 40%;*/
    /*left: 10%;*/
  }
</style>
