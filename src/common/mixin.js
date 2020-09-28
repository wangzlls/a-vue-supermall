import {debounce} from './utils'
import BackTop from "components/content/backTop/BackTop";
//mixin混入，将重复性的代码放在这里，用法：在实例中mixin这个对象


export const itemListenerMixin = {
  data() {
    return {
      itemImageListener:null,
      newRefresh:null
    }
  },
	mounted() {
		this.newRefresh = debounce(this.$refs.scroll.refresh,100)

		this.itemListener = () => {
			this.newRefresh()
		}
		this.$bus.$on('itemImgLoad',this.itemListener)
	}
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 50, 1000)
    },
  }
}
