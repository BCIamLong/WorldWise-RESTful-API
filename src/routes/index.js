import { Router } from "express";
import cityRoute from "./v1/city.route.js";
import userRoute from "./v1/user.route.js";
// import errorsHandler from "../middlewares/errorsHandler.js";
import { AppError } from "../utils/index.js";

const route = Router();

route.use("/api/v1/cities", cityRoute);
route.use("/api/v1/users", userRoute);

route.all("*", (req, res, next) => {
  next(new AppError("No page found!", 404));
});

// route.use(errorsHandler);

export default route;
