import "dotenv/config";
import app from "./app.js";
// import "./database/index.js";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log("Application is shutting down!");
  process.exit(1);
});

const port = process.env.PORT || 3009;

const server = app.listen(port, () =>
  console.log(`Server is listening at port ${port}`),
);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log(err);
  server.close(() => {
    console.log("Application is shutting down!");
    process.exit(1);
  });
});
