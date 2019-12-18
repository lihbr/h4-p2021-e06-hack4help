export const state = () => ({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  lastLogin: null,
  group: "",
  document: {}
});

export const mutations = {
  reset(state) {
    state.id = "";
    state.firstName = "";
    state.lastName = "";
    state.email = "";
    state.lastLogin = null;
    state.group = "";
    state.document = {};
  },
  setFake(state) {
    state.id = "1";
    state.firstName = "La Croix Rouge";
    state.lastName = "";
    state.email = "edouard.haberer@gmail.com";
    state.lastLogin = Date.now();
    state.group = "emitter";
    state.document = {};
  },
  set(state, { id, firstName, lastName, email, lastLogin, group, document }) {
    state.id = id;
    state.firstName = firstName;
    state.lastName = lastName;
    state.email = email;
    state.lastLogin = lastLogin;
    state.group = group;
    state.document = document;
  }
};

export const actions = {
  async load({ commit }) {
    // TODO: Load user
  }
};
