import { City } from "../database/index.js";
import baseController from "./base.controller.js";

const { getAllItems, getItem, updateItem, deleteItem, postItem } =
  baseController;

const getCitiesList = getAllItems(City);
const getCityInfo = getItem(City);
const postCity = postItem(City);
const updateCity = updateItem(City);
const deleteCity = deleteItem(City);

export default { getCitiesList, getCityInfo, postCity, updateCity, deleteCity };
