<template>
    <div class="wrapper">
        <v-card class="card" :v-for="this.start in this.results">
            <div class="boulder" :v-bind="this.boulders">
                {{ this.boulders[this.start].name }}
            </div>
            <div class="result" :v-bind="this.results">
                your guess was 
                {{ this.results[this.start].distanceAway}}
                Miles away!
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Results",
        props: ['boulders', 'results'],
        mounted() {
            console.log("\n results mounted, boulders.length: ", this.boulders.length);
            this.length = this.boulders.length;
            console.log("\n boulders: ", this.boulders);
            console.log("\n results: ", this.results);
        },
        data() {
            return {
                start: 0,
            }
        }
    }
</script>

<style scoped>
.wrapper {
    width: 100%;
}
.card { 
    border: 1px solid white;
    width: 600px;
    height: 100px;
}
.boulder {
    border: 1px solid black;
    height: 100%;
    width: 50%;
    float: left;
}
.result {
    border: 1px solid green;
    height: 100%;
    width: 50%;
    float: right;
}

</style>
