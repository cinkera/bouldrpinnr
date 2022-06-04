<template>
  <div class="mapWrapper">
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="4" md="4">
                <!-- routes are red pin -->
                <h1>Routes are marked by <img :src="this.redPin" /></h1>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <!-- boulders are blue pin -->
                <h1>Boulders are marked by <img :src="this.bluePin" /></h1>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-btn @click="reloadPins" color='purple'>Reload Pins</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
  </v-card>
        <div id="map"></div>
  </div>
</template>

<script>
import MarkerClusterer from "@google/markerclustererplus";
import gmapsInit from "@/plugins/goldMap.js";
import bluepin from "@/assets/blue_MarkerB.png";
import redpin from "@/assets/mapPINS/red_MarkerR.png";
import userLocationIcon from "@/assets/userLocationIcon.svg"

export default {
  props: ['bouldersList', 'routesList'],
  data: () => ({
    google: Function,
    map: Function,
    user: null,
    bluePin: require("@/assets/blue_MarkerB.png"),
    redPin: require("@/assets/mapPINS/red_MarkerR.png"),
    pin: {
      position: null,
      title: "Current Pin"
    },
    locations: [],
    boulders:[],
    routes:[],
    createdPin: {
      title: "",
      position: null,
      category: "",
      description: "",
      featuredImage: []
    }
  }),
  created() {
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      try {
        const initialPosition = { lat: 37.0902, lng: -95.7129 };
        this.google = await gmapsInit();
        this.map = new this.google.maps.Map(document.getElementById("map"), {
          center: initialPosition,
          zoom: 4
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            let location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.user = new this.google.maps.Marker({
              map: this.map,
              position: location,
              icon: userLocationIcon
            });
            this.map.panTo(location);
          });
        } else {
          console.log("Browser doesn't support Geolocation :(");
        }

        this.bouldersList.forEach((ele) => {
          // console.log(ele)
          let marker = new google.maps.Marker({
              position: new google.maps.LatLng(ele.Latitude,ele.Longitude),
              map: this.map,
              title: ele.name,
              icon: bluepin
          });

          const contentString =
            '<div class="content">' + 
            '<a>' + ele.name + "</a> " + "<br>" + 
            '<a>' + ele.Latitude + ',' + ele.Longitude +"</a> " + "<br>" + 
            "</div>";
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });
          marker.addListener('mouseover', function() {
              infowindow.open(map, this);
          });
          marker.addListener('mouseout', function() {
              infowindow.close();
          });
          this.locations.push(marker);
        });


        this.routesList.forEach((ele) => {
          //  console.log(ele)
          let marker = new google.maps.Marker({
              position: new google.maps.LatLng(ele.Latitude,ele.Longitude),
              map: this.map,
              title: ele.name,
              icon: redpin
          });
          const contentString =
            '<div class="content">' + 
            '<a>' + ele.name + "</a> " + "<br>" + 
            '<a>' + ele.Latitude + ',' + ele.Longitude +"</a> " + "<br>" + 
            "</div>";
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });
          marker.addListener('mouseover', function() {
              infowindow.open(map, this);
          });
          marker.addListener('mouseout', function() {
              infowindow.close();
          });
          this.locations.push(marker);
        });



        // const markers = this.locations.map(location => {
        //   const marker = new this.google.maps.Marker({
        //     map: this.map
        //   });

        //   marker.addListener("click", () => {
        //     this.map.setCenter(marker.getPosition());
        //   });
        // });
      } catch (error) {
        console.error(error);
      }
    },
    reloadPins() {
      console.log("reloading pins beep boop");
      this.initMap();
    },
    onClickButton () {
      // this emits the guess position back to play.vue
      this.$emit('clicked', this.createdPin.position)
    }
  }
}
</script>

<style lang="css" scoped>
#map {
  /* width: 80%; */
  height: 800px;
  /* margin: auto; */
}
.mapwrapper {
  width:80%;
  min-width: 400px;
  max-width: 1000px;
  height: 850px;
}
.content{
  color: black;
}
a {
  text-decoration: none;
  color: black;
}
</style>
