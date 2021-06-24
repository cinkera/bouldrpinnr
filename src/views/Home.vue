<template>
  <div class="wrapper">
    <v-card class="mx-auto content" >
      <h2 class="text-center">Welcome to BouldrPinnr</h2>
      <h3 class="text-center">The world is filled with rock, do you think you know where they are?</h3>
      <v-btn :style='{color: this.$vuetify.theme.dark ? "white" : "#673ab7"}' class="button" outlined @click="play">
          Pin some climbs
        </v-btn>
    </v-card>
    <v-card class="mx-auto content" >
      <h2 class="text-center">Would you like to become a contributor to the game?</h2>
      <h3 class="text-center">We are always looking to expand the database of boulders, routes, 
        cliffs, and other formations!</h3>
      <h3 class="text-center">If you have accurate location data and a good picture of your formation, 
        feel free to make your contribution
      </h3>
      <v-btn :style='{color: this.$vuetify.theme.dark ? "white" : "#673ab7"}'
        class="button" outlined @click="contributeNav()">
        become a contributor
      </v-btn>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  },
  methods: {
    contributeNav() {
      this.$router.push('/contribute');
    },
    play() {
        // this starts the game, routing user to /play
        // query for game type TODO
        this.$router.push({path: '/games'});
      }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  margin: 5px auto;
  padding: 2px;
  display: flex;
  flex-direction: column;
}
.content {
  width: 90%;
  height: 30vh;
  margin: 2px auto;
  text-align: center;
}
.button {
  padding-top: 10px;
  margin: 5px auto;

}
v-btn:hover v-btn{
  color: #a880f2;
}
h2, h3 {
  padding-top: 5px;
}
</style>
