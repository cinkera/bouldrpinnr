 /* eslint-disable */
 const { admin, db, config } = require("../utilities/admin");
const { reduceUserDetails } = require("../utilities/validators");
const firebase = require("firebase");
firebase.initializeApp(config);

exports.register = (req, res) => {
  console.log('\n register cloud function, user data:');
  console.log(JSON.stringify(req.body, null));
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };
  let token, userId;
  db.doc(`/users/${newUser.username}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ message: "This username is already taken." });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        password: newUser.password,
        createdAt: new Date().toISOString()
      };
      return db.doc(`/users/${userId}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ message: "Email is already in use." });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again." });
      }
    });
};

// Login user
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again." });
    });
};

exports.getUserData = (req, res) => {
  console.log('\n getUserData function, req.body: ', req.body);
  db.doc(`/users/${req.body.username}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res
          .status(400)
          .json({ message: "This user doesn't exist." });
      } else {
        return res.status(400).json({ user: doc.data});
      }
    })
}

// exports.checkExists = (req, res) => {
//   db.doc(`/users/${req.params.handle}`)
//     .get()
//     .then(doc => {
//       if (!doc.exists) {
//         return res.status(404).send(false);
//       }
//       return res.send(true);
//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(500).json({ error: err.code });
//     });
// };


