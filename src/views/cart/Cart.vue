<template>
  <div class="cart">
    <!--顶部导航栏-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!--中间商品列表-->
    <cart-list/>

    <!--    中间的支付窗口-->
    <select-pay class="payment" v-show="isShow"/>
    <!--    支付窗口中选择支付宝和微信-->

    <!--底部结算-->
    <cart-bottom-bar @changeShow="changeShow"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import SelectPay from "../../components/common/payment/SelectPay";

  import {mapGetters} from 'vuex'
  import ALiPay from "../../components/common/payment/ALiPay";
  import ChatPay from "../../components/common/payment/ChatPay";

  export default {
    name: "Cart",
    components: {
      ChatPay,
      ALiPay,
      SelectPay,
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    },
    data() {
      return {
        isShow: false,
        num:0
      }
    },
    methods: {
      changeShow() {
        //   if (this.isShow === false) {
        //   }
        // this.num++
        // if (this.num % 2 === 0) {
        //
        this.isShow = !this.isShow
        // }
        // this.isShow = false
        // setTimeout(() => {
        //   this.isShow = false
        // },10000)
      }
    },
    destroyed() {

    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .payment {
    position: absolute;
    top: 40%;
    left: 25%;

  }
</style>
