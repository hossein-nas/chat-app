import { ActionTree } from 'vuex'
import { IChatState } from '@/modules/chat/store/types'
import { IState } from '@/store/types'
import useSendMessage from '@/modules/chat/services/useSendMessage'
import { ChatList } from '@/modules/chat/types'

export default {
  async fetchChatList ({ commit }) {
    const { getUserChatList } = useSendMessage()
    await getUserChatList((chatList:ChatList) => {
      commit('SET_CHAT_LIST', chatList)
    })
  }
} as ActionTree<IChatState, IState>
