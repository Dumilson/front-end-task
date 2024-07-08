import { useAuthStore } from "@/stores";
import { makeGetRequest } from "../factories/get";
import { makePostRequest } from "../factories/post";
import type { Api } from "../services.types";
import type { CreateInput } from "./user.types";

const id = useAuthStore().user.id;

const User_URL = "/api/v1/users";
export const makeUserService = (api: Api) => ({
  create: makePostRequest<CreateInput>(User_URL + "/store", api),
  getAllPaginated: makeGetRequest(User_URL + "/get_all_users_paginate", api),
  getAll: makeGetRequest(User_URL + "/get_all_users", api),
  getMyAllTasks: makeGetRequest(User_URL + `/get_tasks_user/${id}`, api),
});
