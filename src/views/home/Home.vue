<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 导航栏的轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 导航栏下面的推荐内容 -->
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
<!--      请求商品数据-->
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import { getHomeMultidata, getHomeGoods } from "network/home";
  import { debounce } from "common/utils";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    computed: {
      showGoods() {
        //通过计算属性的方式来获取pop,new,sell的值，避免在goods-list中写入大量的代码
        //此处的currentType通过下面的tabClick改变的switch的值而改变。
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      //这个函数在首页离开时就会销毁
      // console.log('home destroyed');
    },
    activated() {
      //这个函数当处在首页时才会创建
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //当首页不活跃时才会调用
      this.saveY = this.$refs.scroll.getScrollY();
      // console.log(this.saveY);
    },
    created() {
      /**
       * 当页面开始加载时就开始请求获取轮播图的数据以及商品中的pop，new,sell的数据。
       * 在created中不建议直接写具体的方法实现
       * 最好是封装到methods里面，在created中调用下面的方法。
       * **/
      //1.请求轮播图数据，此处来自network中的home.js
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      //已经完成模板渲染或el对应的html已经渲染
      //1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 500);
      //通过事件总线拿到GoodsListItem中发射出来的方法，然后在此处每次刷新
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      });
    },
    methods: {
      /**
       * 事件监听的方法
       */
      tabClick(index) {
        //此处返回 流行 新款 精选 的下标，通过switch选择下标值，改变data中currentType中的值。
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        //由于设置了ref，所以能通过$refs拿到scroll组件，再通过组件中scroll对象的方法回到顶部
        //scrollTo:三个参数，第一个X轴，第二个Y轴，第三个时间，此处写死了，回到顶部
        this.$refs.scroll.scrollTo(0, 50, 1000)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;
        //2.决定tabControl是否吸顶设置 position:fixed
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        //在Scroll组件中拿到了PullingUp方法，当调用该方法时，回调下面的getHomeGoods方法，并传入'pop' or 'new' or 'sell'的值
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        /*通过this.$refs.tabControl2.$el.offsetTop 拿到组件的offsetTop值
        所有的组件都有一个$el值，这个值就是组件中的元素*/
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求的相关方法
       */
      getHomeMultidata() {
        //获取轮播图中的数据
        getHomeMultidata().then(res => {
          console.log('res-------->',res)

          //获取轮播图中的数据
          this.banners = res.data.banner.list;
          // console.log('this.banners-------->',this.banners)
          //获取轮播图下面四张图片的数据
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        //在此处设置变量page,防止下面的getHomeGoods中的page写死，由于上面data中的page为0，所以此处+1
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          //三个点（...是将拿到的list中的数据一一进行解析，然后push到上面goods中的空list中）
          this.goods[type].list.push(...res.data.list);
          //每一次调用此方法时，page变量都+1
          this.goods[type].page += 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了不让导航不随着一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
