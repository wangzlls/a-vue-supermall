<template>
  <div class="toast" v-show="isShow">
    <div>{{messages}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    // props: {
    //   messages: {
    //     type: String,
    //     default: ''
    //   },
    //   isShow:{
    //     type: Boolean,
    //     default: false
    //   }
    // }
    data() {
      return {
        messages: '',
        isShow: false
      }
    },
    methods:{
      show(message,duration = 2000) {
        this.isShow = true
        this.messages = message

        setTimeout(() => {
          this.isShow = false
          this.messages = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    background-color: rgba(0, 0, 0, .6);
    top: 50%;
    left: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 40px;
    line-height: 40px;
    border-radius: 30%;
    text-align: center;
    z-index: 999;
  }
</style>
