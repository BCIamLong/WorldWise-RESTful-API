import { Router } from "express";
import { cityController } from "../../controllers/index.js";
import { asyncCatch } from "../../utils/index.js";
import { auth } from "../../middlewares/index.js";

const { getCitiesList, getCityInfo, deleteCity, postCity } = cityController;
const { authenticate } = auth;

const route = Router();

route.use(authenticate);

route.route("/").get(asyncCatch(getCitiesList)).post(asyncCatch(postCity));
route.route("/:id").get(asyncCatch(getCityInfo)).delete(asyncCatch(deleteCity));
// route.route("/").get(getCitiesList).post(postCity);
// route.route("/:id").get(getCityInfo).delete(deleteCity);

export default route;
