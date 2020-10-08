<template>
  <div class="payment" v-show="closePayment">
    <span @click="closePay">X</span>
    <div class="ali-pay">
      <button @click="aliPay">支付宝支付</button>
    </div>
    <div class="chat-pay">
      <button @click="chatPay">微信支付</button>
    </div>
    <a-li-pay v-show="aliShow" class="aliPayMent"/>
    <chat-pay v-show="chatShow" class="chatPayMent"/>
  </div>
</template>

<script>
  import ALiPay from "./ALiPay";
  import ChatPay from "./ChatPay";

  export default {
    name: "SelectPay",
    components: {ChatPay, ALiPay},
    data() {
      return {
        closePayment: true,
        aliShow: false,
        chatShow: false
      }
    },
    methods: {
      aliPay() {
        this.aliShow = !this.aliShow
        console.log(this.aliShow);
      },
      chatPay() {
        this.chatShow = !this.chatShow
        console.log(this.chatShow);
      },
      closePay() {
        this.closePayment = !this.closePayment
        // this.$bus.$el.cart.isShow = false
        console.log(this.closePayment);
      }
    },
    destroyed() {
      console.log('SelectPay destroyed');
    }

  }
</script>

<style scoped>
  .payment {
    width: 200px;
    height: 50px;
    background-color: rgba(220, 255, 185, .3);
  }

  .payment button {
    padding: 4px;
    background-color: #ccc;
    color: #fff;
    border: none;
  }

  .payment span {
    float: right;
    font-weight: bold;
    font-size: 15px;
    margin: 3px 3px 0 0;
    color: red;
  }

  .payment .ali-pay {
    position: relative;
    display: inline-block;
    bottom: -15px;
    margin-left: 10px;
  }

  .payment .chat-pay {
    position: relative;
    float: right;
    margin-right: 5px;
    bottom: -15px;
  }

  .payment .aliPayMent {
    position: fixed;
    top: 30%;
    left: 60px;
  }

  .payment .chatPayMent{
    position: fixed;
    top: 30%;
    left: 60px;
  }
</style>
