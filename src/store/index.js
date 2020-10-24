import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

// Files
import user from "./modules/users";
// import data from "./modules/data";

export default new Vuex.Store({
  modules: {
    user,
    // data
  },
})
