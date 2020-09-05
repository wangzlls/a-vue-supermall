<template>
  <!--给组件绑定属性-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScoll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll:null
      }
    },
    mounted() {

      this.scroll = new BScoll(this.$refs.wrapper,{

      })
    }
  }
</script>

<style scoped>

</style>
