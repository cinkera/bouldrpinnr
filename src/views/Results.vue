<template>
    <div class="wrapper">
        <div class="loading" v-if="loading">
            <v-progress-circular
                class="loader"
                color="deep-purple"
                indeterminate
            />
        </div>
        <div class="header card">

        </div>
        <div class="results" v-if="!loading">
            <v-card class='card' v-for="(boulder,  index) in this.resultArray" :key="index" :contain='true'
                    :style="{'width': isMobile ? '95%' : '700px'}">
                <div class="boulder">
                    <h2 class="text-center">{{boulder.name}}</h2>
                    <v-img class="mx-auto center" :contain='true' max-height="200" max-width="400" :src="boulder.imgLink"></v-img>
                </div>
                <div class="result" :contain='true'>
                    <h3 class="text-center">Your guess was 
                    {{ boulder.result.distanceAway}}
                    Miles away!</h3>
                </div>
            </v-card>
        </div>

        <div class="ranking">
            <h2 class="text-center">See how you stack up!</h2>
            <h3 class="text-center">global leaderboards will display here in the   f  u  t  u  r  e</h3>
        </div>

        <div class="buttons">
            <v-btn class="butt" outlined @click="playAgainClicked">Play Again!</v-btn>
        </div>
    </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
export default {
    name: 'Results',
    props: ['type', 'results'],
    data: () => ({
        error: null,
        loading: false,
        resultArray: null,
        isMobile
    }),
    components: {

    },
    methods: {
        playAgainClicked() {
            this.$router.push('/games');
        }
    },
    created() {
        // console.log("\n ... results created, results: ", this.$route.params.results);
        if(!this.$route.params.results) this.$router.push('/games')
        this.resultArray = this.$route.params.results;
        // send results to leaderboards and see where it falls
    }
}
</script>

<style scoped>
.wrapper {
    width: 100vw;
    display: flex;
    flex-direction: column;
}
.results {
    order: 1;
    margin: 5px auto;

}
.ranking {
    width: 60%;
    height: 25%;
    margin: 5px auto;
    order: 2;
}
.buttons {
    width: 60%;
    height: 25%;
    margin: 5px auto;
    text-align: center;
    order: 3;
}
.loading {
    margin: 50% 50%;
}
.card { 
    /* border: 1px solid white; */
    border-radius: 0.5em;
    height: 400%;
    margin: 5px auto;
}
.card:hover {
    background-color: #7349BD;
    opacity: 0.8;
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
