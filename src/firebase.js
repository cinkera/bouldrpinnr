import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import conf from '../functions/config';

const apiconfig = conf;
// Use this to initialize the firebase App
// const firebaseApp = firebase.initializeApp(config.config);
const firebaseApp = firebase.initializeApp(apiconfig.config);

// firebase utils
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// collection references
const usersCollection = db.collection('users');
const bouldersCollection = db.collection('boulders');
const routesCollection = db.collection('routes');
const contributionsCollection = db.collection('contributions');

// export utils/refs
export {
  db,
  auth,
  storage,
  usersCollection,
  bouldersCollection,
  routesCollection,
  contributionsCollection
};
