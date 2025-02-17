import { ErrorRequestHandler } from "express";

const errorMiddleware:ErrorRequestHandler = (err, req, res, next) => {
    // 建立一個淺拷貝，並保留 message
    let error = { ...err, message: err.message };
  
    console.error(err);
  
    // Mongoose: 錯誤的 ObjectId 格式
    if (err.name === "CastError") {
      error.message = "Resource not found";
      error.statusCode = 404;
    }
  
    // Mongoose: duplicate key 錯誤
    if (err.code === 11000) {
      error.message = "Duplicate field value entered";
      error.statusCode = 400;
    }
  
    // Mongoose: 驗證錯誤
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(v => (v as { message: string }).message).join(', ');
      error.message = messages;
      error.statusCode = 400;
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error"
    });
};
  

export default errorMiddleware;
