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
    // 默认情况下BScroll是不可以实时的监听滚动位置
    // probe 侦测
    // 0,1都是不侦测实时的位置
    // 2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测.
    // 3: 只要是滚动, 都侦测.
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //mouted函数，在页面创建完成后调用。
      //创建SColl对象
      this.scroll = new BScoll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        //position是BScoll的默认参数，可以直接调用
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        });
      }
      //3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          //pullingUp是BScoll 的默认方法，可以直接调用
          // console.log('监听到滚到底部');
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x*1, y*1, time)
      },
      refresh() {
        console.log('+++++');
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        //在是用pullUp后，需要调用finishPullUp()，才能多次执行pullUp
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
