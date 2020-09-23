<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-commend-info ref="comment" :comment-info="commentInfo"></detail-commend-info>
      <goods-list ref="recommend" :goods="reCommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommendInfo from './childComps/DetailCommendInfo';
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommendInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        reCommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res)
        //1.获取res结果
        const data = res.result;

        //2.获取顶部图片轮播数据
        this.topImages = data.itemInfo.topImages

        //3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //5.保存商品详情数据
        this.detailInfo = data.detailInfo

        //6.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //7.获取评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐商品数据
      getRecommend(this.iid).then(res => {
        // console.log(res)
        this.reCommends = res.data.list
      })

      //如果在外部获取图片的offsetTop值的话，此时的组件还没有被渲染出来。
      // this.$nextTick(() => {
      //   // 根据最新的图片数据，对应的DOM却是已经渲染出来了，
      //   // 但是图片依然没有被加载完成，此时获取的offsetTop是不包含图片的
      //   // 所以此时的offsetTop是不正确的。
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(-this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // })
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      })
    },
    mounted() {
    },
    updated() {
    },
    mixins: [ itemListenerMixin, backTopMixin ],
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImagListener)
    },
    methods: {
      imageLoad() {
        console.log('图片加载');
        this.newRefresh()
        this.getThemeTopY()
        console.log(this.themeTopYs);
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        // console.log(position);
        let postionY = -position.y;
        // console.log(postionY);
        let length = this.themeTopYs.length

        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (postionY > this.themeTopYs[i] && postionY < this
            .themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // for (let i = 0; i < length; i++) {
        //   if (i !== this.currentIndex && (i < length - 1 && postionY < this.themeTopYs[i] && postionY > this.themeTopYs[i + 1] || (i === length - 1 && postionY < this.themeTopYs[i]))) {
        //     this.currentIndex = i;
        //     // console.log(this.currentIndex);
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }

        this.isShowBackTop = postionY > 1000;
      },
      addToCart() {
        //1.点击以后给product添加值
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.nowPrice;
        product.iid = this.iid;
        //2.通过mutations给state赋值
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    height: 100vh;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 100px);
  }
</style>
