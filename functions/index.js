const functions = require('firebase-functions');

const cors = require("cors");
const app = require("express")();
const auth = require("./utilities/auth");
const { db } = require("./utilities/admin");

app.use(cors({ origin: true })); // postman

const {
    login,
    register,
    getUserData
} = require("./handlers/users");
  
const {
    getTenBoulders
  } = require("./handlers/data");

  // * User Routes
app.post("/login", login);
app.post("/register", register);
app.get('/getUserData', getUserData);

app.get('/getTenBoulders', getTenBoulders);


exports.api = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
