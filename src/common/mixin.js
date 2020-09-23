import {debounce} from './utils'

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
