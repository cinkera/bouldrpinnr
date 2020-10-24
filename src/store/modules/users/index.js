import actions from './actions';
import mutations from './mutations';

const initialState = {
  auth: false,
  loading: false,
  credentials: {},
  notifications: [],
  errors: []
}

const state = {
  auth: false,
  loading: false,
  credentials: {},
  notifications: [],
  errors: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
