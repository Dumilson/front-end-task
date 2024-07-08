<template>
  <div class="flex flex-col w-full bg-slate-100">
    <Header />
    <div class="container w-full px-2 mx-auto mt-2">
      <div class="flex flex-wrap justify-center w-full gap-5 sm:flex-nowrap">
        <div class="w-full max-w-md sm:max-w-xs">
          <div>
            <div class="flex items-center gap-2 p-2 font-semibold">
              <span>Pendentes</span>
              <div class="opacity-50">{{ pendingTasks.length }}</div>
            </div>
            <hr class="h-1 bg-red-500 rounded-full" />
          </div>
          <div class="w-full">
            <div
              v-if="pendingTasks.length > 0"
              class="flex flex-col w-full gap-2 py-2"
            >
              <Card
                @task:updated="fetchMyTasks()"
                v-for="task in pendingTasks"
                :task
                :key="task.id"
                @click="() => console.log(task)"
                class="w-full hover:bg-gray-50"
              />
            </div>
            <div
              v-else
              class="px-2 py-6 mt-2 text-center border border-solid rounded-lg shadow-sm cursor-pointer select-none opacity-35"
            >
              <div
                v-if="isFetching"
                class="flex items-center justify-center gap-2"
              >
                <i class="pi pi-spin pi-spinner"></i>
                <span>carregando</span>
              </div>
              <span v-else>Sem tarefas feitas</span>
            </div>
          </div>
        </div>

        <div class="w-full max-w-md sm:max-w-xs">
          <div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 p-2 font-semibold">
                <span>Feitos</span>
                <div class="opacity-50">{{ doneTasks.length }}</div>
              </div>
            </div>
            <hr class="h-1 bg-green-500 rounded-full" />
          </div>
          <div class="w-full">
            <div
              class="flex flex-col w-full gap-2 py-2"
              v-if="doneTasks.length > 0"
            >
              <Card
                @task:updated="fetchMyTasks()"
                v-for="task in doneTasks"
                :task
                :key="task.id"
                @click="() => console.log(task)"
                class="w-full hover:bg-gray-100"
              />
            </div>
            <div
              v-else
              class="px-2 py-6 mt-2 text-center border border-solid rounded-lg shadow-sm select-none opacity-35"
            >
              <div
                v-if="isFetching"
                class="flex items-center justify-center gap-2"
              >
                <i class="pi pi-spin pi-spinner"></i>
                <span>carregando</span>
              </div>
              <span v-else>Sem tarefas feitas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { Card, Header } from "@/components";
import services from "@/services";

const pendingTasks = ref<any[]>([]);
const doneTasks = ref<any[]>([]);
const isFetching = ref(false);

async function fetchMyTasks() {
  const response = await services.user.getMyAllTasks();
  if (response.data) {
    pendingTasks.value = [];
    doneTasks.value = [];
    response.data.data[0].tasks.map((task: any) => {
      if (task.status == 1) {
        pendingTasks.value.push(task);
      } else {
        doneTasks.value.push(task);
      }
    });
  }
}

onBeforeMount(async () => {
  isFetching.value = true;
  await fetchMyTasks();
  isFetching.value = false;
});
</script>
