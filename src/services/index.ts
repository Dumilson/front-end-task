import { AxiosConfig } from "./config";
import { makeAuth } from "./auth";
import { makeUserService } from "./user";
import { makeTaskService } from "./task";

export default {
  auth: makeAuth(AxiosConfig),
  user: makeUserService(AxiosConfig),
  task: makeTaskService(AxiosConfig),
};
