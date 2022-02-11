// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { ref } from 'vue'
const signedIn = ref<boolean>(false)

async function initFirebase () {
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyACnhDmptPBRCV8ej6bgrmGnAQqjsvmD4Q',
    authDomain: 'chat-app-bb6e4.firebaseapp.com',
    projectId: 'chat-app-bb6e4',
    storageBucket: 'chat-app-bb6e4.appspot.com',
    messagingSenderId: '988506587201',
    appId: '1:988506587201:web:5fc7912ba02c2fa5ee46c0'
  }

  // Initialize Firebase
  const app = await initializeApp(firebaseConfig)
}

export async function init (callback: Function) {
  let isAuthReady = false
  await initFirebase()
  const auth = getAuth()

  auth.onAuthStateChanged((user) => {
    if (!isAuthReady) {
      isAuthReady = true
      callback()
    }
  })
}

export async function isSignedIn () {
  const auth = await getAuth()
  signedIn.value = auth.currentUser != null

  auth.onAuthStateChanged((user) => {
    signedIn.value = user != null
  })

  return signedIn
}
