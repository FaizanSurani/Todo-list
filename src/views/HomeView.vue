<template>
  <div>
    <h1 class="todo">To Do</h1>
    <div class="app">
      <TodoList />
    </div>
  </div>
</template>

<script>
import TodoList from "../components/TodoList.vue";

export default {
  name: "HomeView",
  components: { TodoList },
};
</script>

<style>
.todo {
  text-align: center;
  font-size: xx-large;
}
.app {
  display: flex;
  width: 450px;
  height: max-content;
  align-items: center;
  flex-direction: column;
  border: 3px solid brown;
  padding: 15px;
  margin: 30px auto;
  border-radius: 10px;
  width: max-content;
}
</style>
