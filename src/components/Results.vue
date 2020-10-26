<template>
    <div class="wrapper">
        <v-card class='card' v-for="(boulder,  index) in this.combined" :key="index">
                <div class="boulder">
                    {{ boulder.name }}
                </div>
                <div class="result">
                    your guess was 
                    {{ boulder.distance}}
                    Miles away!
                </div>
         </v-card>
    </div>
</template>

<script>
export default {
    name: "Results",
    props: ['combined'],
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
