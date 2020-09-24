<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      结算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    width: 100%;
    height: 44px;
    background-color: lightgoldenrodyellow;
    line-height: 40px;
  }

  .check-content{
    display: flex;
    align-items: center;
    /*margin-left: 10px;*/
    padding-left: 10px;
    width: 80px;
    background-color: lightsalmon;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{
    margin-left: 30px;
    flex: 1;
  }

  .calculate{
    width: 100px;
    background-color: #ffc0cb;
    color: #000;
    text-align: center;
    font-weight: bold;
  }
</style>
