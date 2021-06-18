<template>
    <div class="wrapper">
        <div class="contributions">
            <div class="title"> Contributions  
                <span v-if="contributionsLoading"><v-progress-circular
                    color="deep-purple"
                    indeterminate
                /></span>
                <span v-if="!contributionsLoading">( {{ totalContributions }} total, {{ newContributions}} new) </span>
            </div>
            <div class="content">

            </div>
        </div>
        <div class="boulders">
            <div class="title"> Boulders ( {{ totalBoulders }} total )</div>
            <div class="content">

            </div>
        </div>
        <div class="users">
            <div class="title"> Users ( {{ totalUsers }} total, {{ activeUsers }} active )</div>
            <div class="content">

            </div>
        </div>
    </div>
</template>

<script>
import { storage, auth, 
    contributionsCollection,
    bouldersCollection, 
    usersCollection } from "@/firebase.js";

export default {
    name: "AdminControl",
    props: [''],
        data() {
        return {
            contributions: [],
            boulders: [],
            users: [],
            loading: false, 
            contributionsLoading: false,
            processing: false,
            totalUsers: 0,
            activeUsers: 0,
            totalContributions: 0,
            newContributions: 0,
            totalBoulders: 0
        }
    },
    methods: {
        async getContributions() {
            console.log("\n ... getting all contributions");
            try {
                this.contributionsLoading = true;
                contributionsCollection.get().then((querySnapshot) => {
                    this.totalContributions = querySnapshot.docs.length;
                    querySnapshot.forEach((doc) => {
                        if(doc.data().adminChecked === false) this.newContributions++;
                        this.contributions.push(doc.data());
                    });
                    this.contributionsLoading = false;
                })
            } catch(e) {
                console.log(e);
                alert(e.message);
            }
        }
    },
    created() {
        // should access guard this view from other than ME
        if(auth.currentUser && (auth.currentUser.uid !== "dQ2nCzva75ZvgE8Xy6YzRKO8urf2")) {
            console.log("\n \n \n You chose the wrong route, fool \n \n \n ");
            this.$router.push('/');
        }
        this.getContributions();
    }
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* background: rgba(93, 93, 93, 0.8); */
}
.contributions {
    margin: 5px auto;
    order: 1;
    width: 90%;
    height: 33%;
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
    border: 1px solid yellow;
    order: 2;
    width: 100%;
    height: 90%;
    bottom: 0px;
    margin: 2px auto;
}
</style>
