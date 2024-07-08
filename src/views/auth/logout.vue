<template>logout</template>
<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores";

onBeforeMount(() => {
  useAuthStore().clean();
});
</script>
