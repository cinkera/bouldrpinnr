import axios from "axios";
import router from "@/router";

const authenticate = ({ commit }, value) => {
  console.log('\n Authenticate user action');
  commit("setAuth", value);
};

const register = ({ commit, dispatch }, newUserDetails) => {
  commit("loading", true);
  console.log("\n register store function, newUserDetails: ", newUserDetails);
  axios
    .post("/register", newUserDetails)
    .then(res => {
      const FBTOKEN = `Bearer ${res.data.token}`;
      localStorage.setItem("FBIdToken", FBTOKEN);
      axios.defaults.headers.common["Authorization"] = FBTOKEN;
      commit("setAuth", FBTOKEN);
      commit('setUser', newUserDetails);
      commit("clearErrors");
    })
    .catch(err => {
      // ! data.message\
      console.log("\n errors in registration, : ", err);
      commit("setErrors", err);
    });
};
// login store function
const login = async ({ commit }, userDetails) => {
  commit("loading", true);
  try {
    console.log('\n Login user action');
    await authUser(userDetails);
    commit("clearErrors");
    getUserData()
    router.push("/")
  } catch (err) {
    console.log(err);
    commit("setErrors", err.data);
  }
};
// logout store function
const logout = ({ commit }) => {
  console.log('\n Logout user action');
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  commit("setAuth", false);
  router.push("/home");
};

// Get the authenticated user
const getUserData = async ({ commit }) => {
  console.log('\n getUserData user action');
  try {
    const res = await axios.get("/getUserData");
    commit("setUser", res.data);

  } catch (err) {
    console.log(err);
  }
};

const authUser = async data => {
  console.log('\n AuthUser user action');
  try {
    const res = await axios.post("/login", {
      email: data.email,
      password: data.password
    });
    const FBTOKEN = `Bearer ${res.data.token}`;
    localStorage.setItem("FBIdToken", FBTOKEN);
    axios.defaults.headers.common["Authorization"] = FBTOKEN;
  } catch (err) {
    console.log(err);
  }
};

const setAuthHeader= async data => {
  console.log('\n setAuthHeader user action');
  try {
    const res = await axios.post("/login", {
      email: data.email,
      password: data.password
    });
    const FBTOKEN = `Bearer ${res.data.token}`;
    localStorage.setItem("FBIdToken", FBTOKEN);
    axios.defaults.headers.common["Authorization"] = FBTOKEN;
  } catch (err) {
    console.log(err);
  }
}

export default {
  authenticate,
  register,
  login,
  logout,
  authUser,
  getUserData
};
