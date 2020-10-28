import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import config from './config';
import { auth } from './firebase'

// Plugins
import jwtDecode from "jwt-decode";
import axios from 'axios';
import "@/plugins/vuelidate";

Vue.config.productionTip = false

// Localhost
// axios URL for when hosted??
axios.defaults.baseURL = 'http://localhost:5000/bouldpinnr/us-central1/api';

// request URL = https://console.firebase.google.com/project/bouldpinnr/database/data/getTenBoulders
// response URL = project/bouldpinnr/database/data/getTenBoulders

// axios.defaults.baseURL = config.firebaseConfig.authDomain;

const TOKEN = localStorage.FBIdToken;
if (TOKEN) {
  const decodedToken = jwtDecode(TOKEN);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch("user/logout");
    router.push("/");
   } else {
    store.dispatch("user/authenticate", true);
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
