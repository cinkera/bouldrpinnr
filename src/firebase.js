import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';
import config from '../functions/config'

firebase.initializeApp(config.config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection references
const usersCollection = db.collection('users')
const bouldersCollection = db.collection('boulders')
const routesCollection = db.collection('routes')
const contributionsCollection = db.collection('contributions')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  bouldersCollection,
  routesCollection,
  contributionsCollection,
  storage,
}
