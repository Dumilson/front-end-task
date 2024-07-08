<template>
  <AuthLayout>
    <div class="flex flex-col justify-center gap-2">
      <Message v-if="loginError" severity="error">{{ loginError }}</Message>
      <div class="w-full max-w-xs p-4 border border-solid rounded-lg">
        <div class="flex flex-col w-full h-full gap-2">
          <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <InputText
              id="email"
              size="small"
              type="email"
              v-model="data.email"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <div class="w-full text-sm">
              <Password
                id="password"
                class="w-full *:w-full"
                :feedback="false"
                toggleMask
                v-model="data.password"
              />
            </div>
          </div>
          <div class="w-full mt-4">
            <Button
              label="Login"
              class="w-full"
              @click="onLogin()"
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores";
import services from "@/services";
import router from "@/router";
import Message from "primevue/message";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import AuthLayout from "@/layouts/auth.vue";

const loading = ref(false);
const authStore = useAuthStore();
const data = reactive({
  email: "admin@admin.com",
  password: "123456",
});
const loginError = ref<string>("");

async function onLogin() {
  loading.value = true;
  const response = await services.auth.login({
    email: data.email,
    password: data.password,
  });

  if (response.data) {
    authStore.setUser(response.data);
    router.push("/app");
  } else {
    loginError.value = response.error?.message;
  }
  loading.value = false;
}
</script>
