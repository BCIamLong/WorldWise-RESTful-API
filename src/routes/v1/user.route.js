import { Router } from "express";
import { userController, authController } from "../../controllers/index.js";
import { asyncCatch } from "../../utils/index.js";
import { auth } from "../../middlewares/index.js";

const { getUsersList, getUser } = userController;
const { signup, signin, forgotPassword, resetPassword } = authController;
const { authenticate, authorize } = auth;

const route = Router();

route.post("/signup", asyncCatch(signup));
route.post("/signin", asyncCatch(signin));
route.post("/forgot-password", asyncCatch(forgotPassword));
route.patch("/reset-password/:token", asyncCatch(resetPassword));

// * don't use asyncCatch for middleware because the with middleware we should handle error in that middleware, and also because middleware don't return something => catch(next) will not work in this case
// * because we don't have any return right
// ! and the main reason that because it's middleware so we can use next() to throw error for global errors handler and so we don't care about it so thank the global errors
// ! but if we want to specify some specific errors we can use try catch here to handle those errors
// route.use(asyncCatch(authenticate), asyncCatch(authorize("admin", "manager")));
// route.use(asyncCatch(authorize("admin", "manager")));
route.use(authenticate, authorize("admin", "manager"));

route.route("/").get(asyncCatch(getUsersList));
route.route("/:id").get(asyncCatch(getUser));

export default route;
