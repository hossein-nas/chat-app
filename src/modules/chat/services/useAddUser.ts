import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { UserSearchResult } from '@/modules/chat/views/AddUser.vue'
import { IUserProfile } from '@/modules/login/services/useProfile'

export default function () {
  return {
    findUserByEmail
  }
}

async function findUserByEmail (email: string) {
  const response: UserSearchResult[] = []
  const q = query(getUsersRef(),
    where('email', '>=', email),
    where('email', '<=', email + '\uf8ff')
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const data : IUserProfile = doc.data() as IUserProfile
    const currentUser = getAuth().currentUser

    if (data.email !== currentUser?.email) {
      response.push({
        _id: doc.id,
        ...data
      })
    }
  })

  return response
}

function getUsersRef () {
  const db = getFirestore()
  return collection(db, 'users')
}
