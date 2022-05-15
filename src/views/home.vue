<template>
  <div class="container">
    Hello World
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Home',
  components: {
    // Navbar,
    // Carousel,
    // Card,
    // Footer,
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  color: #fff;
}
</style>
