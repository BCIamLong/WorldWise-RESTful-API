import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: false,
    validate: function (val) {
      return val.length > 7;
    },
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: function (val) {
      return val === this.password;
    },
  },
  photo: {
    type: String,
    default: "default_photo.jpg",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user, admin, manager"],
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
  },
  resetToken: {
    type: String,
    // expires: 60,
  },
  resetTokenTimeout: {
    type: Date,
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.checkPassword = async function (
  plainPassword,
  hashPassword,
) {
  const check = await bcrypt.compare(plainPassword, hashPassword);
  if (!check) throw new Error("Password is not correct");

  return check;
};

const User = mongoose.model("User", userSchema);

export default User;
