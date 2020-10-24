const setUser = (state, payload) => {
  console.log('\n setUser user Mutation');
  state.credentials = payload;
  state.loading = false;
};

const setAuth = (state, payload) => {
  console.log('\n setAuth user Mutation, payload:', payload);
  state.auth = payload;
};

const setErrors = (state, payload) => {
  console.log('\n\n\n\n\n setErrors user Mutation, : ', payload.Error);
  state.errors.push(payload);
};

const clearErrors = state => {
  console.log('\n clearErrors user Mutation');
  state.errors = [];
};

const loading = (state, payload) => {
  state.loading = payload;
};

export default {
  setUser,
  setAuth,
  setErrors,
  clearErrors,
  loading
}
