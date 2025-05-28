<template>
  <div class="todoList">
    <h3 style="color: orange">Pending Tasks</h3>
    <div class="pendingTaskList">
      <div v-if="pendingTasks.length && isLoggedIn">
        <TodoListTask :tasks="pendingTasks" :isCompletedView="false" />
      </div>
      <div v-else>
        <p>No Pending Tasks...</p>
      </div>
    </div>

    <div>
      <h3 style="color: orange">Completed Tasks</h3>
      <div class="pendingTaskList">
        <div v-if="doneTasks.length">
          <TodoListTask :tasks="doneTasks" :isCompletedView="true" />
        </div>
        <div v-else>
          <p>No Completed Tasks...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, onSnapshot, query, where } from "firebase/firestore";
import TodoListTask from "./TodoListTask.vue";
import { db } from "@/firebase";
import { useUserData } from "@/store";
import { mapState } from "pinia";

export default {
  components: { TodoListTask },
  data() {
    return {
      allTasks: [],
    };
  },
  methods: {
    fetchTasks(uid) {
      const q = query(collection(db, "todo-list"), where("userId", "==", uid));
      onSnapshot(q, (snapshot) => {
        this.allTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },
  },
  computed: {
    ...mapState(useUserData, ["users", "isLoggedIn"]),
    pendingTasks() {
      return this.allTasks.filter((task) => !task.isCompleted);
    },
    doneTasks() {
      return this.allTasks.filter((task) => task.isCompleted);
    },
  },
  watch: {
    users(newVal) {
      if (newVal) {
        this.fetchTasks(this.users.uid);
      }
    },
  },
  created() {
    if (this.users && this.users.uid) {
      this.fetchTasks(this.users.uid);
    }
  },
};
</script>

<style scoped>
.pendingTaskList {
  max-height: 126px;
  overflow-y: auto;
  padding: 10px;
}
.pendingTaskList::-webkit-scrollbar {
  width: 10px;
}
.pendingTaskList::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
.pendingTaskList::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}

.todoList {
  padding: 15px;
  margin: 5px;
  border-radius: 4px;
  border: 3px solid brown;
}
</style>
