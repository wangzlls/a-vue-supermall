import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  cartList: []
};
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
//挂载到Vue实例上
export default store

