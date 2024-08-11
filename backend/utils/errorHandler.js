export default function errorHandler(err, req, res, next) {
  if (err.code === 11000) {
    err.statusCode = 400;
    const duplicateField = Object.keys(err.keyPattern);
    err.message = `Duplicate exists for field ${duplicateField}`;
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    error: err,
    message: err.message,
    status: err.status,
    stack: err.stack
  });
}
