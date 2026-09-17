import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB4gf_UPpVNC6nhyHEF61Gty19jvmJVpGs',
  authDomain: 'fit5032-e6211.firebaseapp.com',
  projectId: 'fit5032-e6211',
  storageBucket: 'fit5032-e6211.firebasestorage.app',
  messagingSenderId: '734141839687',
  appId: '1:734141839687:web:5d2f5a5e4ac42e3e627462'
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export { firebaseApp }
export default db