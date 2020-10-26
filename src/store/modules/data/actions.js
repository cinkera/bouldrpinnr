import axios from "axios";
const fb = require("@/firebase");

const get10Boulders = ({ commit }) => {
  commit("loading", true);
  axios
    .get("/get10Boulders")
    .then(res => {
      console.log('\n ... res.data in action.js after getting 10 from backend: ', res.data);
      commit("setBoulders", res.data);
    })
    .catch(err => {
      commit("setBoulders", []);
    });
};



const setError = ({ commit }, error) => {
  commit("setErrors", error);
};

export default {
  get10Boulders, 
  setErrors,
};
