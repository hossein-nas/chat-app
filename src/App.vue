<script setup lang="ts">
import Header from './components/Header.vue'
import ChatUsers from './components/ChatUsers.vue'
</script>

<template>
  <Header />
  <div class="MainSection h-[var(--main-section-height)]">
    <div class="container mx-auto">
      <a-row :gutter="16">
        <a-col :span="8">
          <chat-users>
          </chat-users>
        </a-col>

        <a-col :span="16"></a-col>
      </a-row>
    </div>
  </div>
</template>

<style>
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
