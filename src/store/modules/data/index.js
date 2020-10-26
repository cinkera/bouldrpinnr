import actions from './actions';
import mutations from './mutations';
import getters from "./getters";

const initialState = {
  boulders: [],
  errors: [],
  post: {},
  user: {},
  loading: false,
}

const state = {
  boulders: [],
  errors: [],
  user: {},
  loading: false,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
