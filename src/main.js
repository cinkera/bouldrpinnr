import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';
// import config from './config';
import { auth } from './firebase'

// Plugins
import jwtDecode from "jwt-decode";
import "@/plugins/vuelidate";

Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://localhost:5000/bouldpinnr/us-central1/api'; // localhost
axios.defaults.baseURL = 'https://us-central1-bouldpinnr.cloudfunctions.net/api'; // production

const TOKEN = localStorage.FBIdToken;
if (TOKEN) {
  const decodedToken = jwtDecode(TOKEN);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch("user/logout");
    router.push("/");
   } else {
    store.dispatch("user/authenticate", true);
    // instantiated, change V
    axios.defaults.headers.common["Authorization"] = TOKEN;
    store.dispatch("user/getUserData");
  }
}

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
