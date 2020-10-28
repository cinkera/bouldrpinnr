<template>
    <v-card class="footer" height="50">
      <v-footer
        padless
      >
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>BouldrPinnr by <span @click="footerClicked">Austin Cinker</span></strong>
        </v-col>
      </v-footer>
    </v-card>
</template>

<script>
    export default {
        name: 'Footer',
        methods: {
            footerClicked() {
                window.open("https://www.instagram.com/austincinker/", "_blank"); 
            }
        }
    }
</script>

<style scoped>
.footer {
    position: sticky;
    top: 110%;
}
</style>
