<template>
    <div class="wrapper">
        <div class="loading" v-if="overlayLoading">
            <v-progress-circular
                color="deep-purple"
                indeterminate
            />
        </div>
        <div class="content" v-if="!overlayLoading">
            Welcome to the admin panel
        <br>
        <router-link class="text-center link" to="/allContributions">total contributions: {{contributionsTotal}}</router-link>
        <br>
        <router-link class="text-center link" to="/allBoulders">total boulders: {{bouldersTotal}}</router-link>
        <br>
        <router-link class="text-center link" to="/allRoutes">total routes: {{routesTotal}}</router-link>
        <br>
        <router-link class="text-center link" to="/allUsers">total users: {{usersTotal}}</router-link>
        </div>
        <adminMap :bouldersList='this.allBoulders' :routesList='this.allRoutes' class="adminMap"/>

    </div>
</template>

<script>
import { auth,
    contributionsCollection,
    routesCollection,
    bouldersCollection,
    usersCollection,
    storage } from "@/firebase.js";
import adminMap from '@/components/adminMap'

export default {
    name: "AdminControl",
    props: [''],
    components: { adminMap },
    data() {
        return {
            overlayLoading: false,
            contributionsTotal: 0,
            bouldersTotal: 0,
            routesTotal: 0,
            usersTotal:0,
            allBoulders: [],
            allRoutes:[],
        }
    },
    methods: {
        async adminLoading() {
            // this.overlayLoading = true;
            try {
                await contributionsCollection.get().then((doc) => {
                    this.contributionsTotal = doc.size;
                });
                await bouldersCollection.get().then((doc) => {
                    doc.forEach((ele) => {
                        // console.log("ele: ", ele.data());
                        this.allBoulders.push(ele.data());
                    });
                    this.bouldersTotal = doc.size;
                });
                await routesCollection.get().then((doc) => {
                    doc.forEach((ele) => {
                        // console.log("ele: ", ele.data());
                        this.allRoutes.push(ele.data());
                    });
                    this.routesTotal = doc.size;
                });
                await usersCollection.get().then((doc) => {
                    this.usersTotal = doc.size;
                });
            }
            catch(e) {
                error(e)
            }
            //loading wheel
        }
    },
    created() {

    },
    mounted() {
        //BEFORE created
        // should access guard this view from other than ME
        if(auth.currentUser && (auth.currentUser.uid !== "dQ2nCzva75ZvgE8Xy6YzRKO8urf2")) {
            console.log("\n \n \n You chose the wrong route, fool \n \n \n ");
            this.$router.push('/');
        } else {
            this.adminLoading();
            // this.getContributions();
            // this.getBoulders();
        }
    }
}
</script>

<style scoped>
.tprimary { color: var(--v-primary-base);}
.tsecondary { color: var(--v-secondary-base);}
.taccent { color: var(--v-accent-base);}
.tinfo { color: var(--v-info-base);}
.terror { color: var(--v-error-base);}
.wrapper {
    width: 100vw;
    /* height: 110vh; */
    padding: 5px;
}
.control {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.adminMap {
    margin:auto;
    border-radius: 0.4em;
    min-width: 400px;
    max-width: 90%;
}
.contributions {
    margin: 5px auto;
    order: 1;
    width: 90%;
    border: 1px solid white;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
}
.users {
    margin: 5px auto;
    order: 1;
    width: 90%;
    height: 33%;
    max-height: 90vh;
    border: 1px solid white;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
}
.boulders {
    margin: 5px auto;
    order: 1;
    width: 90%;
    height: 33%;
    border: 1px solid white;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
}
.title {
    order: 1;
    text-align: left;
    width: 97%;
    margin: 5px;
    border-bottom: 1px solid white;
    display: flex;
    flex-direction: row;
}
.content {
    /* border: 1px solid yellow; */
    order: 2;
    width: 100%;
    height: 90%;
    bottom: 0px;
    margin: 2px auto;
}
.overlay {
    z-index: 9;
    width: 90%;
    height: 100%;
    min-width: 400px;
    margin: auto;
    background: rgba(93, 93, 93, 0.8);
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
}
.mapOverlay {
    z-index: 10;
    width: 90vw;
    /* height: 90vh; */
    background-color: rgba(255,255,255,0.5);
}
.overlayContent {
    width: 100%;
    height: 100%;
}
.cwrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
.cleft {
    order: 1;
    width: 10%;
    text-align: center;
    position: relative;
    margin-top: 30%;
}
.ccenter {
    order: 2;
    width: 80%;
}
.indexWrap {
    /* border: 1px solid white; */
    width: 100%;
    padding: 2px;
    text-align: center;
    display: flex;
    flex-direction: column;
}
.indexImage {
    margin: 2px auto;
    order: 1;
    max-height: 400px;
    width: 90%;
}
.indexFooter {
    order: 2;
    padding-left: 2px;
    text-align: left;
}
.cright {
    order: 3;
    width: 10%;
    text-align: center;
    position: relative;
    margin-top: 30%;
}
.overlayFooter {
    width: 100%;
    height: 10%;
    text-align: center;
}
.buttons {
    margin: 5px auto;
    text-align: center;
    padding-right: 5px;
}
.button {
    margin-right: 5px;
}
.image {
    object-fit: contain;
    overflow-y: none;
    margin: auto;
}
.link {
    text-decoration: none;
    color: var(--v-primary-base);
    font-size: 1.5em;
}
.link:hover {
    text-decoration: underline;
}
</style>
