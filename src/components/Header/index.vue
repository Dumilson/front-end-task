<template>
  <header class="flex w-full h-16 bg-white shadow border-b-gray-600">
    <div
      class="container flex items-center justify-between w-full h-16 px-2 mx-auto"
    >
      <div class="flex items-center justify-start gap-8">
        <div>
          <RouterLink to="/">
            <span class="text-2xl font-semibold cursor-pointer text-slate-900"
              >Todo List</span
            >
          </RouterLink>
        </div>
        <div class="hidden sm:flex">
          <RouterLink
            v-for="link in user.isAdmin ? Adminlinks : links"
            :to="link.href"
          >
            <Button :label="link.label" severity="secondary" text />
          </RouterLink>
        </div>
      </div>
      <div class="items-center justify-center hidden gap-4 sm:flex">
        <span class="text-sm">Olá {{ user.name }}</span>
        <RouterLink to="/logout">
          <Button
            severity="secondary"
            outlined
            size="small"
            icon="pi pi-sign-out"
          />
        </RouterLink>
      </div>
      <div class="flex gap-2 sm:hidden">
        <Button
          severity="secondary"
          outlined
          size="small"
          icon="pi pi-sign-out"
        />
        <div class="flex justify-center card">
          <Button
            type="button"
            icon="pi pi-align-right"
            @click="toggle"
            size="small"
            severity="secondary"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
          <Menu
            ref="menu"
            id="overlay_menu"
            :model="user.isAdmin ? Adminlinks : links"
            :popup="true"
          >
            <template #item="{ item, props }">
              <router-link
                v-if="item.href"
                v-slot="{ href, navigate }"
                :to="item.href"
                custom
              >
                <a
                  v-ripple
                  :href="href"
                  v-bind="props.action"
                  @click="navigate"
                >
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </router-link>
              <a
                v-else
                v-ripple
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
              >
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </template>
          </Menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { useAuthStore } from "@/stores";

const user = useAuthStore().user;

const Adminlinks = [
  {
    label: "Todo",
    href: "/app",
  },
  {
    label: "Gerenciar Usuários",
    href: "/dashboard/users",
  },
  {
    label: "Gerenciar Tarefas",
    href: "/dashboard/tasks",
  },
];

const links = [
  {
    label: "Todo",
    href: "/app",
  },
];

const menu = ref();

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>
