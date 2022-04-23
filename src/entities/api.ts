import { API } from "vk-io";

export let api: API;

export function initApi(token: string) {
  api = new API({
    token
  });

  return api;
}