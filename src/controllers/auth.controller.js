import crypto from "crypto";
import jwt from "jsonwebtoken";
import { authService } from "../services/index.js";
import { jwtConfig } from "../configs/index.js";
import { AppError } from "../utils/index.js";

const { JWT_SECRET, JWT_SECRET_EXPIRES } = jwtConfig;
const { register, login, sendEmailForgotPwd, resetPwd } = authService;
// console.log(JWT_SECRET_EXPIRES);
const signToken = (user) =>
  jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_SECRET_EXPIRES,
  });

const signup = async (req, res) => {
  const { name, email, password, passwordConfirm, photo } = req.body;
  if (!name || !email || !password || !passwordConfirm)
    throw new AppError("Please enter all the requires fields", 400);

  const newUser = await register({
    name,
    email,
    password,
    passwordConfirm,
    photo,
  });

  const token = signToken(newUser);

  res.json({
    status: "success",
    token,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new AppError("Please enter all the requires fields", 400);

  const user = await login(email, password);

  const token = signToken(user);

  res.json({
    status: "success",
    token,
  });
};

const forgotPassword = async (req, res) => {
  const resetToken = crypto.randomBytes(48).toString("hex");
  // console.log(resetToken);

  const { email } = req.body;
  if (!email) throw new AppError("Please fill your email", 400);

  const requestUrl = `${req.protocol}://${req.get(
    "host",
  )}/api/v1/users/reset-password/${resetToken}`;

  await sendEmailForgotPwd(email, resetToken, requestUrl);

  res.json({
    status: "success",
    message: "Sent mail to your email, please check it",
  });
};

const resetPassword = async (req, res) => {
  const resetToken = req.params.token;
  const { password, passwordConfirm } = req.body;
  // console.log(password, passwordConfirm);

  if (!resetToken) throw new AppError("Reset request link invalid", 404);
  if (password !== passwordConfirm)
    throw new AppError("Please enter correct to confirm password", 400);

  const user = await resetPwd(resetToken, password);
  const token = signToken(user);

  res.json({
    status: "success",
    token,
  });
};

export default { signup, signin, forgotPassword, resetPassword };
