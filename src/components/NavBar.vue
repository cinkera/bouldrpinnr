<template>
<v-card class="overflow-y-hidden" :style="{height: drawer ? '400px' : '60px'}">
<v-app-bar color="deep-purple" class="wrapper">
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
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
        <v-list-item>
        <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title><router-link class="b" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" to="/account">Account</router-link></v-list-item-title>
        </v-list-item>
        <v-list-item>
        <v-list-item-icon v-if="!$vuetify.theme.dark" bottom @click="darkMode"><v-icon>mdi-weather-night</v-icon></v-list-item-icon>
        <v-list-item-icon v-else bottom @click="darkMode"><v-icon>mdi-white-balance-sunny</v-icon></v-list-item-icon>
        <v-list-item-title v-if="!$vuetify.theme.dark" bottom @click="darkMode">Dark Mode</v-list-item-title>
        <v-list-item-title v-else bottom @click="darkMode">Light Mode</v-list-item-title>          
        </v-list-item>
    </v-list-item-group>
    </v-list>
</v-navigation-drawer>
</v-card>
</template>

<script> 
export default {
  name: 'NavBar',
  components: {
  },
  methods: {
    // header function
    darkMode() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  data: () => ({
    drawer: false, // header
    group: null, // header
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
