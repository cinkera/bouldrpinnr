 /* eslint-disable */
const { admin, db, firebaseConfig } = require("../utilities/admin");
const { reduceUserDetails } = require("../utilities/validators");
const firebase = require("firebase");

// exports.getFiveBoulders = async (req, res) => {
//         var bouldersCol = db.collection("boulders");
//         var key = bouldersCol.doc().id;
//         const boulders = [];
//         console.log("\n getFiveBoulders");
//         // get 5 random boulders
//         bouldersCol.where(admin.firestore.FieldPath.documentId(), '>=', key).limit(5).get()
//         .then(snapshot => {
//             if(snapshot.size > 0) {
//                 snapshot.forEach(doc => {
//                     console.log(doc.id, '=>', doc.data()); //
//                     const temp = {
//                         name: doc.data().name,
//                         imgLink: doc.data().imgLink,
//                         Latitude: doc.data().Latitude,
//                         Longitude: doc.data().Longitude,
//                         author: doc.data().author,
//                         website: doc.data().website,
//                         hint: doc.data().hint
//                     }
//                     boulders.push(temp);
//                 });
//                 return res.status(200).json({ 'boulders': boulders });
//             }
//             else {
//                 // if no docs, try again with operand reversed
//                 var boulder = bouldersCol.where(admin.firestore.FieldPath.documentId(), '<', key).limit(5).get()
//                 .then(snapshot => {
//                     snapshot.forEach(doc => {
//                         console.log(doc.id, '=>', doc.data()); //
//                         const temp = {
//                             name: doc.data().name,
//                             imgLink: doc.data().imgLink,
//                             Latitude: doc.data().Latitude,
//                             Longitude: doc.data().Longitude,
//                             author: doc.data().author,
//                             website: doc.data().website,
//                             hint: doc.data().hint
//                         }
//                         boulders.push(temp);
//                     });
//                     return res.status(200).json({ 'boulders': boulders });
//                 })
//                 .catch(err => {
//                     console.log('Error getting documents', err);
//                 });
//             }
//         })
//         .catch(err => {
//             console.log('Error getting documents', err);
//         });
// };

exports.contributeHandler = async (req, res) => {
    console.log("\n ... contribute to DB handler function, data: ", res.data);
    try {
        // get the form data

        // upload image to fire storage

        // send the formation info to contributor DB

        // send notification to admin for checking on formation, then send to live DB


    } catch(error) {
        console.log("\n error: ", error);
        res.send({error: error});
    }
};

exports.getTenBoulders = async (req, res) => {
    // cors(req, res, () => {
        console.log("\n ... getTenBoulders");
        try {
            const boulders = [];
            const response = await db.collection('boulders').get();
            console.log("\n ... response: ", response);
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
            // TODO a better way to return the climbs for the game 
            while(boulders.length >= 4) {
                boulders.pop();
            }
            return res.status(200).json({ 'boulders': boulders });

        } catch (error) {
            console.log("\n Error: ", error);
            return res.error('Error in data.js handler function getTenBoulders');
        }
    // })
};
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


