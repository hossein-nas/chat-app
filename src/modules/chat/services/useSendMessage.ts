import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore'
import { IUserProfile } from '@/modules/login/services/useProfile'
import { getAuth } from 'firebase/auth'
import { ChatList, IMessage } from '@/modules/chat/types'
import { onUnmounted, ref } from 'vue'
import { groupBy, orderBy, uniqBy } from 'lodash'

type CustomMessage = IMessage & { objected_user_id : string };
type GroupedMessages = { [key: string] : CustomMessage[] };

export default function () {
  return {
    getUserByUserId,
    getUserChatMessage,
    sendMessage,
    getUserChatList
  }
}

async function sendMessage (userId: string, message: string) {
  const user : IUserProfile = await getUserByUserId(userId)
  if (user) {
    console.log('Sending message', userId, message)
    const userChatRef = getChatsRef()
    await addDoc(
      userChatRef,
      await createMessageObject(message, userId)
    )
  }
}

async function getUserChatList (callback: Function = () => {}) {
  const messages = ref<IMessage[]>([])
  const userChatRef = getChatsRef()
  const authUID = await getAuthUserId()

  const q1 = query(userChatRef, where('sender', '==', authUID))
  const q2 = query(userChatRef, where('receiver', '==', authUID))

  // eslint-disable-next-line no-array-constructor
  Array(q1, q2).forEach((query) => {
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (!doc.metadata.hasPendingWrites) {
          const data = doc.data() as IMessage
          messages.value.push({
            _id: doc.id,
            ...data
          }as IMessage)
        }
      })

      const groupedMessages = groupMessagesByUser(pickUniqueMessages(messages.value), authUID)

      createChatListFromMessages(groupedMessages)
        .then((data) => {
          callback(data)
        })
    })

    onUnmounted(() => unsubscribe())
  })
}

async function getUserChatMessage (userId: string, callback : Function = () => {}) {
  const messages = ref<IMessage[]>([])
  const userChatRef = getChatsRef()
  const authUID = await getAuthUserId()

  const objectedMessages = query(userChatRef, where('sender', '==', userId), where('receiver', '==', authUID))
  const subjectedMessages = query(userChatRef, where('sender', '==', authUID), where('receiver', '==', userId))

  // eslint-disable-next-line no-array-constructor
  Array(objectedMessages, subjectedMessages).forEach((query) => {
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (!doc.metadata.hasPendingWrites) {
          const data : IMessage = doc.data() as IMessage
          messages.value.push({
            ...data,
            _id: doc.id
          }as IMessage)
        }
      })

      callback(
        orderMessages(
          pickUniqueMessages(messages.value)
        )
      )
    })

    onUnmounted(() => unsubscribe())
  })
}

const pickUniqueMessages = (messages: IMessage[]) => {
  return uniqBy(messages, (message) => message._id)
}

const orderMessages = (messages: IMessage[]) => {
  return orderBy(messages, ['created_at'], ['asc'])
}

const groupMessagesByUser = (messages:IMessage[], userId: string) => {
  const newMessages : CustomMessage[] = messages.map((message) => {
    const uid = message.sender === userId ? message.receiver : message.sender
    return {
      objected_user_id: uid,
      ...message
    } as CustomMessage
  })

  return groupBy(newMessages, (message) => message.objected_user_id!)
}

const createChatListFromMessages = async (groupedMessages: GroupedMessages) => {
  const chatList = [] as ChatList
  for (const messageKey of Object.keys(groupedMessages)) {
    const messages = orderMessages(groupedMessages[messageKey]).reverse()
    chatList.push({
      uid: messageKey,
      last_message_at: messages[0].created_at,
      last_message_text: messages[0].message,
      user: await getUserByUserId(messageKey),
      unread_count: null
    })
  }

  return orderBy(chatList, (chatItem) => chatItem.last_message_at, 'desc')
}

async function getUserByUserId (userId: string) {
  const usersRef = getUsersRef()
  const data = await getDoc(doc(usersRef, userId))
  return data.data() as IUserProfile
}

function getUsersRef () {
  const db = getFirestore()
  return collection(db, 'users')
}

async function getAuthUserId () {
  const auth = getAuth()
  return auth.currentUser!.uid
}

function getChatsRef () {
  const db = getFirestore()
  return collection(db, 'chats')
}

async function createMessageObject (message:string, userId: string) {
  const userUID = await getAuthUserId()
  return {
    receiver: userId,
    sender: userUID,
    message: message,
    created_at: await serverTimestamp(),
    read: false
  }
}
