<template>
  <Modal ref="modalRef">
    <template #header>Criar novo usuário</template>
    <div class="flex flex-col w-full gap-3">
      <Message class="mt-1" v-if="newUserError" severity="error">{{
        newUserError
      }}</Message>

      <div class="flex flex-col">
        <label for="title">Nome</label>
        <InputText
          id="name"
          size="small"
          v-model="data.name"
          :invalid="dataErrors?.name?._errors[0]"
        />
        <small id="name-help" class="text-red-500">{{
          dataErrors?.name?._errors[0]
        }}</small>
      </div>

      <div class="flex flex-col">
        <label for="description">Email</label>
        <InputText
          v-model="data.email"
          size="small"
          id="email"
          type="email"
          :invalid="dataErrors?.email?._errors[0]"
        />
        <small id="email-help" class="text-red-500">{{
          dataErrors?.email?._errors[0]
        }}</small>
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <div class="w-full text-sm">
          <Password
            size="small"
            id="password"
            class="w-full *:w-full"
            :feedback="false"
            toggleMask
            v-model="data.password"
            :invalid="dataErrors?.password?._errors[0]"
          />
          <small id="password-help" class="text-red-500">{{
            dataErrors?.password?._errors[0]
          }}</small>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex gap-2">
          <Checkbox v-model="data.isAdmin" id="isAdmin" :binary="true" />
          <label for="isAdmin">Criar como admin</label>
        </div>
        <small id="isAdmin-help"
          >Selecione para criar o usuário com admin</small
        >
      </div>
      <div class="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="modalRef?.closeModal()"
        ></Button>
        <Button
          type="button"
          label="Criar"
          :loading="loading"
          @click="onCreateUser()"
        ></Button>
      </div>
    </div>
  </Modal>

  <Button
    @click="modalRef?.openModal()"
    label="Criar usuário"
    severity="info"
    size="small"
  />
</template>

<script setup lang="ts">
import { z } from "zod";
import { reactive, ref, watch } from "vue";
import { Modal } from "@/components";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import services from "@/services";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const loading = ref(false);
const toast = useToast();

const dataSchema = z.object({
  name: z.string().min(3, { message: "Nome de usuário inválido" }),
  email: z
    .string()
    .min(3, { message: "Email de usuário inválido" })
    .email({ message: "formato de email inválido" }),
  password: z
    .string()
    .min(8, { message: "senha deve conter pelo menos 8 caracteres" }),
});

type dataSchemaTypes = z.infer<typeof dataSchema>;

const data = reactive({
  name: "",
  email: "",
  password: "",
  isAdmin: false,
});

const emit = defineEmits(["save"]);

const dataErrors = ref<z.ZodFormattedError<dataSchemaTypes> | null>(null);
const newUserError = ref("");

async function onCreateUser() {
  const isFormValid = dataSchema.safeParse(data);
  if (isFormValid.success) {
    loading.value = true;
    const response = await services.user.create(data);
    if (response.data) {
      emit("save");
      toast.add({
        severity: "success",
        summary: "sucesso",
        detail: `tarefa ${data.name} foi criado com sucesso`,
        life: 3000,
      });
      modalRef.value?.closeModal();
    } else {
      newUserError.value = response.error.message;
      toast.add({
        severity: "error",
        summary: "Erro",
        detail: "Error ao criar usuário",
        life: 3000,
      });
    }
  } else {
    dataErrors.value = isFormValid.error.format();
  }
  loading.value = false;
}

watch(data, () => {
  if (dataErrors.value) {
    dataErrors.value = null;
  }
});
</script>
