<template>
  <form @submit.prevent="loginUser" class="formData p-8">
    <h2 class="formHeader">Sign In</h2>

    <div>
      <input
        class="formInput"
        placeholder="Email Address"
        type="email"
        v-model.lazy="formData.email" />
    </div>
    <div>
      <input
        class="formInput"
        type="password"
        placeholder="Password"
        v-model.lazy="formData.password" />
    </div>
    <button class="btnRegister">Sign In</button>
  </form>
</template>

<script>
import { auth } from "@/firebase";
import router from "@/router";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignInView",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser() {
      signInWithEmailAndPassword(
        auth,
        this.formData.email,
        this.formData.password
      )
        .then(() => {
          router.push("/");
          alert("Login Successful");
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
