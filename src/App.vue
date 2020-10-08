<template>
  <div id="app">
<!--    这里需要使用keep-alive来使整个路由处于或者状态，不然每次加载都重新在服务器调用数据,-->
<!--    exclude除去了Detail中的数据，不然每一次轮播图中的数据都会一样。-->
    <keep-alive exclude="Detail"><router-view/></keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>

  import MainTabBar from "./components/content/mainTabbar/MainTabBar";
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
