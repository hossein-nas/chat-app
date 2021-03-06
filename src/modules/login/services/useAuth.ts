import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ISignupForm } from '@/modules/login/views/Signup.vue'
import useProfile from '@/modules/login/services/useProfile'

export function useAuth () {
  return {
    signInUser,
    signupUser,
    getAuthedUser
  }
}

/**
 * Sign in user by email.
 * @param email
 * @param password
 */
async function signInUser (email: string, password: string) {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        resolve(userCredentials)
      })
      .catch((e) => {
        // console.log(e)

        reject(e)
      })
  })
}

/**
 * Get authenticated user.
 */
async function getAuthedUser () {
  const auth = await getAuth()

  return auth.currentUser
}

/**
 * Sign up new user using ISignupForm interface
 * @param userData
 */
async function signupUser (userData: ISignupForm) {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    const { initProfile } = useProfile()
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async () => {
        await updateProfile(auth.currentUser!, {
          displayName: `${userData.firstname} ${userData.lastname}`
        })
        await initProfile(userData)

        resolve(true)
      })
      .catch((e) => {
        console.log('Error in signing up user.', e)

        reject(e)
      })
  })
}
