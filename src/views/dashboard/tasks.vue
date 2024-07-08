<template>
  <div class="w-full h-full p-2">
    <div class="flex justify-end w-full">
      <Button size="small" label="Exportar" @click="exportData" />
    </div>

    <div class="w-full mt-2">
      <DataTable
        class="overflow-hidden border border-solid rounded-lg card"
        v-model:filters="filters"
        :value="tasks"
        paginator
        stripedRows
        removableSort
        :rows="5"
        :rowsPerPageOptions="[3, 5, 10]"
        dataKey="id"
        :loading="loading"
      >
        <template #header>
          <div class="flex flex-col w-full gap-2">
            <div class="flex flex-col w-full">
              <span class="text-3xl font-semibold">Tarefas</span>
              <span class="font-medium opacity-70">Gerenciar usuários</span>
            </div>
            <div class="flex items-center justify-between mt-1">
              <NewTask @save="fetchTasks()" />

              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  size="small"
                  v-model="filters['global'].value"
                  placeholder="pesquisar"
                />
              </IconField>
            </div>
          </div>
        </template>
        <template #empty> Nenhuma tarefa encontrado </template>
        <template #loading> Carregado dados de tarefas </template>
        <Column field="id" header="ID" />

        <Column field="title" header="Titulo" sortable>
          <template #body="{ data }">
            {{ data.title }}
          </template>
        </Column>
        <Column header="Descrição" field="description" sortable>
          <template #body="{ data }">
            <span>{{ data.description }}</span>
          </template>
        </Column>

        <Column header="Responsável" field="assigned" sortable>
          <template #body="{ data }">
            <div class="flex gap-1">
              <span class="text-sm" v-for="user in data.users"
                >{{ user.name }},
              </span>
            </div>
          </template>
        </Column>

        <Column header="Estado" field="status" sortable>
          <template #body="{ data }">
            {{ data.status ? "Pendente" : "Feito" }}
          </template>
        </Column>

        <Column field="created_at" header="Criado em" sortable>
          <template #body="{ data }">
            {{ defaultViewDateFormat(data.created_at) }}
          </template>
        </Column>
        <Column field="deadline" header="Entrega" sortable>
          <template #body="{ data }">
            {{ data.deadline }}
          </template>
        </Column>

        <Column header="Ações" field="actions">
          <template #body="{ data }">
            <div class="flex gap-2">
              <EditTask :task="data" @update="fetchTasks()" />
              <DeleteTask :task="data" @delete="fetchTasks()" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { NewTask, DeleteTask, EditTask } from "@/components/Modal/modals";
import { useDate } from "@/composables";
import { FilterMatchMode } from "@primevue/core/api";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import services from "@/services";
import exportFromJSON from "export-from-json";

const { defaultViewDateFormat } = useDate();

const tasks = ref([]);
const loading = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

async function fetchTasks() {
  const response = await services.task.getAll();
  if (response.data) {
    tasks.value = response.data.data;
  } else {
    console.log(response.error);
  }
}

function exportData() {
  const fileName = "task-table";
  const exportType = exportFromJSON.types.csv;
  const data = tasks.value.map(({ updated_at, ...rest }: any) => ({
    ...rest,
    users: rest.users.map((item: any) => item.name),
  }));
  exportFromJSON({ data, fileName, exportType });
}

onBeforeMount(async () => {
  loading.value = true;
  await fetchTasks();
  loading.value = false;
});
</script>
