import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router/index'
// import firebase from 'firebase'

// Files
import user from "./modules/users";
// import data from "./modules/data";

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: null,
    status: null,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      // payload comes in as uid
      state.user = payload
    },
    removeUser (state) {
      state.user = null
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    //  sets vuex user
    signInAction ({ commit }, payload) {
      // console.log("\n ... signIn Action, payload: ", payload)
      commit('setUser', payload)
    },
    // removes vuex user
    signOutAction ({ commit }, payload) {
      // console.log("\n ... sign out Action, payload: ", payload)
      commit('removeUser')
    },
    // signs the user in with firebase, sets vuex user
    // signInAction ({ commit }, payload) {
    //   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    //     .then((response) => {
    //       console.log("\n ... response in signInAction: ", response)
    //       commit('setUser', response.user.uid)
    //       commit('setStatus', 'success')
    //       commit('setError', null)
    //     })
    //     .catch((error) => {
    //       commit('setStatus', 'failure')
    //       commit('setError', error.message)
    //     })
    // },
    // sign the user out of firebase, nullifies vuex user
    // signOutAction ({ commit }) {
    //   firebase.auth().signOut()
    //     .then((response) => {
    //       commit('setUser', null)
    //       commit('setStatus', 'success')
    //       commit('setError', null)
    //     })
    //     .catch((error) => {
    //       commit('setStatus', 'failure')
    //       commit('setError', error.message)
    //     })
    // },
    // signUpAction ({ commit }, payload) {
      //   commit('setStatus', 'loading')
      //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      //     .then((response) => {
      //       alert('success')
      //       // response will have user
      //       // user will have uid will be updated to the state
      //       commit('setUser', response.user.uid)
      //       commit('setStatus', 'success')
      //       commit('setError', null)
      //     })
      //     .catch((error) => {
      //       commit('setStatus', 'failure')
      //       commit('setError', error.message)
      //     })
      // },
  },
  getters: {
    status (state) {
      return state.status
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    }
  }
})
