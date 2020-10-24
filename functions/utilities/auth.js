const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found :(");
    return res.status(403).json({ error: "Unauthorized" });
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      req.user.email = data.docs[0].data().email;
      req.user.uid = data.docs[0].data().userId;
      req.user.firstname = data.docs[0].data().firstname;
      req.user.lastname = data.docs[0].data().lastname;
      req.user.username = data.docs[0].data().username;
      return next();
    })
    .catch(err => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
};
