import { GetterTree } from 'vuex'
import { IChatState } from '@/modules/chat/store/types'
import { IState } from '@/store/types'

export default {
  showSearchBox (state) {
    return state.showSearchBox
  },
  chatList (state) {
    return state.chatList
  }
} as GetterTree<IChatState, IState>
