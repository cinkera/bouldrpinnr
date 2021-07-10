<template>
  <v-app>
    <NavBar/>
    <!-- <NavBar @loggedIn="setUser"/> -->
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import UploadButton from 'vuetify-upload-button';
// import { auth } from "@/firebase.js";

export default {
  name: 'App',
  components: {
    NavBar, Footer,'upload-btn': UploadButton
  },
  created() {
    // default dark mode
    this.$vuetify.theme.dark = true;
  },
  data: () => ({
    user: null,
    error: null,
    loading: false
  }),
  // methods: {
  //   setUser() {
  //     this.user = aut
  //   }
  // }
};
</script>
