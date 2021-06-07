<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <!-- Eventually make this a component -->
        <v-card class="mx-auto" height="400" max-width="600">
          <div class="overline mr-1 inf">
          <h3>We will show you 10 pictures of rock formations from around the world, 
              and your job is to pin them on the map as close as you can!</h3>
          </div>
        </v-card>
        <!-- end -->
      </v-col>
    </v-row>  
    <v-row class="text-center">
      <v-col class="mb-4">
        <!-- <h1 class="display-2 mb-3">
          Welcome to BouldrPinnr
        </h1> -->

        <v-card class="mx-auto" height="200" max-width="600">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mr-1">
                <h2>Think you can pin climbs on the map?</h2>
              </div>
              <v-list-item-title  class="overline mr-1">
                <h3>Show us what you got!</h3>
              </v-list-item-title>
              <!-- <v-list-item-subtitle></v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>
          <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="play">
            Pin some climbs
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'infoBox',
    methods: {
      play() {
        // this starts the game, routing user to /play
        // query for game type TODO
        this.$router.push({path: '/play'});
      }
    },
    data: () => ({
    })
  }
</script>

<style scoped>
.container {
  margin-bottom: 10px;
}
.inf {
  padding: 4px;
}
</style>

