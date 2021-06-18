<template>
  <v-container class='wrapper'>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-card class="mx-auto" height="600" max-width="700">
          <section>
            <div v-if="userHasAccount" class="col2 form"> 
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
                <h1>Welcome Back!</h1>
                <div>
                </div>
                  <v-text-field v-model="Lemail" :error-messages="emailErrors" label="Email" required></v-text-field>
                    <div class="left">
                        <v-text-field v-model="Lpassword" :type="passwordLFieldType"  :error-messages="passwordErrors" label="Password" required></v-text-field>
                    </div>
                    <div class="right">
                        <v-icon v-if="this.passwordLFieldType=='password'" @click="switchVisibilityL">mdi-eye-outline</v-icon> 
                        <v-icon v-if="this.passwordLFieldType=='text'" @click="switchVisibilityL">mdi-eye-off-outline</v-icon> 
                    </div>
                  
                <div class="buttons">
                  <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="forgot()">Forgot Password</v-btn> 
                  <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="signin()">Sign In</v-btn>
                  <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="toggleUserAccount()">Create new account</v-btn>
               </div>
              </form>
            </div>

            <div v-if="!userHasAccount" class="col2 form" width="400"> 
              <form>
                <h1>Sign up to keep track of your results!</h1>
                <div>
                  <v-text-field v-model="user.firstname" label="First Name" required autofocus
                    ></v-text-field>
                  <v-text-field v-model="user.lastname" label="Last Name" required
                  ></v-text-field>
                  <v-text-field v-model="user.username" label="User Name" required
                    ></v-text-field>
                  <v-text-field v-model="user.email" :error-messages="emailErrors" label="Email" required
                    ></v-text-field>
                  <v-container class="half"> 
                    <div class="cont">
                      <div class="left">
                        <v-text-field v-model="user.password1" :type="password1FieldType" :error-messages="passwordErrors" 
                          label="Password" required
                        class="pw"></v-text-field>
                      </div>
                      <div class="right">
                        <v-icon v-if="this.password1FieldType=='password'" @click="switchVisibility1">mdi-eye-outline</v-icon> 
                        <v-icon v-if="this.password1FieldType=='text'" @click="switchVisibility1">mdi-eye-off-outline</v-icon> 
                      </div>
                    </div>
                    <div class="cont">
                      <div class="left">
                        <v-text-field v-model="user.password2" :type="password2FieldType" 
                          :error-messages="passwordErrors" label="Confirm Password" required
                        class="pw"></v-text-field>
                      </div>
                      <div class="right">
                        <v-icon v-if="this.password2FieldType=='password'" @click="switchVisibility2">mdi-eye-outline</v-icon> 
                        <v-icon v-if="this.password2FieldType=='text'" @click="switchVisibility2">mdi-eye-off-outline</v-icon> 
                      </div>
                    </div>
                  </v-container>  
                </div>
                <v-spacer></v-spacer>
                <div class="buttons">
                  <v-btn 
                    :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" 
                    outlined 
                    @click="clear">Clear
                  </v-btn> 
                  <v-btn 
                    :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" 
                    outlined 
                    @click="submit">Sign Up
                  </v-btn> 
                  <v-btn 
                    :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" 
                    outlined 
                    @click="toggleUserAccount()">Have an account? Log in!
                  </v-btn> 
                </div>
              </form>
            </div>
          </section>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script> 
// import Vuelidate from 'vuelidate'
import { auth, usersCollection } from "@/firebase.js";

  export default {
    name: 'Login',
    data: () => ({
      error: null,
      userHasAccount: false,
      password1FieldType: 'password',
      password2FieldType: 'password',
      passwordLFieldType: 'password',
      verified: false,
      Lemail: null,
      Lpassword: null,
      user: {
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        password1: null,
        password2: null
      }
    }),
    created() {
      this.clear();
    },
    methods: {
      submit() {
        console.log("\n submitted, user: ", this.user);
        this.verify();
        if(this.verified) {
          auth
          .createUserWithEmailAndPassword(this.user.email, this.user.password1)
          .then(data => {
            data.user
              .updateProfile({
                displayName: this.user.username
              })
              .then(() => {
                // add to users DB and route to /account
                this.createNewUser();
                this.$router.push('/account');
              });
          })
          .catch(err => {
            this.error = err.message;
          });
        } else {
          alert("check your form inputs!");
        } 
      },
      signin() {
        auth
          .signInWithEmailAndPassword(this.Lemail, this.Lpassword)
          .then(() => {
            alert('Successfully logged in');
            this.$router.push('/account');
          })
          .catch(error => {
            alert(error.message);
          });
      },
      verify() {
        // verify EMAIL correctly still
        let u = this.user;
        if((u.firstname && u.lastname && u.email) && (u.password1 === u.password2)) {
          this.verified = true;
        }
      },
      async createNewUser() {
        let u = this.user;
        let uid = auth.currentUser.uid;
        console.log("\n uid: ", uid);
        const user = {
          username: u.username,
          firstname: u.firstname,
          lastname: u.lastname,
          email: u.email,
        }
        await usersCollection.doc(uid).set(user);
      },
      clear () {
        this.user.firstname = null
        this.user.lastname = null
        this.user.email = null
        this.user.username = null
        this.user.password1 = null
        this.user.password2 = null
      },
      switchVisibility1() {
        this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
      },
      switchVisibility2() {
        this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
      },
      switchVisibilityL() {
        this.passwordLFieldType = this.passwordLFieldType === 'password' ? 'text' : 'password'
      },
      toggleUserAccount() {
        this.userHasAccount = !this.userHasAccount;
      },
      forgot() {
        console.log("\n ... forgot password");
        alert("\n no forgetting yet please");
      }
    },
    computed: {
      emailErrors () {
        const errors = []
        // if (!this.$v.email.$dirty) return errors
        // !this.$v.email.email && errors.push('Must be valid e-mail')
        // !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        // if (!this.$v.email.$dirty) return errors
        // !this.$v.email.email && errors.push('Must be valid e-mail')
        // !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    }
  }
</script>

<style scoped>
.half {
  display: grid;
  height: 200px;
}
.cont {
  height: 50%;
  display: inline-block;
}
.left {
  float: left;
  width: 80%;
  height: 90%;
}
.right {
  float: right;
  left: 80%;
  width: 20%;
  padding-top: 15px;
}
.form {
  padding: 10px;
  min-width: 450px;
}
</style>
