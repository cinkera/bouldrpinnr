<template>
    <div class="wrapper">
        <div class="mapOverlay" v-if="mapOverlay">
            <Map @clicked="setPin"/>
            <div class="buttons text-center">
                <v-btn class="button" color="deep-purple" @click="locationSubmit">Submit this Pin</v-btn>
                <v-btn class="button" color="deep-purple" @click="mapOverlay=false">close</v-btn>
            </div>
        </div>
        <div class="loading" v-if="overlayLoading">
            <v-progress-circular
                color="deep-purple"
                indeterminate
            />
        </div>
        <div class="overlay" v-if="(!mapOverlay && !overlayLoading)">
            <h2 class="text-center" > Viewing all Contributions </h2>
            <!-- Beginning of overlay -->
            <div class="overlayContent">
                <div class="cwrap" >
                    <div class="cleft">
                      <v-btn class="mx-2" fab dark
                            color="deep-purple"
                            @click="subtract()"
                            ><v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </div>
                    <div class="ccenter">
                        <div class="indexWrap">
                            <div class="indexImage">
                                <v-img class="image" contain
                                    max-width="400px"
                                    max-height="400px"
                                    :src="this.overlayContent[this.overlayIndex].imgLink"></v-img>
                            </div>
                            <div class="indexFooter">
                                <form action="#" class="formWrap" @submit.prevent="submit">
                                    <p class="text-center">Contributed by {{ this.form.contributor.username}} </p><br>
                                    <v-text-field v-model="form.name" label="Name" required autofocus
                                        ></v-text-field>
                                    <v-text-field v-model="form.hint" label="Hint" required
                                        ></v-text-field>
                                    <v-text-field v-model="form.author" label="Photo Creds" required
                                        ></v-text-field>
                                    <v-text-field v-model="form.website" label="Credit website" required
                                        ></v-text-field>
                                    <v-text-field v-model="form.Latitude" label="Latitude" required
                                        ></v-text-field>
                                    <v-text-field v-model="form.Longitude" label="Longitude" required
                                        ></v-text-field>
                                    <div class="buttons">
                                        <v-btn class="button" color="deep-purple" @click="pinLocation()">Edit Location</v-btn>
                                        <v-btn class="button" color="deep-purple" @click="addToBoulders()">Add to Boulders</v-btn>
                                        <v-btn class="button" color="deep-purple" @click="addToRoutes()">Add to Routes</v-btn>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="cright">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            color="deep-purple"
                            @click="add()"
                            >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="overlayFooter">
                <!-- <v-btn class="button" color="deep-purple"
                    @click="toggleOverlay(null)">Close the overlay</v-btn> -->
            </div>
        </div>
    </div>
</template>

<script>
import { auth,
    contributionsCollection,
    routesCollection,
    bouldersCollection,
    usersCollection,
    storage } from "@/firebase.js";
import Map from '@/components/Map'

export default {
    name: "AdminControl",
    props: [''],
    components: { Map },
    data() {
        return {
            overlayIndex: 0,
            overlayLength: 0,
            overlayContent: [],
            loading: false,
            overlay: false,
            mapOverlay: false,
            overlayScope: null,
            overlayLoading: false,
            processing: false,
            total: 0,
            new: 0,
            position: null,
            image: null,
            form: {
                Latitude: null,
                Longitude: null,
                name: null,
                author: null,
                website: null,
                contributor: null,
                hint: null,
                imgLink: null,
            }
        }
    },
    methods: {
        async getContributions() {
            console.log("\n ... getting all contributions");
            try {
                contributionsCollection.get().then((querySnapshot) => {
                    this.total, this.overlayLength = querySnapshot.docs.length;
                    querySnapshot.forEach((doc) => {
                        console.log("\n ... doc.data(): ", doc.data());
                        if(doc.data().adminChecked === false) this.newContributions++;
                        let c = {
                            id: doc.id,
                            Latitude: doc.data().Latitude,
                            Longitude: doc.data().Longitude,
                            adminAccepted: doc.data().adminAccepted,
                            adminChecked: doc.data().adminChecked,
                            author: doc.data().author,
                            contributionDate: doc.data().contributionDate,
                            contributor: doc.data().contributor,
                            hint: doc.data().hint,
                            imgLink: doc.data().imgLink,
                            name: doc.data().name,
                            website: doc.data().website
                        }
                        // console.log("\n ... c: ", c)
                        this.overlayContent.push(c);
                    });
                    this.overlayLoading = false;
                    console.log("\n ... overlayCOntent: ", this.overlayContent)
                    this.updateForm(0);
                })
            } catch(e) {
                console.log(e);
                alert(e.message);
            }
        },
        async updateForm(i) {
            let a = this.overlayContent[i]
            this.form.name = a.name;
            this.form.Latitude = a.Latitude;
            this.form.Longitude = a.Longitude;
            this.form.author = a.author;
            this.form.website = a.website;
            this.form.hint = a.hint;
            this.form.imgLink = a.imgLink;
            this.form.contributor = a.contributor;
        },
        toggleOverlay(scope) {
            this.overlay = !this.overlay;
            if(scope) {
                this.overlayScope = scope;
                this.overlayLoading = true;
                switch(scope) {
                    case "Contributions":
                        this.getContributions();
                        break;
                    case "Boulders":
                        this.getBoulders();
                        break;
                    case "Users":
                        this.getUsers();
                        break;
                }
            }
        },
        subtract() {
            console.log("\n subtract")
            if(this.overlayIndex == 0) {
                this.overlayIndex = this.overlayLength - 1;
                console.log("\n ... subtract wraps to end, ", this.overlayIndex)
                this.updateForm(this.overlayIndex);
                this.$forceUpdate();
            } else {
                this.overlayIndex--;
                console.log("\n ... decrement, ", this.overlayIndex);
                this.updateForm(this.overlayIndex);
                this.$forceUpdate();
            }
        },
        add() {
            console.log("\n add")
            if(this.overlayIndex == (this.overlayLength-1)) {
                this.overlayIndex = 0;
                console.log("\n ... adding wraps to beginning of array")
                this.updateForm(this.overlayIndex);
            } else {
                this.overlayIndex++;
                console.log("\n ... increment, ", this.overlayIndex);
                this.updateForm(this.overlayIndex);
                this.$forceUpdate();
            }
        },
        async addToBoulders() {
            console.log("\n add to boulders collection");
            try {
                this.loading = true;
                // build boulders
                let boulder = this.form;
                // add to routes collection
                bouldersCollection.add(boulder);
                //get contribution ID
                let docRef = await contributionsCollection.doc(this.overlayContent[this.overlayIndex].id).get();
                // remove from contributions
                contributionsCollection.doc(docRef.id).delete();
                //update User Contributions
                let user = await usersCollection.doc(this.form.contributor.uid).get();
                let acc = Math.round(user.data().contributionsAccepted) + 1;
                usersCollection.doc(this.form.contributor.uid).update({
                    contributionsAccepted: acc
                })
                alert("Added to boulders database!");
                this.add();
            } catch(e) {
                this.error = e;
                alert(e.message)
            }
        },
        // /**
        //  * Moves a file in firebase storage from its current location to the destination
        //  * returns the status object for the moved file.
        //  * @param {String} currentPath The path to the existing file from storage root
        //  * @param {String} destinationPath The desired pathe for the existing file after storage
        //  */
        moveFirebaseFile(currentPath, destinationPath) {
            let oldRef = storage.ref().child(currentPath)
            console.log("\n moveFirebaseFile()")
            oldRef.getDownloadURL().then(url => {
                fetch(url).then(htmlReturn => {
                    let fileArray = new Uint8Array()
                    const reader = htmlReturn.body.getReader()

                    //get the reader that reads the readable stream of data
                    reader
                        .read()
                        .then(function appendStreamChunk({ done, value }) {
                            // If the reader doesn't return "done = true" append the chunk that was returned to us
                            // rinse and repeat until it is done.
                            if (value) {
                                fileArray = mergeTypedArrays(fileArray, value)
                            }
                            if (done) {
                                console.log(fileArray)
                                return fileArray
                            } else {
                                // "Readout not complete, reading next chunk"
                                return reader.read().then(appendStreamChunk)
                            }
                        })
                        .then(file => {
                            // Write the file to the new storage place
                            console.log("\n ... uploading file to new path, file: ", file);
                            let status = storage
                                .ref()
                                .child(destinationPath)
                                .put(file)
                            //Remove the old reference
                            oldRef.delete()
                            console.log("\n \n staus after moving file: ", status);
                            return status
                        })
                })
            })
        },
        async addToRoutes() {
            console.log("\n add to routes collection");
            try {
                this.loading = true;
                // build route
                let route = this.form;
                // add to routes collection
                routesCollection.add(route);
                //get contribution ID
                let docRef = await contributionsCollection.doc(this.overlayContent[this.overlayIndex].id).get();
                // remove from contributions
                contributionsCollection.doc(docRef.id).delete();
                //update User Contributions
                let user = await usersCollection.doc(this.form.contributor.uid).get();
                let acc = Math.round(user.data().contributionsAccepted) + 1;
                usersCollection.doc(this.form.contributor.uid).update({
                    contributionsAccepted: acc
                })
                alert("Added to routes database!");
                this.add();
            } catch(e) {
                this.error = e;
                alert(e.message)
            }
        },
        pinLocation() {
            this.mapOverlay = true;
        },
        setPin(position) {
            console.log("\n ... setting position: ", position);
            this.form.Latitude = position.lat;
            this.form.Longitude = position.lng;
            this.position = position;
        },
        locationSubmit() {
            // location submitted in the overlay
            this.mapOverlay = false;
            this.overlay = true;
            if(this.position) {
                this.form.Latitude = this.position.lat.toFixed(5);
                this.form.Longitude = this.position.lng.toFixed(5);
                this.overlay = false;
            } else {
                this.overlay = true;
                alert("Set a pin or enter the coordinates manually")
            }
        }
    },
    created() {
        // should access guard this view from other than ME
        if(auth.currentUser && (auth.currentUser.uid !== "dQ2nCzva75ZvgE8Xy6YzRKO8urf2")) {
            console.log("\n \n \n You chose the wrong route, fool \n \n \n ");
            this.$router.push('/');
        } else {
            this.getContributions();
            this.getBoulders();
        }
    }
}
</script>

<style scoped>
.wrapper {
    width: 100vw;
    /* height: 110vh; */
    padding: 5px;
}
.control {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.contributions {
    margin: 5px auto;
    order: 1;
    width: 90%;
    border: 1px solid white;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
}
.users {
    margin: 5px auto;
    order: 1;
    width: 90%;
    height: 33%;
    max-height: 90vh;
    border: 1px solid white;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
}
.boulders {
    margin: 5px auto;
    order: 1;
    width: 90%;
    height: 33%;
    border: 1px solid white;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
}
.title {
    order: 1;
    text-align: left;
    width: 97%;
    margin: 5px;
    border-bottom: 1px solid white;
    display: flex;
    flex-direction: row;
}
.content {
    border: 1px solid yellow;
    order: 2;
    width: 100%;
    height: 90%;
    bottom: 0px;
    margin: 2px auto;
}
.overlay {
    z-index: 9;
    width: 90%;
    height: 100%;
    min-width: 400px;
    margin: auto;
    background: rgba(93, 93, 93, 0.8);
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
}
.mapOverlay {
    z-index: 10;
    width: 90vw;
    /* height: 90vh; */
    background-color: rgba(255,255,255,0.5);
}
.overlayContent {
    width: 100%;
    height: 100%;
}
.cwrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
.cleft {
    order: 1;
    width: 10%;
    text-align: center;
    position: relative;
    margin-top: 30%;
}
.ccenter {
    order: 2;
    width: 80%;
}
.indexWrap {
    /* border: 1px solid white; */
    width: 100%;
    padding: 2px;
    text-align: center;
    display: flex;
    flex-direction: column;
}
.indexImage {
    margin: 2px auto;
    order: 1;
    max-height: 400px;
    width: 90%;
}
.indexFooter {
    order: 2;
    padding-left: 2px;
    text-align: left;
}
.cright {
    order: 3;
    width: 10%;
    text-align: center;
    position: relative;
    margin-top: 30%;
}
.overlayFooter {
    width: 100%;
    height: 10%;
    text-align: center;
}
.buttons {
    margin: 5px auto;
    text-align: center;
    padding-right: 5px;
}
.button {
    margin-right: 5px;
}
.image {
    object-fit: contain;
    overflow-y: none;
    margin: auto;
}
.link {
    text-decoration: none;
    color: white;
    font-size: 1.5em;
}
.link:hover {
    text-decoration: underline;
}
</style>
