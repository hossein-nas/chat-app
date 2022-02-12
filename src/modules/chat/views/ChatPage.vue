<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Close, MoreOne, Send } from '@icon-park/vue-next'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import useSendMessage from '@/modules/chat/services/useSendMessage'
import { IMessage } from '@/modules/chat/types'
import { getAuth } from 'firebase/auth'
import ChatReceiver from '@/modules/chat/components/ChatReceiver.vue'
import ChatSender from '@/modules/chat/components/ChatSender.vue'
import { IUserProfile } from '@/modules/login/services/useProfile'

export default defineComponent({
  name: 'ChatPage',

  components: {
    ChatSender,
    ChatReceiver,
    MoreOne,
    Send,
    Close
  },

  setup (props, _) {
    const { sendMessage, getUserChatMessage, getUserByUserId } = useSendMessage()
    const route = useRoute()
    const chatId = ref<string>()
    const user = ref<IUserProfile>()
    const inputRef = ref<string>('')
    const chats = ref<IMessage[]>([])

    onMounted(async () => {
      initChatMessages()
      getUserInfo()
    })

    onBeforeRouteUpdate((to, from) => {
      if (to.params.chatId) {
        initChatMessages(to.params.chatId as string)
        getUserInfo()
      }
    })

    const initChatMessages = async (_chatId? : string) => {
      fetchChatId(_chatId)

      if (chatId.value) {
        await getUserChatMessage(chatId.value, updateChats)
      }
    }

    const getUserInfo = async () => {
      if (chatId.value) {
        user.value = await getUserByUserId(chatId.value)
      }
    }

    const fetchChatId = (_chatId? : string) => {
      if (route.params.chatId) {
        // @ts-ignore
        chatId.value = _chatId ?? (route.params.chatId as string)
      }
    }

    const updateChats = (messages: IMessage[]) => {
      chats.value = messages
    }

    const decoratedChats = computed(() => {
      const userUID = getAuth().currentUser?.uid
      if (userUID) {
        return chats.value.map((chat:IMessage) => {
          return {
            ...chat,
            isReceiver: chat.receiver === userUID
          }
        })
      }
      return [] as IMessage[]
    })

    const handleSendMessage = () => {
      if (chatId.value) {
        sendMessage(chatId.value, inputRef.value)
          .then(() => {
            inputRef.value = ''
          })
      }
    }

    return {
      chats,
      chatId,
      decoratedChats,
      inputRef,
      user,
      handleSendMessage
    }
  }
})
</script>

<template>
  <div
    class="ChatPage"
    :key="chatId"
    v-if="user"
  >
    <div class="UserInfo h-[78px] flex items-stretch justify-between">
      <div class="UserInfo__avatar flex items-start space-x-2 max-w-[300px] mt-2">
        <div class="avatar">
          <a-avatar
            :size="56"
            :src="user?.photoUrl"
            class="shadow"
          />
        </div>
        <div class="text mt-2 space-y-2 flex-grow min-w-[0]">
          <h4 class="username text-md font-semibold leading-4 mb-0 text-white">
            {{ user?.firstname }} {{ user?.lastname }}
          </h4>
          <p class="bio text-sm text-white/80 leading-4 mb-0 truncate">
            {{ user?.bio }}
          </p>
        </div>
      </div>

      <div class="actions flex items-center">
        <a-dropdown
          placement="bottomRight"
          trigger="click"
        >
          <a-button class="bg-transparent w-[auto] h-[auto] rounded-md py-2 px-1 shadow-none hover:shadow-none border-0 focus:shadow-none text-white hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white flex items-center justify-center">
            <more-one
              :size="28"
              :stroke-width="8"
            />
          </a-button>
          <template #overlay>
            <div class="bg-white rounded-md shadow-md min-w-[12rem]">
              <a-list>
                <router-link :to="{ name: 'chat-index'}">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span class="block font-medium text-gray-700 leading-6">Close chat</span>
                      </template>
                      <template #avatar>
                        <span class="w-6 h-6 ml-2 -mr-2 flex items-center justify-center">
                          <close size="18" />
                        </span>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </router-link>
              </a-list>
            </div>
          </template>
        </a-dropdown>
      </div>
    </div>

    <div class="ChatBody">
      <div class="MessagesContainer overflow-y-auto py-4 flex flex-col flex-col-reverse">
        <div class="MessageContainer__list space-y-2">
          <template
            v-for="(chat, ind) in decoratedChats"
            :key="chat._id"
          >
            <chat-receiver
              v-if="chat.isReceiver"
              :chat="chat"
            />
            <chat-sender
              v-else
              :chat="chat"
            />
          </template>
        </div>
      </div>

      <div class="SendInputBox flex space-x-2 items-center px-10">
        <a-input
          placeholder="Message"
          @keypress.enter="handleSendMessage"
          v-model:value="inputRef"
          class="text-base placeholder:text-gray-400 h-[auto] px-4 py-3 bg-black/5 border-none hover:border-none focus:border-none focus:shadow-none  rounded-full"
        ></a-input>
        <a-button
          @click.prevent="handleSendMessage"
          class="bg-primary w-12 h-12 rounded-full text-white border-none hover:border-none focus:border-none hover:text-white hover:bg-primary focus:text-white focus:bg-primary flex items-center justify-center focus:ring-[3px] focus:ring-primary/50"
        >
          <send
            :size="24"
            :stroke-width="3"
          />
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@chat-page-height : calc(var(--main-section-height) + 78px - 16px);
@chat-body-height : calc(@chat-page-height - 78px);
@message-container : calc(@chat-body-height - 48px );

.ChatPage {
  height: @chat-page-height;

  .ChatBody{
    height: @chat-body-height;
  }

  .MessagesContainer{
    height: @message-container;
  }
}
</style>
