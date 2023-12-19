import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes/index.js";
import { errorsHandler } from "./middlewares/index.js";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json({ limit: "90kb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(route);

route.use(errorsHandler);

export default app;
