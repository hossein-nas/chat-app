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
import { IMessage } from '@/modules/chat/types'
import { onUnmounted, ref } from 'vue'
import { orderBy, uniqBy } from 'lodash'

export default function () {
  return {
    getChatMessagesByUserId,
    getUserChatMessage,
    sendMessage
  }
}

async function getChatMessagesByUserId (userId: string) {
  const user : IUserProfile = await getUserByUserId(userId)
}

async function sendMessage (userId: string, message: string) {
  const userChatRef = getChatsRef()
  await addDoc(
    userChatRef,
    await createMessageObject(message, userId)
  )
}

async function getUserChatMessage (userId: string, callback : Function = () => {}) {
  const messages = ref<IMessage[]>([])
  const userChatRef = getChatsRef()
  const userUID = await getAuthUserId()

  const q1 = query(userChatRef, where('sender', '==', userId), where('receiver', '==', userUID))
  const q2 = query(userChatRef, where('sender', '==', userUID), where('receiver', '==', userId))

  // eslint-disable-next-line no-array-constructor
  Array(q1, q2).forEach((query) => {
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data : IMessage = doc.data() as IMessage
        messages.value.push({
          ...data,
          _id: doc.id
        }as IMessage)
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
    created_at: serverTimestamp(),
    read: false
  }
}
