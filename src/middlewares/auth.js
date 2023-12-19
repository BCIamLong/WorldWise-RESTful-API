import jwt from "jsonwebtoken";
import { AppError } from "../utils/index.js";
import { jwtConfig } from "../configs/index.js";
import { User } from "../database/index.js";

const { JWT_SECRET } = jwtConfig;

const authenticate = async (req, res, next) => {
  //1 check token exits
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return next(
      new AppError(
        "You are not logged in, please login to use our service",
        401,
      ),
    );
  //2 check token valid, get the payload with user id
  // if it has error the JWT package will throw it so we don't need to check error for decoded here
  const decoded = jwt.verify(token, JWT_SECRET);
  //3 check token expires
  // console.log(decoded.exp * 1000, Date.now()); decoded.exp time expire of reset token
  // if (decoded.iat * 1000 < Date.now()) decoded.iat time provide reset token
  if (decoded.exp * 1000 < Date.now())
    return next(
      new AppError("Your login turn expired, please login again", 401),
    );
  //4 check user exist, in case user might be deleted recently
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        "The user has been deleted, please contact to us to more info",
        401,
      ),
    );
  //5 check user changed password recently? because if they change password they might another token and the current token now will be invalid
  if (user.passwordChangedAt > Date.now())
    return next(
      new AppError(
        "The user changed password recently, please login again to get access",
        401,
      ),
    );

  req.user = user;
  next();
};

const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You don't have permission to access to this action", 403),
      );

    next();
  };

export default { authenticate, authorize };
