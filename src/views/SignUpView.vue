<template>
  <form @submit.prevent="registerUser" class="formData p-8">
    <h2 class="formHeader">Sign Up</h2>
    <div>
      <input
        class="formInput"
        type="text"
        placeholder="Username"
        v-model="formData.name" />
    </div>
    <div>
      <input
        class="formInput"
        placeholder="Email Address"
        type="email"
        v-model="formData.email" />
    </div>
    <div>
      <input
        class="formInput"
        type="password"
        placeholder="Password"
        v-model="formData.pasword" />
    </div>
    <button class="btnRegister">Sign Up</button>
  </form>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import router from "@/router";

export default {
  name: "SignUpView",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        pasword: "",
      },
    };
  },
  methods: {
    registerUser() {
      createUserWithEmailAndPassword(
        auth,
        this.formData.email,
        this.formData.pasword
      )
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          console.log(errorCode);
        });
    },
  },
};
</script>

<style scoped>
.formData {
  border: 2px solid;
  border-radius: 5px;
  max-width: 40%;
  padding: 15px;
  margin: 25px auto;
}

.formHeader {
  font-size: 5vh;
}

.formInput {
  padding: 15px;
  margin: 10px;
  border: 2px solid;
  border-radius: 4px;
  width: 80%;
}

.btnRegister {
  padding: 15px;
  margin: 10px;
  width: 40%;
  border: 2px solid blue;
  border-radius: 5px;
  background-color: blue;
  color: white;
  transition: ease-in-out;
  transition-duration: 150ms;
}

.btnRegister:hover {
  background-color: rgb(65, 65, 255);
  outline: none;
}
</style>
