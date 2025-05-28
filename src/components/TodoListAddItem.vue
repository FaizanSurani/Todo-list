<template>
  <div class="formTask">
    <form @submit.prevent="addingTask" class="taskForm">
      <input
        type="text"
        v-model.lazy="task.title"
        placeholder="Add Title"
        required
        class="itemTitle" />
      <button type="submit" class="btn1">Add Task</button>
    </form>
  </div>
</template>

<script>
import { auth, db } from "@/firebase";
import { useUserData } from "@/store";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      task: {
        title: null,
        isCompleted: false,
        isEdited: false,
        userId: null,
      },
    };
  },
  computed: {
    ...mapState(useUserData, ["users", "isLoggedIn"]),
  },
  methods: {
    ...mapActions(useUserData, ["setUser"]),
    async addingTask() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.task.userId = user.uid;
          this.setUser(user);
        }
      });
      if (this.task.title != null && this.isLoggedIn) {
        await addDoc(collection(db, "todo-list"), {
          title: this.task.title,
          isCompleted: this.task.isCompleted,
          isEdited: this.task.isEdited,
          userId: this.task.userId,
        });
      }

      this.task.title = "";
      this.task.isCompleted = false;
    },
  },
  async created() {
    this.addingTask();
  },
};
</script>

<style>
.formTask {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  margin: 10px;
}
.itemTitle {
  padding: 5px;
  margin: 3px;
  height: 3vh;
  border-radius: 10px;
  transition: ease-in-out;
  transition-duration: 150ms;
  width: 30vw;
}
.btn1 {
  background-color: rgb(56, 56, 225);
  color: white;
  width: 10vw;
  height: 5vh;
  border-radius: 10px;
}
.btn1:hover {
  background-color: rgb(53, 37, 154);
  transition: ease-in-out;
  transition-duration: 150ms;
}
</style>
