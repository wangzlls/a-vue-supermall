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
      //此处通过this,$refs,wrapper拿到对应的标签，Vue中不建议使用原生的DOM。
      this.scroll = new BScoll(this.$refs.wrapper, {
        //在scroll中的点击事件默认为false,不能点击，此处需要重新设置为true
        click: true,
        //设置scroll开启的模式，
        probeType: this.probeType,
        //上拉事件，
        pullUpLoad: this.pullUpLoad
      });

      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        //position是BScoll的默认参数，可以直接调用
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          //在scroll中监听scroll的position，并发射出去
          this.$emit('scroll', position)
        });
      }
      //3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          //pullingUp是BScoll 的默认方法，可以直接调用
          //当加载到底部的时候，将此方法发射到Home组件中。
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time) {
        //当存在scroll对象时，才执行，
        //后面x,y * 1 是为了避免在Home中传值时，变为字符串类型导致报错，此处乘以1后，便成为了Number类型
        this.scroll && this.scroll.scrollTo(x*1, y*1, time)
      },
      refresh() {
        // console.log('+++++');
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
