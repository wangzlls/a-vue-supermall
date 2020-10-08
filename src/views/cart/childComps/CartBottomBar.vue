<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：<span>{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      结算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    data() {
      return {
      }
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)   //toFixed：保留两位小数
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        //查找当前商品中是否有未选中的，如果有则未false
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
        // return !this.cartList.filter(item => item.checked).length
      }
    },
    methods:{
      checkClick() {
        //全选按钮，将未全选的改为全选，将全选的改为未全选
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        //当购物车中选中的商品为0时：（看了淘宝以后，发现并没有这种显示，索性直接替换为点击后显示两个支付图片）
        // if (this.checkLength === 0) {
        //   this.$toast.show('请选择购买的商品',2000)
        // }
        if (this.checkLength !== 0) {
          this.$emit('changeShow')
        }
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
    background-color: lightgoldenrodyellow;
    padding-left: 30px;
    flex: 1;
  }

  .price span{
    font-size: 12px;
  }

  .calculate{
    border: 2px solid pink;
    border-radius: 50px;
    width: 100px;
    background-color: #ffc0cb;
    color: #000;
    text-align: center;
    font-weight: bold;
  }
</style>
