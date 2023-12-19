import { User } from "../database/index.js";
import baseController from "./base.controller.js";

const { getAllItems, getItem, updateItem, deleteItem, postItem } =
  baseController;

const getUsersList = getAllItems(User);
const getUser = getItem(User);
const postUser = postItem(User);
const updateUser = updateItem(User);
const deleteUser = deleteItem(User);

export default { getUsersList, getUser, postUser, updateUser, deleteUser };
