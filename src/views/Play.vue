<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-card class="mx-auto">
            <v-overlay class='overlay' :absolute="absolute" :opacity="opacity" :value="overlay">
              <div class="img">
              </div>
              <div class='bottom' :opacity="opacity">
                <h3> {{activeFormation}} / {{total}} </h3>
                <v-btn active-class="hide" color="orange lighten-2" outlined @click="overlay=false">
                  Hide Overlay
                </v-btn>
                <v-btn id="hintsButton" color="orange lighten-2" outlined @click="hint">
                Hint ({{hints}} left)
            </v-btn>
              </div>
          </v-overlay>

          <div class='map'>
             <Map @clicked="setPin"/>
          </div>
          <div class='buttons'>
            <div>
              <h3> {{activeFormation}} / {{total}} </h3>
            </div>
            <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="overlay=true">
                show overlay
            </v-btn>
            <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="submit">
                Submit
            </v-btn>
            <v-btn id="hintsButton" :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="hint">
                Hint ({{hints}} left)
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
  loading: false,
  position: null,
  components: {
    Map
  },
  methods: {
    submit() {
      console.log('submit clicked, active formation: ', this.activeFormation);
      console.log('\n pinned location: ', this.position);
      // verify a guess was made
      if(this.position == null) {
        alert('pin your guess on the map before you move on!')
      }
      else {
        // get results for this guess
        // await response from distance algo
        const result = {
          pinnedLocation: this.position,
          distanceAway: '1',
          points: '2'
        }
        console.log('\n this.result: ', result);
        // add to the results array
        this.results.push(result);
        
        // update avg distance / total distance
        // check iteration and go to next one or finish
        if(this.activeFormation == 10) {
          // this game is finished
        } else {
          // reset and go to next formation
          this.position = null; // reset guess for next one
          this.activeFormation++;
          this.overlay = true;
          console.log('inc, active formation: ', this.activeFormation);
        }
        // reset map 
        // reset
        console.log("\n ")
      }
    },
    hint() {
      console.log('hint clicked');
      if(this.hints == 0) {
        alert('no hints left ths game!');
      } else {
        this.overlay=true;
        this.hints-=1;
        this.showHint=true;
      }
    },
    setPin(position) {
      console.log('setPin clicked, position: ', position.lat, position.lng);
      this.position = position;
    },
    mounted() {
      // get the information for the 10 formations, set user scope onto first one
    },
    created() {}
  },
  data: () => ({
    totalDistance: 0,
    avgDistance: 0,
    hints: 2,
    showHint: false,
    activeFormation: 1,
    total: 10,
    absolute: true,
    opacity: .7,
    overlay: true,
    results: []
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
.formation {
  border: 1px solid green;
}
.hint {
  border: 1px solid purple;
}
.overlay {
  display: grid;
}
.img {
  border: 1px solid green;
  height: 575px;
  width: 850px;
}
.bottom {
  border: 1px solid red;
  height: 75px;
  width: 850px;
}
</style>
