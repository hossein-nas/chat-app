import { ActionTree } from 'vuex'
import { IState } from '@/store/types'
import useProfile from '@/modules/login/services/useProfile'
import { useAuth } from '@/modules/login/services/useAuth'

export default {
  async setUserData ({ commit }) {
    const { getUserProfile } = useProfile()
    const { getAuthedUser } = useAuth()
    commit('SET_USER_PROFILE', await getUserProfile())
    commit('SET_USER_DATA', await getAuthedUser())
  },

  async init ({ commit, dispatch }) {
    await dispatch('setUserData')
    commit('SET_INITILIZED')
  }

} as ActionTree<IState, IState>
