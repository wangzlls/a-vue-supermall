<!-- 详情页轮播图，图片展示 -->
<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from '../../../components/common/swiper/Swiper'
  import SwiperItem from '../../../components/common/swiper/SwiperItem'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }

</script>s
<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
