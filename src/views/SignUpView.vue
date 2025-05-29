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
.formWrapper {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.formData {
  display: block;
  border: 2px solid #ccc;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  background-color: white;
}

.formHeader {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.formInput {
  width: 90%;
  padding: 12px 15px;
  margin: 10px auto;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.btnRegister {
  display: block;
  width: 50%;
  padding: 12px 20px;
  margin: 20px auto 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btnRegister:hover {
  background-color: #0056d2;
  outline: none;
}
</style>

