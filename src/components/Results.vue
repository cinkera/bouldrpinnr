<template>
    <div class="wrapper">
        <v-card class='card' v-for="(boulder,  index) in this.combined" :key="index">
            <div class="boulder">
                {{boulder.name}}
                <v-img class="mx-auto center" :contain='true' max-height="200" max-width="400" :src="boulder.imgLink"></v-img>
            </div>
            <div class="result">
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
        console.log(this.combined)
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
}
.card { 
    border: 1px solid white;
    border-radius: 0.4em;
    width: 90%;
    height: 35vh;
    margin: 5px auto;
}
.boulder {
    margin: auto;
    width: 90%;
    float: top;
}
.result {
    margin: auto;
    bottom: 0px;
    width: 90vw;
    float: bottom;
}
.butt {
    margin: 5px;
}

</style>
