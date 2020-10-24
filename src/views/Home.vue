<template>
  <div class="home">
    <infoBox />
  </div>
</template>

<script>
// @ is an alias to /src
import infoBox from '@/components/infoBox.vue'

export default {
  name: 'Home',
  components: {
    infoBox
  }
}
</script>
