<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatIndex',

  setup (props) {

  }
})
</script>

<template>
  <div class="ChatIndex">
    <a-empty></a-empty>
  </div>
</template>

<style scoped lang="less">
@top-margin: 78px;
.ChatIndex {
  --top-margin: @top-margin;
  --height: calc(100% - @top-margin);

  @apply ~'h-[var(--height)]' ~'mt-[var(--top-margin)]' flex items-center justify-center;
}

</style>
