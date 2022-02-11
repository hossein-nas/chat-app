<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserSearchResult } from '@/modules/chat/views/AddUser.vue'
import { Message } from '@icon-park/vue-next'

export default defineComponent({
  name: 'UserCard',
  components: {
    Message
  },

  props: {
    user: {
      type: Object as PropType<UserSearchResult>,
      required: true
    }
  },

  setup (props, _) {
  }
})
</script>

<template>
  <a-card class="UserCard">
    <div class=" flex space-x-4 items-center">
      <div class="avatar">
        <a-avatar
          :size="56"
          :src="user.photoUrl"
        ></a-avatar>
      </div>
      <div class="text min-w-[0] flex-grow space-y-2">
        <h4 class="text-md text-gray-700 leading-4 mb-0">
          {{ user.firstname }} {{ user.lastname }}
        </h4>
        <p class="mb-0 text-gray-500 truncate text-sm">
          {{ user.email }}
        </p>
      </div>
      <div class="action">
        <router-link :to="{name: 'chat-page', params: {chatId: user._id}}">
          <a-button class="h-[auto] py-2 px-3 flex items-center text-gray-700">
            <message
              :size="24"
              :stroke-width="3"
            />
          </a-button>
        </router-link>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
</style>
