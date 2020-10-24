const setErrors = (state, payload) => {
  state.errors.push(payload);
};

const clearErrors = state => {
  state.errors = [];
};

const loading = (state, payload) => {
  state.loading = payload;
};

const setPost = (state, payload) => {
  state.post = payload;
  state.loading = false;
};

const setPosts = (state, payload) => {
  state.posts = payload;
  state.loading = false;
};

const setUser = (state, payload) => {
  state.user = payload;
  state.loading = false;
}

const setOwner = (state, payload) => {
  state.owner = payload;
}

const addPost = (state, payload) => {
  state.posts.push(payload);
  state.loading = false;
  // return {
  //   ...state,
  //   posts: [payload, ...state.posts]
  // };
};

const updatePost = (state, payload) => {
  let index = state.posts.findIndex(
    post => post.postId === payload.postId
  );
  state.posts[index] = payload;
};

const deletePost = (state, payload) => {
  let index = state.posts.findIndex(post => post.postId === payload);
  state.posts.splice(index, 1);
  return {
    ...state
  };
};

export default {
  setErrors,
  clearErrors,
  loading,
  setPost,
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setUser,
  setOwner
}
