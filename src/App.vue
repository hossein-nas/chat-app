<script setup lang="ts">
</script>

<template>
  <div class="BaseLayout">
    <router-view />
  </div>
</template>

<style lang="less">
:root {
  --main-section-height: calc(100vh - 160px);
}
#app {
  font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
