<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/Header.vue'

export default defineComponent({
  name: 'ChatBaseLayout',
  components: { TheHeader },
  setup (props, _) {

  }
})
</script>

<template>
  <TheHeader />
  <div class="MainSection h-[var(--main-section-height)]">
    <div class="container mx-auto">
      <a-row :gutter="16">
        <a-col :span="8">
          <router-view name="sidebar" />
        </a-col>

        <a-col :span="16">
          <router-view />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
</style>
