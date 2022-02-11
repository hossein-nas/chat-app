<template>
  <div class="ChatUsers rounded-xl shadow">
    <div class="ChatUsers__action-area p-6 h-[78px] items-center space-x-4">
      <a-switch v-model:checked="unreadToggle"></a-switch>
      <span class="text-sm text-gray-500">

        Unread Only
      </span>
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
          <span class="time text-sm text-gray-500">13:09</span>
          <span class="status flex-grow flex justify-center items-center">
            <span class="tick inline-block text-center">
              <svg
                width="17"
                height="8"
                viewBox="0 0 17 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.06122L4.33871 7L10 1"
                  stroke="#1E98BE"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 4.06122L10.3387 7L16 1"
                  stroke="#1E98BE"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

            </span>
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import useSendMessage from '@/modules/chat/services/useSendMessage'
import { ChatList } from '@/modules/chat/types'

export default defineComponent({
  name: 'ChatUsers',
  setup (props) {
    const { getUserChatList } = useSendMessage()
    const unreadToggle = ref<boolean>(false)

    const chatList = ref<ChatList>([])

    onMounted(() => {
      getUserChatList((_chatList: ChatList) => {
        chatList.value = _chatList
      })
    })

    return {
      unreadToggle,
      chatList
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
  }
}
</style>
