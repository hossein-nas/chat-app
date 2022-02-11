<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { decorateDateTimeToTime } from '../utils'
import { IMessage } from '@/modules/chat/types'
import { CheckSmall, DoneAll } from '@icon-park/vue-next'

export default defineComponent({
  name: 'ChatSender',
  components: {

    CheckSmall,
    DoneAll
  },
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
  <div
    class="item sender flex flex-row-reverse"
    v-if="chat"
  >
    <div class="message-body w-[360px] rounded-xl rounded-br-[0] bg-primary text-white shadow p-2">
      <div class="text p-2 text-white text-sm">
        {{ chat.message }}
      </div>
      <div class="info flex flex-row-reverse space-x-2 items-center px-1">
        <!--        <check-small />-->
        <!--        <done-all />-->
        <span class="time text-sm">{{ chat.created_at && decorateDateTimeToTime(chat.created_at.toDate()) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
