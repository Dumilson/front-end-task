// import { makeGetRequest } from "../factories/get";
import { makePostRequest } from "../factories/post";
import type { Api } from "../services.types";
import type { LoginInput } from "./auth.types";

const AUTH_URL = "/api/v1/auth";
const LOGOUT_URL = "/api/v1/auth";
export const makeAuth = (api: Api) => ({
  login: makePostRequest<LoginInput>(AUTH_URL, api),
  logout: makePostRequest(LOGOUT_URL, api),
});
