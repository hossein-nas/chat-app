import { User } from 'firebase/auth'
import { IUserProfile } from '@/modules/login/services/useProfile'
export interface IState {
    user : User | null,
    userProfile: IUserProfile | null,
    initilized: boolean,
}
