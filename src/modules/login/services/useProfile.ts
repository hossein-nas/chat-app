import { ISignupForm } from '@/modules/login/views/Signup.vue'
import { getFirestore, doc, collection, setDoc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
export type IUserProfile = Omit<ISignupForm, 'password' | 'email'> & {
      age: string|null;
      bio : string;
      photoUrl: string;
}

export default function () {
  return {
    initProfile,
    updateProfile,
    getUserProfile
  }
}

async function updateProfile (userData: IUserProfile) {
  if (!('photoUrl' in userData)) {
    // @ts-ignore
    userData.photoUrl = '/imgs/person.svg'
  }
  return await setDoc(getUserProfileRef(), userData)
}

async function getUserProfile () {
  const data = await getDoc(await getUserProfileRef())

  return data.data() as IUserProfile
}

async function initProfile (userData: ISignupForm) {
  await setDoc(getUserProfileRef(), {
    bio: '',
    firstname: userData.firstname,
    lastname: userData.lastname,
    age: null,
    photoUrl: '/imgs/person.svg'
  } as IUserProfile)
}

function getUserProfileRef () {
  const db = getFirestore()
  const auth = getAuth()
  return doc(collection(db, 'userProfile'), auth.currentUser?.uid)
}
