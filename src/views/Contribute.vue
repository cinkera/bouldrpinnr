<template>
  <div class="container">
    <div class="row justify-content-center">
        <div class="overlay" v-if="overlay">
            <Map @clicked="setPin"/>
            <div class="center">
                <v-btn class="button" color="deep-purple" @click="locationSubmit">Submit this Pin</v-btn> 
            </div>
        </div>
        <div class="loading" v-if="loading">
            <h2>Uploading your contribution! </h2>
           <v-progress-circular
                color="deep-purple"
                indeterminate
            />
        </div>
        <div class="succes" v-if="success">
            <h2 class="text-center"> Thank you for your contribution! </h2>
            <h3 class="text-center"> Our admins will take a look and see if it makes the cut!</h3>
            <v-btn 
                :style='{margin: "5px auto"}' 
                class="button center" 
                color="deep-purple" 
                @click="another()">Contribute another one!</v-btn>
            <v-btn 
                :style='{margin: "5px auto"}' 
                class="button center" 
                color="deep-purple" 
                @click="exit()">Exit</v-btn>
        </div>
        <div class="card" v-if="(!overlay && !loading && !success)">
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <div class="infor">
                <h2>Do you have a rock you want to add to the game?</h2>
            </div>
            <form action="#" class="formWrap" @submit.prevent="submit">
              <div class="form-group inputs">
                <v-spacer></v-spacer>
                <p class="centerUnderline">First we will need the name of the climb</p>
                <v-text-field v-model="form.name" label="Name of the formation" required autofocus
                    ></v-text-field>
                <br>
                <p class="centerUnderline">Then we will need ACCURATE location data for the formation</p>
                <p class="half">Either enter GPS coordinates to 5 digits OR pin the location on the map</p>
                <div class="positionWrap">
                    <v-text-field v-model="form.Latitude" label="Latitude" required
                        ></v-text-field>
                    <v-text-field v-model="form.Longitude" label="Longitude" required
                        ></v-text-field>
                    <v-btn class="button" color="deep-purple" @click="pinLocation()">Pin the location</v-btn>
                    <p></p>
                    <br>
                </div>
                <p class="centerUnderline">Next, upload your image of the formation!</p>
                <div class="uploadWrap">
                    <label class="fileInputLabel" v-if="!url">Upload Your Image
                    <input type="file" 
                        color="#7349BD"
                        @change="previewImage" 
                        accept="image/*"
                        prepend-icon="mdi-camera"
                        :disabled="processing"
                    ></label>
                    <v-btn
                        v-if="url"
                        class="mx-2"
                        fab
                        dark
                        small
                        color="deep-purple"
                        @click="removeImage()"
                        >
                        <v-icon dark>
                            mdi-close
                        </v-icon>
                    </v-btn>
                    <div class="progress">
                        <!-- <p>Progress: {{uploadValue.toFixed()+"%"}}
                        <progress id="progress" :value="uploadValue" max="100" ></progress>  </p> -->
                        <p v-if="this.imageData">{{this.imageData.name}}</p>
                    </div>
                    <div v-if="imageData!=null">
                        <v-img v-if="isMobile"
                            class="preview" 
                            max-width="400px"
                            max-height="600px" 
                            :src="url"> </v-img>
                        <v-img v-if="!isMobile"
                            class="preview" 
                            max-width="800px"
                            max-height="600px" 
                            :src="url"> </v-img>
                        <br>
                    </div>
                </div>
                <p></p>
                <br>
                <p class="centerUnderline">We want to thank contributors by showing photo credits in game and linking to your website</p>
                <v-text-field v-model="form.imageCredit" label="Photographer's Name" required
                    ></v-text-field>
                <v-text-field v-model="form.creditLink" label="Photographer's website" required
                    ></v-text-field>
                <br>
                <p class="centerUnderline">Lastly, give us a hint for this rock!</p>
                <p class="half text-center">If you leave it blank, we will think of one</p>
                <v-text-field v-model="form.hintSuggestion" label="Suggest a hint"
                    ></v-text-field>
              </div>
              <div class="center">
                <v-btn v-if="this.user" class="button" color="deep-purple" @click="submit">submit your contribution!</v-btn> 
                <p class="half" v-if="!this.user">Please make an account before you contribute to BouldrPinnr!</p>
                <v-btn v-if="!this.user" disabled class="button" color="deep-purple" @click="submit">submit your contribution!</v-btn> 
                <br>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import firebase from "firebase";
import Map from '@/components/Map'
import UploadImage from '../components/upload.vue';
import { storage, auth, contributionsCollection } from "@/firebase.js";
import { isMobile } from 'mobile-device-detect';

export default {
  data() {
    return {
      loading: false,
      success: false,
      uploadValue: 0,
      imageData: null,
      image: null,
      url: null,
      processing: false,
      position: null,
      overlay: false,
      user: null,
      isMobile,
      form: {
        name: null,
        Latitude: null,
        Longitude: null,
        imageCredit: null,
        creditLink: null,
        imageLink: null,
        hintSuggestion: null,
        user: null,
      },
      error: null
    };
  },
  methods: {
    async submit() {
        if(!this.user) alert("please make an account to contribute!");
        this.form.user = auth.currentUser;
        // console.log("\n ... formation submit clicked! \n Formation: ", this.form);
        let verified = this.verify();
        // console.log("\n ... verified: ", verified);
        this.loading = true;
        this.error = false;
        if(verified) {
            // HERE verification and imageupload need to be finished
            // console.log("\n ... VERIFIED, now upload image: ", this.image);
            // uploads image then uploads contribution
            this.onUpload();
        } else {
            this.loading = false;
            this.error = "error with your form details";
            alert("Check your form and try again!");
        }
    },
    verify() {
        let correct = true;
        let f = this.form;
        if(!f.Latitude && !f.Longitude && !f.name) {
            correct = false;
            alert("You need to add the name and location data for this climb");
        } else if(!f.imageCredit && !f.creditLink){
            correct = false;
            alert("Please add image credits so we can give credit where it is due!")
        } else if(!this.image) {
            correct = false;
            alert("Please upload an image for the climb!");
        } else correct = true;
        return correct;
    },
    previewImage(event) {
        this.uploadValue=0;
        this.image=event.target.files[0];
        this.imageData = event.target.files[0];
        this.url = URL.createObjectURL(event.target.files[0])
        // console.log("\n this image: ", this.image);
    },
    onUpload(){
        this.processing = true;
        this.loading = true;
        this.image=null;
        // console.log("\n ... about to upload ", this.imageData); 
        const storageRef = storage.ref(`/suggestionImages/${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    // console.log("\n ... uploaded, url: ", url);
                    // now update db 
                    this.form.imageLink = url;
                    this.updateDB(url);
                });
            }
        );
    },
    async updateDB(url) {
        // console.log("\n ... file uploaded, url: ", url);
        // now we need to submit finalized form data to the contributions DB
        const contribution = {
            name: this.form.name,
            Latitude: this.form.Latitude,
            Longitude: this.form.Longitude,
            author: this.form.imageCredit,
            website: this.form.creditLink,
            hint: this.form.hintSuggestion,
            imgLink: url,
            adminChecked: false,
            adminAccepted: false,
            contributionDate: new Date(),
            contributor: {
                uid: auth.currentUser.uid,
                username: auth.currentUser.displayName,
                email: auth.currentUser.email
            }
        }
        console.log("\n ... about to POST contribution: ", contribution);
        contributionsCollection.add(contribution).then((docRef) => {
            this.loading = false;
            this.processing = false;
            this.success = true;
            // this.$forceUpdate();
        }).catch((e) => {
            this.error = e;
            alert(e.message);
        });
    },
    removeImage() {
        this.url = undefined;
        this.image, this.imageData = null;
        this.uploadValue = 0;
        this.$forceUpdate();
    },
    clear () {
        // reset all inputs
        this.imageData = null,
        this.image = null,
        this.uploadValue = 0;
        this.form.name = null;
        this.form.Latitude = null,
        this.form.Longitude = null,
        this.form.imageCredit = null,
        this.form.creditLink = null,
        this.form.imageLink = null,
        this.form.hintSuggestion = null
    },
    pinLocation() {
       this.overlay = true;
    },
    setPin(position) {
      this.position = position;
    },
    locationSubmit() {
        // location submitted in the overlay
        this.overlay = false;
        if(this.position) {
            this.form.Latitude = this.position.lat.toFixed(5);
            this.form.Longitude = this.position.lng.toFixed(5);
            this.overlay = false;
        } else {
            this.overlay = true;
            alert("Set a pin or enter the coordinates manually")
        }
    },
    another() {
        this.clear();
        this.success = false;
    },
    exit() {
        this.$router.push('/account');
    }
  },
  created() {
      this.user = auth.currentUser;
  },
  components: {
    Map, UploadImage
  }
};
</script>

<style scoped>
.overlay {
    z-index: 10;
    width: 90vw;
    height: 90vh;
    background-color: rgba(255,255,255,0.5);
}
.inputs {
    margin: auto;
    width: 80%;
}
.card {
    /* border: 1px solid white; */
    border-radius: 1em;
    width: 90vw;
    min-width: 400px;
    margin: 10px auto;
}
.infor {
    text-align: center;
    padding: 2px;
}
.card-body {
    padding: 2px;
    margin: auto;
}
.formWrap {
    /* border: 1px solid white; */
    padding-top: 10px;
}
.uploadWrap {
    text-align: center;
    margin: 5px auto;
    width: 80%;
    /* border-bottom: 2px solid #7349BD; */
}
.progress {
    margin: 5px auto;
    text-align: center;
}
.preview {
    margin: 5px auto;
}
.fileInputLabel {
    position: relative;
    font-family: calibri;
    padding: 10px;
    margin: 2px auto;
    border-radius: 5px;
    border: 1px solid #7349BD;
    text-align: center;
    /* background-color: #DDD; */
    cursor: pointer;
}
input[type="file"] {
    display: none;
}
.succes {
    margin: 5px auto;
    text-align: center;
    width: 60%;
    height: 300px;
    border: 1px solid white;
    border-radius: 0.5em;
}
.centerUnderline {
    text-align: center;
    /* text-decoration: underline; */
    padding: 10px 1px;
    /* text-decoration-color: #7349BD; */
    border-top: 1px solid #7349BD;
}
.info {
    border: 1px solid white;
}
.positionWrap {
    display: flex;
    flex-direction: column;
}
.center {
    margin: 5px auto;
    text-align: center;
}
.button {
    width: 60%;
    margin: auto;
    padding-right: 5px;
    padding-bottom: 5px;
}
.button:hover {
    border-radius: 0.5em;
}
.half {
    font-size: .7em;
    color: grey;
}
p {
    font-size: 1.3em;
}
.loading {
    margin: auto;
    text-align: center;
}
.alert {
    color: red;
}
.center {
    text-align: center;
}
</style>
