<template>
  <div class="wrapper">
    <h1 class="text-center">Welcome to your account, {{user.displayName}}</h1>
    <v-spacer></v-spacer>
    <div class="loading" v-if="loading">
       <v-progress-circular color="deep-purple" indeterminate />
    </div>
    <div class="userInfo" v-if="!loading">

      <div class="img" v-if="user.photoURL">
        <v-img class="mx-auto center" max-width="auto" max-height="400px" :src="user.photoURL"></v-img>
        <v-btn small 
          :style="{margin: '5px'}"
          color="deep-purple"
          @click="deleteUserImage">delete picture</v-btn>
      </div>

      <div class="photoUpload" v-if="!user.photoURL">
        <UploadImage :style='{width: "200px"}' 
          :user="this.user"   
          :type="'userImage'"
          @updateDB="updateDB($event)"
        />  
      </div>

      <div class="infor">
        <p>Email: {{user.email}} </p>
        <p>First name: {{dbuser.firstname}}</p>
        <p>Last name: {{dbuser.lastname}}</p>
        <p>Contributions Accepted: {{dbuser.contributionsAccepted}}</p>
        <p>Email Verified: {{user.emailVerified}} </p>
        <p>Account created: {{user.metadata.creationTime}} </p>
        <p>Last sign in: {{user.metadata.lastSignInTime}} </p>
        <!-- <p>Phone Number: {{user.phoneNUmber}} </p> -->
        <!-- <p>photoURL: {{user.photoURL}} </p>  -->
      </div>

    </div>
  </div>
</template>

<script>
import { auth, usersCollection, storage } from "@/firebase.js";
import UploadImage from '../components/upload.vue';

export default {
  name: 'Account',
  components: {
    UploadImage
  },
  props: [''],
  data: () => ({
    loading: false,
    processing: false,
    image: null,
    user: null,
    error: null,
    dbuser: null,
  }),
  methods: {
    async getUserData() {
      try {
        this.loading = true;
        let userRef =  await usersCollection.doc(this.user.uid).get();
        this.dbuser = userRef.data();
        if(this.user.photoURL) this.photoUpload = true;
        this.loading = false;
      } catch(e) {
        this.error = e;
        alert(e);
      }
    },
    async updateDB(url) {
      this.loading = true;
      // set auth.photoURL && set DB user.photoURL
      auth.currentUser.updateProfile({
          photoURL: url
        }).then(() => {
          // Update successful, now update DB
          usersCollection.doc(this.user.uid).update({
            photoURL: url
          }).then(() => {
            // console.log("\n ... updating userDB photoURL successful");
            this.loading = false;
            this.processing = false;
            this.methodThatForcesUpdate();
          }).catch((e) => {
            this.error = e;
            alert(e.message)
          });
        }).catch((error) => {
          // An error occurred
          this.error = error;
          alert(error.message);
        });
    },
    async deleteUserImage() {
      try {
        this.loading = true;
        this.processing = false;
        // 1 delete picture from bucket 
        let pictureRef = storage.refFromURL(auth.currentUser.photoURL);
        pictureRef.delete()
        .then(() => {
          // 2 delete from user.photoURL
          auth.currentUser.updateProfile({
            photoURL: null
          }).then(() => {
            // Update successful, now update DB
            usersCollection.doc(this.user.uid).update({
              photoURL: null
            }).then(() => {
              // console.log("\n ... updating userDB photoURL successful");
              this.loading = false;
              this.processing = false;
              this.methodThatForcesUpdate();
            }).catch((e) => {
              this.error = e;
              alert(e.message)
            });
          }).catch((error) => {
            // An error occurred
            this.error = error;
            alert(error.message);
          });
        }).catch((err) => {
          console.log(err);
        });
      } catch(e) {
        alert(e.message);
      }
    },
    methodThatForcesUpdate() {
      this.$forceUpdate();  // Notice we have to use a $ here
    }
  },
  created() {
    // onCreated, pull DB info for user by auth.currentUser.uid
    this.user = auth.currentUser;
    this.getUserData();
  }
}
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  padding: 5px;
  min-width: 420px;
}
.userInfo {
  width: 60%;
  min-width: 450px;
  height: auto;
  margin: auto;
  padding: 10px;
  border: 1px solid white;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
}
.img {
  order: 1;
  text-align: center;
}
.photoUpload {
  order: 1;
  border: 1px solid green;
  border-radius: 0.5em;
  padding: 5px;
  text-align: center;
  margin: auto;
  height: 30vh;
}
.infor {
  order: 2;
  margin: 5px auto;
}
.loading {
  margin: auto;
}
.input {
  width: 100%;
}
</style>
