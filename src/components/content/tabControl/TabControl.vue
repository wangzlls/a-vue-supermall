<!--流行，新款，精选三个按钮的组件-->
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index === currentIndex}"
         @click="itemClick(index)"
         :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  //流行，新款，精选三个按钮的组件
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        //此处将组件中的 流行，新款，精选 三个按钮点击的index传递出去。
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding-bottom: 5px;
  }

  .active {
    color: var(--color-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
