<template>
    <div class="wrapper">
        <div class="upper">
            <h2 class="text-center">Choose between routes or boulders (for now)</h2><br>
            <h3 class="text-center">For each game, pin where you think the rock is 
                on the map, and after 5 rounds you will see how well you did!
            </h3>
        </div>
        <div class="tiles" :style="{'flex-direction': isMobile ? 'column' : 'row'}">
            <v-card class="mx-auto tile" :style="{'width': isMobile ? '300px' : '400px'}">
                <v-progress-circular
                    class="loader"
                    v-if="boulderLoading"
                    color="deep-purple"
                    indeterminate
                />
                <v-img class="image" contain
                    v-if="!boulderLoading"
                    max-width="400px"
                    :src="this.boulderURL"></v-img>
                <div class="cardOverlayMobile" v-if="isMobile" @click="bouldersClicked()">
                    <div class="mobileText">Pin Boulders</div>
                </div>
                <div class="cardOverlay" v-if="!isMobile" @click="bouldersClicked()">
                    <div class="text">Pin Boulders</div>
                </div>
            </v-card>

            <v-card class="mx-auto tile" :style="{'width': isMobile ? '300px' : '400px'}">
                <v-progress-circular
                    class="loader"
                    v-if="routeLoading"
                    color="deep-purple"
                    indeterminate
                />
                <v-img class="image" contain
                    v-if="!routeLoading"
                    max-width="400px"
                    :src="this.routeURL"></v-img>
                <div class="cardOverlayMobile" v-if="isMobile" @click="routesClicked()">
                    <div class="mobileText">Pin Routes</div>
                </div>
                <div class="cardOverlay" v-if="!isMobile" @click="routesClicked()">
                    <div class="text">Pin Routes</div>
                </div>
            </v-card>
        </div>
        <!-- <div class="lower">

        </div> -->
    </div>
</template>

<script>
import { auth, 
    contributionsCollection,
    bouldersCollection, 
    routesCollection,
    usersCollection } from "@/firebase.js";
import { isMobile } from 'mobile-device-detect';

export default {
    name: 'Games',
    data: () => ({
        error: null,
        loading: false,
        boulderLoading: false,
        routeLoading: false,
        boulderURL: null,
        routeURL: null,
        isMobile
    }),
    components: {

    },
    methods: {
        async getBoulder() {
            try {
                this.boulderLoading = true;
                bouldersCollection.where('name', '==', 'Blue Steel').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.boulderURL = doc.data().imgLink;
                    });
                    this.boulderLoading = false;
                })
            } catch(e) {
                console.log(e);
                alert(e.message);
            }
        },
        async getRoute() {
            try {
                this.routeLoading = true;
                routesCollection.where('name', '==', 'Amarillo Sunset').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.routeURL = doc.data().imgLink;
                    });
                    this.routeLoading = false;
                })
            } catch(e) {
                console.log(e);
                alert(e.message);
            }
        },
        bouldersClicked() {
            this.$router.push({
                name: 'Play', 
                params: { type: 'boulders' }
            });
        },
        routesClicked() {
            this.$router.push({
                name: 'Play', 
                params: { type: 'routes' }
            });
        }
    },
    created() {
        this.loading = true;
        this.getBoulder();
        this.getRoute();
    }
}
</script>

<style scoped>
.wrapper {
    margin: auto;
    display: flex;
    flex-direction: column;
}
.upper {
    order: 1;
    width: 80vw;
    height: 20%;
    /* border: 1px solid grey; */
    border-radius: 0.5em;
    margin: 10px auto;
}
.tiles {
    order: 2;
    display: flex;
    flex-direction: row;
}
.lower {
    order: 3;
    width: 90%;
    height: 25%;
    border: 1px solid pink;
    margin: auto;
}
.tile {
    width: 400px;
    /* border: 1px solid white; */
    overflow: hidden;
    margin: 5px auto;
}
.mobileTile {
    width: 300px;
    max-width: 90vw;
    max-height: 80vh;
}
.tile:hover .cardOverlay {
    height: 100%;
}
.cardOverlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #7349BD;
    opacity: 0.9;
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: .5s ease;
}
.mobileText {
  background-color: #7349BD;
  border: 1px solid white;
  border-radius: 0.5em;
  padding: 10px;
  white-space: nowrap; 
  top: 50%;
  left: 50%;
  opacity: .9;
  color: white;
  font-size: 20px;
  position: absolute;
  overflow: hidden;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.text {
  white-space: nowrap; 
  color: white;
  font-size: 20px;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  opacity: 1;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
img {
    height: auto;
    overflow: none;
}
.loader {
    margin: 50% 50%;
}
</style>
