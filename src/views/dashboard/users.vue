<template>
  <div class="w-full h-full p-2">
    <div class="flex justify-end w-full">
      <Button size="small" label="Exportar" @click="exportData" />
    </div>
    <div class="w-full mt-2">
      <DataTable
        class="overflow-hidden border border-solid rounded-lg card"
        v-model:filters="filters"
        :value="users"
        paginator
        stripedRows
        :rows="5"
        :rowsPerPageOptions="[3, 5, 10]"
        dataKey="id"
        removableSort
        :loading="loading"
      >
        <template #header>
          <div class="flex flex-col w-full gap-2">
            <div class="flex items-end justify-between">
              <div class="flex flex-col w-full">
                <span class="text-3xl font-semibold">Usuários</span>
                <span class="font-medium opacity-70">Gerenciar usuários</span>
              </div>
            </div>

            <div class="flex items-center justify-between mt-1">
              <div class="flex gap-2">
                <NewUser @save="fetchUsers()" />
              </div>
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  v-model="filters['global'].value"
                  placeholder="pesquisar"
                />
              </IconField>
            </div>
          </div>
        </template>
        <template #empty> Nenhum usuário encontrado </template>
        <template #loading> Carregado dados de usuários </template>
        <Column field="id" header="ID" />

        <Column field="name" header="Nome" sortable>
          <template #body="{ data }">
            {{ data.name }}
          </template>
        </Column>
        <Column field="email" header="Email" sortable>
          <template #body="{ data }">
            <span>{{ data.email }}</span>
          </template>
        </Column>
        <Column field="isAdmin" header="Admin" sortable>
          <template #body="{ data }">
            {{ data.isAdmin == 1 ? "Sim" : "Não" }}
          </template>
        </Column>
        <Column field="created_at" header="Criado em" sortable>
          <template #body="{ data }">
            {{ defaultViewDateFormat(data.created_at) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useDate } from "@/composables";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import InputIcon from "primevue/inputicon";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "@primevue/core/api";
import services from "@/services";
import { NewUser } from "@/components/Modal/modals";
import exportFromJSON from "export-from-json";

const { defaultViewDateFormat } = useDate();

const users = ref([]);
const loading = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

async function fetchUsers() {
  const response = await services.user.getAllPaginated();
  if (response.data.status) {
    users.value = response.data.data;
  } else {
    console.log(response.error);
  }
}

function exportData() {
  const fileName = "user-table";
  const exportType = exportFromJSON.types.csv;
  const data = users.value.map(
    ({ email_verified_at, updated_at, ...rest }: any) => rest
  );
  exportFromJSON({ data, fileName, exportType });
}

onBeforeMount(async () => {
  loading.value = true;
  await fetchUsers();
  loading.value = false;
});
</script>
