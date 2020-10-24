const admin = require("firebase-admin");
const credential = require("../serviceAccountKey.json");
const firebaseConfig = require("../config.js")

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: firebaseConfig.firebaseConfig.databaseURL
});


// Initialize Cloud Firestore Database
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const FieldValue = admin.firestore.FieldValue; // we need to this handle array values 

module.exports = { admin, db, firebaseConfig, FieldValue, settings};
