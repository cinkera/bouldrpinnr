const { admin, db, firebaseConfig } = require("../utilities/admin");
const { reduceUserDetails } = require("../utilities/validators");
const firebase = require("firebase");
// firebase.initializeApp(firebaseConfig);

exports.getTenBoulders = async (req, res) => {
    try {
        const boulders = [];
        const response = await db.collection('boulders').get();
        response.docs.forEach((ele) => {
            const temp = {
                name: ele.data().name,
                imgLink: ele.data().imgLink,
                Latitude: ele.data().Latitude,
                Longitude: ele.data().Longitude,
                author: ele.data().author,
                website: ele.data().website,
                hint: ele.data().hint
            }
            boulders.push(temp);
        });
        // randomize and trim to correct array size FIX THIS LATER
        shuffle(boulders);
        boulders.pop(0);
        boulders.pop(0);
        return res.json({ 'boulders': boulders });

    } catch (error) {
        console.log("\n Error: ", error);
        return res.error('Error in data.js handler function getTenBoulders');
    }
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// exports.register = (req, res) => {
//   console.log('\n register cloud function, user data:');
//   console.log(JSON.stringify(req.body, null));
//   const newUser = {
//     email: req.body.email,
//     password: req.body.password,
//     username: req.body.username,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname
//   };
//   let token, userId;
//   db.doc(`/users/${newUser.username}`)
//     .get()
//     .then(doc => {
//       if (doc.exists) {
//         return res.status(400).json({ message: "This username is already taken." });
//       } else {
//         return firebase
//           .auth()
//           .createUserWithEmailAndPassword(newUser.email, newUser.password);
//       }
//     })
//     .then(data => {
//       userId = data.user.uid;
//       return data.user.getIdToken();
//     })
//     .then(idToken => {
//       token = idToken;
//       const userCredentials = {
//         email: newUser.email,
//         firstname: newUser.firstname,
//         lastname: newUser.lastname,
//         username: newUser.username,
//         password: newUser.password,
//         createdAt: new Date().toISOString()
//       };
//       return db.doc(`/users/${userId}`).set(userCredentials);
//     })
//     .then(() => {
//       return res.status(201).json({ token });
//     })
//     .catch(err => {
//       console.error(err);
//       if (err.code === "auth/email-already-in-use") {
//         return res.status(400).json({ message: "Email is already in use." });
//       } else {
//         return res
//           .status(500)
//           .json({ general: "Something went wrong, please try again." });
//       }
//     });
// };
