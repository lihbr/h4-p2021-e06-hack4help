import Vue from "vue";

Vue.filter("fullName", user =>
  `${user.firstName.trim()} ${user.lastName.trim()}`.trim()
);

Vue.filter("ucFirst", str => `${str[0].toUpperCase()}${str.slice(1)}`);
