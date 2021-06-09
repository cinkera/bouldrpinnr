<template>
  <v-container>
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
                  <!-- <v-text-field v-model="email" :error-messages="emailErrors" label="Email" required
                    @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
                  <v-text-field v-model="password1" :error-messages="passwordErrors" label="Password" required
                    @input="$v.password1.$touch()" @blur="$v.email.$touch()"></v-text-field>
                <div class="buttons">
                  <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="forgot">Forgot Password</v-btn> 
                  <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" outlined @click="signin">Sign In</v-btn> -->
                <!-- </div> -->
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
                        <v-text-field v-model="user.password1" :type="password1FieldType" :error-messages="passwordErrors" label="Password" required
                        class="pw"></v-text-field>
                      </div>
                      <div class="right">
                        <v-icon v-if="this.password1FieldType=='password'" @click="switchVisibility1">mdi-eye-outline</v-icon> 
                        <v-icon v-if="this.password1FieldType=='text'" @click="switchVisibility1">mdi-eye-off-outline</v-icon> 
                      </div>
                    </div>
                    <div class="cont">
                      <div class="left">
                        <v-text-field v-model="user.password2" :type="password2FieldType" :error-messages="passwordErrors" label="Confirm Password" required
                        class="pw"></v-text-field>
                      </div>
                      <div class="right">
                        <v-icon v-if="this.password2FieldType=='password'" @click="switchVisibility2">mdi-eye-outline</v-icon> 
                        <v-icon v-if="this.password2FieldType=='text'" @click="switchVisibility2">mdi-eye-off-outline</v-icon> 
                      </div>
                    </div>
                  </v-container>  
                </div>
                <!-- @input="$v.email.$touch()" @blur="$v.email.$touch()" -->
                <v-spacer></v-spacer>
                <div class="buttons">
                  <!-- <v-btn :style="{color: this.$vuetify.theme.dark ? 'white' : '#673AB7'}" 
                    outlined @click="forgot">Forgot Password</v-btn>  -->
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
import Vuelidate from 'vuelidate'
  export default {
    name: 'Login',
    methods: {
      submit() {
        console.log('\n submit clicked');
        alert("This feature is coming soon!");
        // firebase
        //   .auth()
        //   .createUserWithEmailAndPassword(this.form.email, this.form.password1)
        //   .then(data => {
        //     data.user
        //       .updateProfile({
        //         displayName: this.form.name
        //       })
        //       .then(() => {});
        //   })
        //   .catch(err => {
        //     this.error = err.message;
        //   });
      },
      forgot() {

      },
      clear () {
        // this.$vuetify.$reset()
        this.user.firstname = ''
        this.user.lastname = ''
        this.user.email = ''
        this.user.username = ''
        this.user.password1 = ''
        this.user.password2 = ''
      },
      switchVisibility1() {
        this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
      },
      switchVisibility2() {
        this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
      },
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
    },
    data: () => ({
      userHasAccount: false,
      password1FieldType: 'password',
      password2FieldType: 'password',
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password1: '',
        password2: ''
      }
    })
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
}
</style>
