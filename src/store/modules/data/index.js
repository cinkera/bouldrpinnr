import actions from './actions';
import mutations from './mutations';
import getters from "./getters";

const initialState = {
  posts: [],
  errors: [],
  post: {},
  user: {},
  loading: false,
}

const state = {
  posts: [],
  errors: [],
  post: {},
  user: {},
  owner: '',
  loading: false,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}