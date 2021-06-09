const functions = require('firebase-functions');
const app = require("express")();
const cors = require('cors');
const auth = require("./utilities/auth");
const { db } = require("./utilities/admin");

//'*' works for testing, but unsafe production
app.use(cors({ origin: 'https://bouldpinnr.web.app' })); 
// app.use(cors({ origin: '*' })); 


const {
    login,
    register,
    getUserData
} = require("./handlers/users");
  
const {
  getTenBoulders,
  // getFiveBoulders
} = require("./handlers/data");

app.post("/login", login);
app.post("/register", register);
app.get('/getUserData', getUserData);

app.get('/getTenBoulders', cors(), getTenBoulders);
// app.get('/getFiveBoulders', cors(), getFiveBoulders);

exports.api = functions.https.onRequest(app);
