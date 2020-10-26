<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-card class="mx-auto">
            <v-overlay class='overlay' :absolute="absolute" :opacity="opacity" :value="finished">
              <Results :combined='this.combined'/>
            </v-overlay>
            <v-overlay class='overlay' :absolute="absolute" :opacity="opacity" :value="loading">
              Loading!!
            </v-overlay>
            <v-overlay class='overlay' :absolute="absolute" :opacity="opacity" :value="overlay">
              <div class="img">
                <v-img :contain="true" :src="this.imageSource"></v-img>
              </div>
              <div class='bottom' :opacity="opacity">
                <h3> {{current}} / {{total}} </h3>
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
              <h3> {{current}} / {{total}} </h3>
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
import Map from '@/components/Map'
import Results from '@/components/Results'
import axios from "axios";
import { db } from '@/firebase'
import firebaseConfig from '../config'
import { mapGetters, mapActions, mapState} from 'vuex'
var geodist = require('geodist')

export default {
  name: 'Play',
  data: () => ({
    loading: false,
    finished: false,
    position: null,
    showHint: false,
    overlay: true,
    absolute: true,
    hints: 2,
    activeFormation: 0,
    current: 1,
    total: 4,
    totalDistance: 0,
    opacity: .9,
    boulders: [],
    results: [],
    combined: []
  }),
  computed: {
    imageSource() {
      const link =  this.boulders[this.activeFormation].imgLink;
      return link;
    }
  },
  components: {
    Map, Results
  },
  mounted() {
    this.getBoulders(4);
  },
  methods: {
    async submit() {
      // verify a guess was made
      if(this.position == null) {
        alert('pin your guess on the map before you move on!')
      }
      else {
        // get results for this guess
        const dist = await this.calculateDistance(this.position.lat, 
                          this.position.lng, 
                          this.boulders[this.activeFormation].Latitude, 
                          this.boulders[this.activeFormation].Longitude); 
        // update total score / distance, set result
        this.totalDistance += dist;
        const result = {
          pinnedLocation: this.position,
          distanceAway: dist,
          points: this.totalDist
        }
        console.log('\n this.result: ', result);
        // add to the results array
        this.results.push(result);
        // update avg distance / total distance
        // check iteration and go to next one or finish
        if(this.current == this.total) {
          // this game is finished
          alert('game is finished!');
          this.finished = true;
          this.combineResults();
        } else {
          // reset and go to next formation
          this.position = null; // reset guess for next one
          this.activeFormation++;
          this.current++;
          this.overlay = true;
        }
      }
    },
    hint() {
      console.log('hint clicked');
      if(this.hints == 0) {
        alert('no hints left this game!');
      } else {
        alert(this.boulders[this.activeFormation].hint);
        this.hints-=1;
      }
    },
    setPin(position) {
      this.position = position;
    },
    async getBoulders(limit) {
      this.loading = true;
      try {
        const res = await axios(`/getTenBoulders/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        });
        this.boulders = res.data.boulders;
        this.loading = false;
      } catch(error) {
        console.log('\n error in getBoulders');
        return res.error('Error in getting Boulders in Play.vue');
      }
    },
    // // calculate distance for GPS coords function
    async calculateDistance(lat1, lon1, lat2, lon2) {
      var dist = geodist({lat: lat1, lon: lon1}, {lat: lat2, lon: lon2});
      console.log('\n ... dist: ', dist);
      return dist;
    },
    combineResults() {
      const comb = [];
      var tmp = 0;
      this.boulders.forEach((ele) => {
        const temp = {
          name: ele.name,
          distance: this.results[tmp].distanceAway
        };
        comb.push(temp);
        tmp++;
      })
      this.combined = comb;
      console.log("\n combined: ", comb);
    }
  }  
}
</script>

<style scoped>
.buttons {
  margin: 3px auto;
  width: 90%;
  padding: 2px;
  padding-right: 3px;
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
  overflow-y: scroll;
  height: 575px;
  width: 850px;
}
.bottom {
  height: 75px;
  width: 850px;
}
</style>
