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
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll:null
      }
    },
    mounted() {
      //创建SColl对象
      this.scroll = new BScoll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      //2.监听滚动的位置
      if (this.probeType ===2 || this.probeType ===3 ) {
        this.scroll.on('scroll',(position) => {
          // console.log(position);
          this.$emit('scroll',position)
        });
      }
      //3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          // console.log('监听到滚到底部');
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time) {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
