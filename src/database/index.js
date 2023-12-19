import mongoose from "mongoose";
import City from "./models/city.model.js";
import User from "./models/user.model.js";
import { dbConfig } from "../configs/index.js";

const DB = dbConfig.DB_CLOUD.replace("<PASSWORD>", dbConfig.DB_PASSWORD);

(async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connect DB successfully");
  } catch (err) {
    console.log("DB ERROR:", err);
  }
})();

export { City, User };
