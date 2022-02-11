<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/Header.vue'

export default defineComponent({
  name: 'LoginBaseLayout',
  components: { TheHeader },
  setup (props, _) {

  }
})
</script>

<template>
  <div class="LoginBaseLayout">
    <TheHeader />
    <router-view />
  </div>
</template>

<style scoped>
</style>
