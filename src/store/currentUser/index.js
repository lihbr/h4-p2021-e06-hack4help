export const state = () => ({
  id: "",
  firstName: "",
  lastName: "",
  mail: "",
  lastLogin: null,
  group: "",
  mailbox: "",
  document: {}
});

export const mutations = {
  reset(state) {
    state.id = "";
    state.firstName = "";
    state.lastName = "";
    state.eail = "";
    state.lastLogin = null;
    state.group = "";
    state.mailbox = "";
    state.document = {};
  },
  setFake(state) {
    state.id = "1";
    state.firstName = "La Croix Rouge";
    state.lastName = "";
    state.mail = "edouard.haberer@gmail.com";
    state.lastLogin = Date.now();
    state.group = "emitter";
    state.mailbox = "";
    state.document = {};
  },
  set(
    state,
    { id, firstName, lastName, mail, lastLogin, group, document, mailBox }
  ) {
    state.id = id;
    state.firstName = firstName;
    state.lastName = lastName;
    state.mail = mail;
    state.lastLogin = lastLogin;
    state.group = group;
    state.mailbox = mailBox.id;
    state.document = document;
  }
};

export const actions = {
  async load({ commit }) {
    // TODO: Load user
  }
};
