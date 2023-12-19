import crypto from "crypto";
import bcrypt from "bcrypt";
import { User } from "../database/index.js";
import { AppError, Email } from "../utils/index.js";

const register = async (user) => {
  try {
    const newUser = await User.create(user);

    newUser.password = await bcrypt.hash(user.password, 10);
    newUser.passwordConfirm = undefined;
    await newUser.save({ validateBeforeSave: false });

    return newUser;
  } catch (err) {
    throw new AppError(err.message, 400);
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User is not exist");

    const check = await bcrypt.compare(password, user.password);
    if (!check) throw new Error("Password is not correct");

    if (!user.resetToken) return user;

    //check if user after send forgot password request but after that the user might just remember the password and login, so in this case we need to remove the resetToken and also timeout in DB
    user.resetToken = undefined;
    user.resetTokenTimeout = undefined;
    await user.save({ validateBeforeSave: false });

    return user;
  } catch (err) {
    throw new AppError(err.message, 400);
  }
};

const sendEmailForgotPwd = async (email, resetToken, requestUrl) => {
  //1 check customer email

  // try {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("This user is not exist", 404);
  //2 use crypto to generate reset token -> create url request reset pwd with token(controller)

  const resetTokenDB = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //3 use crypto to hash reset token again and then store it into our app

  //4 send email with the url request reset password(controller)
  const customerEmail = new Email(user);

  const subject = "Your forgot password mail (valid in 3 minutes)";
  const text = `Please go to this link to reset your password: ${requestUrl}`;
  await customerEmail.sendEmail(subject, text);

  user.resetToken = resetTokenDB;
  user.resetTokenTimeout = Date.now() + 3 * 60 * 1000;
  // user.passwordChangedAt = Date.now() + 1000;

  await user.save({ validateBeforeSave: false });
  // return user;
  // } catch (err) {
  //   throw new Error(err.message);
  //   // user.resetToken = undefined;
  //   // user.passwordChangedAt;
  // }
};

const resetPwd = async (resetToken, password) => {
  //1 check the reset token on the url request
  const resetTokenDB = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //2 use crypto to hash the reset token and then compare with the hashed token in DB
  const user = await User.findOne({ resetToken: resetTokenDB });
  if (!user) throw new AppError("Reset token invalid", 401);

  // if (!Date.parse(user.resetTokenTimeout) + 3 * 60 * 1000 > Date.now()) because the reset token timeout we store was already + 3 minutes so we don't need to that here
  if (!Date.parse(user.resetTokenTimeout) > Date.now())
    throw new AppError("Reset token expired", 401);
  //3 check user enter password and passwordConfirm, both of them =  or not (controller)
  //4 change the password, remove passwordConfirm and store password with hash to DB
  user.password = await bcrypt.hash(password, 10);

  //5 change the passwordChangedAt to current time
  user.passwordChangedAt = Date.now() + 1000;
  user.resetToken = undefined;
  user.resetTokenTimeout = undefined;

  await user.save({ validateBeforeSave: false });
  //6 generate token and send back with response (controller)
  return user;
};

export default { register, login, sendEmailForgotPwd, resetPwd };
