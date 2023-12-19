const errHandlerDev = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const errHandlerProd = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const errorsHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") errHandlerDev(err, res);
  if (process.env.NODE_ENV === "production") errHandlerProd(err, res);
};

export default errorsHandler;
