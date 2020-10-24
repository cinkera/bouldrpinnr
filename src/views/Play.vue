<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-card class="mx-auto">
          <div class='map'>
             <Map @clicked="setPin"/>
          </div>
          <div class='buttons'>
            <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="submit">
                Submit
            </v-btn>
            <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="hint">
                Hint
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map'

export default {
  name: 'Play',
  position: null,
  components: {
    Map
  },
  methods: {
    submit() {
      console.log('submit clicked');
    },
    hint() {
      console.log('hint clicked');
    },
    setPin(position) {
      console.log('setPin clicked, position: ', position.lat, position.lng);
      this.position = position;
    }
  },
  data: () => ({
    hints: 2,
    current: 0,
    total: 10,
  })
}
</script>

<style scoped>
.buttons {
  margin: 3px auto;
  width: 90%;
  padding: 2px;
  padding-right: 3px;
  border: 1px solid black;
}
.map {
    top: 0;
    height: 90%;
}
</style>
