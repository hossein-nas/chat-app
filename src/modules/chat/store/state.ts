import { IChatState } from '@/modules/chat/store/types'

export default function (): IChatState {
  return {
    chatList: [],
    showSearchBox: false
  }
}
