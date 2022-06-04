<template>
  <v-app>
    <NavBar/>
      <!-- <v-navigation-drawer app> -->
        
        <!-- <NavBar @loggedIn="setUser"/> -->
      <!-- </v-navigation-drawer> --> 

          <!-- <v-app-bar app> -->
            <!-- -->
          <!-- </v-app-bar> --> 

          <!-- Sizes your content based upon application components -->
          <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>

              <!-- If using vue-router -->
              <router-view></router-view>
            </v-container>
          </v-main>

      <Footer />
      <!-- <v-footer app> -->
      <!-- </v-footer> -->

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
