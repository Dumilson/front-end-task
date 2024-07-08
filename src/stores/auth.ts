import { type IUser, userSchema } from "@/constants";
import router from "@/router";
import { defineStore } from "pinia";

interface IAuthenticatedUser {
  token: string;
  user: IUser;
}

export const useAuthStore = defineStore("auth", {
  state: (): IAuthenticatedUser => ({
    token: "",
    user: {
      ...userSchema,
    },
  }),
  actions: {
    setUser(data: IAuthenticatedUser) {
      this.token = data.token;
      this.user = { ...userSchema, ...data.user };
    },
    clean() {
      this.token = "";
      this.user = { ...userSchema };
      router.push("/");
    },
  },
  persist: true,
});
