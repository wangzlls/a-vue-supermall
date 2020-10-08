<template>
  <div class="ali-pay" v-show="isShow">
    <span @click="closePng">X</span>
    <img src="~assets/img/cart/aliPay.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "ALiPay",
    data() {
      return {
        isShow:true
      }
    },
    methods:{
      closePng() {
        this.isShow = !this.isShow
      }
    },

  }
</script>

<style scoped>
  .ali-pay{
    width: 250px;
    height: 260px;
    /*background-color: #ccc;*/
  }
  .ali-pay span{
    float: right;
    font-weight: bold;
    color: red;
  }

  .ali-pay img {
    width: 250px;
    height: 250px;
    /*position: absolute;*/
    /*top: 40%;*/
    /*left: 10%;*/
  }
</style>
