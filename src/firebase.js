import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../functions/config'

firebase.initializeApp(config.config)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const bouldersCollection = db.collection('boulders')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  bouldersCollection
}
