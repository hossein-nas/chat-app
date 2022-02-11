<script lang="ts">
import { defineComponent } from 'vue'
import { MoreOne, Send, CheckSmall, DoneAll } from '@icon-park/vue-next'

export default defineComponent({
  name: 'ChatPage',

  components: {
    MoreOne, Send, CheckSmall, DoneAll
  },

  setup (props, _) {

  }
})
</script>

<template>
  <div class="ChatPage">
    <div class="UserInfo h-[78px] flex items-stretch justify-between">
      <div class="UserInfo__avatar flex items-start space-x-2 max-w-[300px] mt-2">
        <div class="avatar">
          <a-avatar
            :size="56"
            src="/imgs/person.svg"
            class="shadow"
          />
        </div>
        <div class="text mt-2 space-y-2 flex-grow min-w-[0]">
          <h4 class="username text-md font-semibold leading-4 mb-0 text-white">
            User One
          </h4>
          <p class="bio text-sm text-white/80 leading-4 mb-0 truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, natus!
          </p>
        </div>
      </div>

      <div class="actions flex items-center">
        <a-button class="bg-transparent w-[auto] h-[auto] rounded-md py-2 px-1 shadow-none hover:shadow-none border-0 focus:shadow-none text-white hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white flex items-center justify-center">
          <more-one
            :size="28"
            :stroke-width="8"
          />
        </a-button>
      </div>
    </div>

    <div class="ChatBody">
      <div class="MessagesContainer overflow-y-auto py-4 flex flex-col flex-col-reverse">
        <div class="MessageContainer__list space-y-2">
          <div class="item receiver">
            <div class="message-body w-[360px] rounded-xl rounded-bl-[0] bg-white shadow p-2">
              <div class="text p-2 text-gray-700 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, voluptates.
              </div>
              <div class="info flex flex-row-reverse space-x-2 items-center px-1">
                <span class="time text-sm">21:22</span>
              </div>
            </div>
          </div>
          <div class="item sender flex flex-row-reverse">
            <div class="message-body w-[360px] rounded-xl rounded-br-[0] bg-primary text-white shadow p-2">
              <div class="text p-2 text-white text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, voluptates.
              </div>
              <div class="info flex flex-row-reverse space-x-2 items-center px-1">
                <check-small />
                <done-all />
                <span class="time text-sm">21:22</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="SendInputBox flex space-x-2 items-center px-10">
        <a-input
          placeholder="Message"
          class="text-base placeholder:text-gray-400 h-[auto] px-4 py-3 bg-black/5 border-none hover:border-none focus:border-none focus:shadow-none  rounded-full"
        ></a-input>
        <a-button class="bg-primary w-12 h-12 rounded-full text-white border-none hover:border-none focus:border-none hover:text-white hover:bg-primary focus:text-white focus:bg-primary flex items-center justify-center focus:ring-[3px] focus:ring-primary/50">
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
