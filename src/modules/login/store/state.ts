import { IState } from '@/store/types'

export default function (): IState {
  return {
    user: null,
    userProfile: null,
    initilized: false
  }
}
