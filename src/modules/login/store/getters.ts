import { GetterTree } from 'vuex'
import { IState } from '@/store/types'

export default {
  uid (state) {
    return state.user?.uid
  },
  userProfile (state) {
    return state.userProfile
  },
  firstname (state) {
    return state.userProfile?.firstname
  },
  lastname (state) {
    return state.userProfile?.lastname
  },
  displayName (state) {
    return `${state.userProfile?.firstname} ${state.userProfile?.lastname}`
  },
  avatar (state) {
    return state.userProfile?.photoUrl
  },
  currentUser (state) {
    return state.user
  },
  init (state) {
    return state.initilized
  }
}as GetterTree<IState, IState>
