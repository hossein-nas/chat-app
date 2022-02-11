import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ISignupForm } from '@/modules/login/views/Signup.vue'

export function useAuth () {
  return {
    signInUser,
    signupUser
  }
}

async function signInUser (email: string, password: string) {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve(null)
      })
      .catch((e) => {
        // console.log(e)

        reject(e)
      })
  })
}

async function signupUser (userData: ISignupForm) {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(() => {
        updateProfile(auth.currentUser!, {
          displayName: `${userData.firstname} ${userData.lastname}`
        })

        resolve(true)
      })
      .catch((e) => {
        console.log('Error in signing up user.', e)

        reject(e)
      })
  })
}
