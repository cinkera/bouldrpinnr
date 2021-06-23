<template>
    <div class="wrapper">
        <v-overlay class='overlay' :absolute="absolute" :opacity="opacity" :value="loading">
            Loading your game!
            <v-progress-circular
                class="loader"
                color="deep-purple"
                indeterminate
            />
        </v-overlay>

        <div class="gameWrap">
            <div class='map'>
              <div class="mapHelper" v-if="mapHelperActive">
                <v-icon dark>mdi-arrow-left-thick</v-icon>
                <p :style="{color: 'white'}"> You can change the map view here!</p>
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="deep-purple"
                    @click="closeHelper()"
                    >
                    <v-icon dark>
                        mdi-close-thick
                    </v-icon>
                </v-btn>
              </div>
              <Map @clicked="setPin"/>
            </div>

            <v-overlay class='overlay' :opacity="opacity" :value="overlay">
                <div class="activeContent">
                    <div class="img">
                        <v-img class="mx-auto center" max-width="90vh" max-height="80vh" :src="this.imageSource"></v-img>
                    </div>
                    <div class='bottom' :opacity="opacity">
                        <h3 class="text-center"> {{current}} / {{total}} </h3>
                        <div class="buttons text-center">
                            <v-btn class="hide butt" color="white" outlined @click="overlay=false">
                                close overlay
                            </v-btn> 
                            <v-btn class="butt" color="white" outlined @click="hintClicked">
                                Gimme a hint ({{hints}} left)
                            </v-btn>
                            <v-btn class="credits butt" color="white" outlined @click="creditClicked">
                                <v-icon>mdi-camera</v-icon> {{ this.author }}
                            </v-btn>
                        </div>
                    </div>
                    <div class="hintWrapper">
                        <HintCard v-if="this.showHint" :hint='this.hint' />
                    </div>
                </div>
            </v-overlay>

            <div class="buttons" v-if="!overlay && !finished">
              <h3 :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" class="text-center"> {{current}} / {{total}} </h3>
              <div>
                <v-btn class="butt" :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="overlay=true">
                    Show the Rock
                </v-btn>
                <v-btn class="butt" :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="submit">
                    Submit
                </v-btn>
                <v-btn class="butt" :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="hintClicked">
                    Hint ({{hints}} left)
              </v-btn>
              </div>
              
              <div class="hintWrapper">
                <HintCard v-if="this.showHint===true" :hint='hint' />
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import Map from '@/components/Map'
import HintCard from '@/components/HintCard'
import { bouldersCollection, routesCollection } from "@/firebase.js";
var geodist = require('geodist')

export default {
    name: 'PlayV2',
    props: ['type'],
    data: () => ({
        loading: false,
        finished: false,
        position: null,
        showHint: false,
        hintThisRound: false,
        overlay: true,
        buttons: false,
        mapHelperActive: true,
        absolute: true,
        gameType: null,
        hint: '',
        hints: 2,
        activeFormation: 0,
        current: 1,
        total: 5,
        totalDistance: 0,
        opacity: .9,
        formations: [],
        results: [],
        combined: []
    }),
    computed: {
        imageSource() {
            if(this.loading === false) {
                const link =  this.formations[this.activeFormation].imgLink;
                return link;
            } else return ''
        },
        author() {
            if(this.loading === false) {
                const author =  this.formations[this.activeFormation].author;
                return author;
            } else return ''
        }
    },
    components: {
        Map, HintCard
    },
    created() {
        this.getGameData(this.total, this.$route.params.type);
    },
    methods: {
        // gets data from DB based on type param, sets formations[]
        async getGameData(total, type) {
            this.loading = true;
            let temp = [];
            try {
                // fetch game data based on type param
                switch(type) {
                    // game type 5 boulders from DB at random
                    case 'boulders':
                        this.gameType = 'boulders';
                        bouldersCollection.get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                temp.push(doc.data())
                            });
                            this.shuffle(temp);
                            while(temp.length >= total+1) {
                                temp.pop();
                            }
                            temp.forEach((ele) => {
                                this.formations.push(ele)
                            })
                            this.loading = false;
                        })
                        break;
                    // game type 5 routes at random from DB
                    case 'routes':
                        this.gameType = 'routes';
                        routesCollection.get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                temp.push(doc.data())
                            });
                            this.shuffle(temp);
                            while(temp.length >= total+1) {
                                temp.pop();
                            }
                            temp.forEach((ele) => {
                                this.formations.push(ele)
                            })
                            console.log("\n \n game data is now: ", this.formations);
                            this.loading = false;
                        })
                        break;
                    // default game type if params error will be boulders
                    default: 
                        this.gameType = 'boulders';
                        bouldersCollection.get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                temp.push(doc.data())
                            });
                            this.shuffle(temp);
                            while(temp.length >= total+1) {
                                temp.pop();
                            }
                            temp.forEach((ele) => {
                                this.formations.push(ele)
                            })
                            console.log("\n \n game data is now: ", this.formations);
                            this.loading = false;
                        })
                        break;
                }
            } catch(e) {
                this.error = e;
                alert(e.message);
            }
        },
        // when the user submits their guess for this formation
        async submit() {
            // verify a guess was made
            if(this.position == null) {
                alert('pin your guess on the map before you move on!')
            }
            else {
                // get results for this guess
                const dist = await this.calculateDistance(this.position.lat, 
                                this.position.lng, 
                                this.formations[this.activeFormation].Latitude, 
                                this.formations[this.activeFormation].Longitude); 
                // update total score / distance, set result
                this.totalDistance += dist;
                const result = {
                    pinnedLocation: this.position,
                    timeTaken: null,
                    distanceAway: dist,
                    points: this.totalDistance,
                    hintUsed: this.hintThisRound
                }
                this.results.push(result);
                // check iteration and go to next one or finish
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
        // when the user clicks hint
        hintClicked() {
            this.hint = this.formations[this.activeFormation].hint;
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
        // when the user clicks on the image credits
        creditClicked() {
            // open new window with photo credited info
            window.open(this.formations[this.activeFormation].website, "_blank"); 
        },
        // when the user pins a location on the map
        // this param is emitted by map.vue on click 
        setPin(position) {
            this.position = position;
        },
        // calculate distance for GPS coords function
        async calculateDistance(lat1, lon1, lat2, lon2) {
            var dist = geodist({lat: lat1, lon: lon1}, {lat: lat2, lon: lon2});
            return dist;
        },
        // TODO fix this. This will be upon game completion, route to results
        combineResults() {
            const comb = [];
            var tmp = 0;
            // we need to combine this games formation info with the respective results
            this.formations.forEach((ele) => {
                const temp = {
                    name: ele.name,
                    imgLink: ele.imgLink,
                    Latitude: ele.Latitude,
                    Longitude: ele.Longitude,
                    result: this.results[tmp]
                };
                comb.push(temp);
                tmp++;
            })
            this.combined = comb;
            this.$router.push({
                name: 'Results',
                params: { 
                    type: this.gameType,
                    results: this.combined
                }
            })
        },
        // helper function to shuffle temp[] from DB for randomness in games
        shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        },
        //closes map Helper
        closeHelper(){
            this.mapHelperActive = false;
        }
    }
}
</script>

<style scoped>
.wrapper {
    height: 120vh;
    width: 100vw;
}
.gameWrap {
    width: 90%;
    height: 100%;
    min-width: 400px;
    margin: 5px auto;
    display: flex;
    flex-direction: column;
}
.activeContent {
    margin: 10px auto;
    min-width: 400px;
    width: 100%;
    height: 70%;
}
.bottom {
    margin: auto;
}
.map {
    order: 1;
    z-index: 4;
}
.buttons {
    order:2;
    min-width: 400px;
    margin: 10px auto;
    padding: 5px;
    margin-bottom: 10px;
    position: sticky;
    border-radius: 0.5em;
    z-index: 5;
}
.mapHelper {
    position:absolute;
    width: 250px;
    height: 80px;
    top: 0%;
    left: 17%;
    background-color: #7349BD;
    opacity: 0.9;
    border: 2px solid white;
    border-radius: 0.7em;
    z-index: 5;
    text-align: center;
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
}
.hintWrapper {
    text-align: center;
}
.butt {
    padding-left: 5px;
}
.loader {
    margin: 50% 50%;
}
</style>
