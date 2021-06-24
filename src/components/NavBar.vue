<template>
<v-card class="overflow-y-hidden" :style="{height: drawer ? '400px' : '60px'}">
<v-app-bar color="deep-purple" class="wrapper">
    <v-app-bar-nav-icon @click="drawer = true" :style="{color: 'white'}"></v-app-bar-nav-icon>
    <v-toolbar-title><router-link class="a" to="/">BouldrPinnr</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
</v-app-bar>
<v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav dense>
    <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
        <v-list-item>
        <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title><router-link class="b" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" to="/">Home</router-link></v-list-item-title>
        </v-list-item>
<!-- 
        <v-list-item>
        <v-list-item-icon>
            <v-icon>mdi-chart-bubble</v-icon>
        </v-list-item-icon>
        <v-list-item-title><router-link class="b" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" to="/learn">Learn</router-link></v-list-item-title>
        </v-list-item> -->

        <v-list-item>
        <v-list-item-icon>
            <v-icon>mdi-upload</v-icon>
        </v-list-item-icon>
        <v-list-item-title><router-link class="b" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" to="/contribute">Contribute a climb!</router-link></v-list-item-title>
        </v-list-item>

        <v-list-item v-if="this.user">
        <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title><router-link class="b" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" to="/account">Account</router-link></v-list-item-title>
        </v-list-item>

        <v-list-item v-if="(this.user && this.user.uid=='dQ2nCzva75ZvgE8Xy6YzRKO8urf2')">
        <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title><router-link class="b" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" to="/adminControlPanel">Admin Dashboard</router-link></v-list-item-title>
        </v-list-item>

        <v-list-item v-if="!this.user">
        <v-list-item-icon>
            <v-icon>mdi-login-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title><router-link class="b" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" to="/login">Sign up</router-link></v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon v-if="!$vuetify.theme.dark" bottom @click="darkMode"><v-icon>mdi-weather-night</v-icon></v-list-item-icon>
          <v-list-item-icon v-else bottom @click="darkMode"><v-icon>mdi-white-balance-sunny</v-icon></v-list-item-icon>
          <v-list-item-title v-if="!$vuetify.theme.dark" bottom @click="darkMode">Dark Mode</v-list-item-title>
          <v-list-item-title v-else bottom @click="darkMode">Light Mode</v-list-item-title>          
        </v-list-item>

        <v-list-item v-if="this.user">
        <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="b" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" @click="logout">Log out</v-list-item-title>
        </v-list-item>
    </v-list-item-group>
    </v-list>
</v-navigation-drawer>
</v-card>
</template>

<script> 
import { auth } from "@/firebase.js";

export default {
  name: 'NavBar',
  components: {
  },
  methods: {
    // header function
    darkMode() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    logout() {
      auth
      .signOut()
      .then(() => {
        alert('Successfully logged out');
        this.user = null;
        this.$router.push('/');
      })
      .catch(error => {
        alert(error.message);
        this.$router.push('/');
      });
    }
  },
  created() {
    this.user = auth.currentUser;
  },
  data: () => ({
    drawer: false, // header
    group: null, // header
    user: null,
  }),
}
</script>

<style scoped>
.wrapper {
  width: 100%;
}
.a {
  text-decoration: none;
  color: white;
}
.b {
  text-decoration: none;
}
</style>
