<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import MarkerClusterer from "@google/markerclustererplus";
import gmapsInit from "@/plugins/goldMap.js";
import userLocationIcon from "@/assets/userLocationIcon.svg";
import storePin from "@/assets/storePin.svg";

export default {
  data: () => ({
    google: Function,
    map: Function,
    user: null,
    pin: {
      position: null,
      title: "Current Pin"
    },
    locations: [
    ],
    createdPin: {
      title: "",
      position: null,
      category: "",
      description: "",
      featuredImage: []
    }
  }),
  created() {},
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
          zoom: 6
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
          console.log("Browser dosn't support Geolocation :(");
        }

        const markers = this.locations.map(location => {
          const marker = new this.google.maps.Marker({
            map: this.map
          });

          marker.addListener("click", () => {
            this.map.setCenter(marker.getPosition());
          });
        });

        this.pin = new this.google.maps.Marker({ map: this.map });
        this.map.addListener("click", event => {
          let latM = event.latLng.lat();
          let lngM = event.latLng.lng();
          this.addMarker({ lat: latM, lng: lngM });
          this.dialog = !this.dialog
          this.createdPin.position = { lat: latM, lng: lngM };
          this.onClickButton();
        });
      } catch (error) {
        console.error(error);
      }
    },
    addMarker(position) {
      this.pin.setPosition(position);
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
  width: 100%;
  height: 800px;
}
</style>