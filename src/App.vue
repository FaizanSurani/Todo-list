<template>
  <div class="todoDiv">
    <nav class="todoNav">
      <h2 :style="{ margin: '5px', padding: '10px' }">
        <router-link to="/"> Todo </router-link>
      </h2>
      <span v-if="isLoggedIn == true">
        <button class="btnNav" @click="logoutUser">Logout</button>
      </span>
      <span v-else>
        <router-link to="/register">Sign Up</router-link> |
        <router-link to="/login">Sign In</router-link>
      </span>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { mapActions, mapState } from "pinia";
import { useUserData } from "./store";

export default {
  name: "app",
  computed: {
    ...mapState(useUserData, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useUserData, ["setLoggedIn"]),
    logoutUser() {
      signOut(auth).then(alert("user logged out"), this.setLoggedIn(false));
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        this.setLoggedIn(true);
      }
    });
  },
};
</script>

<style scoped>
* {
  margin: 0 !important;
  padding: 0;
  box-sizing: border-box;
}
.todoNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid rebeccapurple;
  border-radius: 5px;
  padding: 4px;
}

.btnNav {
  border: none;
  background-color: white;
  padding: 10px;
  margin: 5px;
  font-size: 15px;
  text-decoration: underline;
  color: rgb(30, 30, 118);
  transition: ease-in-out;
  transition-duration: 150ms;
}
.btnNav:hover {
  color: blue;
  cursor: pointer;
}

.todoNav h2 a {
  text-decoration: none;
}

.todoNav a.router-link-exact-active {
  color: red;
}
</style>
