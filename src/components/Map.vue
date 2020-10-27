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

// TODO: we need to disable link in the map and also get 3d globe gmaps interface

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
          mapTypeId: 'satellite',
          zoom: 4
        });

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
      // console.log("\n map clicked, about to emit position: ", this.createdPin.position);
      // console.log("\n pinned at: ", this.createdPin.position);
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