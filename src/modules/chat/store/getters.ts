import { GetterTree } from 'vuex'
import { IChatState } from '@/modules/chat/store/types'
import { IState } from '@/store/types'

export default {
  showSearchBox (state) {
    return state.showSearchBox
  },
  chatList (state) {
    return state.chatList
  },
  searchTerm (state) {
    return state.searchTerm
  },

  filteredChatList (state, getters) {
    const term = state.searchTerm.toLowerCase().trim()
    if (state.searchTerm && state.searchTerm.length) {
      return state.chatList.filter((chatItem) => {
        return (
          chatItem.user.firstname.toLowerCase().includes(term) ||
            chatItem.user.lastname.toLowerCase().includes(term)
        )
      })
    }
    return state.chatList
  }
} as GetterTree<IChatState, IState>
