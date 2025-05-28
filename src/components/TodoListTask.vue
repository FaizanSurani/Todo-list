<template>
  <div>
    <div
      v-for="task in tasks"
      :key="task.id"
      :class="isCompletedView ? 'doneTaskDiv' : 'pendingTaskDiv'">
      <div :class="isCompletedView ? 'doneTask' : 'pendingTask'">
        <input
          type="checkbox"
          :checked="task.isCompleted"
          @click="toggleTaskCompletion(task.id, isCompletedView)" />

        <div class="taskValues">
          <template v-if="isCompletedView">
            <p class="doneTaskInput">{{ task.title }}</p>
          </template>
          <template v-else>
            <input
              class="inputField"
              type="text"
              :ref="'input' + task.id"
              v-model="task.title"
              :disabled="!task.isEdited"
              @blur="closeTask(task)" />
          </template>
        </div>
      </div>

      <div class="btn">
        <template v-if="isCompletedView">
          <button class="btn-style" @mousedown="handleDeleteTask(task.id)">
            Delete
          </button>
        </template>
        <template v-else-if="!task.isEdited">
          <button class="btn-style" @mousedown="editTask(task)">Edit</button>
          <button class="btn-style" @mousedown="handleDeleteTask(task.id)">
            Delete
          </button>
        </template>
        <template v-else>
          <button class="btn-style" @mousedown="handleSaveUpdateTask(task)">
            Save
          </button>
          <button class="btn-style" @mousedown="closeTask(task)">Close</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

export default {
  props: {
    tasks: Array,
    isCompletedView: Boolean,
  },

  methods: {
    async toggleTaskCompletion(id, currentStatus) {
      try {
        await setDoc(
          doc(db, "todo-list", id),
          {
            isCompleted: !currentStatus,
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Firestore update failed:", error);
      }
    },
    async handleSaveUpdateTask(task) {
      if (task.title === "") {
        task.title = task.originalTitle || task.title;
      } else {
        task.originalTitle = task.title;
      }
      task.isEdited = false;
      try {
        await setDoc(
          doc(db, "todo-list", task.id),
          {
            title: task.originalTitle,
          },
          { merge: true }
        );
        alert("Task Updated");
      } catch (error) {
        console.error("Firestore update failed:", error);
      }
    },

    async handleDeleteTask(id) {
      try {
        await deleteDoc(doc(db, "todo-list", id));
        alert("Task Deleted");
      } catch (error) {
        console.error("Firestore update failed:", error);
      }
    },

    closeTask(task) {
      setTimeout(() => {
        if (task.originalTitle !== undefined) {
          task.title = task.originalTitle;
          delete task.originalTitle;
        }
        task.isEdited = false;
      }, 100);
    },

    editTask(task) {
      task.originalTitle = task.title;
      task.isEdited = true;

      this.$nextTick(() => {
        setTimeout(() => {
          let input = this.$refs["input" + task.id];
          if (Array.isArray(input)) input = input[0];
          if (input) input.focus();
        }, 0);
      });
    },
  },
};
</script>

<style>
.inputField {
  width: 15rem;
  height: 1.5rem;
  text-align: center;
}
.doneTaskInput {
  text-decoration: line-through;
}
.pendingTaskDiv,
.doneTaskDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}
.pendingTask,
.doneTask {
  display: flex;
  gap: 10px;
}
.btn {
  background-color: aliceblue;
  padding: 5px;
  margin: 3px;
  display: flex;
  gap: 10px;
}
.btn-style {
  width: 7vw;
  height: 5vh;
  border-radius: 3px;
}
</style>
