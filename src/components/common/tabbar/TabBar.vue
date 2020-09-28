<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    /*1：水平，2：垂直，3：阴影距离，4：颜色*/
    box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  }

</style>
