import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { IState } from '@/store/types'

// importing modules
import Chat from '@/modules/chat/store'
import Login from '@/modules/login/store'

export const key: InjectionKey<Store<IState>> = Symbol('chat-app-vuex')

export const store = createStore<IState>({
  strict: true,

  modules: {
    Chat,
    Login
  }
})

// Sugar of useStore with key passed in.
export function useStore () {
  return baseUseStore(key)
}
