import { Timestamp } from 'firebase/firestore'
import { IUserProfile } from '@/modules/login/services/useProfile'

export interface IMessage {
    _id?: string
    receiver: string,
    sender: string,
    message: string,
    created_at: string,
    read: boolean
}

export interface ChatItem {
    uid: string,
    user: IUserProfile,
    last_message_at: Timestamp | string,
    last_message_text: string;
    unread_count: number| null
}

export type ChatList = ChatItem[];
