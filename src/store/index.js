import { defineStore } from "pinia";

export const useUserData = defineStore("data", {
  state: () => ({ users: null, isLoggedIn: false }),
  actions: {
    setUser(u) {
      this.users = u;
    },
    setLoggedIn(loginValue) {
      this.isLoggedIn = loginValue;
    },
  },
});
