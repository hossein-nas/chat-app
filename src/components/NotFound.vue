<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/Header.vue'

export default defineComponent({
  name: 'NotFound',
  components: { TheHeader },
  setup (props, _) {

  }
})
</script>

<template>
  <div id="NotFound">
    <TheHeader></TheHeader>
    <div class="Message text-center text-gray-600">
      <h2 class="text-2xl">
        Opps, Something went wrong.
      </h2>
      <span>
        go
        <router-link to="/">Home</router-link>
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
@margin-top: 78px + 40px;
.Message{
  margin-top: @margin-top;
}
</style>
