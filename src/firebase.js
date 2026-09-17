import { getAuth } from 'firebase/auth'
import { firebaseApp } from './firebase/init'

const auth = getAuth(firebaseApp)

export { auth }