<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-card class="mx-auto wrapper" height="400" max-width="800">
          <div class="overline mr-1 title">
            <h3>Do you think you know rock climbs well enough to pin them on the map?</h3>
          </div>
          <div class="overline mr-1 buttons">
            <h3>Give it a try!</h3>
            <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="play">
              Pin some climbs
            </v-btn>
          </div>
          <div class="note">
            <h4 class="overline mr-1">*This is version 1.0, there will be more rocks and features soon</h4>
            <h4 class="overline mr-1">*Also ignore any wonky formatting on mobile pls</h4>
          </div>
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
        this.$router.push({path: '/play'});
      }
    },
    data: () => ({
    })
  }
</script>

<style scoped>
.wrapper {
  margin: 10px auto;
  padding: 10px;
}
.title {
  height: 25%;
}
.buttons {
  height: 50%
}
.note{
  height: 10%;
}
</style>
