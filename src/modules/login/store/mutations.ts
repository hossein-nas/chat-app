import { User } from 'firebase/auth'
import { IState } from '@/store/types'
import { MutationTree } from 'vuex'
import { IUserProfile } from '@/modules/login/services/useProfile'

export default {
  SET_USER_DATA (state, payload: User) {
    state.user = payload
  },

  SET_USER_PROFILE (state, payload: IUserProfile) {
    state.userProfile = payload
  },

  SET_INITILIZED (state) {
    state.initilized = true
  }
} as MutationTree<IState>
