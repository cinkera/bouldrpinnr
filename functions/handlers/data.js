const { admin, db, firebaseConfig } = require("../utilities/admin");
const { reduceUserDetails } = require("../utilities/validators");
const firebase = require("firebase");

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
            boulders.pop(0);
            boulders.pop(0);
            boulders.pop(0);
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


