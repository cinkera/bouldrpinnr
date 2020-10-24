import axios from "axios";
const fb = require("@/firebase");

const getPosts = ({ commit }) => {
  commit("loading", true);
  axios
    .get("/posts")
    .then(res => {
      commit("setPosts", res.data);
    })
    .catch(err => {
      commit("setPosts", []);
    });
};

const getUserPosts = ({ commit }, handle) => {
  commit("loading", true);
  axios
    .get(`/posts/${handle}`)
    .then(res => {
      commit("setPosts", res.data);
    })
    .catch(err => {
      console.log(err);
      commit("setPosts", []);
    });
};

const getPost = ({ commit }, postId) => {
  commit("loading", true);
  axios
    .get(`/post/${postId}`)
    .then(res => {
      commit("setPost", res.data);
    })
    .catch(err => console.log(err));
};
// Post a post
const postPost = async ({ commit }, newPost) => {
  commit("loading", true);
  try {
    const res = await axios
      .post("/post", newPost);
    commit("addPost", res.data);
    commit("clearErrors");
  }
  catch (err) {
    commit("setErrors", err.response.data);
  }
};
// Like a post
const likePost = async ({ commit }, postId) => {
  try {
    const res = await axios.post("/post/like", postId);
    commit("updatePost", res.data);
  } catch (err) {
    return console.log(err);
  }
};
// Submit a comment
const submitComment = async ({ commit }, comment) => {
  try {
    await axios.post("/post/comment", comment);
    commit("clearErrors");
  } catch (err) {
    console.log(err);
    commit("setErrors", err);
  }
};
const deletePost = ({ commit }, postId) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      commit("deletePost", postId);
    })
    .catch(err => console.log(err));
};

const getUserData = async ({ commit, rootState }, userHandle) => {
  commit("loading", true);

  try {
    const res = await axios.get(`/user/${userHandle}`);
    commit("setUser", res.data);

    const owner = await userHandle === rootState.user.credentials.handle;
    commit("setOwner", owner);

  } catch (err) {
    console.log(err);
    commit("setPosts", []);
  }
};

const setError = ({ commit }, error) => {
  commit("setErrors", error);
};

export default {
  getPost,
  getPosts,
  getUserData,
  postPost,
  likePost,
  submitComment,
  deletePost,
  setError,
  getUserPosts
};
