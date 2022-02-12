<template>
  <div class="ChatUsers rounded-xl shadow">
    <div class="ChatUsers__action-area p-6 h-[78px] items-center space-x-4">
      <!--      <a-switch v-model:checked="unreadToggle"></a-switch>-->
      <!--      <span class="text-sm text-gray-500">-->

      <!--        Unread Only-->
      <!--      </span>-->
      <h3 class="text-lg text-bold font-bold text-gray-700 flex justify-between items-center">
        Chat List
        <small
          class="text-gray-500 ml-2 font-normal"
          v-if="chatList.length"
        >
          ( {{ chatList.length }} )
        </small>
      </h3>
    </div>

    <div class="ChatUsers__list">
      <router-link
        :to="{name: 'chat-page', params: { chatId: chat.uid}}"
        v-for="(chat,ind) in chatList"
        :key="chat.uid"
        class="item py-3 px-6 max-w-[100%] hover:bg-gray-100 cursor-pointer"
      >
        <div class="thumb w-[56px] h-[56px] rounded-full bg-red-200 flex-shrink-0">
          <a-avatar
            :size="56"
            :src="chat.user.photoUrl"
          >
          </a-avatar>
        </div>
        <div class="text">
          <h3 class="name text-md font-semibold text-gray-700">
            {{ chat.user.firstname }} {{ chat.user.lastname }}
          </h3>
          <p class="caption leading-4 truncate text-sm text-gray-500 mb-0">
            {{ chat.last_message_text }}
          </p>
        </div>
        <div class="detail min-w-[40px] flex-shrink-0 flex flex-col justify-stretch align-stretch self-stretch">
          <span class="time text-sm text-gray-500">
            {{ decorateDateTimeToTime(chat.last_message_at.toDate(), 'short') }}
          </span>
          <span class="status flex-grow flex justify-center items-center text-blue-400">
            <!--            <done-all />-->
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onUnmounted, ref } from 'vue'
import { decorateDateTimeToTime } from '@/modules/chat/utils'
import { DoneAll } from '@icon-park/vue-next'
import { useStore } from '@/store'

export default defineComponent({
  name: 'ChatUsers',

  components: { DoneAll },

  setup (props) {
    const store = useStore()
    const unreadToggle = ref<boolean>(false)

    const chatList = computed(() => store.getters['Chat/chatList'])

    onBeforeMount(() => {
      store.commit('Chat/ENABLE_SEARCHBOX')
    })

    onUnmounted(() => {
      store.commit('Chat/DISABLE_SEARCHBOX')
    })

    return {
      unreadToggle,
      chatList,
      decorateDateTimeToTime
    }
  }
})
//
</script>

<style scoped lang="less">
@chat-user-bg: #fff;
@switch-bg: #e6e6e6;
@switch-color: #C6C6C6;

.ChatUsers {
  background-color: @chat-user-bg;
  height: calc( var(--main-section-height) + 78px - 16px);

  :deep(.ant-switch:not(.ant-switch-checked)){
    @apply bg-[@switch-bg] focus:shadow-none;
  }

  .item {
    position: relative;
    display: grid;
    grid-template-columns: 56px minmax(auto, 240px) 40px;
    align-items: center;
    gap: 16px;

    &:not(:last-of-type){
      &::after{
        @apply block absolute left-6 right-6 bottom-0 ~'h-[1px]' bg-gray-100;
        content:'';
      }
    }

    &.router-link-active{
      @apply bg-primary/10;
    }
  }
}
</style>
