<template>
  <div>
    <div v-if="isLoading">
      <span class="loader"></span>
    </div>
    <div v-else>
      <TodoListAddItem />
      <TodoListItem />
    </div>
  </div>
</template>

<script>
import TodoListAddItem from "./TodoListAddItem.vue";
import TodoListItem from "./TodoListItem.vue";

export default {
  components: { TodoListAddItem, TodoListItem },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>

<style>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid black;
  border-bottom-color: white;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
