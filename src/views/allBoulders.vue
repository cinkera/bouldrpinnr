<template>
    <div class="wrapper">
        <div class="loading" v-if="loading">
            <v-progress-circular
                color="deep-purple"
                indeterminate
            /> 
        </div>
        <h2 class="text-center">Total Boulders: {{ total }}</h2>
        <div class="content" :v-if="(!loading && !mapOverlay)" v-for="(boulder,  index) in this.boulders" 
            :key="index" :contain='true'>
                <div class="boulder" :style="{'width': isMobile ? '600' : '1000'}">
                    <div class="image">
                        <v-img v-if="isMobile" :contain='true' max-height="200" max-width="200" 
                            :src="boulder.imgLink"></v-img>
                        <v-img v-if="!isMobile" :contain='true' max-height="400" max-width="400" 
                            :src="boulder.imgLink"></v-img>
                    </div>
                    <div class="infor">
                        <h2>{{boulder.name}}</h2>
                        <p class="l">hint: {{boulder.hint}}</p>
                        <p class="l">Photo Creds: {{ boulder.author }}</p>
                        <p class="l" >Photo Cred website: {{ boulder.website }}</p>
                        <p class="l">Latitude: {{boulder.Latitude}}</p>
                        <p class="l">Longitude: {{boulder.Longitude}}</p>
                        <!-- Latitude: (...)
                        Longitude: (...)
                        author: (...)
                        contributor: (...)
                        hint: (...)
                        imgLink: "https://firebasestorage.googleapis.com/v0/b/bouldpinnr.appspot.com/o/suggestionImages%2F07242017-5650.jpg?alt=media&token=a564865a-883e-4b39-a356-368fc4a13a2b"
                        name: "What's Up Arete"
                        website: "instagram.com/pike_taylor" -->
                    </div>
                </div>
        </div>
    </div>
</template>


<script>
import { auth, 
    bouldersCollection, 
} from "@/firebase.js";
import { isMobile } from 'mobile-device-detect';

export default {
    name: "AllBoulders",
    props: [''],
    components: { },
    data() {
        return {
            loading: false, 
            error: null,
            boulders: [],
            total: 0,
            editOverlay: false,
            mapOverlay: false,
            isMobile
        }
    },
    methods: {
        // getsboulders and puts them in boulders array
        async getBoulders() {
            try {
                this.loading = true;
                bouldersCollection.get().then((doc) => {
                    doc.forEach((ele) => {
                        this.boulders.push(ele.data());
                    })
                    console.log("\n ... allBoulders: ", this.boulders);
                    this.total = this.boulders.length;
                    this.loading = false;
                })
            } catch(e) {
                this.error = e
                alert(e.message)
            }
        }
    },
    created() {
        // should access guard this view from other than ME
        if(auth.currentUser && (auth.currentUser.uid !== "dQ2nCzva75ZvgE8Xy6YzRKO8urf2")) {
            console.log("\n \n \n You chose the wrong route, fool \n \n \n ");
            this.$router.push('/');
        } else {
            this.getBoulders();
        }
    }
}
</script>
<style scoped>
.wrapper {
    margin: auto;
}
.loading {
    margin: 50% 50%;
}
.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 2px auto;
}
.boulder {
    order: 1;
    border: 1px solid white;
    border-radius: 0.8em;
    width: 80%;
    height: 30%;
    display:flex;
    flex-direction: row;
    padding: 3px;
    margin:auto;
}
.image {
    order:1;
    border-radius: 0.8em;
}
.infor {
    order: 2;
    padding: 3px;
}
</style>
