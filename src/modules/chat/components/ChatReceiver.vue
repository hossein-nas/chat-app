<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { decorateDateTimeToTime } from '../utils'
import { IMessage } from '@/modules/chat/types'

export default defineComponent({
  name: 'ChatReceiver',

  props: {
    chat: {
      type: Object as PropType<IMessage>,
      required: true
    }
  },

  setup (props, _) {
    return {
      decorateDateTimeToTime
    }
  }
})
</script>

<template>
  <div class="item receiver">
    <div class="message-body w-[360px] rounded-xl rounded-bl-[0] bg-white shadow p-2">
      <div class="text p-2 text-gray-700 text-sm">
        {{ chat.message }}
      </div>
      <div class="info flex flex-row-reverse space-x-2 items-center px-1">
        <span class="time text-sm">{{ chat.created_at && decorateDateTimeToTime(chat.created_at.toDate()) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
