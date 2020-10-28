const functions = require('firebase-functions');
const app = require("express")();
const auth = require("./utilities/auth");
const { db } = require("./utilities/admin");

const cors = require('cors')({origin: true});

app.use(cors);
// app.use(cors({ origin: "true" })); // postman
// app.use(cors({ origin: "https://bouldpinnr.web.app/" })); // production

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
