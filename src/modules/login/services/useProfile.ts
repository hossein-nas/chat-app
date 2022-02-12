import { ISignupForm } from '@/modules/login/views/Signup.vue'
import { getFirestore, doc, collection, setDoc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
export type IUserProfile = Omit<ISignupForm, 'password'> & {
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

/**
 * Update user profile data.
 * @param userData
 */
async function updateProfile (userData: IUserProfile) {
  if (!('photoUrl' in userData)) {
    // @ts-ignore
    userData.photoUrl = '/imgs/person.svg'
  }
  return await setDoc(getUserProfileRef(), userData)
}

/**
 * Get user profile data.
 */
async function getUserProfile () {
  const data = await getDoc(await getUserProfileRef())

  return data.data() as IUserProfile
}

/**
 * Init user profile data while creating user.
 * @param userData
 */
async function initProfile (userData: ISignupForm) {
  await setDoc(getUserProfileRef(), {
    bio: '',
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    age: null,
    photoUrl: '/imgs/person.svg'
  } as IUserProfile)
}

/**
 * Get Fire store collection ref.
 */
function getUserProfileRef () {
  const db = getFirestore()
  const auth = getAuth()
  return doc(collection(db, 'users'), auth.currentUser?.uid)
}
