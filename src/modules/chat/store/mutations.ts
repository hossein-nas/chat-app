import { MutationTree } from 'vuex'
import { IChatState } from '@/modules/chat/store/types'
import { ChatList } from '@/modules/chat/types'

export default {
  SET_CHAT_LIST (state, payload: ChatList) {
    state.chatList = payload
  },
  ENABLE_SEARCHBOX (state) {
    state.showSearchBox = true
  },
  DISABLE_SEARCHBOX (state) {
    state.showSearchBox = false
  }
} as MutationTree<IChatState>
