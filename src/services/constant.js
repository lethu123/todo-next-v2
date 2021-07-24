import { PROXY } from "../../proxy";

export const login = PROXY + "/users/login";
export const get_list_task = PROXY + "/tasks";
export const delete_task = PROXY + "/tasks/delete/:id";
export const update_task = PROXY + "/tasks/:id";
