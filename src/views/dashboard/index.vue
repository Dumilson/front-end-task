<template>
  <div class="flex flex-col w-full h-full bg-slate-100">
    <Header />
    <section class="container flex w-full px-2 mx-auto mt-2">
      <RouterView />
    </section>
  </div>
</template>

<script setup lang="ts">
import { Header } from "@/components";
</script>
