<template>
  <v-container>
        <v-col>
            <v-card class="card mr-1 overline">
                <div class="top">
                    <h3> Think you can locate </h3>
                </div>
                <div class="bottom">
                    <ul>
                        <li>Boulders</li>
                        <li>Sport routes</li>
                        <li>Trad routes</li>
                        <li>Big walls</li>
                        <li>Mountain Ranges</li>
                        <li>And more?</li>
                    </ul>
                </div>
            </v-card>
            <v-card class="card mr-1 overline">
                <div class="top">
                    <h3>Coming soon: </h3>
                </div>
                <div class="bottom">
                    <ul>
                        <li>More Rocks!</li>
                        <li>More modes</li>
                        <li>Leaderboards</li>
                        <li>Whatever else seems cool</li>
                    </ul>
                </div>
            </v-card>
            <v-card class="card add mr-1 overline">
                <div class="top">
                    <h4> Want to add some rocks to the game?</h4>
                    <h4> bouldrpinnrSubmission@gmail.com</h4>
                    <h4> or <span class="dms" @click="dmsClicked">slide in my DMs</span></h4>
                </div>
                <div class="bottom">
                    <ul>
                        <li>name of the climb / rock </li>
                        <li>ACCURATE GPS Latitude / Longitude </li>
                        <li>your preffered credentials (name and website) </li>
                        <li>Image of the climb (not huge file pls) </li>
                        <li>A hint for the image</li>
                    </ul>
                </div>
            </v-card> 
        </v-col>
  </v-container>
</template>

<script>
    export default {
        name: 'About',
        methods: {
            dmsClicked() {
                window.open("https://www.instagram.com/austincinker/", "_blank"); 
            }
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
.content {
    text-align: center;
    display: grid;
    height: 30vh;
    padding: 10px;
}
.card {
    text-align: center;
    display: grid;
    float: center;
    height: 33vh;
    padding: 5px;
    margin-top: 5px;
}
.list {
    float: center;
    width: 50vh;
}
.add {
    height: 60vh;
}
.top {
    position: relative;
    float: top;
    top:0;
    height: 5vh;
    width: 100%;
}
.bottom {
    top: 10vh;
    float: center;
    margin: auto;
    height: 30vh;
    width: 75%;
}
.dms {
    cursor: pointer; 
    text-decoration: underline;
}
</style>
