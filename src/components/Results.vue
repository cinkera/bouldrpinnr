<template>
    <div class="wrapper">
        <v-card class='card' v-for="(boulder,  index) in this.combined" :key="index" :contain='true'>
            <div class="boulder">
                {{boulder.name}}
                <v-img class="mx-auto center" :contain='true' max-height="200" max-width="400" :src="boulder.imgLink"></v-img>
            </div>
            <div class="result" :contain='true'>
                Your guess was 
                {{ boulder.distance}}
                Miles away!
            </div>
         </v-card>
         <v-btn class="butt" outlined @click="playAgainClicked">Play Again!</v-btn>
    </div>
</template>

<script>
export default {
    name: "Results",
    props: ['combined'],
    methods: {
        playAgainClicked() {
            this.$router.go('/play');
        }
    },
    created() {
        console.log("\n results mounted");
        console.log("\n combined: ", this.combined);
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    overflow-y: scroll;
    height: 100vh;
    background: rgba(93, 93, 93, 0.8);
}
.card { 
    /* border: 1px solid white; */
    border-radius: 0.5em;
    width: 80%;
    height: 35%;
    margin: 5px auto;
}
.boulder {
    margin: auto;
    width: 90%;
    float: top;
}
.result {
    margin: 5px auto;
    bottom: 0px;
    width: 100%;
    float: bottom;
}
.butt {
    margin: 5px;
}
</style>
