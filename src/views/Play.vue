<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4 main">
        <v-card class="mx-auto wrap">

            <!-- results overlay -->
            <v-overlay class='overlay results' :absolute="absolute" :opacity="opacity" :value="finished">
              <Results :combined='this.combined'/>
            </v-overlay>

            <!-- loading overlay -->
            <v-overlay class='overlay' :absolute="absolute" :opacity="opacity" :value="loading">
              Loading your rock formations!
            </v-overlay>

            <!-- Active Formation overlay -->
            <v-overlay class='overlay active' :absolute="absolute" :opacity="opacity" :value="overlay">
              <div class="img">
                <v-img class="mx-auto center" max-width="65vh" max-height="70vh" :src="this.imageSource"></v-img>
              </div>
              <div class='bottom' :opacity="opacity">
                <h3> {{current}} / {{total}} </h3>
                <v-btn class="hide butt" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" color="white" outlined @click="overlay=false">
                  show the Map
                </v-btn>
                <v-btn class="butt" color="white" outlined @click="hintClicked">
                  Gimme a hint ({{hints}} left)
                </v-btn>
                <v-btn class="credits" color="white" outlined @click="creditClicked">
                  <v-icon>mdi-camera</v-icon> {{ this.author }}
                </v-btn>
              </div>
              <div class="hintWrapper">
                <HintCard v-if="this.showHint===true" :hint='this.hint' />
              </div>
            </v-overlay>
          
          <!-- Active game wrapper -->
          <div class="gameWrapper" :value="!this.finished">
            <div class='map'>
              <Map @clicked="setPin"/>
            </div>

            <v-overlay class='buttons' :value="(!overlay && !finished)">
              <div>
                <h3> {{current}} / {{total}} </h3>
              </div>
              <v-btn class="butt" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" outlined @click="overlay=true">
                  Show the Rock
              </v-btn>
              <v-btn class="butt" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" outlined @click="submit">
                  Submit
              </v-btn>
              <v-btn class="butt" :style="{color: this.$vuetify.theme.dark ? 'white' : 'black'}" outlined @click="hintClicked">
                  Hint ({{hints}} left)
              </v-btn>
              <div class="hintWrapper" >
                <HintCard v-if="this.showHint===true" :hint='hint' />
              </div>
            </v-overlay>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script>
import Map from '@/components/Map'
import Results from '@/components/Results'
import HintCard from '@/components/HintCard'
import axios from 'axios'
import { db } from '@/firebase'
import { mapGetters, mapActions, mapState} from 'vuex'
var geodist = require('geodist')

export default {
  name: 'Play',
  data: () => ({
    loading: true,
    finished: false,
    position: null,
    showHint: false,
    hintThisRound: false,
    overlay: false,
    buttons: false,
    absolute: true,
    hint: '',
    hints: 2,
    activeFormation: 0,
    current: 1,
    total: 5,
    totalDistance: 0,
    opacity: .9,
    boulders: [],
    results: [],
    combined: []
  }),
  computed: {
    imageSource() {
      if(this.loading === false) {
        const link =  this.boulders[this.activeFormation].imgLink;
        return link;
      } else return ''
    },
    author() {
      if(this.loading === false) {
        const author =  this.boulders[this.activeFormation].author;
        return author;
      } else return ''
    }
  },
  components: {
    Map, Results, HintCard
  },
  mounted() {
    this.getBoulders(this.total);
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
        // console.log("\n distance for this guess: ", dist);
        this.totalDistance += dist;
        const result = {
          pinnedLocation: this.position,
          distanceAway: dist,
          points: this.totalDist,
          hintUsed: this.hintThisRound
        }
        // console.log("\n this result being pushed: ", result);
        this.results.push(result);
        // check iteration and go to next one or finish
        console.log("\n ... TOTAL CLIMBS: ", this.total, " \n ... CURRENT: ", this.current);
        if(this.current == this.total) {
          // this game is finished
          this.finished = true;
          this.combineResults();
        } else {
          // reset and go to next formation
          this.hintThisRound = false;
          this.showHint = false;
          this.hint = '';
          this.position = null; // reset guess for next one
          this.activeFormation++;
          this.current++;
          this.overlay = true;
        }
      }
    },
    hintClicked() {
      this.hint = this.boulders[this.activeFormation].hint;
      if(this.hintThisRound === false) {
        if(this.hints > 0 ) {
          this.showHint = true;
          this.hints-=1;
          this.hintThisRound = true;
        }
      } else {
        alert("Only one hint per round!");
      }
    },
    creditClicked() {
      // open new window with photo credited info
      window.open(this.boulders[this.activeFormation].website, "_blank"); 
    },
    setPin(position) {
      this.position = position;
    },
    async getBoulders() {
      this.loading = true;
      try {
        const res = await axios(`https://us-central1-bouldpinnr.cloudfunctions.net/api/getTenBoulders/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        });
        // done waiting on backend response
        this.boulders = res.data.boulders;
        // this.boulders.pop();
        console.log("\n this.boulders after axios: ", this.boulders);
        if(this.boulders.length > 0) {
          this.loading = false;
          this.overlay = true;
        } else {
          this.loading = true;
          this.overlay = false;
        }
      } catch(error) {
        console.log('\n error in getBoulders', error);
        error('Error in getting Boulders in Play.vue');
      }
    },
    // // calculate distance for GPS coords function
    async calculateDistance(lat1, lon1, lat2, lon2) {
      var dist = geodist({lat: lat1, lon: lon1}, {lat: lat2, lon: lon2});
      return dist;
    },
    combineResults() {
      const comb = [];
      var tmp = 0;
      // console.log("\n COMBINERESULTS\n\n this.boulders: ", this.boulders);
      // console.log("\n this.results: ", this.results);
      this.boulders.forEach((ele) => {
        const temp = {
          name: ele.name,
          distance: this.results[tmp].distanceAway,
          imgLink: ele.imgLink
        };
        // console.log("\n temp results before setting combined: ", temp);
        comb.push(temp);
        tmp++;
      })
      
      this.combined = comb;
      // console.log("\n combined results: ", this.combined);
    }
  }  
}
</script>

<style scoped>
.main {
  min-width: 400px;
  height: 110vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.wrap {
  order: 1;
  height: 80%;
  width: 90vw;
  min-width: 400px;
}
.buttons {
  order: 2;
  min-width: 400px;
  height: 20%;
  margin: 10px auto;
  width: 60%;
  padding: 5px;
  margin-bottom: 10px;
  position: sticky;
  /* background: rgba(93, 93, 93, .8); */
  border-radius: 0.5em;
  z-index: 5;
}
.active {
  z-index: 6;
  width: 100%;
  height: 100%;
}
.butt {
  /* butt(on)s need spacing */
  margin: 5px;
  size: 1em;
}
.map {
  height: 100%;
  min-width: 400px;
}
.overlay {
  top: 0;
  display: grid;
  height: 100%;
  min-width: 400px;
}
.img {
  float: center;
  margin: 2px auto;
  overflow: hidden;
  width: 90vw;
  min-width: 400px;
}

.hintWrapper {
  margin: 1px auto;
  width: 65%;
}
.gameWrapper {
    min-width: 400px;
    width: 100%;
    overflow-y: none;
    height: 90%;
}
.results {
  margin: auto;
  width: 100%;
}
</style>
