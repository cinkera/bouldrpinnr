const setErrors = (state, payload) => {
  state.errors.push(payload);
};

const clearErrors = state => {
  state.errors = [];
};

const loading = (state, payload) => {
  state.loading = payload;
};

const setBoulders = (state, payload) => {
  state.boulders = payload;
  state.loading = false;
};

const setUser = (state, payload) => {
  state.user = payload;
  state.loading = false;
}

export default {
  setErrors,
  clearErrors,
  loading,
  setPosts,
  setUser
}
