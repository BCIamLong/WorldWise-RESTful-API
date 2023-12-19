// import bcrypt from "bcrypt";
import { User } from "../database/index.js";
import { AppError } from "../utils/index.js";

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new AppError("No user found!", 404);
    // throw new Error("No user found!");
  }
};

const fetchUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw new AppError("No user found!", 404);
    // throw new Error("No user found!");
  }
};

const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    throw new AppError("No user found!", 404);
    // throw new Error("No user found!");
  }
};

export default { getUsers, fetchUser, createUser };
