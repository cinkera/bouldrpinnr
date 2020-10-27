<template>
  <v-container>
        <v-col>
            <v-card class="card mr-1 overline">
                <div class="top">
                    <h3> If you share the common love of rocks, prove that you can locate: </h3>
                </div>
                <div class="bottom">
                    <ul>
                        <li>Boulders</li>
                        <li>Sport routes</li>
                        <li>Trad routes</li>
                        <li>Big walls</li>
                        <li>Mountain Ranges</li>
                        <li>And more!</li>
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
            <v-card class=" card mr-1 overline">
                <div class="top">
                    <h3> If you have rock formations you would like to see in game send them my way!</h3>
                    <h3> Email: bouldrpinnrSubmission@gmail.com</h3>
                </div>
                <div class="bottom">
                    <ul>
                        <li>name of the climb / rock    </li>
                        <li>ACCURATE GPS Latitude / Longitude</li>
                        <li>your preffered credentials (name and website)</li>
                        <li>Image of the climb (not huge file pls)</li>
                    </ul>
                </div>
            </v-card> 
        </v-col>
  </v-container>
</template>

<script>
    export default {
        name: 'About',
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
    height: 400px;
    padding: 10px;
}
.card {
    text-align: center;
    display: grid;
    float: center;
    height: 300px;
    padding: 10px;
    margin-top: 5px;
}
.list {
    float: center;
    width: 50%;
}
.add {
    height: 400px;
}
.top {
    float: top;
    height: 60px;
}
.bottom {
    float: center;
    margin: 5px auto;
    height: 250px;
    width: 50%;
}
</style>
