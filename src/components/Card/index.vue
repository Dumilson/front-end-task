<template>
  <div
    v-bind="$attrs"
    class="flex-col p-2 bg-white border border-solid rounded-lg shadow-sm cursor-pointer select-none"
  >
    <div class="flex items-center justify-between">
      <div class="opacity-85">{{ task.title }}</div>
      <PreviewTask v-if="task" @status:update="$emit('task:updated')" :task />
    </div>
    <div class="w-full font-medium truncate opacity-50">
      <span>
        {{ task.description }}
      </span>
    </div>
    <div class="flex flex-wrap w-full gap-2 mt-2 text-xs opacity-50">
      <Tag severity="warn" v-for="user in task.users">{{ user.name }}</Tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PreviewTask } from "@/components/Modal/modals";
import Tag from "primevue/tag";
defineProps(["task"]);
</script>
